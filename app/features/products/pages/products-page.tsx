import type { MetaFunction } from "react-router";
import type { Route } from "./+types/products-page";

export function loader({ request }: Route.LoaderArgs) {
  return {
    products: [],
  };
}

export default function ProductsPage({ loaderData }: Route.ComponentProps) {
  return <></>;
}
