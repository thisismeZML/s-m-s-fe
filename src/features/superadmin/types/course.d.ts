declare global {
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

  interface CourseResponse {
    id: string;
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
}

export {}