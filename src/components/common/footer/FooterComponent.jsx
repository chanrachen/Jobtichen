import React from "react";
import { Footer } from "flowbite-react";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import { FaEnvelope } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

export default function FooterComponent() {
  return (
    <Footer
      container
      className="bg-black max-w-[1440px] mx-auto mt-5 2xl:px-[100px] xl:px-[100px] "
    >
      <div className="w-full">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-bold text-white">
              jobtichen
            </h1>
            <div className="mt-4 flex-col flex space-x-6 sm:mt-0 sm:justify-center gap-7 text-white">
              <h2>
                Welcome to JobNest, the ultimate job search <br></br> platform
                designed to connect talented<br></br> professionals with top
                employers across diverse industries.
              </h2>
              <div className="flex gap-6">
                <div className="bg-slate-400 p-2 rounded-full">
                  <Footer.Icon
                    className="bg-black text-black"
                    href="https://web.facebook.com/profile.php?id=100014499966129
"
                    icon={FaFacebookF}
                  />
                </div>
                <div className="bg-slate-400 p-2 rounded-full">
                  <Footer.Icon
                    className="text-black"
                    href="https://web.telegram.org/a/"
                    icon={FaTelegramPlane}
                  />
                </div>

                <div className="bg-slate-400 p-2 rounded-full">
                  <Footer.Icon
                    className="text-black"
                    href="https://x.com/SNivoth47593
"
                    icon={FaTwitter}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="grid mt-4 grid-cols-1 gap-8 sm:mt-4 sm:grid-cols-2 sm:gap-6 gird-item">
            <div>
              <Footer.Title title="Categories" className="text-white" />
              <Footer.LinkGroup col className="text-white">
                <Footer.Link href="#">Full Time</Footer.Link>
                <Footer.Link href="#">Part Time</Footer.Link>
                <Footer.Link href="#">Internship</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Our Contacts" className="text-white" />
              <Footer.LinkGroup col className="text-white">
                <div className="flex gap-1">
                  <Footer.Icon icon={FaLocationDot} />
                  <Footer.Link href="#">
                    #206A, 150z , Khan Toul Kork , Phnom Penh{" "}
                  </Footer.Link>
                </div>
                <div className="flex gap-1">
                  <Footer.Icon icon={FaPhoneAlt}></Footer.Icon>
                  <Footer.Link href="#">+855 965 388 074</Footer.Link>
                </div>
                <div className="flex gap-1">
                  <Footer.Icon icon={FaClock}></Footer.Icon>
                  <Footer.Link href="#">
                    Monday — Friday<br></br>8:00am - 6:00pm
                  </Footer.Link>
                </div>
                <div className="flex gap-1">
                  <Footer.Icon icon={FaEnvelope}></Footer.Icon>
                  <Footer.Link href="#">JobNest@yahoo.com.kh</Footer.Link>
                </div>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full justify-center sm:flex sm:items-center sm:justify-center ">
          <Footer.Copyright
            className="flex justify-center text-white"
            href="#"
            by="jobtichen™"
            year={2024}
          />
        </div>
      </div>
    </Footer>
  );
}
