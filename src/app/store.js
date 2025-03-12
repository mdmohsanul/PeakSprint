import { configureStore } from "@reduxjs/toolkit";
import authSignUpSlice from "../features/authSignUpSlice";
import authSlice from "../features/authSlice";
import projectSlice from "../features/projectSlice";
import taskSlice from "../features/taskSlice";
import teamSlice from "../features/teamSlice";
import userSlice from "../features/userSlice";

const store = configureStore({
  reducer: {
    signup: authSignUpSlice,
    auth: authSlice,
    projects: projectSlice,
    teams: teamSlice,
    users: userSlice,
    tasks: taskSlice,
  },
});

export default store;
