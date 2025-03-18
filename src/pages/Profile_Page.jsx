import React from "react";
import { useSelector } from "react-redux";

const Profile_Page = () => {
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  return (
    <>
      <div className="page-container">
        <h1 className="text-2xl font-semibold text-gray-800">User Details</h1>

        <p>{user.name}</p>
      </div>
    </>
  );
};

export default Profile_Page;
