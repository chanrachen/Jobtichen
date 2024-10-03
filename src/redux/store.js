// store.js

import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/Users/userSlice";
import CardSlice from "./features/Cards/CardSlice"; 
import categorySlice from "./features/Categories/categorySlice";
import filterSlice from "./features/Filters/filterSlice";
import ApplyJobSlice from "./features/Apply/ApplyJobSlice";
export const store = configureStore({
  reducer: {
    user: userSlice,
    card: CardSlice, 
    categories: categorySlice,
    jobs : filterSlice,
    applyJob:ApplyJobSlice
  },
});

//
