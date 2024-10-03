import React from "react";
import { Link } from "react-router-dom";
import heroImage from "/src/assets/hero.jpg"; // Importing the background image

export default function HeroSectionComponent({ isAuthenticated }) {
  return (
    <div className="relative bg-gray-900 bg-opacity-100 py-24 md:py-32 lg:py-40 min-h-[60vh]">
      <div className="absolute inset-0">
        <img
          src={heroImage} // Using the imported image
          alt="Background Image"
          className="w-full h-full object-cover opacity-50"
        />
      </div>

      <div className="relative flex flex-col max-w-screen-xl px-8 z-10  text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
          Aboute Us
        </h1>
        <p className="text-lg md:text-xl mb-12">
        Jobtichen is a web can help you to find any job u want.
        feel free to contact us.
        </p>
        <Link to={isAuthenticated ? "/find-jobs" : "/login"}>
          <button
            type="button"
            className="hover:bg-[#555851] text-white text-base tracking-wide px-6 py-3  transition bg-black duration-300 ease-in-out shadow-lg hover:shadow-xl"
          >
            {isAuthenticated
              ? "Find job now!"
              : "Find job now!"}
          </button>
        </Link>
      </div>
    </div>
  );
}
