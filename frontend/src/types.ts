export enum VehicleType {
  Car = "car",
  Motorcycle = "motorcycle",
}

export interface PostProps {
  _id?: string;
  title: string;
  description: string;
  price: number;
  vehicleType: string;
  year: number;
  mileage?: number;
  location: string;
  contactInfo: string;
  images: string[];
  seller?: string;
  createdAt?: string;
}

export interface InvalidateQueryFilters {
  queryKey: string[];
  staleTime?: number;
  cacheTime?: number;
}

export interface PostListProps {
  posts: PostProps[];
}

export interface User {
  id: string;
  username: string;
  password: string;
  location?: {
    city?: string;
    state?: string;
  };
  contactInfo?: {
    email?: string;
    phone?: string;
  };
  miscellaneous?: string;
}
