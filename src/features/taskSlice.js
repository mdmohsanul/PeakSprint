import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../utils/Constants";

export const fetchTask = createAsyncThunk(
  "task/fetchTask",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/task`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const fetchTaskByProject = createAsyncThunk(
  "task/fetchTaskByProject",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/task/${id}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const addTask = createAsyncThunk(
  "task/addTask",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/task/`, data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: [],
    projectTask: [],
    status: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builders) => {
    builders
      .addCase(fetchTask.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTask.fulfilled, (state, action) => {
        state.status = "success";
        state.tasks = action.payload;
      })
      .addCase(fetchTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      }),
      builders
        .addCase(fetchTaskByProject.pending, (state, action) => {
          state.status = "loading";
        })
        .addCase(fetchTaskByProject.fulfilled, (state, action) => {
          state.status = "success";
          state.projectTask = action.payload;
        })
        .addCase(fetchTaskByProject.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }),
      builders
        .addCase(addTask.fulfilled, (state, action) => {
          state.status = "success";
          state.tasks.push(action.payload);
        })
        .addCase(addTask.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        });
  },
});

export default taskSlice.reducer;
