import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate()
  const [uname, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/signup", {
        username:uname,
        userEmail: email,
        userPassword: password,
      }).then((data)=>{
        if(data.data.message.isuserin){
            alert(data.data.message.msg)
            navigate("/login")
        }
      })
      setMessage(res.data.message.msg);
      
    } catch (err) {
      setMessage(err.response?.data?.message || "Error signing up");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSignup}
        className="bg-white p-8 shadow-lg rounded-xl w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 mb-3 border rounded"
          value={uname}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-3 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Sign Up
        </button>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <a href="/" className="text-blue-600">
            Login
          </a>
        </p>

        <p className="text-center mt-2 text-green-600">{message}</p>
      </form>
    </div>
  );
};

export default Signup;
