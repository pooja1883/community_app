import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* ================= API INSTANCE ================= */
const API = axios.create({
  baseURL: "http://192.168.29.86:5001/api/auth",
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

/* ================= USER NORMALIZER ================= */
const normalizeUser = (user) => {
  if (!user) return null;

  return {
    ...user,
    name:
      user.name ||
      user.username ||
      user.email?.split("@")[0] ||
      "User",
  };
};

/* ================= SAFE LOCALSTORAGE PARSE ================= */
const getUserFromLocalStorage = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? normalizeUser(JSON.parse(user)) : null;
  } catch (e) {
    console.warn("Failed to parse user from localStorage:", e);
    return null;
  }
};

/* ================= SIGNUP ================= */
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await API.post("/unified-signup", payload);
      const data = response.data?.data || response.data;

      if (!data?.token) {
        return rejectWithValue("Invalid signup response from server");
      }

      return {
        token: data.token,
        user: normalizeUser(data.user),
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Signup failed"
      );
    }
  }
);

/* ================= LOGIN ================= */
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await API.post("/unified-login", payload);
      const data = response.data?.data || response.data;

      if (!data?.token) {
        return rejectWithValue("Invalid login response from server");
      }

      return {
        token: data.token,
        user: normalizeUser(data.user),
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

/* ================= SLICE ================= */
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: getUserFromLocalStorage(),
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      /* ---------- SIGNUP ---------- */
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem(
          "user",
          JSON.stringify(action.payload.user)
        );
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Signup failed";
      })

      /* ---------- LOGIN ---------- */
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        localStorage.setItem("token", action.payload.token); 
        localStorage.setItem(
          "user",
          JSON.stringify(action.payload.user)
        );
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      });
  },
});

export const { clearError, logout } = authSlice.actions;
export default authSlice.reducer;
