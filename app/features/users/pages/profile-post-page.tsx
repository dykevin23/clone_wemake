import { PostCard } from "~/features/community/components/post-card";
import type { Route } from "./+types/profile-post-page";
import { getUserPosts } from "../queries";
import { makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = () => [{ title: "Posts | wemake" }];

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const posts = await getUserPosts(client, params.username);
  return { posts };
};

export default function ProfilePostPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="flex flex-col gap-5">
      {loaderData.posts.map((post) => (
        <PostCard
          key={post.post_id}
          id={post.post_id}
          title={post.title}
          author={post.author}
          authorAvatarUrl={post.author_avatar}
          category={post.topic}
          postedAt={post.created_at}
          votesCount={post.upvotes}
          expanded
        />
      ))}
    </div>
  );
}
