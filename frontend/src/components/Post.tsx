import { PostProps } from "@/types";
import TiltCard from "@/components/ui/tilt-card";

const PLACEHOLDER_IMAGE = "https://via.placeholder.com/150";

export default function Post(props: PostProps): React.JSX.Element {
  return (
    <TiltCard
      image={
        props.images && props.images.length > 0
          ? props.images[0]
          : PLACEHOLDER_IMAGE
      }
      title={props.title}
      price={props.price}
      location={props.location}
    />
  );
}
