import { motion } from "framer-motion";
import img1 from "../assets/images/1.jpg";
import img2 from "../assets/images/2.jpg";
import img3 from "../assets/images/3.jpg";
import img4 from "../assets/images/4.jpg";

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1.0 } },
};

const Banner = () => {
  return (
    <div className="bg-blue-950 py-16">
      <div className="container mx-auto px-10 py-10 flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* Left text content */}
        <div className="md:w-1/2 text-center md:text-left text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Be Physically Fit <br /> And Healthy
          </h1>
          <p className="text-gray-300 mb-6">
            Your body is your most valuable asset—keep it strong, agile, and energized. Regular exercise not only boosts physical strength but also sharpens your mind and uplifts your mood. 
            A balanced diet fuels your body, while good sleep restores it.
          </p>
          <button className="btn btn-outline btn-warning rounded-xl">
            About Us
          </button>
        </div>

        {/* Right image collage with Framer Motion */}
        <div className="md:w-1/2 grid grid-cols-2 gap-4">
          {[img1, img2, img3, img4].map((img, i) => (
            <motion.img
              key={i}
              src={img}
              alt={`Workout ${i + 1}`}
              className="rounded-lg"
              variants={imageVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
