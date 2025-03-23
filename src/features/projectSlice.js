import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../utils/Constants";

export const fetchProjects = createAsyncThunk(
  "project/fetchProject",
  async () => {
    const response = await axios.get(
      "https://peak-sprint-backend.vercel.app/project"
    );

    return response.data;
  }
);

export const addProject = createAsyncThunk(
  "project/addProject",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/project`, data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

const projectSlice = createSlice({
  name: "project",
  initialState: {
    projects: [],
    status: "",
    submitStatus: null,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null; // Action to clear error messages
    },
  },
  extraReducers: (builders) => {
    builders
      .addCase(fetchProjects.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        (state.status = "success"), (state.projects = action.payload);
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      }),
      builders
        .addCase(addProject.fulfilled, (state, action) => {
          state.projects.push(action.payload);
        })
        .addCase(addProject.rejected, (state, action) => {
          state.submitStatus = "failed";
          // state.error = action.error.message;
        });
  },
});

export const { clearError } = projectSlice.actions;

export default projectSlice.reducer;
