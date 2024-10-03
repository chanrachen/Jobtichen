import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const RequestPasswordReset = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const handleSubmit = async (values) => {
    try {
      const apiUrl = `${import.meta.env.VITE_BASE_URL}password-reset-request/`;
      const response = await axios.post(apiUrl, {
        email: values.email,
      });
      if (response.status === 200) {
        toast.success("OTP code sent to your email address.");
        navigate("/set-new-password"); // Navigate to SetNewPassword component
      }
    } catch (error) {
      toast.error("Error sending request. Please try again.");
    }
  };

  return (
    <section className="flex justify-center items-center h-screen">
      <Formik
        initialValues={{ email: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="max-w-md w-full border border-gray-300 rounded-2xl p-8 mx-4">
            <h1 className="text-4xl font-bold text-center mb-6 text-black">
              Request Password Reset
            </h1>

            <div className="space-y-4">
              <div>
                <label className="block text-black">Email</label>
                <Field
                  name="email"
                  type="email"
                  className="block w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-black" // Black ring on focus
                  placeholder="Enter your email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 rounded bg-black text-white hover:bg-gray-700 transition-colors duration-300"
              >
                Request Reset
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <ToastContainer position="top-right" autoClose={5000} />
    </section>
  );
};

export default RequestPasswordReset;
