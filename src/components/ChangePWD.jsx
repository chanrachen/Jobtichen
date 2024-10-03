import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const validationSchema = Yup.object().shape({
  currentPassword: Yup.string().required("Current password is required"),
  newPassword: Yup.string()
    .required("New password is required")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://136.228.158.126:50002/api/password-reset",
        {
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Password changed successfully!");
        resetForm();
      }
    } catch (error) {
      console.error(error);
      toast.error("Error changing password. Please try again.");
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <section className="flex justify-center items-center h-screen">
      <Formik
        initialValues={{
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="max-w-md w-full border border-gray-300 rounded-2xl p-8 mx-4">
            <h1 className="text-4xl font-bold text-center mb-6 text-[#72B261]">
              Change Password
            </h1>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700">Current Password</label>
                <Field
                  name="currentPassword"
                  type={showPassword ? "text" : "password"}
                  className="block w-full border border-gray-300 p-2 rounded"
                  placeholder="Enter current password"
                />
                <ErrorMessage
                  name="currentPassword"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>

              <div>
                <label className="block text-gray-700">New Password</label>
                <Field
                  name="newPassword"
                  type={showPassword ? "text" : "password"}
                  className="block w-full border border-gray-300 p-2 rounded"
                  placeholder="Enter new password"
                />
                <ErrorMessage
                  name="newPassword"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>

              <div>
                <label className="block text-gray-700">
                  Confirm New Password
                </label>
                <Field
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  className="block w-full border border-gray-300 p-2 rounded"
                  placeholder="Confirm new password"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                  className="mr-2"
                />
                <span>Show Passwords</span>
              </div>

              <button
                type="submit"
                className={`w-full py-2 rounded bg-[#72B261] text-white ${
                  loading || isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading || isSubmitting}
              >
                {loading ? "Changing..." : "Change Password"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <ToastContainer position="top-right" autoClose={5000} />
    </section>
  );
};

export default ChangePassword;