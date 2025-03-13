import React from "react";

const Dropdown = ({ options, label, value, setValue, placeholder, name }) => {
  return (
    <>
      <div className="pb-4">
        <label htmlFor={name} className="block pb-2">
          {label}:
        </label>
        <select
          name={name}
          id={name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="w-full border border-gray-300 focus:outline-gray-300 rounded-md py-2.5 px-2 placeholder:text-sm text-gray-500"
        >
          <option value=""> {label}</option>
          {options?.map((item) => (
            <option
              key={item._id || item.id}
              value={item._id}
              className="text-gray-800"
            >
              {item.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Dropdown;
