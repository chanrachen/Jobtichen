import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLogin,
  selectAccessToken,
} from "../../redux/features/Users/userSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Validation schema
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email!!").required("Email is required"),
  password: Yup.string().required("Password is required"),
});
import { addToFavorites } from "../../redux/features/Cards/CardSlice";
export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = useSelector(selectAccessToken);

  // Navigate on successful login
  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate]);

  const handleSubmit = (values, { resetForm, setSubmitting }) => {
    dispatch(fetchLogin(values)).then((response) => {
      if (response.meta.requestStatus === "fulfilled") {
        toast.success("Login successful!");
        resetForm();

        // Check for any pending favorite actions
        const pendingAction = localStorage.getItem("pendingFavorite");
        if (pendingAction) {
          const { job, action } = JSON.parse(pendingAction);
          if (action === "add") {
            dispatch(addToFavorites(job)); // Dispatch action to add favorite
            toast.success(`${job.title} has been added to favorites!`);
          }
          localStorage.removeItem("pendingFavorite"); // Clear the pending action
        }

        navigate("/"); // Redirect to home page
      } else {
        // Handle error
        toast.error("Login failed. Please check your credentials.");
      }
      setSubmitting(false);
    });
  };

  return (
    <section className="flex justify-center items-center h-screen">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="max-w-md w-full border border-gray-300  p-8 mx-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-sans font-bold text-black">Jobtichen</h1> {/* Changed title */}
            </div>

            <div className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="text-gray-800 text-sm mb-2 block "
                >
                  Email
                </label>
                <Field
                  name="email"
                  type="text"
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3  focus:ring-[#000000] focus:border-[#181818]"
                  placeholder="Enter email"
                />
                <ErrorMessage name="email">
                  {(msg) => <div className="text-red-600 text-sm">{msg}</div>}
                </ErrorMessage>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="text-gray-800 text-sm mb-2 block"
                >
                  Password
                </label>
                <Field
                  name="password"
                  type="password"
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3  focus:ring-[#000000] focus:border-[#181818]"
                  placeholder="Enter password"
                />
                <ErrorMessage name="password">
                  {(msg) => <div className="text-red-600 text-sm">{msg}</div>}
                </ErrorMessage>
              </div>
            </div>

            <div className="mt-12">
              <button
                type="submit"
                className={`w-full py-3 px-4 text-sm tracking-wider font-semibold  text-white ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#000000] hover:bg-[#464746]" // Updated colors
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Login"}
              </button>
            </div>

            <p className="text-gray-800 text-sm mt-6 text-center">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-[#030303] font-semibold hover:underline ml-1"
              >
                Register here
              </Link>
            </p>
          </Form>
        )}
      </Formik>
      <ToastContainer position="top-right" autoClose={5000} />
    </section>
  );
}
