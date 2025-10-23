import { motion } from "framer-motion";
import { FaInstagram, FaFacebook, FaYoutube, FaStar } from "react-icons/fa";

const Trainer = () => {
  const trainers = [
    {
      name: "Alex Jones",
      role: "Strength Coach",
      specialty: "HIIT & Fat Loss",
      rating: 4.9,
      bio: "10+ years of experience in transforming physiques with science-backed training.",
      image: "/assets/jon.jpg",
      socials: { instagram: "#", facebook: "#", youtube: "#" },
      delay: 0,
    },
    {
      name: "Smith Tom",
      role: "Fitness Trainer",
      specialty: "Muscle Gain",
      rating: 4.8,
      bio: "Certified body specialist helping clients build muscle and confidence.",
      image: "/assets/tom.jpeg",
      socials: { instagram: "#", facebook: "#", youtube: "#" },
      delay: 0.2,
    },
    {
      name: "Maria Adni",
      role: "Yoga & Mobility Coach",
      specialty: "Yoga / Flexibility",
      rating: 4.9,
      bio: "Mind-body balance expert specializing in deep stretches and mobility training.",
      image: "/assets/maria.jpeg",
      socials: { instagram: "#", facebook: "#", youtube: "#" },
      delay: 0.4,
    },
    {
      name: "Mohin Ahad",
      role: "Cardio Specialist",
      specialty: "Endurance & Cardio",
      rating: 4.7,
      bio: "Focused on stamina building, endurance training, and performance fitness.",
      image: "/assets/ahad.jpg",
      socials: { instagram: "#", facebook: "#", youtube: "#" },
      delay: 0.6,
    },
  ];

  return (
    <section className="bg-[#0f1f60] py-20 px-6 text-white overflow-hidden">
      {/* Section Title */}
      <div className="text-center mb-14">
        <h2 className="text-4xl font-bold mb-3 text-yellow-400">Meet Our Trainers</h2>
        <p className="text-gray-300 max-w-xl mx-auto text-lg">
          Learn from certified professionals dedicated to making your fitness journey smarter and stronger.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="flex flex-wrap justify-center gap-10">
        {trainers.map((trainer, index) => (
          <motion.div
            key={index}
            className="relative bg-[#162a80]/70 backdrop-blur-xl w-72 md:w-64 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 group border border-transparent hover:border-yellow-400"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: trainer.delay }}
          >
            {/* Image */}
            <div className="flex justify-center mb-5">
              <img
                src={trainer.image}
                alt={trainer.name}
                className="w-24 h-24 object-cover rounded-full border-2 border-yellow-400 shadow-md"
              />
            </div>

            {/* Name & Role */}
            <h3 className="text-center text-xl font-semibold">{trainer.name}</h3>
            <p className="text-center text-yellow-300 text-sm font-medium">{trainer.role}</p>

            {/* Specialty */}
            <p className="text-center text-blue-200 text-xs mt-1">{trainer.specialty}</p>

            {/* Rating */}
            <div className="flex justify-center items-center gap-1 mt-2 text-yellow-400">
              <FaStar /> <span className="text-sm">{trainer.rating}</span>
            </div>

            {/* Bio */}
            <p className="text-gray-300 text-sm text-center mt-3 leading-relaxed">
              {trainer.bio}
            </p>

           
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Trainer;
