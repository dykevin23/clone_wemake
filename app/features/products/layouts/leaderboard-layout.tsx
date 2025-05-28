import { data, Outlet } from "react-router";
import type { Route } from "./+types/leaderboard-layout";
import { z } from "zod";

const searchParamsSchema = z.object({
  page: z.coerce.number().min(1).optional().default(1),
});

export const loader = async ({ request }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const { success, data: parsedPage } = searchParamsSchema.safeParse(
    Object.fromEntries(url.searchParams)
  );
  if (!success) {
    throw data(
      { error_code: "invalid_page", message: "Invalid page" },
      { status: 400 }
    );
  }
};
export default function LeaderboardLayout() {
  return <Outlet />;
}
