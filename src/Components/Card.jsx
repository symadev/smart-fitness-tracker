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
      <div className="flex flex-wrap justify-center">
        {cardData.map((card, index) => (
          <motion.div
            key={index}
            className="card bg-[#0f1f60] w-72 md:w-64 shadow-xl m-4 rounded-xl"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: card.delay }}
          >
            <figure className="px-4 pt-4">
              <img
                src={card.image}
               
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
