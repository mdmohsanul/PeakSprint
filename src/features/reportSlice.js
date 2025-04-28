import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../utils/Constants";

export const fetchLastWeekReport = createAsyncThunk(
  "report/lastWeekReport",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/report/last-week`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);
export const fetchClosedTasks = createAsyncThunk(
  "report/closedTasks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/report/closed-tasks`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);
export const fetchPendingTasks = createAsyncThunk(
  "report/pending",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/report/pending`);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);
const reportSlice = createSlice({
  name: "report",
  initialState: {
    reportLastWeek: [],
    closedTasks: [],
    pendingTasks: [],
    error: null,
    status: "idle",
  },
  reducers: {},
  extraReducers: (builders) => {
    builders
      .addCase(fetchLastWeekReport.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchLastWeekReport.fulfilled, (state, action) => {
        state.status = "success";
        state.reportLastWeek = action.payload;
      })
      .addCase(fetchLastWeekReport.rejected, (state, action) => {
        state.error = action.error.message;
      }),
      builders
        .addCase(fetchClosedTasks.pending, (state, action) => {
          state.status = "loading";
        })
        .addCase(fetchClosedTasks.fulfilled, (state, action) => {
          state.status = "success";
          state.closedTasks = action.payload;
        })
        .addCase(fetchClosedTasks.rejected, (state, action) => {
          state.error = action.error.message;
        }),
      builders
        .addCase(fetchPendingTasks.pending, (state, action) => {
          state.status = "loading";
        })
        .addCase(fetchPendingTasks.fulfilled, (state, action) => {
          state.status = "success";
          state.pendingTasks = action.payload;
        })
        .addCase(fetchPendingTasks.rejected, (state, action) => {
          state.error = action.error.message;
        });
  },
});

export default reportSlice.reducer;
