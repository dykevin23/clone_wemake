import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/jobs-page";
import { JobCard } from "../components/job-card";
import { Button } from "~/common/components/ui/button";
import { JOB_TYPES, LOCATION_TYPES, SALARY_RANGE } from "../constrants";
import { data, useSearchParams } from "react-router";
import { cn } from "~/lib/utils";
import { getJobs } from "../queries";
import { z } from "zod";
import { makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Jobs | wemake" },
    { name: "description", content: "Find your dream job at wemake" },
  ];
};

const searchParamsSchema = z.object({
  type: z
    .enum(JOB_TYPES.map((type) => type.value) as [string, ...string[]])
    .optional(),
  location: z
    .enum(
      LOCATION_TYPES.map((location) => location.value) as [string, ...string[]]
    )
    .optional(),
  salary: z.enum(SALARY_RANGE).optional(),
});

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const url = new URL(request.url);
  const { success, data: parsedData } = searchParamsSchema.safeParse(
    Object.fromEntries(url.searchParams)
  );
  if (!success) {
    throw data(
      {
        error_code: "invalid_search_params",
        message: "Invalid search params",
      },
      { status: 400 }
    );
  }
  const jobs = await getJobs(client, {
    limit: 40,
    location: parsedData.location,
    type: parsedData.type,
    salary: parsedData.salary,
  });
  return { jobs };
};

export default function JobsPage({ loaderData }: Route.ComponentProps) {
  const [searchParam, setSearchParam] = useSearchParams();
  const onFilterClick = (key: string, value: string) => {
    searchParam.set(key, value);
    setSearchParam(searchParam);
  };
  return (
    <div className="space-y-20">
      <Hero title="Jobs" subtitle="Companies looking for makers" />
      <div className="grid grid-cols-6 gap-20 items-start">
        <div className="grid grid-cols-3 col-span-4 gap-5">
          {loaderData.jobs.map((job) => (
            <JobCard
              key={job.job_id}
              id={job.job_id}
              company={job.company_name}
              companyLogoUrl={job.company_logo}
              companyHq={job.company_location}
              title={job.position}
              postedAt={job.created_at}
              type={job.job_type}
              positionLocation={job.location}
              salary={job.salary_range}
            />
          ))}
        </div>

        <div className="col-span-2 sticky top-20 flex flex-col gap-10">
          <div className="flex flex-col items-start gap-2.5">
            <h4 className="text-sm text-muted-foreground font-bold">Type</h4>
            <div className="flex flex-wrap gap-2">
              {JOB_TYPES.map((type) => (
                <Button
                  variant="outline"
                  onClick={() => onFilterClick("type", type.value)}
                  className={cn(
                    type.value === searchParam.get("type") ? "bg-accent" : ""
                  )}
                >
                  {type.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-start gap-2.5">
            <h4 className="text-sm text-muted-foreground font-bold">
              Location
            </h4>
            <div className="flex flex-wrap gap-2">
              {LOCATION_TYPES.map((type) => (
                <Button
                  variant="outline"
                  onClick={() => onFilterClick("location", type.value)}
                  className={cn(
                    type.value === searchParam.get("location")
                      ? "bg-accent"
                      : ""
                  )}
                >
                  {type.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-start gap-2.5">
            <h4 className="text-sm text-muted-foreground font-bold">
              Salary Range
            </h4>
            <div className="flex flex-wrap gap-2">
              {SALARY_RANGE.map((range) => (
                <Button
                  variant="outline"
                  onClick={() => onFilterClick("salary", range)}
                  className={cn(
                    range === searchParam.get("salary") ? "bg-accent" : ""
                  )}
                >
                  {range}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
