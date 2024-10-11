import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { signup } from "@/api/users";

import AuthForm from "@/components/AuthForm";

export default function Signup() {
  const navigate = useNavigate();

  const signupMutation = useMutation({
    mutationFn: (data: { username: string; password: string }) => signup(data),
    onSuccess: () => navigate("/login"),
    onError: () => alert("Failed to sign up!"),
  });

  const handleSignupSubmit = (data: { username: string; password: string }) => {
    signupMutation.mutate(data);
  };

  return (
    <AuthForm
      title="Sign Up"
      description="Create a new account"
      onSubmit={handleSignupSubmit}
      buttonText="Sign Up"
      linkText="Already have an account?"
      linkTo="/login"
    />
  );
}
