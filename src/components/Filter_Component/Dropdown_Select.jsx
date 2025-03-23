import React from "react";

const Dropdown_Select = ({
  options,
  name,
  value,
  setValue,
  placeholder = "Filter",
}) => {
  return (
    <>
      <label htmlFor={name} className="">
        <select
          name={name}
          id={name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="border-gray-300 border rounded-md text-gray-600 text-sm px-3 py-1 w-32 focus:outline-blue-300"
        >
          <option value="" className="text-sm text-gray-600 ">
            {placeholder}
          </option>
          {options.map(({ id, name }) => (
            <option key={id} value={name}>
              {name}
            </option>
          ))}
        </select>
      </label>
    </>
  );
};

export default Dropdown_Select;
