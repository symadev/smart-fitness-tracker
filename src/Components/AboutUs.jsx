import { useEffect, useState } from "react";

import CardSecond from "./CardSecond";
import Motivation from "./Motivation";
import Summery from "./Summery";
import Trainer from "./Trainer";

const AboutUs = () => {

   const [isVisible, setIsVisible] = useState(false);
  
    useEffect(() => {
      setIsVisible(true);
    }, []);
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <div className="bg-[#0f1f60] min-h-[500px] flex flex-col lg:flex-row items-center justify-between px-6 py-12  text-white">

      

        {/* Image Section */}
        <div className={`flex-1 flex justify-center  transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
          <div className="relative group">

            {/* Glow effects */}
            <div className="absolute -inset-8 bg-gradient-to-r from-yellow-400 via-blue-400 to-purple-400 opacity-20 rounded-full blur-2xl group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>

            {/* Rotating border */}
            <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400 via-blue-400 to-purple-400 rounded-full opacity-75" style={{ animation: 'spin 10s linear infinite' }}></div>
            <div className="absolute -inset-2 bg-blue-900 rounded-full"></div>

            {/* Main image */}
            <div className="relative">
              <img
                src="/assets/Health-Coaching-Services-Downtown-Austin-TX-scaled.jpg"
                alt="Workout"
                className="w-96 h-96 max-w-full object-cover rounded-full border-4 border-white border-opacity-20 shadow-2xl group-hover:scale-105 transition-all duration-500 relative z-10"
              />

            </div>
          </div>
        </div>

        {/* Text */}
        <div className="max-w-2xl px-4 animate-fadeInRight">
          <h2 className=" text-yellow-400 via-yellow-200  bg-clip-text text-4xl lg:text-4xl font-bold leading-snug  ">
            Empower Your Fitness Journey with SmartFit
          </h2>
          <p className="text-lg leading-relaxed text-gray-300">
            ❝ At <span className="font-semibold text-white">SmartFit</span>, our mission is to revolutionize fitness by combining cutting-edge AI technology with personalized coaching. We empower users to achieve their health goals through smart, data-driven insights and continuous motivation. ❞
          </p>
        </div>
      </div>

      {/* Summary Section */}
      <div className=" bg-gray-100">
        <Summery />
      </div>

      {/* Cards Section */}
      <div className=" bg-white">
        <CardSecond />
      </div>

      {/* Motivation Section */}
      <div className=" bg-blue-50">
        <Motivation />
      </div>

        <div className=" bg-white">
        <Trainer />
      </div>
    </div>

  
  );
};

export default AboutUs;
