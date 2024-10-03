// src/redux/features/Cards/CardSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../../../src/redux/api/index.js";

// Define an initial state for the card
const initialState = {
  jobs: [],
  loading: false,
  error: null,
  favorites: JSON.parse(localStorage.getItem("favorites")) || [], // Load favorites from local storage
  selectedJob: null,
};

// Async thunk for fetching jobs from your API
export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async () => {
  const response = await fetch(`${BASE_URL}jobs/`);
 // console.log("Response Status:", response.status); // Log status
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage || "Failed to fetch jobs");
  }
  const data = await response.json();
  //console.log("Fetched Data:", data); // Log fetched data
  const jobsWithNumericIdsAndSalary = data.results.map((job) => ({
    ...job,
    skills: job.skills.map((skill) => ({
      ...skill,
      id: Number(skill.id),
    })),
    salary: Number(job.salary),
  }));
  //console.log("Jobs with Numeric IDs and Salary:", jobsWithNumericIdsAndSalary); // Log transformed data
  return jobsWithNumericIdsAndSalary;
});

// Create a slice of the store
const CardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    clearJobs(state) {
      state.jobs = [];
    },
    addToFavorites(state, action) {
      const job = action.payload;
      // Avoid adding duplicate favorites
      if (!state.favorites.find((fav) => fav.id === job.id)) {
        state.favorites.push(job);
        localStorage.setItem("favorites", JSON.stringify(state.favorites)); // Save to local storage
      }
    },
    removeFromFavorites(state, action) {
      const jobId = action.payload;
      // Filter out the job to be removed
      state.favorites = state.favorites.filter((fav) => fav.id !== jobId);
      localStorage.setItem("favorites", JSON.stringify(state.favorites)); // Update local storage
    },
    applyForJob(state, action) {
      const jobId = action.payload;
      console.log(`Applying for job with ID: ${jobId}`);
    },
    clearSelectedJob(state) {
      state.selectedJob = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export actions
export const {
  clearJobs,
  addToFavorites,
  removeFromFavorites,
  applyForJob,
  clearSelectedJob,
} = CardSlice.actions;

// Export the card reducer
export default CardSlice.reducer;

// Selectors
export const selectJobs = (state) => state.card.jobs; // Select all jobs
export const selectLoading = (state) => state.card.loading; // Select loading state
export const selectError = (state) => state.card.error; // Select error state
export const selectFavorites = (state) => state.card.favorites; // Select favorite jobs
export const selectSelectedJob = (state) => state.card.selectedJob; // Select currently selected job
