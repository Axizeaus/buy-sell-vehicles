import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { login } from "../api/users.js";
import { useAuth } from "../contexts/AuthContext.jsx";

import AuthForm from "@/components/AuthForm.js";

export function Login() {
  const navigate = useNavigate();
  const [, , setToken, setUser] = useAuth();

  const loginMutation = useMutation({
    mutationFn: (data: { username: string; password: string }) => login(data),
    onSuccess: (data) => {
      if (data.token) {
        setToken(data.token.token);
        setUser(data.token.user);
        navigate("/");
      }
    },
    onError: (err: any) => alert("Failed to login! err:" + err),
  });

  const handleLoginSubmit = (data: { username: string; password: string }) => {
    loginMutation.mutate(data);
  };

  return (
    <AuthForm
      title="Log In"
      description="Access your account"
      onSubmit={handleLoginSubmit}
      buttonText="Login"
      linkText="Don't have an account?"
      linkTo="/signup"
    />
  );
}
