import React from "react";

const Dashboard_Card = ({ data }) => {
  return (
    <>
      <div
        key={data._id}
        className="w-72 rounded-lg bg-gray-100 h-54  pt-8 px-6 "
      >
        <div className="flex flex-col  h-full gap-3">
          <p>{projectStatus(data.status)}</p>
          <h1 className="text-xl font-medium truncate">{data.name}</h1>
          <p className="text-gray-500 h-20">{data.description}.</p>
        </div>
      </div>
    </>
  );
};

export default Dashboard_Card;
