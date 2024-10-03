import React, { useEffect, useState } from "react";
import FilterSelection from "./Meterial/FilterSelection";
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from "react-redux";
import {
  selectJobs,
  fetchJobs,
  selectLoading,
} from "../../../src/redux/features/Cards/CardSlice";
import LoadingCards from "../../components/common/cards/LoadingCards";
import CardComponent from "../../components/common/cards/CardComponent";

export default function Jobs() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  // Use selectors to get the jobs, loading state, and filter status from Redux
  const Jobs = useSelector(selectJobs) || []; // Default to an empty array
  const isLoading = useSelector(selectLoading);
  const [filters, setFilters] = useState({ skill: "", category: "", type: "" });

  useEffect(() => {
    // Fetch jobs only if not already loading
    dispatch(fetchJobs());
  }, [dispatch]);

  // Filter jobs based on the current search input and selected filters
  const filteredJobs = Jobs.filter((job) => {
    return (
      (filters.skill === "" ||
        job.skills.some((skill) => skill.name === filters.skill)) &&
      (filters.category === "" || job.title === filters.category) &&
      (filters.type === "" || job.job_type === filters.type) &&
      (search === "" || job.title.toLowerCase().includes(search.toLowerCase()))
    );
  });

  return (
    <div className="bg-gray-100 ">
     
        <section className="px-4 w-full max-lg:col-span-2 bg-white  p-5">
          <FilterSelection
            setSearch={setSearch}
            setFilters={setFilters}
            job={Jobs}
          />
        </section>
        <section className="w-full mx-auto   bg-white shadow-md">
          <div className="max-w-[1440px]  xl:px-[100px] px-5 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 grid-item justify-items-center gap-7 p-5">
            {/* Show loading state */}
            {isLoading &&
              [1, 2, 3].map((_, index) => <LoadingCards key={index} />)}

            {/* Map through filtered jobs */}
            {!isLoading && filteredJobs.length > 0 && filteredJobs.map((itemJ, index) => (
              <CardComponent job={itemJ} key={index} />
            ))}

            {/* Display message when no jobs are found */}
            {!isLoading && filteredJobs.length === 0 && (
              <p className="text-center text-gray-500 mt-4">No jobs found for your filters</p>
            )}
          </div>
        </section>
    
    </div>
  );
}