import React from "react";

const Input_Box = ({ label, value, setValue, name, type, placeholder }) => {
  return (
    <>
      <div className="pb-4">
        <label htmlFor={name} className="block pb-2">
          {label}:
        </label>
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="w-full border border-gray-300 focus:outline-gray-300 rounded-md py-2.5 px-2 placeholder:text-sm"
        />
      </div>
    </>
  );
};

export default Input_Box;
