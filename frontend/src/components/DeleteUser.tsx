import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "../api/users.js";
import { useParams, useNavigate } from "react-router-dom";

export default function DeleteUser() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const deleteUserMutation = useMutation({
    mutationFn: () => deleteUser(userId!),
    onSuccess: () => {
      alert("User deleted successfully!");
      navigate("/"); // Redirect after deletion
    },
    onError: () => alert("Failed to delete user!"),
  });

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUserMutation.mutate();
    }
  };

  return (
    <div>
      <h1>Delete User</h1>
      <p>Are you sure you want to delete this user?</p>
      <button onClick={handleDelete} className="text-red-500">
        Delete User
      </button>
    </div>
  );
}
