import { useState } from "react";

const FeatureDetails = ({ feature }) => {
  const { logo, category_name, Description } = feature;
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <div
      onClick={handleClick}
      className={`shadow-md rounded-xl p-6  m-6 text-center cursor-pointer transition duration-300
        ${isActive ? "bg-yellow-600" : "bg-[#0f1f60] hover:shadow-lg"}
      `}
    >
      <img src={logo} alt={category_name} className="w-40 h-24 mx-auto mb-4" />
      <h2 className={`text-xl font-semibold mb-2 ${isActive ? "text-black" : "text-white"}`}>
        {category_name}
      </h2>
      <p className={`text-sm ${isActive ? "text-black" : "text-white"}`}>{Description}</p>
    </div>
  );
};

export default FeatureDetails;
