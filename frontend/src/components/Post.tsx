import { PostProps } from "@/types";
import {
  Card,
  CardContent,
  // CardDescription,
  // CardFooter,
  // CardHeader,
  // CardTitle,
} from "@/components/ui/card";

// import User from "./User.tsx";

export default function Post(props: PostProps): React.JSX.Element {
  const PLACEHOLDER_IMAGE = "https://via.placeholder.com/150";
  return (
    <Card className="max-w-xs mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105">
      <img
        src={
          props.images && props.images.length > 0
            ? props.images[0]
            : PLACEHOLDER_IMAGE
        }
        alt={props.title}
        className="w-full h-40 object-cover"
      />
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          {props.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 font-semibold">
          ${props.price}
        </p>
        <p className="text-gray-500 dark:text-gray-400">{props.location}</p>
      </CardContent>
    </Card>
  );
}
