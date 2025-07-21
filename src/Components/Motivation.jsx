import { motion } from "framer-motion";
import img1 from "../assets/images/trainer.jpg";

const Motivation = () => {
  return (
    <section className="bg-[#0f1f60] py-20 px-6 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        
        {/* Image Section with glow effect */}
        <motion.div
          className="relative flex-shrink-0"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Glow Border */}
          <div className="absolute -inset-4 bg-gradient-to-tr from-yellow-400 via-blue-500 to-purple-600 opacity-30 rounded-2xl blur-2xl z-0 animate-pulse" />
          <img
            src={img1}
            alt="Founder"
            className="relative z-10 w-80 h-80 object-cover rounded-2xl border-3 border-blue-500 shadow-2xl"
          />
        </motion.div>

        {/* Quote Text Section */}
        <motion.div
          className="relative max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <div className="bg-[#162a80] rounded-2xl p-6 md:p-8 shadow-xl border border-white/10 relative">
            <p className="text-lg sm:text-xl font-light leading-relaxed text-gray-100 italic">
              ❝ Fitness isn’t about perfection — it’s about progress. At <span className="font-semibold text-white">SmartFit</span>, we built AI not to replace effort, but to reward it. Every rep, every step, every small win matters. Let the data guide you, but let your discipline define you. ❞
            </p>
            <div className="mt-4 text-right text-yellow-300 font-semibold text-base">
              — Jon Alex, Founder of SmartFit
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Motivation;
