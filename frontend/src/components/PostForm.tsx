import React, { useState } from "react";
import FormField from "./FormField";

enum VehicleType {
  Car = "car",
  Motorcycle = "motorcycle",
}

interface PostFormProps {
  initialData?: {
    title: string;
    description: string;
    price: number | "";
    vehicleType: VehicleType;
    year: number | "";
    mileage: number | "";
    location: string;
    contactInfo: string;
    images: string[];
  };
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
}

const PostForm: React.FC<PostFormProps> = ({
  initialData,
  onSubmit,
  isSubmitting,
}) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [price, setPrice] = useState<number | "">(initialData?.price || "");
  const [vehicleType, setVehicleType] = useState<VehicleType>(
    initialData?.vehicleType || VehicleType.Car
  );
  const [year, setYear] = useState<number | "">(initialData?.year || "");
  const [mileage, setMileage] = useState<number | "">(
    initialData?.mileage || ""
  );
  const [location, setLocation] = useState(initialData?.location || "");
  const [contactInfo, setContactInfo] = useState(
    initialData?.contactInfo || ""
  );
  const [images, setImages] = useState<string[]>(initialData?.images || []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      price: Number(price),
      vehicleType,
      year: year !== "" ? Number(year) : "",
      mileage: mileage !== "" ? Number(mileage) : undefined,
      location,
      contactInfo,
      images,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <FormField
        label="Title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <FormField
        label="Description"
        type="textarea"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
      />
      <FormField
        label="Price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : "")}
        required
        min={0}
      />
      <FormField
        label="Vehicle Type"
        type="select"
        value={vehicleType}
        onChange={(e) => setVehicleType(e.target.value as VehicleType)}
        options={[
          { value: VehicleType.Car, label: "Car" },
          { value: VehicleType.Motorcycle, label: "Motorcycle" },
        ]}
      />
      <FormField
        label="Year"
        type="number"
        value={year}
        onChange={(e) => setYear(e.target.value ? Number(e.target.value) : "")}
        required
        min={1886}
        max={new Date().getFullYear()}
      />
      <FormField
        label="Mileage"
        type="number"
        value={mileage}
        onChange={(e) =>
          setMileage(e.target.value ? Number(e.target.value) : "")
        }
        min={0}
      />
      <FormField
        label="Location"
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      />
      <FormField
        label="Contact Info"
        type="text"
        value={contactInfo}
        onChange={(e) => setContactInfo(e.target.value)}
        required
      />
      <FormField
        label="Images (comma-separated URLs)"
        type="text"
        value={images.join(", ")}
        onChange={(e) =>
          setImages(e.target.value.split(",").map((img) => img.trim()))
        }
      />
      <div className="md:col-span-2">
        <button
          type="submit"
          className={`p-3 rounded-lg w-full ${
            isSubmitting
              ? "bg-gray-400"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          } transition-all duration-300`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default PostForm;
