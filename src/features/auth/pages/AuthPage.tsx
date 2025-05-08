import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  // CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

import { useForm } from "react-hook-form";
import { Theme } from "@/stores/ThemeStore";
import { useTheme } from "@/theme/ThemeProvider";
import Login from "../services/auth.api";

const AuthPage = () => {
  const { register, handleSubmit } = useForm<LoginRequest>();

  const { theme } = useTheme();

  const mutation = Login();

  const onSubmit = (data: LoginRequest) => {
    console.log(data);
    mutation.mutate(data);
  };
  return (
    <form
      action=""
      className="h-[calc(100dvh-150px)] flex items-center justify-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Card className="w-full max-w-md mx-auto shadow-none dark:shadow-none border-none dark:bg-black">
        <CardHeader>
          <CardTitle className="text-2xl text-center flex flex-col items-center justify-center">
            {theme === Theme.light ? (
              <img src="/logo.png" className="w-40" alt="logo" />
            ) : (
              <img src="/darklogo.png" className="w-40" alt="logo" />
            )}
            <p>Welcome Back</p>
          </CardTitle>
          {/* <CardDescription>
            You can login to your account here. Click Login when you're done.
          </CardDescription> */}
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              className="dark:border-gray-300"
              {...register("email")}
              placeholder="Email Address"
            />
          </div>
          <div className="space-y-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              className="dark:border-gray-300"
              type="password"
              {...register("password")}
              placeholder="Password"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" className="dark:border-gray-300" />
              <label
                htmlFor="terms"
                className="select-none text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Keep me signed in
              </label>
            </div>
            <div className="text-sm font-medium flex items-center text-blue-400 cursor-pointer">
              Forget Password ?
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-400 cursor-pointer"
          >
            Login
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default AuthPage;
