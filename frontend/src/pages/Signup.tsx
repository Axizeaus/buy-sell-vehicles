import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useState } from "react"; // Import useState

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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const signupMutation = useMutation({
    mutationFn: (data: SignupData) => signup(data),
    onSuccess: () => {
      setErrorMessage(null);
      navigate("/login");
    },
    onError: (error: any) => {
      const errmsg = JSON.parse(error.message);
      console.log(errmsg.details);

      if (errmsg.details) {
        setErrorMessage(errmsg.details);
      } else {
        setErrorMessage("Failed to sign up!");
      }
    },
  });

  const handleSignupSubmit = (data: SignupData) => {
    const signupData: SignupData = {
      username: data.username,
      password: data.password,
      location: {
        city: data.location?.city || undefined,
        state: data.location?.state || undefined,
      },
      contactInfo: {
        email: data.contactInfo?.email || undefined,
        phone: data.contactInfo?.phone || undefined,
      },
      miscellaneous: data.miscellaneous || undefined,
    };

    signupMutation.mutate(signupData);
  };

  return (
    <div>
      <AuthForm
        title="Sign Up"
        description="Create a new account"
        onSubmit={handleSignupSubmit}
        buttonText="Sign Up"
        linkText="Already have an account?"
        linkTo="/login"
        errorMessage={errorMessage!}
      />
    </div>
  );
}
