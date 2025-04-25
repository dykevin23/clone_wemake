import { Hero } from "~/common/components/hero";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Jobs | wemake" },
    { name: "description", content: "Find your dream job at wemake" },
  ];
};

export default function JobPage() {
  return <div>{/* <Hero /> */}</div>;
}
