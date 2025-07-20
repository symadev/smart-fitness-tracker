import React, { useEffect, useState } from 'react';

const Testimonial = () => {
  const [reviews, setReviews] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    fetch('/review.json')
      .then(res => res.json())
      .then(data => setReviews(data))
      .catch(error => {
        console.error('Error loading reviews:', error);
      });
  }, []);

  useEffect(() => {
    if (!isAutoPlaying || reviews.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % reviews.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, reviews.length]);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + reviews.length) % reviews.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const StarIcon = ({ filled }) => (
    <svg
      className={`w-6 h-6 ${filled ? 'text-yellow-400' : 'text-gray-400'}`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-[#0f1f60]  py-20 px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-cyan-300 text-sm font-semibold rounded-full border border-cyan-500/30 backdrop-blur-sm">
              TESTIMONIALS
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 mb-6">
            Success Stories
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Hear from our amazing community members who transformed their lives
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Testimonial Content */}
        {reviews.length > 0 ? (
          <>
            {/* Slider */}
            <div className="relative max-w-4xl mx-auto">
              <div className="overflow-hidden rounded-3xl">
                <div
                  className="flex transition-transform duration-700 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {reviews.map((review) => (
                    <div key={review._id} className="w-full flex-shrink-0">
                      <div className="mx-4">
                        <div className="relative bg-gradient-to-br from-slate-800/50 via-slate-700/30 to-slate-600/50 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-slate-600/30 shadow-2xl">
                          {/* Profile */}
                          <div className="flex flex-col items-center text-center mb-8">
                            <div className="relative mb-6">
                              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 p-1">
                                <img
                                  className="w-full h-full rounded-full object-cover"
                                  src={review.image}
                                  alt={review.name}
                                  onError={(e) => {
                                    e.target.src =
                                      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80";
                                  }}
                                />
                              </div>
                            </div>

                            <div className="flex gap-1 mb-6">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <StarIcon key={star} filled={star <= review.rating} />
                              ))}
                            </div>

                            <blockquote className="text-lg md:text-xl text-gray-200 leading-relaxed mb-8 relative z-10 max-w-3xl italic">
                              "{review.details}"
                            </blockquote>

                            <div className="text-center">
                              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-2">
                                {review.name}
                              </h3>
                              {review.role && (
                                <p className="text-gray-400 font-medium">{review.role}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons */}
              {reviews.length > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-slate-800/50 hover:bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-full flex items-center justify-center text-cyan-400 hover:text-cyan-300 transition-all duration-300 hover:scale-110 z-10"
                    onMouseEnter={() => setIsAutoPlaying(false)}
                    onMouseLeave={() => setIsAutoPlaying(true)}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-slate-800/50 hover:bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-full flex items-center justify-center text-cyan-400 hover:text-cyan-300 transition-all duration-300 hover:scale-110 z-10"
                    onMouseEnter={() => setIsAutoPlaying(false)}
                    onMouseLeave={() => setIsAutoPlaying(true)}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Pagination Dots */}
            {reviews.length > 1 && (
              <div className="flex justify-center gap-3 mt-12">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 scale-125 shadow-lg shadow-cyan-500/50'
                        : 'bg-slate-600 hover:bg-slate-500'
                    }`}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          // Loading State
          <div className="text-center py-20">
            <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400 text-lg">Loading testimonials...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Testimonial;
