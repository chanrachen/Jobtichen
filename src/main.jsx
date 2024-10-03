import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { store } from "./redux/store.js";
import App from "./App.jsx";
import AboutUs from "./pages/Contact-us/ContactUs.jsx";
import Layout from "./components/layout/Layout.jsx";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import OtpVerification from "./pages/auth/OptVerification.jsx";
import UserProfile from "./components/UserProfile.jsx";
import CardDetailComponent from "./components/common/cards/CardDetailComponent.jsx";
import SetNewPassword from "./components/chaangePwd/SetNewPassword.jsx";
import RequestPasswordReset from "./components/chaangePwd/RequestPasswordReset.jsx";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import "tailwindcss/tailwind.css";
import MySaveJobs from "./components/MySaveJobs.jsx";
import Jobs from "./pages/Find-Jobs/Jobs.jsx";
import FilterSelection from "./pages/Find-Jobs/Meterial/FilterSelection.jsx";
import Dashboard from "../src/pages/dashboard/Dashboard.jsx";

// Define the routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/", // Home path
        element: <App />,
      },
      {
        path: "contact-us", // No leading slash
        element: <AboutUs />,
      },
      {
        path: "find-jobs",
        element: <Jobs/>   ,
      },
      {
        path: "profile", // User profile route
        element: <UserProfile />,
      },
      {
        path: "job/:id", // Dynamic route for job details
        element: <CardDetailComponent />,
      },
      {
        path: "request-password-reset", // Password reset request
        element: <RequestPasswordReset />,
      },
      {
        path: "set-new-password", // Set new password route
        element: <SetNewPassword />,
      },
      {
        path:"saved-jobs", // Saved jobs route
        element: <MySaveJobs />,
      },
      {
        path:"filter",
        element:<FilterSelection/>
      },
      {
        path:"/dashboard",
        element : <Dashboard/>
      }
    ],
  },
  {
    path: "register", // Register route
    element: <Register />,
  },
  {
    path: "login", // Login route
    element: <Login />,
  },
  {
    path: "otpverification", // OTP verification route
    element: <OtpVerification />,
  },
  // Additional routes can be added here
]);

// Render the application
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={5000} />
    </Provider>
  </React.StrictMode>
);
