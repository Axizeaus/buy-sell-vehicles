import CreatePost from "./components/CreatePost";
import PostList from "./components/PostList";
import { VehicleType } from "./types";

function App() {
  // const examplePost = {
  //   title: "2015 Honda Civic",
  //   author: "John Doe",
  //   description: "A well-maintained car with low mileage.",
  //   price: 15000,
  //   vehicleType: VehicleType.Car,
  //   year: 2015,
  //   mileage: 30000,
  //   location: "New York, NY",
  //   contactInfo: "john.doe@example.com",
  //   images: ["image1.jpg", "image2.jpg"],
  //   createdAt: new Date().toISOString(),
  // };

  const examplePosts = [
    {
      title: "2015 Honda Civic",
      author: "John Doe",
      description: "A well-maintained car with low mileage.",
      price: 15000,
      vehicleType: VehicleType.Car,
      year: 2015,
      mileage: 30000,
      location: "New York, NY",
      contactInfo: "john.doe@example.com",
      images: ["image1.jpg", "image2.jpg"],
      createdAt: new Date().toISOString(),
    },
    {
      title: "2016 Toyota Corolla",
      author: "Jane Smith",
      description: "Reliable and fuel-efficient.",
      price: 14000,
      vehicleType: VehicleType.Car,
      year: 2016,
      mileage: 25000,
      location: "Los Angeles, CA",
      contactInfo: "jane.smith@example.com",
      images: ["image3.jpg", "image4.jpg"],
      createdAt: new Date().toISOString(),
    },
    {
      title: "2018 Ford F-150",
      author: "Mike Johnson",
      description: "Perfect for work and play.",
      price: 30000,
      vehicleType: VehicleType.Car,
      year: 2018,
      mileage: 15000,
      location: "Chicago, IL",
      contactInfo: "mike.johnson@example.com",
      images: ["image5.jpg", "image6.jpg"],
      createdAt: new Date().toISOString(),
    },
  ];

  return (
    <>
      {/* <Post post={examplePost} /> */}
      <CreatePost />
      <PostList posts={examplePosts} />
    </>
  );
}

export default App;
