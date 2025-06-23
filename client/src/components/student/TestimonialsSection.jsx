import React from 'react';
import { assets, dummyTestimonial } from '../../assets/assets';

const TestimonialsSection = () => {

  return (
 <div className="px-6 md:px-0 pb-20 max-w-7xl mx-auto">
  {/* Section Header */}
  <div className="text-center mb-10">
    <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">What Our Learners Say</h2>
    <p className="text-base md:text-lg text-gray-500 mt-3 max-w-2xl mx-auto">
      Real stories of growth and success from our community. See how Bhayat NGO has transformed lives through accessible education.
    </p>
  </div>

  {/* Horizontal Scroll Container */}
  <div className="overflow-x-auto">
    <div className="flex space-x-6 px-2 md:px-0 w-max md:w-full">
      {dummyTestimonial.map((testimonial, index) => (
        <div
          key={index}
          className="flex-shrink-0 w-80 bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300"
        >
          {/* Header */}
          <div className="flex items-center gap-4 px-6 py-5 bg-gray-100 border-b border-gray-200">
            <img
              className="h-14 w-14 rounded-full object-cover border-2 border-white shadow"
              src={testimonial.image}
              alt={testimonial.name}
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{testimonial.name}</h3>
              <p className="text-sm text-gray-500">{testimonial.role}</p>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 pt-4 pb-6">
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  src={i < Math.floor(testimonial.rating) ? assets.star : assets.star_blank}
                  alt="star"
                  className="w-5 h-5"
                />
              ))}
            </div>
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-5">
              “{testimonial.feedback}”
            </p>
          </div>

         
        </div>
      ))}
    </div>
  </div>
</div>


  );
};

export default TestimonialsSection;
