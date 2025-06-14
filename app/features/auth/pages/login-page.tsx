import { Form, Link, useNavigation } from "react-router";
import InputPair from "~/common/components/input-pair";
import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/login-page";
import AuthButtons from "../components/auth-buttons";
import { LoaderCircleIcon } from "lucide-react";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Log In | wemake" }];
};

export const action = async ({ request }: Route.ActionArgs) => {
  await new Promise((resolve) => setTimeout(resolve, 4000));
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  return {
    message: "success",
  };
};

export default function LoginPage({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <div className="flex flex-col relative items-center justify-center h-full">
      <Button variant="ghost" asChild className="absolute right-8 left-0 top-8">
        <Link to="/auth/join">Join</Link>
      </Button>
      <div className="flex items-center flex-col justify-center w-full max-w-md gap-10">
        <h1 className="text-2xl font-semibold">Log in to your account</h1>
        <Form className="w-full space-y-4" method="post">
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
          <Button className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <LoaderCircleIcon className="animate-spin" />
            ) : (
              "Log in"
            )}
          </Button>
          {actionData?.message && (
            <p className="text-sm text-red-500">{actionData.message}</p>
          )}
        </Form>
        <AuthButtons />
      </div>
    </div>
  );
}
