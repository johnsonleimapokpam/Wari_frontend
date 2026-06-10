import { useState } from "react";

import api from "../api/axios";

import { useNavigate } from "react-router-dom";

export default function Register() {

  const [firstName, setFirstName] = useState("");

  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      await api.post(
        "/auth/register",
        {
          email,
          password,
          firstName,
          lastName
        }
      );

      navigate("/");
    };

  return (
    <form
      onSubmit={
        handleSubmit
      }
    >
      <h2>
        Register
      </h2>

      <input
        placeholder="First Name"
        required
        value={firstName}
        onChange={(e) =>
          setFirstName(
            e.target.value
          )
        }
      />

      <input
        placeholder="Last Name"
        required
        value={lastName}
        onChange={(e) =>
          setLastName(
            e.target.value
          )
        }
      />

      <input
        placeholder="Email"
        required
        value={email}
        onChange={(e) =>
          setEmail(
            e.target.value
          )
        }
      />

      <input
        required
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(
            e.target.value
          )
        }
      />

      <button
        type="submit"
      >
        Register
      </button>
    </form>
  );
}