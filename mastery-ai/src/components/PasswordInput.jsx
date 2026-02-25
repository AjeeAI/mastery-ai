import React, { useState } from "react";
// import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

export default function PasswordInput({ label, name, value, onChange }) {
  const [show, setShow] = useState(false);

  return (
    <div className="mb-4 relative">
      <label className="block mb-1 font-semibold">{label}</label>
      <input
        type={show ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <div
        className="absolute top-8 right-3 cursor-pointer"
        onClick={() => setShow(!show)}
      >
        {/* {show ? <EyeSlashIcon className="h-5 w-5 text-gray-600" /> : <EyeIcon className="h-5 w-5 text-gray-600" />} */}
      </div>
    </div>
  );
}