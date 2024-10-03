import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchJobs,
  addToFavorites,
  selectJobs,
  selectLoading,
  selectError,
  selectFavorites,
} from "../../../../src/redux/features/Cards/CardSlice"; // Adjust the import path
import { FaRegHeart } from "react-icons/fa"; // Import heart icon
import { toast } from "react-toastify"; // Import toast
import { getAccessToken } from "../../../../src/lib/secureLocalStorage"; // Import secure local storage utility
import ButtonApply from "../../../../src/pages/dashboard/applycomponent/components/ButtonApply"; // Import ButtonApply
import ApplyModal from "../../../../src/pages/dashboard/applycomponent/components/ApplyModal"; // Import ApplyModal

export default function CardDetailComponent() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jobs = useSelector(selectJobs);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const favorites = useSelector(selectFavorites) || []; // Ensure favorites is defined

  const [isModalOpen, setModalOpen] = useState(false);

  // Fetch jobs if not already loaded
  useEffect(() => {
    if (jobs.length === 0) {
      dispatch(fetchJobs());
    }
  }, [dispatch, jobs.length]);

  // Find job details based on ID
  const jobDetails = jobs.find((job) => job.id === id);

  const handleSaveJob = () => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      toast.warn("You need to log in to save jobs!"); // Notify user to log in
      navigate("/login"); // Redirect to login page
      return;
    }

    if (favorites.some((fav) => fav.id === jobDetails.id)) {
      toast.info(`${jobDetails.title} is already in your favorites!`);
      return;
    }

    dispatch(addToFavorites(jobDetails));
    toast.success(`${jobDetails.title} has been saved to favorites!`); // Toast notification
    navigate("/saved-jobs"); // Navigate to saved jobs after saving
  };

  const handleApply = async (cvFile) => {
    const formData = new FormData();
    formData.append("cv", cvFile);
    formData.append("jobId", jobDetails.id);

    try {
      const response = await dispatch(applyForJob(formData));
      if (response.error) {
        toast.error("Error applying for the job.");
      } else {
        toast.success(`Successfully applied for ${jobDetails.title}`);
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error("An error occurred while applying for the job.");
    }
  };

  // Loading, error, and not found states
  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="spinner">Loading job details...</div>
      </div>
    );
  if (error)
    return <div className="text-red-500 text-center">Error: {error}</div>;
  if (!jobDetails)
    return <div className="text-gray-500 text-center">Job not found.</div>;

  // Check if the job is already in favorites
  const isFavorite = favorites.some((fav) => fav.id === jobDetails.id);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Display Thumbnail */}
      {jobDetails.thumbnail ? (
        <img
          src={jobDetails.thumbnail}
          alt={`${jobDetails.title} Thumbnail`}
          className="w-full h-48 object-cover rounded-md mb-4"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "path/to/placeholder.jpg"; // Placeholder image path
          }}
        />
      ) : (
        <div className="h-48 bg-gray-200 rounded-md mb-4 flex items-center justify-center">
          <span className="text-gray-600">No Thumbnail Available</span>
        </div>
      )}
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        {jobDetails.title}
      </h1>
      <p className="text-gray-600">{jobDetails.company_name}</p>
      <p className="text-gray-500">{jobDetails.location}</p>
      <div className="my-4">
        <h2 className="text-xl font-semibold text-gray-700">Job Description</h2>
        <p className="text-gray-600">{jobDetails.description}</p>
      </div>

      {/* Skills Required */}
      <div className="my-4">
        <h2 className="text-xl font-semibold text-gray-700">Skills Required</h2>
        <ul className="list-disc pl-5 text-gray-600">
          {(jobDetails.skills || []).map((skill, index) => (
            <li key={skill.id || index}>{skill.name}</li>
          ))}
        </ul>
      </div>

      {/* Job Requirements */}
      <div className="my-4">
        <h2 className="text-xl font-semibold text-gray-700">Requirements</h2>
        {jobDetails.requirements && jobDetails.requirements.length > 0 ? (
          <ul className="list-disc pl-5 text-gray-600">
            {jobDetails.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">
            No requirements provided for this job.
          </p>
        )}
      </div>

      {/* Job Benefits */}
      <div className="my-4">
        <h2 className="text-xl font-semibold text-gray-700">Benefits</h2>
        {jobDetails.benefits && jobDetails.benefits.length > 0 ? (
          <ul className="list-disc pl-5 text-gray-600">
            {jobDetails.benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No benefits provided for this job.</p>
        )}
      </div>

      {/* Salary and Job Type */}
      <div className="my-4">
        <h2 className="text-xl font-semibold text-gray-700">Salary</h2>
        <p className="text-gray-800 font-bold">
          ${jobDetails.salary.toLocaleString()}
        </p>
      </div>
      <div className="my-4">
        <h2 className="text-xl font-semibold text-gray-700">Job Type</h2>
        <p className="text-gray-600">{jobDetails.job_type}</p>
      </div>

      <div className="flex space-x-4 mt-6">
        <ButtonApply
          jobId={jobDetails.id}
          openModal={() => setModalOpen(true)}
        />
        <button
          onClick={handleSaveJob}
          className={`flex items-center justify-center w-12 h-12 rounded-full ${
            isFavorite ? "bg-red-600" : "bg-white shadow-xl"
          } transition duration-200 focus:outline-none`}
          aria-label={
            isFavorite ? "Remove from favorites" : "Save to favorites"
          }
        >
          <FaRegHeart className={isFavorite ? "text-white" : "text-black"} />
        </button>
      </div>

      {/* Apply Modal */}
      <ApplyModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onApply={handleApply}
        jobTitle={jobDetails.title}
      />
    </div>
  );
}
