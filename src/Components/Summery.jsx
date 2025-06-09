import img2 from "../assets/images/123.jpg";

const Summery = () => {
  return (
    <div className="bg-[#0f1f60] min-h-[500px] flex flex-col lg:flex-row items-center justify-between px-8 py-16 gap-10 text-white">
      
      {/* Text Section */}
      <div className="max-w-xl space-y-4 text-left">
        <h2 className="text-3xl font-semibold text-white">
          Smarter Fitness, Personalized for You
        </h2>
        <p className="text-gray-200 leading-relaxed text-lg">
          At <span className="text-white font-semibold">SmartFit</span>, we harness the power of artificial intelligence to transform the way you approach fitness. Our platform provides intelligent workout recommendations tailored to your fitness level, goals, and lifestyle.
        </p>
        <p className="text-gray-200 leading-relaxed text-lg">
          Whether you're training at home or in the gym, SmartFit tracks your progress, analyzes your performance, and adapts your plan in real-time to maximize results.
        </p>
        <p className="text-gray-200 leading-relaxed text-lg">
          With automated workout tracking, personalized coaching, and wellness insights, we make staying fit easier, smarter, and more motivating than ever before.
        </p>
      </div>

      {/* Image Section */}
      <div className="flex-shrink-0 lg:ml-10">
        <img
          src={img2}
          alt="Workout"
          className="w-96 h-80 mr-12 object-cover rounded-2xl shadow-xl border-2 border-white/10"
        />
      </div>
    </div>
  );
};

export default Summery;
