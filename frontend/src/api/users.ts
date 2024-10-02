import { User } from "@/types"; // Ensure this type is defined correctly

export const signup = async ({ username, password }: User) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      const errorMessage = await res.text(); // Get error message from response
      throw new Error(`Failed to sign up: ${errorMessage}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Signup error:", error);
    throw error; // Re-throw the error after logging
  }
};

export const login = async ({ username, password }: User) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      const errorMessage = await res.text(); // Get error message from response
      throw new Error(`Failed to login: ${errorMessage}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Login error:", error);
    throw error; // Re-throw the error after logging
  }
};

export const getUserInfo = async (id: string) => {
  console.log("id: ", id);
  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(res);

    if (!res.ok) {
      const errorMessage = await res.text();
      throw new Error(`Failed to fetch user info: ${errorMessage}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Get user info error:", error);
    throw error;
  }
};
