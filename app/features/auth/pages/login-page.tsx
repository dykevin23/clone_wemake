import { Form, Link } from "react-router";
import InputPair from "~/common/components/input-pair";
import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/login-page";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Log In | wemake" }];
};

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Button variant="ghost" asChild className="absolute right-8 left-0 top-8">
        <Link to="/auth/join">Join</Link>
      </Button>
      <div className="flex items-center flex-col justify-center w-full max-w-md gap-10">
        <h1 className="text-2xl font-semibold">Log in to your account</h1>
        <Form className="w-full space-y-4">
          <InputPair
            label="Email"
            description="Enter your email address"
            name="email"
            required
            id="email"
            type="email"
            placeholder="i.e wemake@example.com"
          />
          <InputPair
            label="Password"
            description="Enter your password"
            name="password"
            required
            id="password"
            type="password"
            placeholder="Enter your password"
          />
          <Button className="w-full" type="submit">
            Log in
          </Button>
        </Form>
      </div>
    </div>
  );
}
