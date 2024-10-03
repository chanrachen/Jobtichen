import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const SetNewPassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    otp_code: Yup.string().required("OTP code is required"),
    new_password: Yup.string()
      .required("New password is required")
      .min(8, "Password must be at least 8 characters"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("new_password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    console.log("Submitting values:", values);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}password-reset/`,
        {
          email: values.email,
          otp_code: values.otp_code,
          password: values.new_password,
          confirmPassword: values.confirm_password,
        }
      );

      if (response.status === 200) {
        toast.success("Password changed successfully!");
      } else {
        toast.error("Failed to change password. Please check your inputs.");
      }
    } catch (error) {
      console.error("Error response:", error.response);
      const errorMessage =
        error.response?.data?.message ||
        "Error changing password. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="flex justify-center items-center h-screen">
      <Formik
        initialValues={{
          email: "",
          otp_code: "",
          new_password: "",
          confirm_password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="max-w-md w-full border border-gray-300 -2xl p-8 mx-4">
            <h1 className="text-4xl font-bold text-center mb-6 text-black">
              Set New Password
            </h1>

            <div className="space-y-4">
              <div>
                <label className="block text-black">Email</label>
                <Field
                  name="email"
                  type="email"
                  className="block w-full border border-gray-300 focus:ring-black p-2 "
                  placeholder="Enter your email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>

              <div>
                <label className="block text-black">OTP Code</label>
                <Field
                  name="otp_code"
                  type="text"
                  className="block w-full border border-gray-300 focus:ring-black p-2 "
                  placeholder="Enter OTP code"
                />
                <ErrorMessage
                  name="otp_code"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>

              <div>
                <label className="block text-black">New Password</label>
                <Field
                  name="new_password"
                  type={showPassword ? "text" : "password"}
                  className="block w-full border border-gray-300 focus:ring-black p-2 "
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-10 text-gray-600"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
                <ErrorMessage
                  name="new_password"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>

              <div>
                <label className="block text-black">Confirm Password</label>
                <Field
                  name="confirm_password"
                  type={showConfirmPassword ? "text" : "password"}
                  className="block w-full border border-gray-300 focus:ring-black p-2 "
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2 top-10 text-gray-600"
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
                <ErrorMessage
                  name="confirm_password"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>

              <button
                type="submit"
                className={`w-full py-2  bg-black text-white ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Changing..." : "Change Password"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <ToastContainer position="top-right" autoClose={5000} />
    </section>
  );
};

export default SetNewPassword;
