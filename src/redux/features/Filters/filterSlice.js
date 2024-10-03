// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { BASE_URL } from "../../api/index"; // Ensure this is the correct path to your API base URL

// // Filter jobs by category
// export const filterJobsByCategory = createAsyncThunk(
//   "jobs/filterByCategory",
//   async (category, { rejectWithValue }) => {
//     try {
//       const response = await fetch(
//         `${BASE_URL}/jobs/?category=${encodeURIComponent(category)}`
//       );
//       if (!response.ok) {
//         const errorMessage = await response.text();
//         throw new Error(`Failed to fetch jobs by category: ${errorMessage}`);
//       }
//       return await response.json();
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // Filter jobs by skill
// export const filterJobsBySkill = createAsyncThunk(
//   "jobs/filterBySkill",
//   async (skill, { rejectWithValue }) => {
//     try {
//       const response = await fetch(
//         `${BASE_URL}/jobs/?skill=${encodeURIComponent(skill)}`
//       );
//       if (!response.ok) {
//         const errorMessage = await response.text();
//         throw new Error(`Failed to fetch jobs by skill: ${errorMessage}`);
//       }
//       return await response.json();
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // Global search for jobs
// export const globalJobSearch = createAsyncThunk(
//   "jobs/globalSearch",
//   async (query, { rejectWithValue }) => {
//     console.log("Searching for jobs with query:", query);
//     if (!query) {
//       return []; // Return an empty array for empty queries
//     }

//     try {
//       const response = await fetch(
//         `${BASE_URL}/global_search/?q=${encodeURIComponent(query)}`
//       );
//       if (!response.ok) {
//         const errorMessage = await response.text();
//         throw new Error(
//           `Failed to fetch jobs for global search: ${errorMessage}`
//         );
//       }
//       const data = await response.json();

//       if (!data || !data.length) {
//         throw new Error("No results found for the given query.");
//       }
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // Slice for managing job filters
// const filterSlice = createSlice({
//   name: "jobs",
//   initialState: {
//     jobs: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     resetJobs: (state) => {
//       state.jobs = []; // Reset jobs to an empty array
//       state.error = null; // Clear any previous errors
//     },
//   },
//   extraReducers: (builder) => {
//     // Filter by category
//     builder
//       .addCase(filterJobsByCategory.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(filterJobsByCategory.fulfilled, (state, action) => {
//         state.loading = false;
//         state.jobs = action.payload; // Set jobs to the fetched data
//       })
//       .addCase(filterJobsByCategory.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload; // Use the error message from rejectWithValue
//         console.error("Error fetching jobs by category:", action.payload);
//       })

//       // Filter by skill
//       .addCase(filterJobsBySkill.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(filterJobsBySkill.fulfilled, (state, action) => {
//         state.loading = false;
//         state.jobs = action.payload; // Set jobs to the fetched data
//       })
//       .addCase(filterJobsBySkill.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload; // Use the error message from rejectWithValue
//         console.error("Error fetching jobs by skill:", action.payload);
//       })

//       // Global search
//       .addCase(globalJobSearch.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(globalJobSearch.fulfilled, (state, action) => {
//         state.loading = false;
//         state.jobs = action.payload; // Set jobs to the fetched data
//       })
//       .addCase(globalJobSearch.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload; // Use the error message from rejectWithValue
//         console.error("Error during global job search:", action.payload);
//       });
//   },
// });

// // Export the async thunks and the reducer
// export const { resetJobs } = filterSlice.actions; // Export reset action
// export default filterSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../api/index";

// Filter jobs by category
export const filterJobsByCategory = createAsyncThunk(
  "jobs/filterByCategory",
  async (category, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${BASE_URL}/jobs/?category=${encodeURIComponent(category)}`
      );
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to fetch jobs by category: ${errorMessage}`);
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Filter jobs by skill
export const filterJobsBySkill = createAsyncThunk(
  "jobs/filterBySkill",
  async (skill, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${BASE_URL}/jobs/?skill=${encodeURIComponent(skill)}`
      );
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to fetch jobs by skill: ${errorMessage}`);
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Global search for jobs
export const globalJobSearch = createAsyncThunk(
  "jobs/globalSearch",
  async (query, { rejectWithValue }) => {
    if (typeof query !== "string" || !query.trim()) {
      return rejectWithValue("Invalid query.");
    }

    try {
      const response = await fetch(
        `${BASE_URL}/global_search/?q=${encodeURIComponent(query.trim())}`
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to fetch jobs: ${errorMessage}`);
      }

      const data = await response.json();
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error("No results found for the given query.");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice for managing job filters
const filterSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs: [],
    loading: false,
    error: null,
    searchParams: {
      category: '',
      skill: '',
    },
  },
  reducers: {
    resetJobs: (state) => {
      state.jobs = [];
      state.error = null;
      state.searchParams = { category: "", skill: "" };
    },
    setSearchParams: (state, action) => {
      state.searchParams = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(filterJobsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(filterJobsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(filterJobsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.error("Error fetching jobs by category:", action.payload);
      })
      .addCase(filterJobsBySkill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(filterJobsBySkill.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(filterJobsBySkill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.error("Error fetching jobs by skill:", action.payload);
      })
      .addCase(globalJobSearch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(globalJobSearch.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(globalJobSearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const { resetJobs, setSearchParams } = filterSlice.actions;
export default filterSlice.reducer;

// Selectors
export const selectJobs = (state) => state.jobs.jobs;
export const selectLoading = (state) => state.jobs.loading;
export const selectError = (state) => state.jobs.error;
export const selectSearchParams = (state) => state.jobs.searchParams;
