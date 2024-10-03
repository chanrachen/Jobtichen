// src/components/MySaveJobs.jsx
import React from "react";
import { useSelector } from "react-redux";
import { selectFavorites } from "../../src/redux/features/Cards/CardSlice"; 
import CardComponent from "../../src/components/common/cards/CardComponent"; 

export default function MySaveJobs() {
  const favorites = useSelector(selectFavorites);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-4">My Saved Jobs</h1>
      {favorites.length === 0 ? (
        <p className="text-gray-500">You have no saved jobs.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {favorites.map((job) => (
            <CardComponent key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
