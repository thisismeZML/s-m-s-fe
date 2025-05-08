import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useCreateDepartment from "../hooks/useCreateDepartment";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useSingleDepartment from "../hooks/useSingleDepartment";
import useUpdateDepartment from "../hooks/useUpdateDepartment";

const EditDepartmentPage = () => {

  const {id} = useParams();

  const {data: department} = useSingleDepartment(id as string);
  const mutation = useUpdateDepartment(id as string);
  
  const { register, handleSubmit, setValue , formState: { errors } } = useForm<DepartmentRequest>({
    defaultValues: {
      name: "",
      description: "",
      phoneNumber: "",
      email: "",
      officeLocation: "",
    },
  });

  useEffect(() => {
    if (department) {
      setValue("name", department?.name);
      setValue("description", department?.description);
      setValue("phoneNumber", department?.phoneNumber);
      setValue("email", department?.email);
      setValue("officeLocation", department?.officeLocation);
    }
  }, [department, setValue]);

  const onSubmit = (data: DepartmentRequest) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex items-center justify-center h-[calc(100dvh-150px)] px-4">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle>Update Department</CardTitle>
          <CardDescription>Update a department in one-click.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              {/* Code */}
              {/* <div className="flex flex-col space-y-1.5">
                <Label htmlFor="code">Code</Label>
                <Input id="code" {...register("code", { required: "Code is required" })} />
                {errors.code && <p className="text-sm text-red-500">{errors.code.message}</p>}
              </div> */}

              {/* Name */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" {...register("name", { required: "Name is required" })} />
                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
              </div>

              {/* Phone */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" {...register("phoneNumber")} placeholder="+123456789" />
              </div>

              {/* Email */}
              <div className="flex flex-col space-y-1.5 md:col-span-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: "Invalid email format",
                    },
                  })}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
              </div>

              {/* Location */}
              <div className="flex flex-col space-y-1.5 md:col-span-2">
                <Label htmlFor="location">Office Location</Label>
                <Input id="location" {...register("officeLocation")} />
              </div>

              {/* Description */}
              <div className="flex flex-col space-y-1.5 md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  {...register("description")}
                  placeholder="Brief description of the department"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between mt-4">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-400 text-white"
              variant="default"
            >
              Create
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default EditDepartmentPage;
