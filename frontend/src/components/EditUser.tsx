import { useQuery, useMutation } from "@tanstack/react-query";
import { getUserInfo, updateUser } from "../api/users.js";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import TextInput from "./TextInput"; // Import the reusable TextInput component

interface User {
  id: string;
  username: string;
  location?: { city?: string; state?: string; country?: string };
  contactInfo?: { email?: string; phone?: string };
  miscellaneous?: string;
}

export default function EditUser() {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  const userQuery = useQuery<User, Error>({
    queryKey: ["users", userId],
    queryFn: () => getUserInfo(userId!),
  });

  const updateUserMutation = useMutation<void, Error, Partial<User>>({
    mutationFn: (updatedUser) => updateUser(userId!, updatedUser),
    onSuccess: () => {
      navigate(`/user/${userId}`); // Redirect to user profile after update
    },
    onError: () => alert("Failed to update user!"),
  });

  const [username, setUsername] = useState<string>("");
  const [location, setLocation] = useState<{
    city?: string;
    state?: string;
    country?: string;
  }>({});
  const [contactInfo, setContactInfo] = useState<{
    email?: string;
    phone?: string;
  }>({});

  useEffect(() => {
    if (userQuery.data) {
      setUsername(userQuery.data.username);
      setLocation(userQuery.data.location || {});
      setContactInfo(userQuery.data.contactInfo || {});
    }
  }, [userQuery.data]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedUser: Partial<User> = {
      username,
      location,
      contactInfo,
    };
    updateUserMutation.mutate(updatedUser);
  };

  if (userQuery.isLoading) return <strong>Loading user info...</strong>;
  if (userQuery.isError) return <strong>Error fetching user info</strong>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200 text-center">
        Edit User
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <TextInput
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Location
          </h2>
          <TextInput
            label="City"
            value={location.city || ""}
            onChange={(e) => setLocation({ ...location, city: e.target.value })}
          />
          <TextInput
            label="State"
            value={location.state || ""}
            onChange={(e) =>
              setLocation({ ...location, state: e.target.value })
            }
          />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Contact Info
          </h2>
          <TextInput
            label="Email"
            value={contactInfo.email || ""}
            onChange={(e) =>
              setContactInfo({ ...contactInfo, email: e.target.value })
            }
            type="email"
          />
          <TextInput
            label="Phone"
            value={contactInfo.phone || ""}
            onChange={(e) =>
              setContactInfo({ ...contactInfo, phone: e.target.value })
            }
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 rounded-md shadow-md transition duration-200 transform hover:scale-105"
        >
          Update User
        </button>
      </form>
    </div>
  );
}
