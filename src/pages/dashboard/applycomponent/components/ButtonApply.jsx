import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../../../../../src/lib/secureLocalStorage";

const ButtonApply = ({ jobId, openModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    const accessToken = getAccessToken();

    if (!accessToken) {
      toast.warn("You need to log in to apply for jobs!");
      navigate("/login");
      return;
    }

    setLoading(true);
    openModal(); // Open the modal for CV upload
    setLoading(false);
  };

  return (
    <button
      onClick={handleClick}
      className={`flex-1 rounded-lg bg-[#000000] px-4 py-2 text-white hover:bg-[#3e3e3d] transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={loading}
      aria-label="Apply for Job"
    >
      {loading ? "Loading..." : "Apply Job"}
    </button>
  );
};

export default ButtonApply;