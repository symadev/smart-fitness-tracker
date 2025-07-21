import img2 from "../assets/images/123.jpg";

const Summery = () => {
  return (
    <section className="bg-[#0f1f60] min-h-[500px] flex flex-col lg:flex-row items-center justify-between px-6 py-12  text-white">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12">
        
        {/* Text Section */}
        <div className="flex-1 space-y-6 text-left">
          <h2 className="text-3xl text-yellow-400  sm:text-4xl font-bold leading-tight">
            Smarter Fitness, <br className="hidden sm:block" /> Personalized for You
          </h2>
          <p className="text-gray-200 text-lg leading-relaxed">
            At <span className="text-white font-semibold">SmartFit</span>, we harness the power of artificial intelligence to transform the way you approach fitness. Our platform provides intelligent workout recommendations tailored to your fitness level, goals, and lifestyle.
          </p>
          <p className="text-gray-200 text-lg leading-relaxed">
            Whether you're training at home or in the gym, SmartFit tracks your progress, analyzes your performance, and adapts your plan in real-time to maximize results.
          </p>
          <p className="text-gray-200 text-lg leading-relaxed">
            With automated workout tracking, personalized coaching, and wellness insights, we make staying fit easier, smarter, and more motivating than ever before.
          </p>
        </div>

        {/* Image Section with effects */}
        <div className="flex-1 flex justify-center">
          <div className="relative group w-full max-w-md">
            {/* Glow Effect */}
            <div className="absolute -inset-6 bg-gradient-to-r from-yellow-400 via-blue-400 to-purple-400 opacity-20 rounded-2xl blur-2xl group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>

            {/* Border Spin */}
            <div
              className="absolute -inset-2 bg-gradient-to-r from-yellow-400 via-blue-400 to-purple-400 rounded-2xl opacity-75"
             
            ></div>
            <div className="absolute inset-0 bg-[#0f1f60] rounded-2xl z-0"></div>

            {/* Main Image */}
            <img
              src={img2}
              alt="SmartFit Workout"
              className="relative z-10 w-full h-auto object-cover rounded-2xl border-4 border-white/10 shadow-2xl group-hover:scale-[1.02] transition-all duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Summery;
