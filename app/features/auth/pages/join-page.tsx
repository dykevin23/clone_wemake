import { Form, Link } from "react-router";
import type { Route } from "./+types/join-page";
import InputPair from "~/common/components/input-pair";
import { Button } from "~/common/components/ui/button";
import AuthButtons from "../components/auth-buttons";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Join | wemake" }];
};

export default function JoinPage() {
  return (
    <div className="flex flex-col relative items-center justify-center h-full">
      <Button variant="ghost" asChild className="absolute right-8 left-0 top-8">
        <Link to="/auth/login">Login</Link>
      </Button>
      <div className="flex items-center flex-col justify-center w-full max-w-md gap-10">
        <h1 className="text-2xl font-semibold">Create an account</h1>
        <Form className="w-full space-y-4">
          <InputPair
            label="Name"
            description="Enter your name"
            name="name"
            required
            id="name"
            type="text"
            placeholder="Enter your name"
          />
          <InputPair
            label="Username"
            description="Enter your username"
            name="username"
            required
            id="username"
            type="text"
            placeholder="i.e wemake"
          />
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
            Create account
          </Button>
        </Form>
        <AuthButtons />
      </div>
    </div>
  );
}
