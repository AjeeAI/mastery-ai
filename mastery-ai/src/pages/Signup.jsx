import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import PasswordInput from "../components/PasswordInput";

export default function Signup() {
  const navigate = useNavigate();
  const [role, setRole] = useState("student");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    yearsExperience: "",
    subject: "",
    adminId: "",
    adminCode: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
 
    navigate("/success", { state: { name: form.name, role } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-300 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up MasteryAI</h1>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Select Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <InputField label="Full Name" name="name" value={form.name} onChange={handleChange} />
        <InputField label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
        <PasswordInput label="Password" name="password" value={form.password} onChange={handleChange} />

        {role === "teacher" && (
          <>
            <InputField label="Years of Experience" name="yearsExperience" type="number" value={form.yearsExperience} onChange={handleChange} />
            <InputField label="Subject Specialization" name="subject" value={form.subject} onChange={handleChange} />
          </>
        )}

        {role === "admin" && (
          <>
            <InputField label="Admin ID" name="adminId" value={form.adminId} onChange={handleChange} />
            <InputField label="Admin Code" name="adminCode" value={form.adminCode} onChange={handleChange} />
          </>
        )}

        <button className="w-full bg-blue-600 text-white p-2 rounded mt-4 hover:bg-blue-700 transition">Sign Up</button>
      </form>
    </div>
  );
}