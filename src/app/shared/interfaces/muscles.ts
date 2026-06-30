export interface MuscleGroupResponse {
  message: string;
  musclesGroup: MuscleGroup[];
}
export interface MuscleGroup {
  _id: string;
  name: string;
  image: string | null;
}

export interface MuscleAPIResponse {
  message: string;
  totalMuscles: number;
  muscles: MuscleGroup[];
}

export interface MuscleGroupByIdResponse {
  message: string;
  muscleGroup: MuscleGroup;
  muscles: MuscleGroup[];
}
