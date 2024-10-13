export const signup = async ({
  username,
  password,
  location, // Optional
  contactInfo, // Optional
  miscellaneous, // Optional
}: {
  username: string;
  password: string;
  location?: { city?: string; state?: string; country?: string };
  contactInfo?: { email?: string; phone?: string };
  miscellaneous?: string;
}) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        location,
        contactInfo,
        miscellaneous,
      }),
    });

    if (!res.ok) {
      const errorMessage = await res.text();
      throw new Error(`Failed to sign up: ${errorMessage}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};

export const login = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      const errorMessage = await res.text();
      throw new Error(`Failed to login: ${errorMessage}`);
    }

    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const logout = () => {
  return new Promise<void>((resolve, reject) => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      resolve();
    } catch (error) {
      console.error("Logout error:", error);
      reject(error);
    }
  });
};

export const getUserInfo = async (id: string) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorMessage = await res.text();
      throw new Error(`Failed to fetch user info: ${errorMessage}`);
    }

    const data = await res.json();

    console.log(JSON.stringify(data));
    return data;
  } catch (error) {
    console.error("Get user info error:", error);
    throw error;
  }
};

// Optional: Add updateUser function
export const updateUser = async (
  id: string,
  props: {
    username?: string;
    password?: string;
    location?: { city?: string; state?: string; country?: string };
    contactInfo?: { email?: string; phone?: string };
    miscellaneous?: string;
  }
) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(props),
    });

    if (!res.ok) {
      const errorMessage = await res.text();
      throw new Error(`Failed to update user: ${errorMessage}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Update user error:", error);
    throw error;
  }
};

// Optional: Add deleteUser function
export const deleteUser = async (id: string) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      const errorMessage = await res.text();
      throw new Error(`Failed to delete user: ${errorMessage}`);
    }

    return; // No content to return on successful deletion
  } catch (error) {
    console.error("Delete user error:", error);
    throw error;
  }
};

// Optional: Add getAllUsers function
export const getAllUsers = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorMessage = await res.text();
      throw new Error(`Failed to fetch users: ${errorMessage}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Get all users error:", error);
    throw error;
  }
};
