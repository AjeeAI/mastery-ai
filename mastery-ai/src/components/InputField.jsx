import React from 'react';

 function InputField({ label, name, type = "text", value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block mb-1 font-semibold">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>
  );
}

export default InputField;