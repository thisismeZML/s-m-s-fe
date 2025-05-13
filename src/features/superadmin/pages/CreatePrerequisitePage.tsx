import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch"; // Assuming you use this for boolean toggle
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import fetchCourseList from "../services/fetchCourseList";
import { useEffect } from "react";
import useCourseStore from "@/stores/CourseStore";
import useCreatePrerequisite from "../hooks/useCreatePrerequisite";

const CreatePrerequisitePage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PrerequisiteRequest>({
    defaultValues: {
      isMandatory: false,
    },
  });

  useEffect(() => {
    const loadCourses = async () => {
      const data = await fetchCourseList(1, 100, "asc", "name");
      useCourseStore.getState().setCourse(data.items);
    };

    loadCourses();
  }, []);

  const courseList = useCourseStore((state) => state.course);

  const isMandatory = watch("isMandatory");

  const mutation = useCreatePrerequisite();

  const onSubmit = (request: PrerequisiteRequest) => {
    mutation.mutate(request);
  };

  return (
    <div className="flex items-center justify-center h-[calc(100dvh-150px)] px-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Create Prerequisite</CardTitle>
          <CardDescription>Add a course prerequisite.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <div className="grid grid-cols-1 gap-y-4">
              {/* Required Course Code */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="requiredCourseCode">Required Course Code</Label>
                <Select
                  onValueChange={(value) =>
                    setValue("requiredCourseCode", value)
                  }
                >
                  <SelectTrigger id="requiredCourseCode" className="w-full">
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courseList.map((course) => (
                      <SelectItem key={course.id} value={course.code}>
                        {course.code} - {course.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.requiredCourseCode && (
                  <p className="text-sm text-red-500">
                    {errors.requiredCourseCode.message}
                  </p>
                )}
              </div>

              {/* Required Minimum Grade */}
              {/* Required Minimum Grade (Select box - full width) */}
              <div className="flex flex-col space-y-1.5 w-full">
                <Label htmlFor="requiredMinimumGrade">
                  Required Minimum Grade
                </Label>
                <Select
                  onValueChange={(value) =>
                    setValue("requiredMinimumGrade", value)
                  }
                >
                  <SelectTrigger id="requiredMinimumGrade" className="w-full">
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {["A+", "A", "B+", "B", "C+", "C", "D", "F"].map(
                      (grade) => (
                        <SelectItem key={grade} value={grade}>
                          {grade}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
                {errors.requiredMinimumGrade && (
                  <p className="text-sm text-red-500">
                    {errors.requiredMinimumGrade.message}
                  </p>
                )}
              </div>

              {/* Is Mandatory (Switch) */}
              <div className="flex items-center justify-between">
                <Label htmlFor="isMandatory">Is Mandatory</Label>
                <Switch
                  id="isMandatory"
                  checked={isMandatory}
                  onCheckedChange={(value) => setValue("isMandatory", value)}
                />
              </div>

              {/* Notes */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  {...register("notes")}
                  placeholder="Optional notes about this prerequisite"
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
            >
              Create
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default CreatePrerequisitePage;
