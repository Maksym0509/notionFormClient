import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../../services/authService";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isLogoutSuccess: false,
  isError: false,
  message: "",
  user: "",
};

const errorMessageHandler = (error) => {
  const message = error.response.data.error || error.message;
  return message;
};

// Forgot Password
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, thunkAPI) => {
    try {
      return await authService.forgotPassword(email);
    } catch (error) {
      const message = errorMessageHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// authRegister User
export const authLogin = createAsyncThunk(
  "auth/authLogin",
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      const message = errorMessageHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// authRegister User
export const authRegister = createAsyncThunk(
  "auth/authRegister",
  async (userData, thunkAPI) => {
    try {
      return await authService.createAccountGmail(userData);
    } catch (error) {
      const message = errorMessageHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update profile
export const profileUpdate = createAsyncThunk(
  "auth/profileUpdate",
  async (userData, thunkAPI) => {
    try {
      return await authService.updateProfile(userData);
    } catch (error) {
      const message = errorMessageHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Logout User
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (thunkAPI) => {
    try {
      return await authService.logout();
    } catch (error) {
      const message = errorMessageHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authReset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.isLogoutSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authRegister.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(authRegister.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    });

    builder.addCase(authRegister.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(authLogin.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(authLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload.name;
      localStorage.setItem("user", JSON.stringify(action.payload.name));
    });

    builder.addCase(authLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.authToken = null;
      state.user = "";
      localStorage.setItem("user", null);
    });

    builder.addCase(forgotPassword.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload.message;
    });

    builder.addCase(forgotPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    builder.addCase(profileUpdate.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(profileUpdate.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload.name));
    });

    builder.addCase(profileUpdate.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      localStorage.setItem("user", null);
    });
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLogoutSuccess = true;
      state.message = action.payload;
      localStorage.setItem("user", null);
      localStorage.setItem("selectedTable", null);
    });

    builder.addCase(logoutUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isLogoutSuccess = false;
      state.message = action.payload;
    });
  },
});

export const { authReset } = authSlice.actions;
export default authSlice.reducer;
