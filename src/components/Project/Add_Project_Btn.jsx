import React, { useState } from "react";
import Add_Project_Form from "./Add_Project_Form";

const Add_Project_Btn = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <button
        className="text-white  h-10 bg-blue-600 py-2 md:px-4 px-1 rounded-md cursor-pointer text-sm hover:bg-blue-800 transition-colors duration-300"
        onClick={() => setOpenModal(!openModal)}
      >
        + Add Project
      </button>
      {/* open form as modal */}
      {openModal && (
        <div className="fixed inset-0 z-30 flex items-center justify-center backdrop-blur-xs bg-black/50">
          <Add_Project_Form setOpenModal={setOpenModal} />
        </div>
      )}
    </>
  );
};

export default Add_Project_Btn;
