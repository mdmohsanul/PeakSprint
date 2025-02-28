import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";
import projectSlice from "../features/projectSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    projects: projectSlice,
  },
});

export default store;
