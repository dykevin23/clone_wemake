import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/submit-job-page";
import { Form } from "react-router";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { JOB_TYPES, LOCATION_TYPES, SALARY_RANGE } from "../constrants";
import { Button } from "~/common/components/ui/button";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Submit Job | wemake" },
    {
      name: "description",
      content: "Reach out to the best developers in the world",
    },
  ];
};

export default function SubmitJobPage() {
  return (
    <div>
      <Hero
        title="Post a Job"
        subtitle="Reach out to the best developers in the world"
      />
      <Form className="max-w-screen-2xl mx-auto flex flex-col gap-10 items-center">
        <div className="grid grid-cols-3 gap-10">
          <InputPair
            id="position"
            label="Position"
            description="(40 characters max)"
            name="position"
            maxLength={40}
            type="text"
            required
            placeholder="i.e Senior React Developer"
          />
          <InputPair
            id="overview"
            label="Overview"
            description="(400 characters max)"
            name="overview"
            maxLength={400}
            type="text"
            required
            textArea
            placeholder="i.e We are looking for a Senior React Developer"
          />
          <InputPair
            id="responsibilities"
            label="Responsibilities"
            description="(400 characters max, comma separated)"
            name="responsibilities"
            maxLength={400}
            type="text"
            required
            textArea
            placeholder="i.e Implement new features, Maintain code quality, etc."
          />
          <InputPair
            id="qualifications"
            label="Qualifications"
            description="(400 characters max, comma separated)"
            name="qualifications"
            maxLength={400}
            type="text"
            required
            textArea
            placeholder="i.e 3+ years of experience. String TypeScript skills, etc."
          />
          <InputPair
            id="benefits"
            label="Benefits"
            description="(400 characters max, comma separated)"
            name="benefits"
            maxLength={400}
            type="text"
            required
            textArea
            placeholder="i.e Flexible working hours. Health insurance, etc."
          />
          <InputPair
            id="skills"
            label="Skills"
            description="(400 characters max, comma separated)"
            name="skills"
            maxLength={400}
            type="text"
            required
            textArea
            placeholder="i.e React, TypeScript, etc."
          />

          <InputPair
            id="companyName"
            label="Company Name"
            description="(40 characters max, comma separated)"
            name="companyName"
            maxLength={40}
            type="text"
            required
            textArea
            placeholder="i.e wemake"
          />
          <InputPair
            id="companyLogoUrl"
            label="Company Logo Url"
            description="(40 characters max)"
            name="companyLogoUrl"
            type="url"
            required
            placeholder="i.e https://wemake.services/logo.png"
          />
          <InputPair
            id="companyLocation"
            label="Company Location"
            description="(40 characters max)"
            name="companyLocation"
            type="text"
            required
            placeholder="i.e Remote, New York, etc."
          />
          <InputPair
            id="applyUrl"
            label="Apply Url"
            description="(40 characters max)"
            name="applyUrl"
            type="url"
            required
            placeholder="i.e https://wemake.services/apply"
          />
          <SelectPair
            label="Job Type"
            description="Select the type of job"
            name="jobType"
            required
            placeholder="Select the type of job"
            options={JOB_TYPES.map((type) => ({
              label: type.label,
              value: type.value,
            }))}
          />
          <SelectPair
            label="Job Location"
            description="Select the location of job"
            name="jobLocation"
            required
            placeholder="Select the location of job"
            options={LOCATION_TYPES.map((location) => ({
              label: location.label,
              value: location.value,
            }))}
          />
          <SelectPair
            label="Salary Range"
            description="Select the salary range of job"
            name="salaryRange"
            required
            placeholder="Select the salary range of job"
            options={SALARY_RANGE.map((salary) => ({
              label: salary,
              value: salary,
            }))}
          />
        </div>
        <Button type="submit" className="w-full" size="lg">
          Post job for $100
        </Button>
      </Form>
    </div>
  );
}
