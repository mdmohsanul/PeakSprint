import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../utils/Constants";
import axios from "axios";

export const fetchTeams = createAsyncThunk(
  "team/fetchTeams",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/team`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const addTeamMember = createAsyncThunk(
  "team/addTeamMember",
  async (data, { rejectWithValue }) => {
    try {
      const { id, ...rest } = data;
      console.log(rest);
      const response = await axios.post(`${API_BASE_URL}/team/${id}`, rest);
      if (response.status !== 200) throw new Error("Failed to add member");
      console.log(response.data);
      return { data: response.data, id };
    } catch (error) {
      return rejectWithValue(
        error.response?.data.message || "Something went wrong"
      );
    }
  }
);
export const addTeam = createAsyncThunk(
  "team/addTeam",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/team`, data);
      if (response.status !== 200) throw new Error("Failed to add member");
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data.message || "Something went wrong"
      );
    }
  }
);

const teamSlice = createSlice({
  name: "team",
  initialState: {
    teams: [],
    status: "",
    error: null,
    addTeamErr: null,
  },
  reducers: {},
  extraReducers: (builders) => {
    builders
      .addCase(fetchTeams.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTeams.fulfilled, (state, action) => {
        state.status = "success";
        state.teams = action.payload;
      })
      .addCase(fetchTeams.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      }),
      builders
        .addCase(addTeamMember.fulfilled, (state, action) => {
          console.log(action.payload);
          const findTeam = state.teams.findIndex(
            (team) => team._id === action.payload.id
          );
          console.log(findTeam);
          if (findTeam !== -1) {
            state.teams[findTeam].members.push(action.payload.data);
          }
        })
        .addCase(addTeamMember.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }),
      builders
        .addCase(addTeam.fulfilled, (state, action) => {
          console.log(action.payload);
          state.teams.push(action.payload);
        })
        .addCase(addTeam.rejected, (state, action) => {
          state.addTeamErr = "failed";
        });
  },
});

export default teamSlice.reducer;
