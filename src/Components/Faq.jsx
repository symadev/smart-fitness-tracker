import img5 from "../assets/images/5.png";

const Faq = () => {
    return (
        <div
            className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center text-white"
            style={{ backgroundImage: `url(${img5})` }}
        >
            <div className="  bg-black bg-opacity-10 p-8 rounded-xl max-w-xl w-full text-center mb-32">

                <p className="mb-4 text-4xl md:text-5xl font-bold">
                    Try AI— Your Personal <br />
                    Health Coach!
                </p>
                <button className="btn btn-outline btn-warning rounded-xl">Talk To AI Coach</button>
            </div>
        </div>
    );
};

export default Faq;
