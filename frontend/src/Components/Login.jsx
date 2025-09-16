import React, { useState } from "react";
import  { Link }  from "react-router-dom"
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/login", {
        userEmail: email,
        userPassword: password,
      });
      if(res.data.isuserin){
        navigate("/dashboard")
      }
      setMessage(res.data.message);
      localStorage.setItem("token", res.data.token);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error logging in");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 shadow-lg rounded-xl w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
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
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
        <p className="text-center mt-4">Don't Have an account? <Link to={"/signup"} className="text-blue-600">Signup</Link></p>
        <p className="text-center mt-4">
          
          <a href="/forgot-password" className="text-blue-600">
            Forgot Password?
          </a>
        </p>
        
        <p className="text-center mt-2 text-red-500">{message}</p>
      </form>
    </div>
  );
};

export default Login;
