import React from "react";
import { useLocation, useNavigate } from "react-router-dom";


export default function Success() {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, role } = location.state || { name: "User", role: "student" };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-100 p-4">
      {/* <CheckCircleIcon className="h-24 w-24 text-green-600 mb-6" /> */}
      <h1 className="text-3xl font-bold mb-2">Welcome, {name}!</h1>
      <p className="text-lg mb-6">You have successfully logged in as {role}.</p>
      <button
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
        onClick={() => navigate("/login")}
      >
        Go to Dashboard
      </button>
    </div>
  );
}