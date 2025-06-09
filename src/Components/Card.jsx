import { motion } from "framer-motion";

const Card = () => {
  const cardData = [
    {
      title: "A mind-body practice that combines breathing, postures, and meditation",
      image: "/src/assets/images/2.jpg", // assuming this is in the /public/images/ folder
      
      delay: 0,
    },
    {
      title: "Just 30 minutes a day can make a big difference in your overall health.",
      image: "/src/assets/images/3.jpg",
     
      delay: 0.2,
    },
    {
      title: "Doing at least 150 minutes per week is recommended for good health",
      image: "/src/assets/images/cardio.jpg",
     
      delay: 0.4,
    },
    {
      title: "Start with knee push-ups if you're a beginner.",
      image: "/src/assets/images/push up.png",
     
      delay: 0.6,
    },
  ];

  return (
    <div className="min-h-[500px] bg-[#0f1f60] p-6 flex flex-col items-center">
  {/* Section Title */}
  <div className="text-center mb-8 max-w-2xl">
    <h2 className="text-4xl md:text-4xl font-bold text-white leading-snug">
      Smart Fitness Tips to Kickstart <br />
      Your Journey!
    </h2>
  </div>

  {/* Cards Container */}
  <div className="flex flex-wrap justify-center">
    {cardData.map((card, index) => (
      <motion.div
        key={index}
        className="card bg-[#0f1f60] w-40 h-24 mx-auto mb-4"
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: card.delay }}
      >
        <figure className="px-4 pt-4">
          <img
            src={card.image}
            alt="Fitness tip"
            className="rounded-lg w-full h-32 object-cover"
          />
        </figure>
        <div className="card-body p-4 items-center text-center">
          <h2 className="card-title text-lg text-white">{card.title}</h2>
        </div>
      </motion.div>
    ))}
  </div>
</div>

  );
};

export default Card;
