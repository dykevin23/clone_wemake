import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";
import type { Route } from "./+types/message-page";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { Form, useOutletContext } from "react-router";
import { Textarea } from "~/common/components/ui/textarea";
import { Button } from "~/common/components/ui/button";
import { SendIcon } from "lucide-react";
import MessageBubble from "../components/message-bubble";
import { makeSSRClient } from "~/supa-client";
import {
  getLoggedInUserId,
  getMessagesByMessagesRoomId,
  getRoomParticipant,
} from "../queries";
import { sendMessageToRoom } from "../mutations";
import { useEffect, useRef } from "react";

export const meta: Route.MetaFunction = () => [{ title: "Message | wemake" }];

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const messages = await getMessagesByMessagesRoomId(client, {
    userId,
    messageRoomId: params.messageRoomId,
  });
  const participants = await getRoomParticipant(client, {
    userId,
    messageRoomId: params.messageRoomId,
  });

  return { messages, participants };
};

export const action = async ({ request, params }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();
  const message = formData.get("message");
  await sendMessageToRoom(client, {
    messageRoomId: params.messageRoomId,
    message: message as string,
    userId,
  });

  return { ok: true };
};

export default function MessagePage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const { userId } = useOutletContext<{ userId: string }>();
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (actionData?.ok) {
      formRef.current?.reset();
    }
  }, [actionData]);
  return (
    <div className="h-full flex flex-col justify-between">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="size-14">
            <AvatarImage src={loaderData.participants.profile.avatar ?? ""} />
            <AvatarFallback>
              {loaderData.participants.profile.name.charAt(0) ?? ""}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-0">
            <CardTitle>{loaderData.participants.profile.name}</CardTitle>
            <CardDescription>2 days ago</CardDescription>
          </div>
        </CardHeader>
      </Card>
      <div className="py-10 overflow-y-scroll space-y-4 flex flex-col justify-start h-full">
        {loaderData.messages.map((message) => (
          <MessageBubble
            key={message.message_id}
            avatarFallback={message.sender.name.charAt(0)}
            avatarUrl={message.sender.avatar ?? ""}
            content={message.content}
            isCurrentUser={message.sender.profile_id === userId}
          />
        ))}
      </div>
      <Card>
        <CardHeader>
          <Form
            ref={formRef}
            className="relative flex justify-end items-center"
            method="post"
          >
            <Textarea
              placeholder="Write a message..."
              rows={2}
              required
              name="message"
              className="resize-none"
            />
            <Button type="submit" size="icon" className="absolute right-2">
              <SendIcon className="size-4" />
            </Button>
          </Form>
        </CardHeader>
      </Card>
    </div>
  );
}
