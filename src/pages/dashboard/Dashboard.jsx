// Dashboard.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchListApplied,
  fetchDeleteApplied,
  selectListApplied,
  selectError,
} from "../../../src/redux/features/Apply/ApplyJobSlice"; // Adjust the import path
import { toast } from "react-toastify";

export default function Dashboard() {
  const dispatch = useDispatch();
  const appliedJobs = useSelector(selectListApplied);
  const loading = useSelector(state => state.applyJob.status === 'loading');
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchListApplied());
  }, [dispatch]);

  const handleDeleteApplication = (jobId) => {
    dispatch(fetchDeleteApplied(jobId))
      .then(() => {
        toast.success("Application deleted successfully.");
      })
      .catch(() => {
        toast.error("Error deleting application.");
      });
  };

  if (loading) return <div className="spinner"></div>;
  if (error) return <div className="text-red-500 text-center">Error: {error}</div>;

  // Safeguard against appliedJobs not being an array
  if (!Array.isArray(appliedJobs)) {
    console.error("appliedJobs is not an array:", appliedJobs);
    return <div className="text-red-500 text-center">Unexpected data format.</div>;
  }

  if (appliedJobs.length === 0) return <div className="text-gray-500 text-center">No applications found.</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Applied Jobs</h1>
      <ul className="space-y-4">
        {appliedJobs.map(job => (
          <li key={job.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
            <div>
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <p className="text-gray-600">{job.company_name}</p>
            </div>
            <button
              onClick={() => handleDeleteApplication(job.id)}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}