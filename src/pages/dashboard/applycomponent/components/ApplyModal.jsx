import React, { useState } from "react";
import { toast } from "react-toastify";

const ApplyModal = ({ isOpen, onClose, onApply, jobTitle }) => {
  const [cvFile, setCvFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const validTypes = [".pdf", ".doc", ".docx"];
      const fileType = file.name.split('.').pop();
      const fileSize = file.size / 1024 / 1024; // Size in MB

      // Validate file type
      if (!validTypes.includes(`.${fileType}`)) {
        toast.error("Invalid file type. Please upload a PDF or Word document.");
        return;
      }

      // Validate file size (e.g., max 5 MB)
      if (fileSize > 5) {
        toast.error("File size exceeds 5 MB. Please upload a smaller file.");
        return;
      }

      setCvFile(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!cvFile) {
      toast.warn("Please upload your CV before applying!");
      return;
    }

    setLoading(true);
    try {
      await onApply(cvFile);
      toast.success(`Successfully applied for ${jobTitle}!`);
    } catch (error) {
      toast.error("An error occurred while applying for the job.");
    } finally {
      setLoading(false);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Apply for {jobTitle}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="cvUpload">
              Upload your CV:
            </label>
            <input
              type="file"
              id="cvUpload"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="bg-gray-300 px-4 py-2 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`bg-[#000000] px-4 py-2 text-white rounded hover:bg-[#444444] ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? "Applying..." : "Apply"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyModal;