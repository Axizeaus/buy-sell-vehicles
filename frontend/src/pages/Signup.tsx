import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { signup } from "@/api/users";
import { Link } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signupMutation = useMutation({
    mutationFn: () => signup({ username, password }),
    onSuccess: () => navigate("/login"),
    onError: () => alert("failed to sign up!"),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signupMutation.mutate();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Link to="/">Back to main page</Link>
      <div>
        <label htmlFor="create-username">Username: </label>
        <input
          type="text"
          name="create-username"
          id="create-username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <br />
      <div>
        <label htmlFor="create-password">Password: </label>
        <input
          type="password"
          name="create-password"
          id="create-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <br />
      <input
        type="submit"
        value={signupMutation.isPending ? "Signing up..." : "Sign Up"}
        disabled={!username || !password || signupMutation.isPending}
      />
    </form>
  );
}
