import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../components/PasswordInput";
import InputField from "../components/InputField";

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("student");
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    navigate("/success", { state: { name: "User", role } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 to-purple-300 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login  MasteryAI</h1>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Select Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <InputField label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
        <PasswordInput label="Password" name="password" value={form.password} onChange={handleChange} />

        <button className="w-full bg-purple-600 text-white p-2 rounded mt-4 hover:bg-purple-700 transition">Login</button>
      </form>
    </div>
  );
}