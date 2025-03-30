export interface ConnectionUser {
  _id: string;
  name: string;
  email: string;
  profilePicture?: string;
  age?: number;
  gender?: string;
  bio?: string;
  skills?: string[];
} 