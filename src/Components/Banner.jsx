// import img1 from "../assets/images/1.png"
// import img2 from "../assets/images/2.png"
// import img3 from "../assets/images/3.png"
// import img4 from "../assets/images/4.png"

const Banner = () => {
  return (
    <div className="bg-blue-950 py-16">
      <div className="container mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-12">
        
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

        {/* Right image collage */}
        <div className="md:w-1/2 grid grid-cols-2">
          {/* <img src={img1} alt="Beauty 1" className="rounded-lg" />
          <img src={img2} alt="Beauty 2" className="rounded-lg" />
          <img src={img3} alt="Beauty 3" className="rounded-lg" />
          <img src={img4} alt="Beauty 4" className="rounded-lg" /> */}
        </div>
      </div>
    </div>
  );
};

export default Banner;
