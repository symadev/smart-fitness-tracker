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
    <div className="min-h-[500px] bg-[#0f1f60] py-16 px-6 flex flex-col items-center">
      {/* Section Title */}
      <div className="text-center mb-12 max-w-2xl">
        <h2 className="text-4xl font-bold text-white">Why SmartFit!</h2>
      </div>

      {/* Cards Container */}
      <div className="flex flex-wrap justify-center gap-8">
        {cardData.map((card, index) => (
          <motion.div
            key={index}
            className="bg-[#162a80] w-72 md:w-64 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: card.delay }}
          >
            <div className="flex justify-center mb-4">
              <img
                src={card.image}
                alt="Feature"
                className="w-20 h-20 object-contain"
              />
            </div>
            <h3 className="text-white text-center text-base font-medium leading-snug">
              {card.title}
            </h3>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CardSecond;
