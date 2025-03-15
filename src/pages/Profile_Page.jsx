import React from "react";
import { useSelector } from "react-redux";

const Profile_Page = () => {
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  return (
    <>
      <div className="md:ml-64 max-w-5xl mx-auto md:p-8 p-4 md:mt-16 mt-28 bg-white">
        <h1 className="text-2xl font-semibold text-gray-800">User Details</h1>

        <p>{user.name}</p>
      </div>
    </>
  );
};

export default Profile_Page;
