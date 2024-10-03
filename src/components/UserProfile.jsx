import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserProfile,
  updateUserProfile,
  selectUserProfile,
  selectStatus,
  selectError,
} from "../../src/redux/features/Users/userSlice";
import { getAccessToken } from "../../src/lib/secureLocalStorage";
import { FaCamera } from "react-icons/fa";
import { BASE_URL } from "../../src/redux/api/index";

export default function UserProfile() {
  const dispatch = useDispatch();
  const profile = useSelector(selectUserProfile);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    address: "",
    avatar: null,
    contact_info: "",
    bio: "",
    gender: "Not specified",
    dob: "",
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
  });

  const [messages, setMessages] = useState({ error: "", success: "" });

  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      const fetchData = async () => {
        try {
          await dispatch(fetchUserProfile());
        } catch (err) {
          console.error("Error fetching data:", err);
          setMessages((prev) => ({ ...prev, error: "Failed to fetch data." }));
        }
      };

      fetchData();
    }
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setFormData((prev) => ({
        ...prev,
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        username: profile.username || "",
        address: profile.address || "",
        avatar: profile.avatar || null,
        contact_info: profile.contact_info || "",
        bio: profile.bio || "",
        gender: profile.gender || "Not specified",
        dob: profile.dob || "",
        facebook: profile.facebook || "",
        twitter: profile.twitter || "",
        instagram: profile.instagram || "",
        linkedin: profile.linkedin || "",
      }));
    }
  }, [profile]);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${BASE_URL}upload/`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to upload image");

      const responseData = await response.json();
      if (responseData.data && responseData.data.url) {
        setFormData((prev) => ({ ...prev, avatar: responseData.data.url }));
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setMessages((prev) => ({ ...prev, error: "Error uploading image." }));
    }
  };

  const validateForm = () => {
    if (!formData.first_name || !formData.last_name) {
      setMessages((prev) => ({
        ...prev,
        error: "First and last name are required.",
      }));
      return false;
    }
    setMessages((prev) => ({ ...prev, error: "" }));
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== "") {
        formDataToSend.append(key, value);
      }
    });

    try {
      const response = await dispatch(updateUserProfile(formDataToSend)).unwrap();
      console.log("Profile updated successfully:", response);

      setMessages({
        error: "",
        success: "Profile updated successfully.",
      });
    } catch (err) {
      console.error("Failed to update profile:", err);
      setMessages({
        error: `Failed to update user profile: ${err}`,
        success: "",
      });
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto bg-white  shadow-md px-4 py-4">
      <h1 className="text-3xl font-bold text-center text-black mb-6">
        Personal Details
      </h1>
      {status === "loading" && (
        <p className="text-center text-gray-500">Loading...</p>
      )}
      {messages.error && (
        <p className="text-center text-red-500">Error: {messages.error}</p>
      )}
      {messages.success && (
        <p className="text-center text-gray-500">{messages.success}</p>
      )}

      <div className="flex flex-col items-center mb-6">
        <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-black mb-4">
          <img
            src={formData.avatar || "../../src/assets/placeholder.jpg"}
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative bg-gray-200 p-1 px-2 rounded-md">
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <span className="text-black text-2xl">
              <FaCamera />
            </span>
          </label>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="w-full md:w-3/4 lg:w-2/3">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(formData)
                .filter(([key]) => !["avatar"].includes(key))
                .map(([key, value]) => (
                  <div className="mb-4" key={key}>
                    <label className="block text-sm font-semibold text-gray-700">
                      {key
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, (char) => char.toUpperCase())}
                      :
                    </label>
                    {key === "dob" ? (
                      <input
                        type="date"
                        name={key}
                        value={value}
                        onChange={(e) =>
                          setFormData({ ...formData, [key]: e.target.value })
                        }
                        className="w-full p-3 border border-gray-300  shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    ) : key === "bio" ? (
                      <textarea
                        name={key}
                        value={value}
                        onChange={(e) =>
                          setFormData({ ...formData, [key]: e.target.value })
                        }
                        className="w-full p-3 border border-gray-300  shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
                        rows="3"
                      />
                    ) : key === "gender" ? (
                      <select
                        name={key}
                        value={value}
                        onChange={(e) =>
                          setFormData({ ...formData, [key]: e.target.value })
                        }
                        className="w-full p-3 border border-gray-300  shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
                      >
                        <option value="Not specified">Select</option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                      </select>
                    ) : (
                      <input
                        type="text"
                        name={key}
                        value={value}
                        onChange={(e) =>
                          setFormData({ ...formData, [key]: e.target.value })
                        }
                        className="w-full p-3 border border-gray-300  shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder={`Enter your ${key.replace(/_/g, " ")}`}
                        aria-label={key.replace(/_/g, " ")}
                      />
                    )}
                  </div>
                ))}
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white p-3 mt-3  hover:bg-gray-800 transition duration-200"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
