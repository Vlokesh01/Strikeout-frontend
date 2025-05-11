import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
// make sure this path is correct
import doddleTop from "../assets/TopPic-removebg-preview.png";
import doddleBottom from "../assets/Bottompic-removebg-preview.png";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    else if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/register", {
        username,
        email,
        password,
      });
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#3f434f] font-delius">
      <img src={doddleTop} alt="doddlepic" className="h-[19vh] mb-[-20px]" />

      <h1 className="text-3xl font-bold mb-6 text-[#cedff9] font-SourGummy text-center">
        SIGN UP
      </h1>

      <img src={doddleBottom} alt="doddlepic" className="h-[9vh] mt-[-40px]" />

      <motion.div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center space-y-6 w-full max-w-sm"
        >
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
            required
            placeholder="enter username"
            className="border bg-[#d3e0fb] rounded-full p-2 w-full focus:outline-none focus:ring text-center placeholder:text-slate-900 font-SourGummy"
          />

          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
            placeholder="enter email"
            className="border bg-[#d3e0fb] rounded-full p-2 w-full focus:outline-none focus:ring text-center placeholder:text-slate-900 font-SourGummy"
          />

          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
            placeholder="enter password"
            className="border bg-[#d3e0fb] rounded-full p-2 w-full focus:outline-none focus:ring text-center placeholder:text-slate-900 font-SourGummy"
          />

          <button
            type="submit"
            className="bg-[#d2dffb] rounded-full p-2 w-32 hover:bg-opacity-80 font-SourGummy"
          >
            sign up
          </button>

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          <p className="text-[#d2dffb] text-center">
            Already a user?{" "}
            <a href="/login" className="underline">
              login here
            </a>
          </p>
        </form>
      </motion.div>
    </div>
  );
}

export default Register;
