import {  useState } from "react";

import { useNavigate } from "react-router-dom";

import api from "../api/axios";

import { useAuth } from "../context/AuthContext";

export default function Login() {

  const [email, setEmail] = useState("");
    
  const [password, setPassword] = useState("");
    
  const navigate = useNavigate();
    
  const { login, setUser } = useAuth();
    

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const response =
          await api.post(
            "/auth/login",
            {
              email,
              password
            }
          );
        
        console.log(response.data);
        
        

        login(
          response.data.data.accessToken,
          response.data.data.user
        );
        
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <div>
      <form
        onSubmit={
          handleSubmit
        }
      >
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <button type="submit">
          Login
        </button>
      </form>

      <p>
        Don't have an account?
        <Link to="/register">
          Register
        </Link>
      </p>
    </div>
  );
}