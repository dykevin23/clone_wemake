import { useOutletContext } from "react-router";
import type { Route } from "./+types/profile-page";

export const meta: Route.MetaFunction = () => [{ title: "Profile | wemake" }];

export default function ProfilePage({ loaderData }: Route.ComponentProps) {
  const { headline, bio } = useOutletContext<{
    headline: string;
    bio: string;
  }>();
  return (
    <div className="max-w-screen-md flex flex-col space-y-10">
      <div className="space-y-2">
        <h4 className="text-lg font-bold">Headline</h4>
        <p className="text-muted-foreground">{headline}</p>
      </div>
      <div className="space-y-2">
        <h4 className="text-lg font-bold">About</h4>
        <p className="text-muted-foreground">{bio}</p>
      </div>
    </div>
  );
}
