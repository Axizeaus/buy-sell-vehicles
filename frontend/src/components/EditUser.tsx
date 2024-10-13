import { useQuery, useMutation } from "@tanstack/react-query";
import { getUserInfo, updateUser } from "../api/users.js";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

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
    <div>
      <h1>Edit User</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <h2>Location</h2>
          <label>
            City:
            <input
              type="text"
              value={location.city || ""}
              onChange={(e) =>
                setLocation({ ...location, city: e.target.value })
              }
            />
          </label>
          <label>
            State:
            <input
              type="text"
              value={location.state || ""}
              onChange={(e) =>
                setLocation({ ...location, state: e.target.value })
              }
            />
          </label>
        </div>
        <div>
          <h2>Contact Info</h2>
          <label>
            Email:
            <input
              type="email"
              value={contactInfo.email || ""}
              onChange={(e) =>
                setContactInfo({ ...contactInfo, email: e.target.value })
              }
            />
          </label>
          <label>
            Phone:
            <input
              type="text"
              value={contactInfo.phone || ""}
              onChange={(e) =>
                setContactInfo({ ...contactInfo, phone: e.target.value })
              }
            />
          </label>
        </div>
        <button type="submit">Update User</button>
      </form>
    </div>
  );
}
