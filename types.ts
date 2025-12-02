export interface Job {
  id: string;
  title: string;
  company: string;
  description: string;
  location: string;
  type: string;
  imageUrl: string;
}

export interface UserProfile {
  name: string;
  role: string;
  location: string;
  completion: number;
  status: string;
  imageUrl: string;
}