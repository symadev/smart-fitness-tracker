
import img1  from "../assets/images/Health-Coaching-Services-Downtown-Austin-TX-scaled.jpg"
import Summery from "./Summery";

const AboutUs = () => {
    return (
      <div>
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
        
        <h2 className="mb-2 text-2xl font-medium text-gray-200 leading-relaxed">
          ❝ At SmartFit, our mission is to revolutionize fitness by combining cutting-edge AI technology with personalized coaching. We empower users to achieve their health goals through smart, data-driven insights and motivation.❞
        </h2>
       
       
      </div>
    </div>

    <Summery></Summery>
    </div>
    );
};

export default AboutUs;