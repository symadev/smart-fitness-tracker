

import img1 from "../assets/images/trainer.jpg"
const Motivation = () => {
    return (
        <div className="bg-[#0f1f60] min-h-[400px] flex flex-col lg:flex-row items-center justify-between p-10 gap-4 text-white">

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

                <h2 className="mb-2 -mt-6 text-xl font-medium text-gray-200 leading-relaxed">
                    ❝ “Fitness isn’t about perfection — it’s about progress. At SmartFit, we built AI not to replace effort, but to reward it. Every rep, every step, every small win matters. Let the data guide you, but let your discipline define you.”
                    — Jon Alex, Founder of SmartFit
                </h2>


            </div>
        </div>
    );
};

export default Motivation;