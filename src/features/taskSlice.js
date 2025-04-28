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
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const fetchTaskByTaskID = createAsyncThunk(
  "task/fetchTaskByTaskID",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/task/task/${id}`);

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
    task: {},
    status: "",
    error: null,
    addTaskErr: null,
    priorityFilter: "",
    dateFilter: "",
    ownerName: "",
    projectFilter: "",
    teamFilter: "",
  },
  reducers: {
    clearError: (state, action) => {
      state.error = null;
    },
    setPriorityFilter: (state, action) => {
      state.priorityFilter = action.payload;
    },
    setDateFilter: (state, action) => {
      state.dateFilter = action.payload;
    },
    setOwnerName: (state, action) => {
      state.ownerName = action.payload;
    },
    setProjectFilter: (state, action) => {
      state.projectFilter = action.payload;
    },
    setTeamFilter: (state, action) => {
      state.teamFilter = action.payload;
    },
  },
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
        .addCase(fetchTaskByTaskID.pending, (state, action) => {
          state.status = "loading";
        })
        .addCase(fetchTaskByTaskID.fulfilled, (state, action) => {
          state.status = "success";
          state.task = action.payload;
        })
        .addCase(fetchTaskByTaskID.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }),
      builders
        .addCase(addTask.fulfilled, (state, action) => {
          state.status = "success";
          state.tasks.push(action.payload);
          state.projectTask.push(action.payload);
        })
        .addCase(addTask.rejected, (state, action) => {
          state.addTaskErr = "failed";
        });
  },
});
export const {
  clearError,
  setDateFilter,
  setPriorityFilter,
  setOwnerName,
  setProjectFilter,
  setTeamFilter,
} = taskSlice.actions;
export default taskSlice.reducer;
