export const JOB_TYPES = [
  { label: "Full-Time", value: "fulltime" },
  { label: "Part-Time", value: "parttime" },
  { label: "Remote", value: "remote" },
] as const;

export const LOCATION_TYPES = [
  { label: "Remote", value: "remote" },
  { label: "In-Person", value: "inperson" },
  { label: "Hybrid", value: "hybrid" },
] as const;

export const SALARY_RANGE = [
  "$0 - $50,000",
  "$50,000 - $100,000",
  "$100,000 - $150,000",
  "$150,000 - $200,000",
  "$200,000+",
] as const;
