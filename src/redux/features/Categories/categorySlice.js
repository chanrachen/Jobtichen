// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { BASE_URL } from '../../../../src/redux/api/index';

// // Define the initial state
// const initialState = {
//   categories: [],
//   loading: false,
//   error: null,
// };

// // Async thunk for fetching categories
// export const fetchCategories = createAsyncThunk(
//   'categories/fetchCategories',
//   async () => {
//     const response = await axios.get(`${BASE_URL}/job_categories/`);
//     return response.data;
//   }
// );

// // Async thunk for creating a new category
// export const createCategory = createAsyncThunk(
//   'categories/createCategory',
//   async (categoryName) => {
//     const response = await axios.post(`${BASE_URL}/job_categories/`, {
//       category_name: categoryName,
//     });
//     return response.data;
//   }
// );

// // Async thunk for updating an existing category
// export const updateCategory = createAsyncThunk(
//   'categories/updateCategory',
//   async ({ categoryId, categoryName }) => {
//     const response = await axios.put(`${BASE_URL}/job_categories/${categoryId}/`, {
//       category_name: categoryName,
//     });
//     return response.data;
//   }
// );

// // Async thunk for deleting a category
// export const deleteCategory = createAsyncThunk(
//   'categories/deleteCategory',
//   async (categoryId) => {
//     await axios.delete(`${BASE_URL}/job_categories/${categoryId}/`);
//     return categoryId; // Return the ID of the deleted category
//   }
// );

// // Create the category slice
// const categorySlice = createSlice({
//   name: 'categories',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCategories.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchCategories.fulfilled, (state, action) => {
//         state.loading = false;
//         state.categories = action.payload;
//       })
//       .addCase(fetchCategories.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })
//       .addCase(createCategory.fulfilled, (state, action) => {
//         state.categories.push(action.payload);
//       })
//       .addCase(updateCategory.fulfilled, (state, action) => {
//         const index = state.categories.findIndex(cat => cat.id === action.payload.id);
//         if (index !== -1) {
//           state.categories[index] = action.payload;
//         }
//       })
//       .addCase(deleteCategory.fulfilled, (state, action) => {
//         state.categories = state.categories.filter(cat => cat.id !== action.payload);
//       });
//   },
// });

// // Export the actions (if needed) and the reducer
// export const selectCategories = (state) => state.categories.categories;
// export const selectLoading = (state) => state.categories.loading;
// export const selectError = (state) => state.categories.error;

// export default categorySlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../../../src/redux/api/index';

// Define the initial state
const initialState = {
  categories: [],
  loading: false,
  error: null,
};

// Async thunk for fetching categories
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    try {
      const response = await axios.get(`${BASE_URL}/job_categories/`);
      console.log("Fetched categories:", response.data); // Log the response
      return response.data; // Adjust if necessary based on response structure
    } catch (error) {
      console.error("Error fetching categories:", error); // Log error details
      throw error; // Rethrow error to be handled by extraReducers
    }
  }
);

// Async thunk for creating a new category
export const createCategory = createAsyncThunk(
  'categories/createCategory',
  async (categoryName) => {
    const response = await axios.post(`${BASE_URL}/job_categories/`, {
      category_name: categoryName,
    });
    return response.data;
  }
);

// Async thunk for updating an existing category
export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async ({ categoryId, categoryName }) => {
    const response = await axios.put(`${BASE_URL}/job_categories/${categoryId}/`, {
      category_name: categoryName,
    });
    return response.data;
  }
);

// Async thunk for deleting a category
export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async (categoryId) => {
    await axios.delete(`${BASE_URL}/job_categories/${categoryId}/`);
    return categoryId; // Return the ID of the deleted category
  }
);

// Create the category slice
const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload; // Ensure action.payload matches your API response structure
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Capture error message
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex(cat => cat.id === action.payload.id);
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(cat => cat.id !== action.payload);
      });
  },
});

// Export the actions (if needed) and the reducer
export const selectCategories = (state) => state.categories.categories;
export const selectLoading = (state) => state.categories.loading;
export const selectError = (state) => state.categories.error;

export default categorySlice.reducer;
