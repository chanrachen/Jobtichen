import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast
import {
  fetchCreateUser,
  selectStatus,
  selectError,
} from "../../redux/features/Users/userSlice";
import { HiCheckCircle, HiInformationCircle } from "react-icons/hi";

// Validation Schema
const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email!").required("Email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/,
      "Password must contain at least 6 characters, including UPPER/lowercase and numbers"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match!")
    .required("Confirm Password is required"),
  terms: Yup.bool().oneOf([true], "You must accept the Terms and Conditions"),
});

// Initial Values
const initialValues = {
  username: "",
  email: "",
  password: "Qwert@123",
  confirmPassword: "Qwert@123",
  terms: false,
};

export default function Register() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);

  // Handle registration status
  useEffect(() => {
    if (status === "succeeded") {
      toast.success("Registration successful!"); // Show success toast
      navigate("/otpverification", { state: { email } });
    } else if (status === "failed") {
      toast.error(error || "Failed to register. Please try again."); // Show error toast
    }
  }, [status, navigate, email, error]);

  // Handle email change
  const handleGetEmail = (e, setFieldValue) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    setFieldValue("email", emailValue);
  };

  return (
    <section className="flex justify-center items-center h-screen">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          dispatch(fetchCreateUser(values));
          resetForm(); // Reset form after submission
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className="max-w-md w-full border border-gray-300 rounded-2xl p-8 mx-4 relative">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-sans font-bold">
                Jobtichen
              </h1>
            </div>

            <div className="space-y-6">
              {/* Username Field */}
              <div>
                <label
                  htmlFor="username"
                  className="text-gray-800 text-sm mb-2 block"
                >
                  Username
                </label>
                <Field
                  type="text"
                  id="username"
                  name="username"
                  className="border-gray-300 focus:border-[#4e4e4e] focus:ring-[#4a4b4a] text-sm w-full  shadow-sm"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="text-gray-800 text-sm mb-2 block"
                >
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="border-gray-300 focus:border-[#4e4e4e] focus:ring-[#4a4b4a] text-sm w-full  shadow-sm"
                  onChange={(e) => handleGetEmail(e, setFieldValue)}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="text-gray-800 text-sm mb-2 block"
                >
                  Password
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="border-gray-300 focus:border-[#4e4e4e] focus:ring-[#4a4b4a] text-sm w-full  shadow-sm"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Confirm Password Field */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="text-gray-800 text-sm mb-2 block"
                >
                  Confirm Password
                </label>
                <Field
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="border-gray-300 focus:border-[#4e4e4e] focus:ring-[#4a4b4a] text-sm w-full  shadow-sm"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Terms and Conditions Checkbox */}
              <div className="flex items-center">
                <Field
                  type="checkbox"
                  id="terms"
                  name="terms"
                  className="text-[#212121] rounded"
                />
                <label htmlFor="terms" className="ml-2 text-gray-800 text-sm">
                  I accept the{" "}
                  <a href="#" className="text-[#000000] hover:underline focus:ring-[#000000] focus:border-transparent">
                    Terms and Conditions
                  </a>
                </label>
                <ErrorMessage
                  name="terms"
                  component="div"
                  className="text-red-500 text-sm ml-2"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 text-sm text-white bg-[#0a0a0a] hover:bg-[#424241] "
              >
                Register
              </button>

              {/* Login Link */}
              <p className="text-center text-sm text-gray-500 mt-4">
                Already have an account?{" "}
                <Link to="/login" className="text-[#000000] hover:underline">
                  Login
                </Link>
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
}
