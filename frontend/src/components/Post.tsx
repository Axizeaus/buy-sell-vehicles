import { PostProps } from "@/types";

export default function Post(props: PostProps): React.JSX.Element {
  return (
    <div>
      <h1>{props.title}</h1>
      <h2>Author: {props.author}</h2>
      <p>Description: {props.description}</p>
      <p>Price: ${props.price}</p>
      <p>Vehicle Type: {props.vehicleType}</p>
      <p>Year: {props.year}</p>
      <p>
        Mileage:{" "}
        {props.mileage !== undefined ? `${props.mileage} miles` : "N/A"}
      </p>
      <p>Location: {props.location}</p>
      <p>Contact Info: {props.contactInfo}</p>
      {props.images && props.images.length > 0 && (
        <div>
          <h3>Images:</h3>
          <ul>
            {props.images.map((image, index) => (
              <li key={index}>
                <img src={image} alt={`Post image ${index + 1}`} />
              </li>
            ))}
          </ul>
        </div>
      )}
      <p>Posted on: {new Date(props.createdAt).toLocaleDateString()}</p>
    </div>
  );
}
