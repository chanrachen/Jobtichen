import React from "react";
import PropTypes from "prop-types";
import { Card } from "flowbite-react";
import { FaClock, FaSearchDollar, FaRegHeart, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
  selectFavorites,
} from "../../../../src/redux/features/Cards/CardSlice";
import { getAccessToken } from "../../../../src/lib/secureLocalStorage"; // Adjust the path
import { toast } from "react-toastify";

export default function CardComponent({ job = {} }) {
  const {
    id,
    thumbnail,
    company_name = "Company Name",
    location = "Location",
    title = "Job Title",
    skills = [],
    job_type = "Job Type",
    salary = 0,
  } = job;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const accessToken = getAccessToken();

  const isFavorite = favorites.some((fav) => fav.id === id);

  const handleDetailsClick = (e) => {
    e.preventDefault();
    navigate(`/job/${id}`);
  };

  const handleToggleFavorite = () => {
    if (!accessToken) {
      // Redirect to login if there's no access token
      toast.warn("You need to log in to save jobs!");
      navigate("/login");
      return;
    }

    // If logged in, toggle favorite status
    if (isFavorite) {
      dispatch(removeFromFavorites(id));
      toast.success(`${title} has been removed from favorites!`);
    } else {
      dispatch(addToFavorites(job));
      toast.success(`${title} has been added to favorites!`);
    }
  };

  const skillNames = skills.map((skill) => skill.name).join(", ");

  return (
    <div className="w-full h-full">
      <Card className="w-full h-full rounded-none">
        <img
          className=" object-cover w-full h-40"
          src={thumbnail || "../../../../src/assets/placeholder.jpg"}
          alt={`${company_name} Logo`}
        />
        <div className="flex items-center justify-between">
          <div>
            <h5 className="mt-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white ">
              {company_name}
            </h5>
            <h4 className="text-center text-gray-400">{location}</h4>
          </div>
          <button
            onClick={handleToggleFavorite}
            className={`flex items-center justify-center w-10 h-10 rounded-full ${
              isFavorite ? "bg-red-600" : "bg-white shadow"
            } transition duration-200 focus:outline-none`}
            aria-label={
              isFavorite
                ? `Remove ${title} from favorites`
                : `Add ${title} to favorites`
            }
          >
            {isFavorite ? (
              <FaRegHeart className="text-white" />
            ) : (
              <FaRegHeart className="text-black" />
            )}
          </button>
        </div>
        <div className="my-3">
          <h5 className="text-lg font-semibold text-[#000000] dark:text-white">
            {title}
          </h5>
          <h4 className="text-gray-400 line-clamp-1">{skillNames}</h4>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <FaClock className="text-[#070707]" />
              <span className="text-base">{job_type}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaSearchDollar className="text-[#000000]" />
              <span className="text-base text-gray-900 dark:text-white">
                ${salary.toLocaleString()}
              </span>
            </div>
          </div>
          <button
            onClick={handleDetailsClick}
            className=" bg-[#171716] px-4 py-2 text-center text-sm font-medium text-white hover:bg-[#515151] focus:outline-none focus:ring-2 focus:ring-[#72B261] dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
            aria-label={`View details for ${title}`}
          >
            Details
          </button>
        </div>
      </Card>
    </div>
  );
}

// Prop type validation
CardComponent.propTypes = {
  job: PropTypes.shape({
    id: PropTypes.string.isRequired,
    thumbnail: PropTypes.string,
    company_name: PropTypes.string,
    location: PropTypes.string,
    title: PropTypes.string,
    skills: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
    job_type: PropTypes.string,
    salary: PropTypes.number.isRequired,
  }),
};
