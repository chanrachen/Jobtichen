import React from "react";
import img1 from "/src/assets/logo-company-fnP/bizkhmer-logo.png";
import img2 from "/src/assets/logo-company-fnP/61d501f25761a_1641349560_small.png";
import img3 from "/src/assets/logo-company-fnP/CCTimeKH_Head-Logo_H56px.png";
import img4 from "/src/assets/logo-company-fnP/LOGO-CEN-Final.png";
export default function FeatureSlide() {
  const images = [img1, img2, img3, img4];
  
  return (
    <div>
      <div className="px-4">
        <div className="mb-4 flex flex-col max-w-[1440px] mx-auto md:h-[400px] md:mt-10 justify-evenly">
          {/* Text Section */}
          <div className="text-center mb-6 md:mb-0">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold">
            Our Collaboration
            </h1>
            <span className="block text-sm sm:text-base md:text-lg mt-2">
            Our collaboration has been marked by open communication and a shared commitment to excellence, ensuring that every project is approached with creativity and precision. Together, we've consistently turned challenges into opportunities, achieving results that exceed expectations.
            </span>
          </div>
          {/* Logos Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {images.map((imgSrc, index) => (
              <div
                key={index}
                className="flex bg-white border w-full h-[80px] sm:h-[100px] justify-center items-center rounded-[5px] shadow"
              >
                <a
                  
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-full flex justify-center items-center"
                >
                  <img
                    src={imgSrc}
                    alt={`Company Logo ${index + 1}`}
                    className="max-h-full max-w-full object-contain"
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
