import { MessageCircleIcon } from "lucide-react";
import type { Route } from "./+types/messages-page";

export const meta: Route.MetaFunction = () => [{ title: " | wemake" }];

export default function MessagesPage() {
  return (
    <div className="h-full flex items-center justify-center">
      <MessageCircleIcon className="size-12 text-muted-foreground" />
      <h1 className="text-xl text-muted-foreground font-semibold">
        Click on a message in the sidebar to view it
      </h1>
    </div>
  );
}
