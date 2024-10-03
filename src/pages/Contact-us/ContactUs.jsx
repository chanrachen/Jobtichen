import React from "react";
import { FaPhoneAlt, FaEnvelope, FaClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
export default function ContactUs() {
  return (
    <div className="flex py-[96px] w-full">
      <div className="2xl:px-[100px] max-w-[1440px] grid sm:grid-cols-2 items-start gap-16 p-4 mx-auto bg-white font-[sans-serif]">
        <div>
          <h1 className="text-gray-800 text-3xl font-extrabold font-[Inter]">
            Lets Talk
          </h1>
          <div  className="mt-7 flex flex-col gap-4">
          <div className="flex items-center space-x-2">
            <FaLocationDot className="text-black" />
            <span>Phnom Penh</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaPhoneAlt className="text-black" />
            <span>+855 12 43 77 44</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaEnvelope className="text-black" />
            <span>chanrachen@gmail.com</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaClock className="text-black" />
            <div className="flex flex-col space-y-1">
              <span>Monday - Friday</span>
              <span>8:00AM - 6:00PM</span>
            </div>
          </div>
          </div>
          {/* map */}
          <div className="mt-4 w-full">
            <iframe
                id="map"
              className="rounded-[5px] w-full h-[200px] sm:w-[370px] lg:w-[500px] xl:w-[600px]"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1954.4159217959373!2d104.89610997365496!3d11.563909700000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109510b9d94d941%3A0x3b31f022c47142bf!2s200%20St%20150%2C%20Phnom%20Penh!5e0!3m2!1sen!2skh!4v1725008510685!5m2!1sen!2skh"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        <form className="ml-auto space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full rounded-md py-3 px-4  text-gray-800 text-sm outline-[#020201] focus:ring-[#000000] focus:border-[#151515] focus:bg-transparent "
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-md py-3 px-4  text-gray-800 text-sm outline-[#020201] focus:ring-[#000000] focus:border-[#151515] focus:bg-transparent"
          />
          <input
            type="text"
            placeholder="Subject"
            className="w-full rounded-md py-3 px-4  text-gray-800 text-sm outline-[#020201] focus:ring-[#000000] focus:border-[#151515] focus:bg-transparent"
          />
          <textarea
            placeholder="Message"
            rows="6"
            className="w-full rounded-md py-3 px-4  text-gray-800 text-sm outline-[#020201] focus:ring-[#000000] focus:border-[#151515] focus:bg-transparent"
          ></textarea>
          <button
            type="button"
            className="text-white bg-[#131413] hover:bg-[#4f504f] tracking-wide rounded-md text-sm px-4 py-3 w-full !mt-6"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
