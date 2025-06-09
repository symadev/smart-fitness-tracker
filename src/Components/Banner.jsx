import { Link } from "react-router-dom";
import img1 from "../assets/images/1.jpg";

const Banner = () => {
  return (
    <div className="bg-[#0f1f60] min-h-[500px] flex flex-col lg:flex-row items-center justify-between px-6 py-12 gap-4 text-white">
      
      {/* Image Section */}
   <div className="flex-shrink-0 p-2 lg:ml-20">  {/* padding moved here */}
  <img
    src={img1}
    alt="Workout"
    className="w-80 h-80 max-w-full object-cover rounded-full border-4 border-blue-500 shadow-xl"
  />
</div>


      {/* Text Section */}
      <div className="text-left max-w-xl m-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Health Made Easy <br className="hidden md:block" /> With AI
        </h1>
        <p className="mb-6 text-gray-200 leading-relaxed">
          Your body is your most valuable asset—keep it strong, agile, and energized.
          <br />
          Regular exercise not only boosts physical strength but also sharpens your mind and uplifts your mood.
        </p>
        <Link to='/AboutUs' className="btn btn-outline btn-warning rounded-xl">About Us</Link>
      </div>
    </div>
  );
};

export default Banner;
