import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:5000/reset-password/${token}`,
        { newPassword: password }
      );
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error resetting password");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleResetPassword}
        className="bg-white p-8 shadow-lg rounded-xl w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
        <input
          type="password"
          placeholder="Enter new password"
          className="w-full p-2 mb-3 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Reset Password
        </button>
        <p className="text-center mt-2 text-blue-600">{message}</p>
      </form>
    </div>
  );
};

export default ResetPassword;
