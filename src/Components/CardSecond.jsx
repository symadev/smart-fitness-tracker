import { motion } from "framer-motion";

const CardSecond = () => {
  const cardData = [
    {
      title: "AI-Driven: Custom recommendations for workouts, rest, and nutrition",
      image: "/src/assets/images/ai.png",
      delay: 0,
    },
    {
      title: "Progress Tracking: Visualize fitness improvements in real time.",
      image: "/src/assets/images/graph.png",
      delay: 0.2,
    },
    {
      title: "Smart Goals: Adjusts to your pace and lifestyle",
      image: "/src/assets/images/target.png",
      delay: 0.4,
    },
    {
      title: "Data Privacy: Your fitness data stays secure",
      image: "/src/assets/images/lock.png",
      delay: 0.6,
    },
  ];

  return (
    <section className="bg-[#0f1f60] py-20 px-6 text-white overflow-hidden">
      {/* Section Title */}
      <div className="text-center mb-14">
        <h2 className="text-4xl font-bold mb-3 text-yellow-400 via-yellow-200 ">Why SmartFit!</h2>
        <p className="text-gray-300 max-w-xl mx-auto text-lg">
          Discover the smart advantages that make your fitness journey efficient, engaging, and personalized.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="flex flex-wrap justify-center gap-10">
        {cardData.map((card, index) => (
          <motion.div
            key={index}
            className="relative bg-[#162a80] w-72 md:w-64 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: card.delay }}
          >
            {/* Glow Border */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-blue-400 to-purple-600 opacity-20 rounded-2xl blur-xl group-hover:opacity-40 transition-opacity duration-500 z-0" />
            <div className="relative z-10">
              <div className="flex justify-center mb-5">
                <img
                  src={card.image}
                  alt="Feature"
                  className="w-20 h-20 object-contain drop-shadow-md"
                />
              </div>
              <h3 className="text-center text-white text-base font-semibold leading-snug">
                {card.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CardSecond;
