import { Link } from "react-router-dom";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useAuth } from "../contexts/AuthContext.jsx";
import User from "./User.tsx";

interface CustomJwtPayload extends JwtPayload {
  sub: string;
}

export function Header() {
  const [token, setToken] = useAuth();

  if (token) {
    const { sub } = jwtDecode<CustomJwtPayload>(token);
    return (
      <div>
        Logged in as <User id={sub} />
        <br />
        <button onClick={() => setToken(null)}>Logout</button>
      </div>
    );
  }

  return (
    <div>
      <Link to="/login">Log In</Link> | <Link to="/signup">Sign Up</Link>
    </div>
  );
}
