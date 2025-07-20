import { useState } from "react";

const FeatureDetails = ({ feature }) => {
  const { logo, category_name, Description } = feature;
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <div 
      className={`relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${
        isActive 
          ? 'bg-gradient-to-br from-blue-800 to-purple-900 shadow-xl' 
          : 'bg-gradient-to-br from-blue-800 to-purple-900  shadow-lg'
      }`}
      onClick={handleClick}
    >
      {/* Animated background overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000"></div>
      
      {/* Content */}
      <div className="relative p-6 text-white">
        {/* Logo section */}
        <div className="flex items-center justify-center mb-4">
          <div className="  flex items-center justify-center ">
            <img 
              src={logo} 
              alt={category_name}
              className="w-24 h-24 object-contain"
            />
          </div>
        </div>
        
        {/* Category name */}
        <h3 className="text-xl font-bold text-center mb-3 text-white drop-shadow-sm">
          {category_name}
        </h3>
        
        {/* Description */}
        <p className="text-blue-100 text-center leading-relaxed text-sm">
          {Description}
        </p>
        
        {/* Active indicator */}
        {isActive && (
          <div className="absolute top-4 right-4">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
          </div>
        )}
        
        {/* Bottom accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-300 via-blue-200 to-blue-300"></div>
      </div>
    </div>
  );
};

export default FeatureDetails;