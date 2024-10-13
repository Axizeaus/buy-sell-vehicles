import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { signup } from "@/api/users";

import AuthForm from "@/components/AuthForm";

interface Location {
  city?: string;
  state?: string;
  country?: string;
}

interface ContactInfo {
  email?: string;
  phone?: string;
}

interface SignupData {
  username: string;
  password: string;
  location?: Location;
  contactInfo?: ContactInfo;
  miscellaneous?: string;
}

export default function Signup() {
  const navigate = useNavigate();

  const signupMutation = useMutation({
    mutationFn: (data: SignupData) => signup(data),
    onSuccess: () => navigate("/login"),
    onError: () => alert("Failed to sign up!"),
  });

  const handleSignupSubmit = (data: SignupData) => {
    const signupData: SignupData = {
      username: data.username,
      password: data.password,
      location: {
        city: data.location?.city || "N/A",
        state: data.location?.state || "N/A",
        country: data.location?.country || "N/A",
      },
      contactInfo: {
        email: data.contactInfo?.email || "N/A",
        phone: data.contactInfo?.phone || "N/A",
      },
      miscellaneous: data.miscellaneous || "N/A",
    };

    signupMutation.mutate(signupData);
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
