export const signup = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
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
    return await data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const logout = () => {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  } catch (error) {
    console.error("Logout error:", error);
  }
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

    return await res.json();
  } catch (error) {
    console.error("Get user info error:", error);
    throw error;
  }
};
