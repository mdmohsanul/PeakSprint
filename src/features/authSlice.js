import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../utils/Constants";

// Fetch user details with token
export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await axios.get(`${API_BASE_URL}/auth/admin/data`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 200) throw new Error("Failed to fetch user data");

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const loggedInUser = createAsyncThunk(
  "user/loggedInUser",
  async (data, { rejectWithValue }) => {
    try {
      const { email, password } = data;
      const response = await axios.post(
        `https://peak-sprint-backend.vercel.app/auth/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("user", JSON.stringify(response.data.loginUser));
      localStorage.setItem("token", response.data.token);

      return response.data;
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null,
    status: "",
    error: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.loginUser; // Save user details
      state.token = action.payload.token; // Save token
      localStorage.setItem("user", JSON.stringify(action.payload.loginUser));
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "Success";
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "failed";
      }),
      builder
        .addCase(loggedInUser.pending, (state) => {
          state.status = "loading";
        })
        .addCase(loggedInUser.fulfilled, (state, action) => {
          state.user = action.payload.loginUser; // Save user details
          state.token = action.payload.token; // Save token
          state.status = "Success";
        })
        .addCase(loggedInUser.rejected, (state, action) => {
          state.error = action.error.message;
          state.status = "failed";
        });
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;
