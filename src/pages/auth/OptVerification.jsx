import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOtpVerification,
  resendOtp,
  selectOtpVerification,
} from "../../redux/features/Users/userSlice";
import { toast } from "react-toastify";

// Validation schema for OTP
const otpSchema = Yup.object().shape({
  otp: Yup.string()
    .length(6, "OTP must be 6 digits")
    .matches(/^[0-9]+$/, "Only digits are allowed")
    .required("OTP is required"),
});

export default function OtpVerification() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location?.state?.email;
  const OtpVerificationResponse = useSelector(selectOtpVerification);
  const [errorMessage, setErrorMessage] = useState("");
  const [resending, setResending] = useState(false); // State for resending OTP

  // Effect to handle OTP verification response
  useEffect(() => {
    if (OtpVerificationResponse) {
      if (OtpVerificationResponse.message === "Email verified successfully.") {
        toast.success("Email verified successfully!");
        navigate("/login");
      } else if (OtpVerificationResponse.error) {
        setErrorMessage("OTP verification failed.");
        toast.error("OTP verification failed.");
      }
    }
  }, [OtpVerificationResponse, navigate]);

  const handleResendOtp = () => {
    setResending(true); // Start resending state
    dispatch(resendOtp(email))
      .then(() => {
        setResending(false); // Reset resending state
        toast.success("OTP resent successfully!");
      })
      .catch((error) => {
        setResending(false); // Reset resending state
        toast.error("Error resending OTP.");
      });
  };

  return (
    <section className="flex justify-center items-center h-screen bg-gray-100">
      <Formik
        initialValues={{ otp: "" }}
        validationSchema={otpSchema}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(fetchOtpVerification({ email, otp_code: values.otp }))
            .then(() => setSubmitting(false))
            .catch((error) => {
              setSubmitting(false);
              toast.error("Error during OTP verification.");
            });
        }}
      >
        {({ isSubmitting, isValid }) => (
          <Form className="max-w-sm w-full border border-gray-200 rounded-lg shadow-md p-6 bg-white">
            <h2 className="text-2xl font-semibold text-center mb-4 text-black">
              Verify Your OTP
            </h2>
            <p className="text-gray-600 text-center mb-6">
              Enter the 6-digit code sent to your email.
            </p>
            {errorMessage && (
              <div className="text-red-500 text-sm text-center mb-4">
                {errorMessage}
              </div>
            )}
            <div className="flex justify-center mb-4">
              <Field
                name="otp"
                type="text"
                maxLength="6"
                className="w-full h-12 border border-gray-300 rounded-md text-center text-xl text-gray-900 focus:ring-black focus:border-black outline-none"
              />
            </div>
            <ErrorMessage
              name="otp"
              component="div"
              className="text-red-500 text-sm text-center mb-4"
            />
            <button
              type="submit"
              className={`w-full py-2 px-4 text-sm font-medium text-white rounded-md ${
                isSubmitting || !isValid
                  ? "bg-black cursor-not-allowed"
                  : "bg-black hover:bg-gray-700"
              }`}
              disabled={isSubmitting || !isValid}
            >
              {isSubmitting ? "Verifying..." : "Verify OTP"}
            </button>
            <div className="text-center mt-4">
              <span className="text-gray-600">Didn’t receive the OTP? </span>
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={resending}
                className={`text-black font-medium ${
                  resending ? "cursor-not-allowed" : "hover:underline"
                }`}
              >
                {resending ? "Resending..." : "Resend OTP"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
}
