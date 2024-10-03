import "./App.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardComponent from "./components/common/cards/CardComponent.jsx";
import LoadingCards from "./components/common/cards/LoadingCards.jsx";
import HeroSectionComponent from "./components/common/HeroSection/HeroSectionComponent.jsx";
import { FaAngleRight } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAccessToken } from "./lib/secureLocalStorage";
import {
  fetchJobs,
  selectJobs,
  selectLoading,
  selectError,
} from "../src/redux/features/Cards/CardSlice.js";
import FeatureSlide from "./components/common/Feature-slice/FeatureSlide.jsx";
import BenefitSection from "./components/common/Benefits-Section/BenefitSection.jsx";

function App() {
  const dispatch = useDispatch();
  const jobs = useSelector(selectJobs);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const isAuthenticated = !!getAccessToken();

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  // Notify on error if there's one
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="flex flex-col justify-center mx-auto max-w-[1440px] xl:px-[100px]">
      {/* Hero Section */}
      <HeroSectionComponent isAuthenticated={isAuthenticated} />

    

      {/* Jobs Section */}
      <div>
        <div className="px-5 mt-7 flex justify-between w-full mx-auto max-x-[1440px] 2xl:px-0">
          <h1 className="font-bold text-2xl">Latest Jobs</h1>
          <div className="flex items-center flex-row-reverse">
            <FaAngleRight />
            <span className="text-lg">See more</span>
          </div>
        </div>
        <div className="w-full px-5 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:px-0 xl:grid-cols-4 xl:mt-2 grid-item justify-items-center gap-7">
          {loading
            ? [...Array(4)].map((_, index) => <LoadingCards key={index} />) // Show 4 loading cards
            : jobs
                .slice(0, 4)
                .map((job) => <CardComponent key={job.id} job={job} />)}{" "}
        </div>
      </div>

      

      {/* Feature Slide */}
      <FeatureSlide />

      {/* Toast Container for notifications */}
      <ToastContainer />
    </div>
  );
}

export default App;
