export interface ActivityLevel {
  _id: string;
  name: string;
}

export interface ActivityLevelsResponse {
  message: string;
  levels: ActivityLevel[];
}