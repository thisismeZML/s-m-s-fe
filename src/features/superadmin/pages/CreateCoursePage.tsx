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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useCreateCourse from "../hooks/useCreateCourse";
import { useEffect } from "react";
import fetchDepartmentList from "../services/fetchDepartmentList";
import useDepartmentStore from "@/stores/DepartmentStore";
import fetchPrerequisite from "../services/fetchPrerequisite";
import usePrerequisiteStore from "@/stores/PrerequisiteStore";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";

const CreateCoursePage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CourseRequest>();

  const mutation = useCreateCourse();

  const onSubmit = (data: CourseRequest) => {
    const transformedData = {
      ...data,
      prerequisiteIds: data.prerequisiteIds
        ? data.prerequisiteIds
            .toString()
            .split(",")
            .map((id) => id.trim())
        : [],
    };

    mutation.mutate(transformedData);
  };

  useEffect(() => {
    const loadDepartments = async () => {
      const data = await fetchDepartmentList(1, 100, "asc", "name");
      useDepartmentStore.getState().setDepartment(data.items);
    };

    const loadPrerequisites = async () => {
      const data = await fetchPrerequisite(1, 100, "asc", "name");
      usePrerequisiteStore.getState().setPrerequisite(data.items);
    };

    loadDepartments();
    loadPrerequisites();
  }, []);

  const departmentList = useDepartmentStore((state) => state.department);
  const prerequisiteList = usePrerequisiteStore((state) => state.prerequisite);

  return (
    <div className="flex items-center justify-center h-[calc(100dvh-150px)] px-4">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Create Course</CardTitle>
          <CardDescription>Create a new course below.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              {/* Code */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="code">Course Code</Label>
                <Input
                  id="code"
                  {...register("code", { required: "Code is required" })}
                />
                {errors.code && (
                  <p className="text-sm text-red-500">{errors.code.message}</p>
                )}
              </div>

              {/* Title */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  {...register("title", { required: "Title is required" })}
                />
                {errors.title && (
                  <p className="text-sm text-red-500">{errors.title.message}</p>
                )}
              </div>

              {/* Department Name */}
              <div className="flex flex-col space-y-1.5 w-full">
                <Label htmlFor="departmentId">Department</Label>
                <Select
                  onValueChange={(value) => setValue("departmentId", value)}
                  defaultValue={watch("departmentId")}
                >
                  <SelectTrigger id="departmentId" className="w-full">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departmentList.map((dept) => (
                      <SelectItem key={dept.id} value={dept.id}>
                        {dept.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.departmentId && (
                  <p className="text-sm text-red-500">
                    {errors.departmentId.message}
                  </p>
                )}
              </div>

              {/* Credit Hours */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="creditHours">Credit Hours</Label>
                <Input
                  id="creditHours"
                  type="number"
                  {...register("creditHours", {
                    required: "Credit hours are required",
                  })}
                />
                {errors.creditHours && (
                  <p className="text-sm text-red-500">
                    {errors.creditHours.message}
                  </p>
                )}
              </div>

              {/* Max Enrollment */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="maxEnrollment">Max Enrollment</Label>
                <Input
                  id="maxEnrollment"
                  type="number"
                  {...register("maxEnrollment", {
                    required: "Max enrollment is required",
                  })}
                />
                {errors.maxEnrollment && (
                  <p className="text-sm text-red-500">
                    {errors.maxEnrollment.message}
                  </p>
                )}
              </div>

              {/* Semester Offered */}
              <div className="flex flex-col space-y-1.5 w-full md:col-span-1">
                <Label htmlFor="semesterOffered">Semester Offered</Label>
                <Select
                  onValueChange={(value) => setValue("semesterOffered", value)}
                  defaultValue={watch("semesterOffered")}
                >
                  <SelectTrigger id="semesterOffered" className="w-full">
                    <SelectValue placeholder="Select semester" />
                  </SelectTrigger>
                  <SelectContent>
                    {["Spring", "Winter", "Fall"].map((semester) => (
                      <SelectItem key={semester} value={semester}>
                        {semester}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.semesterOffered && (
                  <p className="text-sm text-red-500">
                    {errors.semesterOffered.message}
                  </p>
                )}
              </div>

              {/* Delivery Mode */}
              <div className="flex flex-col space-y-1.5 w-full md:col-span-1">
                <Label htmlFor="deliveryMode">Delivery Mode</Label>
                <Select
                  onValueChange={(value) => setValue("deliveryMode", value)}
                  defaultValue={watch("deliveryMode")}
                >
                  <SelectTrigger id="deliveryMode" className="w-full">
                    <SelectValue placeholder="Select mode" />
                  </SelectTrigger>
                  <SelectContent>
                    {["Online", "Offline", "Hybrid"].map((mode) => (
                      <SelectItem key={mode} value={mode}>
                        {mode}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.deliveryMode && (
                  <p className="text-sm text-red-500">
                    {errors.deliveryMode.message}
                  </p>
                )}
              </div>

              {/* Profile Image URL */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="profile">Profile Image URL</Label>
                <Input
                  id="profile"
                  type="url"
                  {...register("profile", {
                    required: "Profile image URL is required",
                  })}
                />
                {errors.profile && (
                  <p className="text-sm text-red-500">
                    {errors.profile.message}
                  </p>
                )}
              </div>

              {/* Syllabus URL */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="syllabusUrl">Syllabus URL</Label>
                <Input
                  id="syllabusUrl"
                  type="url"
                  {...register("syllabusUrl", {
                    required: "Syllabus URL is required",
                  })}
                />
                {errors.syllabusUrl && (
                  <p className="text-sm text-red-500">
                    {errors.syllabusUrl.message}
                  </p>
                )}
              </div>

              {/* Prerequisite IDs (optional) */}
              <div className="flex flex-col space-y-1.5 md:col-span-2">
                <Label htmlFor="prerequisiteIds">Prerequisite Courses</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left"
                    >
                      {watch("prerequisiteIds")?.length > 0
                        ? prerequisiteList
                            .filter((p) =>
                              watch("prerequisiteIds")?.includes(p.id)
                            )
                            .map((p) => `${p.requiredCourseCode}`)
                            .join(", ")
                        : "Select prerequisite courses"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full max-h-64 overflow-y-auto">
                    <div className="flex flex-col gap-2">
                      {prerequisiteList.map((course) => (
                        <div
                          key={course.id}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`prereq-${course.id}`}
                            checked={watch("prerequisiteIds")?.includes(
                              course.id
                            )}
                            onCheckedChange={(checked) => {
                              const current = watch("prerequisiteIds") || [];
                              if (checked) {
                                setValue("prerequisiteIds", [
                                  ...current,
                                  course.id,
                                ]);
                              } else {
                                setValue(
                                  "prerequisiteIds",
                                  current.filter((id) => id !== course.id)
                                );
                              }
                            }}
                          />
                          <label
                            htmlFor={`prereq-${course.id}`}
                            className="text-sm leading-tight"
                          >
                            {course.requiredCourseCode}
                          </label>
                        </div>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Description */}
              <div className="flex flex-col space-y-1.5 md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  {...register("description", {
                    required: "Description is required",
                  })}
                  placeholder="Brief description of the course"
                />
                {errors.description && (
                  <p className="text-sm text-red-500">
                    {errors.description.message}
                  </p>
                )}
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

export default CreateCoursePage;
