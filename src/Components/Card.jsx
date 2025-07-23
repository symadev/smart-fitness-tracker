import React, { useContext } from 'react';
import { AuthContext } from "./Provider.jsx/AuthContext";
import { useNavigate } from 'react-router-dom';

const Card = () => {

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();



  const handleFitnessClick = () => {
    if (user) {
      navigate('/dashboard/home');
    } else {

      navigate('/login');
    }
  };

  const cardData = [
    {
      title: "A mind-body practice that combines breathing, postures, and meditation",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "YOGA",
      delay: 0,
    },
    {
      title: "Just 30 minutes a day can make a big difference in your overall health.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "WELLNESS",
      delay: 0.2,
    },
    {
      title: "Doing at least 150 minutes per week is recommended for good health",
      image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "CARDIO",
      delay: 0.4,
    },
    {
      title: "Start with knee push-ups if you're a beginner.",
      image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "STRENGTH",
      delay: 0.6,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f1f60]  py-16 px-6">


      <div className="relative max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <div className="inline-block">
            <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-yellow-100 to-yellow-400 mb-4 leading-tight">
              Smart Fitness Tips
            </h2>
            <div className="text-xl md:text-3xl font-light text-gray-300 mb-6">
              to Kickstart  Your Journey!
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
          </div>
        </div>

        {/* Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {cardData.map((card, index) => (
            <div
              key={index}
              className="group relative hover:scale-105 hover:rotate-y-1 transition-all duration-300"

            >
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-purple-500/20">
                {/* Image Container */}
                <div className="absolute inset-0">
                  <img
                    src={card.image}
                    alt={card.category}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-transparent to-blue-600/20 opacity-60"></div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 text-xs font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg border border-white/20">
                    {card.category}
                  </span>
                </div>



                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white text-lg font-semibold leading-tight drop-shadow-lg group-hover:text-purple-100 transition-colors duration-300">
                      {card.title}
                    </p>
                  </div>
                </div>


              </div>


            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button
            onClick={handleFitnessClick}
            className="relative px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 text-white font-bold text-lg rounded-full shadow-2xl overflow-hidden group transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 border border-white/20"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
            <span className="relative z-10">Start Your Fitness Journey</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;