import React from "react";

const Textarea = ({ label, name, value, setValue, placeholder }) => {
  return (
    <>
      <div className="pb-4">
        <label htmlFor={name} className="block pb-2">
          {label}
        </label>
        <textarea
          name={name}
          id={name}
          cols="30"
          rows="2"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="w-full border border-gray-300 focus:outline-gray-300 rounded-md py-1.5 px-2 placeholder:text-sm"
        ></textarea>
      </div>
    </>
  );
};

export default Textarea;
