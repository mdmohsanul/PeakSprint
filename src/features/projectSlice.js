import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProjects = createAsyncThunk(
  "project/fetchProject",
  async () => {
    const response = await axios.get(
      "https://peak-sprint-backend.vercel.app/project"
    );
    console.log(response.data);
    return response.data;
  }
);

const projectSlice = createSlice({
  name: "project",
  initialState: {
    projects: [],
    status: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builders) => {
    builders
      .addCase(fetchProjects.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        (state.status = "success"), (state.projects = action.payload);
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default projectSlice.reducer;
