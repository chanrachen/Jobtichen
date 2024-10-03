import React, { useState, useEffect } from "react";

export default function FilterSelection({ setSearch, job, setFilters }) {
  const [skill, setSkill] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [filteredData, setFilteredData] = useState(job);

  // Debugging: Ensure `job` has the correct structure
  useEffect(() => {
    console.log("job data received:", job); // Debug the job data
  }, [job]);

  const filterData = () => {
    let filtered = job;

    if (skill) {
      filtered = filtered.filter((item) =>
        item.skills.some((s) => s.name === skill)
      );
    }

    if (category) {
      filtered = filtered.filter((item) => item.title === category);
    }

    if (type) {
      filtered = filtered.filter((item) => item.job_type === type);
    }

    setFilteredData(filtered);
  };

  const handleSkillChange = (e) => {
    const selectedSkill = e.target.value;
    setSkill(selectedSkill);
    setFilters((prev) => ({ ...prev, skill: selectedSkill }));
    filterData();
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    setFilters((prev) => ({ ...prev, category: selectedCategory }));
    filterData();
  };

  const handleTypeChange = (e) => {
    const selectedType = e.target.value;
    setType(selectedType);
    setFilters((prev) => ({ ...prev, type: selectedType }));
    filterData();
  };

  return (
    <div className="max-w-[1440px] mx-auto xl:px-[100px]">
      <form className="">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#72B261] focus:border-[#0f0f0f] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search..."
            required
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </form>

      <div className="grid lg:grid-cols-3 gap-1 border p-4 rounded-sm">
        {/* Category Dropdown */}
        <div className="">
          <select
            value={category}
            onChange={handleCategoryChange}
            className=" text-base 2xl:text-lg text-sky-900 border border-black focus:ring-[#474847] focus:border-[#3a3c38] rounded-md sm:w-[100%] min-[350px]:w-[100%] w-full"
          >
            <option value="" >Category</option>
            {job?.length > 0 ? (
              job.map((item) => (
                <option 
                key={item.id} value={item.title}>
                  {item.title}
                  
                </option>
              ))
            ) : (
              <option value="">No Categories Available</option>
            )}
          </select>
        </div>

        {/* Skill Dropdown */}
        <div className="">
          <select
            value={skill}
            onChange={handleSkillChange}
            className=" text-base 2xl:text-lg text-sky-900 border border-black focus:ring-[#474847] focus:border-[#3a3c38] rounded-md sm:w-[100%] min-[350px]:w-[100%] w-full"
          >
            <option value="">Skill</option>
            {job?.length > 0 ? (
              job
                .flatMap((item) => item.skills)
                .map((skill, index) => (
                  <option key={index} value={skill.name}>
                    {skill.name}
                  </option>
                ))
            ) : (
              <option value="">No Skills Available</option>
            )}
          </select>
        </div>

        {/* Type Dropdown */}
        <div className="w-full">
          <select
            value={type}
            onChange={handleTypeChange}
            className=" text-base 2xl:text-lg text-sky-900 border border-black focus:ring-[#474847] focus:border-[#3a3c38] rounded-md sm:w-[100%] min-[350px]:w-[100%] w-full"
          >
            <option value="">Type</option>
            {job?.length > 0 ? (
              [...new Set(job.map((item) => item.job_type))].map(
                (type, index) => (
                  <option 
                  key={index} value={type}>
                    {type}
                  </option>
                )
              )
            ) : (
              <option value="">No Job Types Available</option>
            )}
          </select>
        </div>
      </div>
    </div>
  );
}
