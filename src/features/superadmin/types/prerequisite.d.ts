declare global {
  interface PrerequisiteRequest {
    requiredCourseCode: string;
    requiredMinimumGrade: string;
    isMandatory: boolean;
    notes: string;
  }

  interface PrerequisiteResponse {
    id: string;
    requiredCourseCode: string;
    requiredMinimumGrade: string;
    isMandatory: boolean;
    notes: string;
  }
}

export {}