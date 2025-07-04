import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~/common/components/ui/breadcrumb";
import type { Route } from "./+types/post-page";
import { Form, Link, useFetcher, useOutletContext } from "react-router";
import { Button } from "~/common/components/ui/button";
import { ChevronUpIcon, DotIcon } from "lucide-react";
import { Textarea } from "~/common/components/ui/textarea";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { Badge } from "~/common/components/ui/badge";
import Reply from "../components/reply";
import { getPostById, getReplies } from "../queries";
import { DateTime } from "luxon";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries";
import { z } from "zod";
import { createReply } from "../mutations";
import { useEffect, useRef } from "react";
import { cn } from "~/lib/utils";

export const meta: Route.MetaFunction = ({ params }: Route.MetaArgs) => {
  return [{ title: `${params.postId}` }];
};

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const post = await getPostById(client, params.postId);
  const replies = await getReplies(client, params.postId);
  return { post, replies };
};

const formSchema = z.object({
  reply: z.string().min(1),
  topLevelId: z.coerce.number().optional(),
});

export const action = async ({ request, params }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();
  const { success, error, data } = formSchema.safeParse(
    Object.fromEntries(formData)
  );
  if (!success) {
    return { formErrors: error.flatten().fieldErrors };
  }
  const { reply, topLevelId } = data;
  await createReply(client, {
    postId: params.postId,
    reply,
    userId,
    topLevelId,
  });
  return { ok: true };
};

export default function PostPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const { isLoggedIn, name, username, avatar } = useOutletContext<{
    isLoggedIn: boolean;
    name?: string;
    username?: string;
    avatar?: string;
  }>();
  const formRef = useRef<HTMLFormElement>(null);
  const fetcher = useFetcher();

  useEffect(() => {
    if (actionData?.ok) {
      formRef.current?.reset();
    }
  }, [actionData?.ok]);
  return (
    <div className="space-y-10">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/community">Community</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={`/community?topic=${loaderData.post.topic_slug}`}>
                {loaderData.post.topic_name}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/community/postId">{loaderData.post.title}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="grid grid-cols-6 gap-40 items-start">
        <div className="col-span-4 space-y-10">
          <div className="flex w-full items-start gap-10">
            <fetcher.Form
              method="post"
              action={`/community/${loaderData.post.post_id}/upvote`}
            >
              <Button
                variant="outline"
                className={cn(
                  "flex flex-col h-14",
                  loaderData.post.is_upvoted
                    ? "border-primary text-primary"
                    : ""
                )}
              >
                <ChevronUpIcon className="size-4 shrink-0" />
                <span>{loaderData.post.upvotes}</span>
              </Button>
            </fetcher.Form>
            <div className="space-y-20 w-full">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold">{loaderData.post.title}</h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{loaderData.post.author_name}</span>
                  <DotIcon className="size-5" />
                  <span>
                    {DateTime.fromISO(loaderData.post.created_at).toRelative()}
                  </span>
                  <DotIcon className="size-5" />
                  <span>{loaderData.post.replies} replies</span>
                </div>
                <p className="text-muted-foreground w-2/3">
                  {loaderData.post.content}
                </p>
              </div>
              {isLoggedIn ? (
                <Form
                  ref={formRef}
                  className="flex items-center gap-5 w-1/2"
                  method="post"
                >
                  <Avatar className="size-14">
                    <AvatarFallback>{name?.[0]}</AvatarFallback>
                    <AvatarImage src={avatar} />
                  </Avatar>
                  <div className="flex flex-col gap-5 w-full items-end">
                    <Textarea
                      name="reply"
                      placeholder="write a reply"
                      className="w-full resize-none"
                      rows={5}
                    />
                    <Button type="submit">Reply</Button>
                  </div>
                </Form>
              ) : null}
              <div className="space-y-10">
                <h4 className="font-semibold">
                  {loaderData.post.replies} Replies
                </h4>
                <div className="flex flex-col gap-5">
                  {loaderData.replies.map((reply) => (
                    <Reply
                      key={reply.post_reply_id}
                      name={reply.user.name}
                      username={reply.user.username}
                      avatarUrl={reply.user.avatar}
                      content={reply.reply}
                      timestamp={reply.created_at}
                      topLevel={true}
                      topLevelId={reply.post_reply_id}
                      replies={reply.post_replies}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <aside className="col-span-2 space-y-5 border rounded-lg p-6 shadow-sm">
          <div className="flex gap-5">
            <Avatar className="size-14">
              <AvatarFallback>{loaderData.post.author_name[0]}</AvatarFallback>
              {loaderData.post.author_avatar ? (
                <AvatarImage src={loaderData.post.author_avatar} />
              ) : null}
            </Avatar>
            <div className="flex flex-col items-start">
              <h4 className="text-lg font-medium">
                {loaderData.post.author_name}
              </h4>
              <Badge variant="secondary" className="capitalize">
                {loaderData.post.author_role}
              </Badge>
            </div>
          </div>
          <div className="gap-2 text-sm flex flex-col">
            <span>
              🍰 Joined{" "}
              {DateTime.fromISO(loaderData.post.author_created_at).toRelative()}{" "}
              ago
            </span>
            <span>🚀 Launched {loaderData.post.products} products</span>
          </div>
          <Button variant="outline" className="w-full">
            Follow
          </Button>
        </aside>
      </div>
    </div>
  );
}
