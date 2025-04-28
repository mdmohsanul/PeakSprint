import PropTypes from "prop-types";

import { Link } from "react-router";

/* This component takes list of project and display all the project as a Card */

const Project_List = ({ projectList }) => {
  const classes = {
    "Not Started": "bg-red-200 text-red-800",
    "In Progress": "bg-yellow-200 text-yellow-800",
    Completed: "bg-green-100 text-green-700",
    "On Hold": "bg-blue-100 text-blue-700",
  };
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 my-5  place-self-center">
        {/* Project Card */}
        {projectList?.map((item) => (
          <Link to={`/dashboard/projects/details/${item._id}`} key={item._id}>
            {" "}
            <div className="w-72 rounded-lg bg-gray-100 h-48  pt-8 px-6 cursor-pointer">
              <div className="flex flex-col  h-full gap-3">
                <p>
                  <span
                    className={`text-xs ${
                      classes[item.status]
                    } p-1 rounded-md font-medium`}
                  >
                    {item.status}
                  </span>
                </p>
                <h1 className="text-xl font-semibold truncate text-gray-800 ">
                  {item.name}
                </h1>
                <p className="text-gray-500 h-20">{item.description}.</p>
              </div>
            </div>
          </Link>
        ))}{" "}
      </div>
    </>
  );
};
Project_List.propTypes = {
  projectList: PropTypes.array.isRequired,
};
export default Project_List;
