export enum VehicleType {
  Car = "car",
  Motorcycle = "motorcycle",
}

export interface PostProps {
  title: string;
  author: string;
  description?: string;
  price: number;
  vehicleType: VehicleType;
  year: number;
  mileage?: number;
  location: string;
  contactInfo: string;
  images?: string[];
  createdAt: string;
}

export interface PostListProps {
  posts: PostProps[];
}
