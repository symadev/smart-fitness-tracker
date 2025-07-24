import { Link } from "react-router-dom";
import img1 from "../assets/images/1.jpg";
import { useState, useEffect } from "react";

const Banner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative overflow-hidden bg-[#0f1f60]  min-h-screen flex items-center">



      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">

         {/* Text Section */}
<div
  className={`flex-1 text-left max-w-2xl ml-4 transform transition-all duration-1000 ${
    isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
  }`}
>
  {/* Main Heading */}
  <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
    <span className="bg-gradient-to-r from-white via-yellow-100 to-yellow-400 bg-clip-text text-transparent block">
      Your Fitness Journey
    </span>
    <span className="bg-gradient-to-r from-yellow-400 via-yellow-200 to-white bg-clip-text text-transparent block">
      Powered by AI
    </span>
  </h1>

  {/* Description */}
  <p className="text-lg md:text-xl mb-8 text-gray-200 leading-relaxed font-light">
    Your body is your most{" "}
    <span className="text-yellow-400 font-semibold">valuable asset</span> — keep it strong, agile, and energized.
    <br className="hidden md:block" />
    <span className="text-blue-300 font-medium">Regular exercise</span> not only builds physical strength, but also sharpens your mind and uplifts your mood.
  </p>

  {/* CTA Buttons */}
  <div className="flex flex-col sm:flex-row gap-4">
    <Link
      to="/AboutUs"
      className="group relative overflow-hidden bg-gradient-to-r from-yellow-500 to-yellow-400 text-black px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
    >
      <span className="relative z-10 flex items-center gap-2">
        About Us
        <svg
          className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </Link>
  </div>
</div>


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
                  src={img1}
                  alt="Workout"
                  className="w-96 h-96 max-w-full object-cover rounded-full border-4 border-white border-opacity-20 shadow-2xl group-hover:scale-105 transition-all duration-500 relative z-10"
                />

              </div>
            </div>
          </div>

        </div>
      </div>


    </div>
  );
};

export default Banner;