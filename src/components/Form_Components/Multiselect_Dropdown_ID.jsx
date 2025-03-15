import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { FaChevronDown } from "react-icons/fa6";

const Multiselect_Dropdown_ID = ({
  options,
  label,
  name,
  placeholder,
  value,
  setValue,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showName, setShowName] = useState([]);
  const toggleSelection = (option) => {
    setShowName((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };
  const toggleSelectionId = (id) => {
    setValue((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <>
      <div className="relative mb-2">
        <label htmlFor={name} className="pb-2 inline-block">
          {label}:
        </label>
        <div
          className="min-h-12 w-full rounded-md border border-gray-300 cursor-pointer flex justify-between items-center px-4"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          {showName.length === 0 ? (
            <p className="text-gray-500">{placeholder}</p>
          ) : (
            <p className="px-2">
              {showName?.map((item, i) => (
                <span
                  key={i}
                  className="bg-blue-600 text-white mr-3 py-0.5 px-2 m-2 inline-block"
                >
                  <span className="flex items-center grid-cols-2 gap-4 cursor-pointer">
                    {item}
                    <RxCross2
                      size={20}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSelection(item);
                      }}
                    />
                  </span>
                </span>
              ))}
            </p>
          )}
          <FaChevronDown size={12} className="text-gray-500" />
        </div>
        {showDropdown && (
          <div className="w-5/6 absolute left-0 -top-[170px]  bg-white h-48 cursor-pointer border border-gray-400 overflow-y-scroll">
            {options?.map((item) => (
              <div
                id={name}
                key={item._id}
                className={`px-5 py-2 mb-1  flex items-center justify-between hover:bg-blue-600 hover:text-white ${
                  showName.includes(item.name) ? "bg-blue-600 text-white" : ""
                }`}
                onClick={(e) => {
                  toggleSelection(item.name);
                  toggleSelectionId(item._id);
                }}
              >
                {item.name}
                {showName.includes(item.name) && <RxCross2 size={20} />}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Multiselect_Dropdown_ID;
