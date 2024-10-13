const getAuthHeaders = () => {
  const token = localStorage.getItem("jwt");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const signup = async ({
  username,
  password,
  location,
  contactInfo,
  miscellaneous,
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
      console.error(`Signup failed with status ${res.status}: ${errorMessage}`);
      throw {
        status: res.status,
        message: errorMessage,
      };
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
      headers: getAuthHeaders(),
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      const errorMessage = await res.text();
      throw new Error(`Failed to login: ${errorMessage}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const logout = () => {
  return new Promise<void>((resolve, reject) => {
    try {
      localStorage.removeItem("jwt");
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
      headers: getAuthHeaders(),
    });

    const data = await res.json();

    console.log(JSON.stringify(data));

    if (!res.ok) {
      const errorMessage = await res.text();
      throw new Error(`Failed to fetch user info: ${errorMessage}`);
    }

    return data;
  } catch (error) {
    console.error("Get user info error:", error);
    throw error;
  }
};

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
      headers: getAuthHeaders(),
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

export const deleteUser = async (id: string) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    if (!res.ok) {
      const errorMessage = await res.text();
      throw new Error(`Failed to delete user: ${errorMessage}`);
    }

    return;
  } catch (error) {
    console.error("Delete user error:", error);
    throw error;
  }
};

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

export const searchUsersByUsername = async (username: string) => {
  try {
    const URL = `${
      import.meta.env.VITE_BACKEND_URL
    }/user/search?username=${encodeURIComponent(username)}`;
    console.log(URL);
    const res = await fetch(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/user/search?username=${encodeURIComponent(username)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      const errorMessage = await res.text();
      throw new Error(`Failed to search users: ${errorMessage}`);
    }
    const data = await res.json();
    console.log(data);

    return data;
  } catch (error) {
    console.error("Search users error:", error);
    throw error;
  }
};
