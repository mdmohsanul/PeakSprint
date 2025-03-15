import React, { useState } from "react";
import Add_Task_Form from "./Add_Task_Form";

const Add_Task_Btn = ({ projectId }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <button
        className="text-white  w-full h-10 bg-blue-600 py-2 md:px-4 px-1 rounded-md cursor-pointer text-sm hover:bg-blue-800 transition-colors duration-300"
        onClick={() => setOpenModal(!openModal)}
      >
        + New Task
      </button>
      {/* open form as modal */}
      {openModal && (
        <div className="fixed  inset-0 z-30 flex items-center justify-center backdrop-blur-xs bg-black/50">
          <Add_Task_Form setOpenModal={setOpenModal} projectId={projectId} />
        </div>
      )}
    </>
  );
};

export default Add_Task_Btn;
