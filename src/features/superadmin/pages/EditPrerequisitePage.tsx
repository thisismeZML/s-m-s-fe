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
import { Checkbox } from "@/components/ui/checkbox"; // Import your checkbox component
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useUpdatePrerequisite from "../hooks/useUpdatePrerequisite";
import useSinglePrerequisite from "../hooks/useSinglePrerequisite";

const EditPrerequisitePage = () => {
  const { id } = useParams();
  const { data: prerequisite } = useSinglePrerequisite(id as string);
  const mutation = useUpdatePrerequisite(id as string);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<PrerequisiteRequest>({
    defaultValues: {
      requiredCourseCode: "",
      requiredMinimumGrade: "",
      isMandatory: false,
      notes: "",
    },
  });

  console.log(id)
  console.log("Prerequisite:", prerequisite);

  useEffect(() => {
    if (prerequisite) {
      setValue("requiredCourseCode", prerequisite.requiredCourseCode);
      setValue("requiredMinimumGrade", prerequisite.requiredMinimumGrade);
      setValue("isMandatory", prerequisite.isMandatory);
      setValue("notes", prerequisite.notes);
    }
  }, [prerequisite, setValue]);
  

  const onSubmit = (data: PrerequisiteRequest) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex items-center justify-center h-[calc(100dvh-150px)] px-4">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle>Update Prerequisite</CardTitle>
          <CardDescription>Update prerequisite information below.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="grid gap-6">
            {/* Required Course Code */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="requiredCourseCode">Required Course Code</Label>
              <Input
                id="requiredCourseCode"
                {...register("requiredCourseCode", { required: "Course code is required" })}
              />
              {errors.requiredCourseCode && (
                <p className="text-sm text-red-500">{errors.requiredCourseCode.message}</p>
              )}
            </div>

            {/* Required Minimum Grade */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="requiredMinimumGrade">Required Minimum Grade</Label>
              <Input
                id="requiredMinimumGrade"
                {...register("requiredMinimumGrade", { required: "Minimum grade is required" })}
              />
              {errors.requiredMinimumGrade && (
                <p className="text-sm text-red-500">{errors.requiredMinimumGrade.message}</p>
              )}
            </div>

            {/* Is Mandatory */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isMandatory"
                checked={watch("isMandatory")}
                onCheckedChange={(checked) => setValue("isMandatory", !!checked)}
              />
              <Label htmlFor="isMandatory">Is Mandatory</Label>
            </div>

            {/* Notes */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" {...register("notes")} placeholder="Any additional notes..." />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between mt-4">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-500 hover:bg-blue-400 text-white">
              Update
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default EditPrerequisitePage;
