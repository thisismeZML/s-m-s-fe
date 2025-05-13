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
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useSingleCourse from "../hooks/useSingleCourse";
import useUpdateCourseList from "../hooks/useUpdateCourseList";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CourseRequest {
  prerequisiteIds: string[];
  departmentName: string;
  departmentId: string;
  profile: string;
  code: string;
  title: string;
  description: string;
  creditHours: number;
  semesterOffered: string;
  maxEnrollment: number;
  syllabusUrl: string;
  deliveryMode: string;
}

const EditCoursePage = () => {
  const { id } = useParams();
  const { data: course } = useSingleCourse(id as string);
  const mutation = useUpdateCourseList(id as string);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CourseRequest>({
    defaultValues: {
      prerequisiteIds: [],
      departmentName: "",
      departmentId: "",
      profile: "",
      code: "",
      title: "",
      description: "",
      creditHours: 0,
      semesterOffered: "",
      maxEnrollment: 0,
      syllabusUrl: "",
      deliveryMode: "",
    },
  });

  useEffect(() => {
    if (course) {
      setValue("prerequisiteIds", course.prerequisiteIds);
      setValue("departmentName", course.departmentName);
      setValue("departmentId", course.departmentId);
      setValue("profile", course.profile);
      setValue("code", course.code);
      setValue("title", course.title);
      setValue("description", course.description);
      setValue("creditHours", course.creditHours);
      setValue("semesterOffered", course.semesterOffered);
      setValue("maxEnrollment", course.maxEnrollment);
      setValue("syllabusUrl", course.syllabusUrl);
      setValue("deliveryMode", course.deliveryMode);
    }
  }, [course, setValue]);

  const onSubmit = (data: CourseRequest) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex items-center justify-center h-[calc(100dvh-150px)] px-4">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle>Update Course</CardTitle>
          <CardDescription>Update course details below.</CardDescription>
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

              {/* Department Name
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="departmentName">Department Name</Label>
                <Input id="departmentName" {...register("departmentName")} />
              </div> */}

              {/* Department ID */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="departmentId">Department ID</Label>
                <Input
                  id="departmentId"
                  {...register("departmentId")}
                  disabled
                />
              </div>

              {/* Profile */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="profile">Profile</Label>
                <Input id="profile" {...register("profile")} />
              </div>

              {/* Credit Hours */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="creditHours">Credit Hours</Label>
                <Input
                  id="creditHours"
                  type="number"
                  {...register("creditHours", { valueAsNumber: true })}
                />
              </div>

              {/* Max Enrollment */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="maxEnrollment">Max Enrollment</Label>
                <Input
                  id="maxEnrollment"
                  type="number"
                  {...register("maxEnrollment", { valueAsNumber: true })}
                />
              </div>

              {/* Semester Offered */}
              <div className="flex flex-col space-y-1.5 w-full md:col-span-1">
                <Label htmlFor="semesterOffered">Semester Offered</Label>
                <Select
                  onValueChange={(value) => setValue("semesterOffered", value)}
                  value={watch("semesterOffered")}
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
                  value={watch("deliveryMode")}
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

              {/* Syllabus URL */}
              <div className="flex flex-col space-y-1.5 md:col-span-2">
                <Label htmlFor="syllabusUrl">Syllabus URL</Label>
                <Input
                  id="syllabusUrl"
                  type="url"
                  {...register("syllabusUrl")}
                />
              </div>

              {/* Description */}
              <div className="flex flex-col space-y-1.5 md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  {...register("description")}
                  placeholder="Brief course description..."
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
              Update
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default EditCoursePage;
