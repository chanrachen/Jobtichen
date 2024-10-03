import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAccessToken } from "../../../../src/lib/secureLocalStorage";
import { BASE_URL } from "../../../../src/redux/api/index";

const initialState = {
  applyJob: {},
  listApplyJob: [],
  status: "idle",
  error: null,
};

// Fetch applied jobs
export const fetchListApplied = createAsyncThunk(
  "ApplyJob/fetchListApplied",
  async () => {
    const token = getAccessToken();
    const response = await fetch(`${BASE_URL}applied_jobs/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch applied jobs");
    }
    const data = await response.json();
    return data.results; // Ensure this returns the correct data structure
  }
);

// Apply for a job
export const applyForJob = createAsyncThunk(
  "ApplyJob/applyForJob",
  async (formData) => {
    const token = getAccessToken();
    const response = await fetch(`${BASE_URL}applied_jobs/`, {
      method: "POST", // Use POST to apply for a job
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      body: formData, // Include the FormData for the CV and job ID
    });
    if (!response.ok) {
      throw new Error("Failed to apply for the job");
    }
    return await response.json(); // Return the response data
  }
);

// Delete applied job
export const fetchDeleteApplied = createAsyncThunk(
  "ApplyJob/fetchDeleteApplied",
  async (id) => {
    const token = getAccessToken();
    const response = await fetch(`${BASE_URL}applied_jobs/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to delete the applied job");
    }
    return id; // Return the id of the deleted job
  }
);

const applyJobSlice = createSlice({
  name: "ApplyJob",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle list applied jobs
    builder
      .addCase(fetchListApplied.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchListApplied.fulfilled, (state, action) => {
        state.status = "success";
        state.listApplyJob = action.payload;
      })
      .addCase(fetchListApplied.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Handle apply for job
      .addCase(applyForJob.pending, (state) => {
        state.status = "loading";
      })
      .addCase(applyForJob.fulfilled, (state, action) => {
        state.status = "success";
        // Optionally, you might want to update the list or state with the new job
        // state.listApplyJob.push(action.payload); // If needed
      })
      .addCase(applyForJob.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message; // Capture error message
      })
      // Handle delete applied job
      .addCase(fetchDeleteApplied.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDeleteApplied.fulfilled, (state, action) => {
        state.status = "success";
        // Remove deleted job from the list
        state.listApplyJob = state.listApplyJob.filter(
          (job) => job.id !== action.payload
        );
      })
      .addCase(fetchDeleteApplied.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Selectors
export const selectApplyJob = (state) => state.applyJob.applyJob;
export const selectListApplied = (state) => state.applyJob.listApplyJob;
export const selectError = (state) => state.applyJob.error; // Ensure this selector is defined
export const selectApplyStatus = (state) => state.applyJob.status; // New selector for apply status

// Export reducer
export default applyJobSlice.reducer;