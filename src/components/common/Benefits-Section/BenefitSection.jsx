import React from "react";
import { FaUsers, FaThumbsUp, FaUserTie } from "react-icons/fa";
import interviewImage from "/src/assets/online-interview.png"; // Importing the image

export default function BenefitSection() {
  return (
    <div>
      <div className="px-4 my-32 flex flex-col md:flex-row max-w-[1440px] justify-between 2xl:px-0">
        <div className="mt-4 md:mt-0 md:max-w-[60%]">
          <span className="block text-xl sm:text-2xl md:text-3xl font-bold text-black ">
            Benefits
          </span>
          <br />
          <span className="block text-base sm:text-lg md:text-xl">
            Adding People Strategy in Every Company.
          </span>

          <div className="flex flex-col mt-4 gap-6">
            <div className="flex gap-6 items-center">
              <div className="bg-[#72B261] hover:bg-[#83B348] w-12 h-12 flex items-center justify-center rounded-full flex-shrink-0">
                <FaUsers className="text-white text-xl sm:text-2xl" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-bold">
                  Be a Real Employee
                </span>
                <span className="text-sm sm:text-base">
                  Connect with verified job listings, ensuring genuine
                  opportunities that match your skills.
                </span>
              </div>
            </div>
            <div className="flex gap-6 items-center">
              <div className="bg-[#72B261] hover:bg-[#83B348] w-12 h-12 flex items-center justify-center rounded-full flex-shrink-0">
                <FaThumbsUp className="text-white text-xl sm:text-2xl" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-bold">
                  Verified Listings
                </span>
                <span className="text-sm sm:text-base">
                  Ensuring genuine opportunities that match your skills.
                </span>
              </div>
            </div>
            <div className="flex gap-6 items-center">
              <div className="bg-[#72B261] hover:bg-[#83B348] w-12 h-12 flex items-center justify-center rounded-full flex-shrink-0">
                <FaUserTie className="text-white text-xl sm:text-2xl" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-bold">
                  Professional Growth
                </span>
                <span className="text-sm sm:text-base">
                  Opportunities that foster professional growth.
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Image Section */}
        <div className="h-[250px] sm:h-[300px] md:h-[300px] flex justify-center items-center mt-4 md:mt-0">
          <img
            className="w-full h-full object-contain md:object-cover rounded-lg"
            src={interviewImage} // Using the imported image
            alt="Online Interview"
          />
        </div>
      </div>
    </div>
  );
}
