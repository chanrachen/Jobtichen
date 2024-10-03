import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../api/index.js";
import {
  storeAccessToken,
  getAccessToken,
} from "../../../lib/secureLocalStorage.js";

const initialState = {
  createUser: {},
  otpVerification: {},
  login: {},
  profile: {},
  socialMediaLinks: {},
  status: "idle",
  error: null,
  accessToken: null,
};

// Generic response handler utility
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "An error occurred");
  }
  return await response.json(); // Ensure that this is the correct response type
};

// Thunks
export const fetchCreateUser = createAsyncThunk(
  "user/fetchCreateUser",
  async (userData) => {
    const response = await fetch(`${BASE_URL}register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  }
);

export const fetchOtpVerification = createAsyncThunk(
  "user/fetchOtpVerification",
  async ({ email, otp_code }) => {
    const response = await fetch(`${BASE_URL}verify-otp/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp_code }),
    });
    return handleResponse(response);
  }
);

export const resendOtp = createAsyncThunk("user/resendOtp", async (email) => {
  const response = await fetch(`${BASE_URL}resend-otp/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return handleResponse(response);
});

export const fetchLogin = createAsyncThunk(
  "user/fetchLogin",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      // Handle response
      return await handleResponse(response);
    } catch (error) {
      console.error("Login error:", error); // Log error for debugging
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async () => {
    const token = getAccessToken();
    const response = await fetch(`${BASE_URL}profile/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async (formData, { rejectWithValue }) => {
    const token = getAccessToken();
    try {
      const response = await fetch(`${BASE_URL}profile/`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          // Do NOT set 'Content-Type' for FormData
        },
        body: formData,
      });
      return await handleResponse(response);
    } catch (error) {
      // This passes the error message to be handled later
      return rejectWithValue(error.message);
    }
  }
);

export const uploadAvatar = createAsyncThunk(
  "user/uploadAvatar",
  async (file) => {
    const token = getAccessToken();
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${BASE_URL}upload/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    return handleResponse(response);
  }
);

// export const fetchSocialMediaLinks = createAsyncThunk(
//   "user/fetchSocialMediaLinks",
//   async () => {
//     const token = getAccessToken();
//     const response = await fetch(`${BASE_URL}/social-media/`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return handleResponse(response);
//   }
// );

// export const updateSocialMediaLinks = createAsyncThunk(
//   "user/updateSocialMediaLinks",
//   async (socialMediaData) => {
//     const token = getAccessToken();
//     const response = await fetch(`${BASE_URL}/social-media/`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(socialMediaData),
//     });
//     return handleResponse(response);
//   }
// );

// Slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.accessToken = null;
      state.profile = {};
      state.socialMediaLinks = {};
      localStorage.removeItem("accessToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCreateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCreateUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.createUser = action.payload;
      })
      .addCase(fetchCreateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchOtpVerification.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOtpVerification.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.otpVerification = action.payload;
      })
      .addCase(fetchOtpVerification.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(resendOtp.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resendOtp.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.otpVerification = action.payload;
      })
      .addCase(resendOtp.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        storeAccessToken(action.payload.access);
        state.accessToken = action.payload.access;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile = { ...state.profile, ...action.payload };
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(uploadAvatar.pending, (state) => {
        state.status = "loading";
      })
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile.avatar = action.payload.fileUrl;
      })
      .addCase(uploadAvatar.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Export reducer and actions
export const { logout } = userSlice.actions;
export default userSlice.reducer;

// Selectors
export const selectUser = (state) => state.user.createUser;
export const selectOtpVerification = (state) => state.user.otpVerification;
export const selectLogin = (state) => state.user.login;
export const selectUserProfile = (state) => state.user.profile;
export const selectSocialMediaLinks = (state) => state.user.socialMediaLinks;
export const selectStatus = (state) => state.user.status;
export const selectError = (state) => state.user.error;
export const selectAccessToken = (state) => state.user.accessToken;
export const isAuthenticated = (state) => !!state.user;
