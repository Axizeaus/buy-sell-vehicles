import React, { useState } from "react";

enum VehicleType {
  Car = "car",
  Motorcycle = "motorcycle",
}

const CreatePost: React.FC = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [vehicleType, setVehicleType] = useState<VehicleType>(VehicleType.Car);
  const [year, setYear] = useState<number | "">("");
  const [mileage, setMileage] = useState<number | "">("");
  const [location, setLocation] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newPost = {
      title,
      author,
      description,
      price: Number(price),
      vehicleType,
      year: Number(year),
      mileage: mileage ? Number(mileage) : undefined,
      location,
      contactInfo,
      images,
      createdAt: new Date().toISOString(),
    };

    console.log(newPost);

    // onCreate(newPost);
    setTitle("");
    setAuthor("");
    setDescription("");
    setPrice("");
    setVehicleType(VehicleType.Car);
    setYear("");
    setMileage("");
    setLocation("");
    setContactInfo("");
    setImages([]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Post</h2>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Author:</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value ? Number(e.target.value) : "")
          }
          required
          min="0"
        />
      </div>
      <div>
        <label>Vehicle Type:</label>
        <select
          value={vehicleType}
          onChange={(e) => setVehicleType(e.target.value as VehicleType)}
        >
          <option value={VehicleType.Car}>Car</option>
          <option value={VehicleType.Motorcycle}>Motorcycle</option>
        </select>
      </div>
      <div>
        <label>Year:</label>
        <input
          type="number"
          value={year}
          onChange={(e) =>
            setYear(e.target.value ? Number(e.target.value) : "")
          }
          required
          min="1886"
          max={new Date().getFullYear()}
        />
      </div>
      <div>
        <label>Mileage:</label>
        <input
          type="number"
          value={mileage}
          onChange={(e) =>
            setMileage(e.target.value ? Number(e.target.value) : "")
          }
          min="0"
        />
      </div>
      <div>
        <label>Location:</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Contact Info:</label>
        <input
          type="text"
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Images (comma-separated URLs):</label>
        <input
          type="text"
          value={images.join(", ")}
          onChange={(e) =>
            setImages(e.target.value.split(",").map((img) => img.trim()))
          }
        />
      </div>
      <button type="submit">Create Post</button>
    </form>
  );
};

export default CreatePost;
