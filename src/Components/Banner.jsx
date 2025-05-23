import img1 from "../assets/images/1.png";

const Banner = () => {
  return (
<div
  className="relative bg-cover bg-center bg-no-repeat h-[500px] flex items-center justify-start text-white px-6 md:px-16"
  style={{ backgroundImage: `url(${img1})` }}
>
  <div className=" p-8 rounded-xl text-left max-w-2xl w-full">
    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
      Be Physically Fit <br /> And Healthy
    </h1>
    <p className="text-gray-200 mb-6">
      Your body is your most valuable asset—keep it strong, agile, and energized.
      Regular exercise not only boosts physical strength but also sharpens your mind and uplifts your mood.
    </p>
    <button className="btn btn-outline btn-warning rounded-xl">
      About Us
    </button>
  </div>
</div>

  );
};

export default Banner;
