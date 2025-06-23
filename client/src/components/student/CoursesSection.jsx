
import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import CourseCard from './CourseCard';
import { Link } from 'react-router-dom';

const CoursesSection = () => {
  const { allCourses } = useContext(AppContext);

  return (
   <div className="py-20 md:px-40 px-8 bg-gradient-to-b from-white via-sky-50 to-white rounded-t-3xl">
  {/* Heading */}
  <div className="text-center mb-16">
    <h2 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#9dd90d] via-[#eb2122] to-[#f49805] mb-4 leading-tight">
      Learn Without Limits With Bhayat Foundation
    </h2>
    <p className="text-gray-600 text-md md:text-lg max-w-3xl mx-auto">
      Explore Bhayat NGO’s curated collection of affordable, high-quality courses built to empower learners at every level. Start your journey of growth with expert-led content designed just for you.
    </p>
  </div>

  {/* Course Cards Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
    {allCourses.slice(0, 9).map((course, index) => (
      <CourseCard key={index} course={course} />
    ))}
  </div>

  {/* CTA Button */}
  <div className="text-center">
    <Link 
      to="/course-list"
      onClick={() => window.scrollTo(0, 0)} 
      className="inline-block bg-gradient-to-r from-gray-600 to-orange-600 hover:from-gray-700 hover:to-purple-700 text-white font-semibold py-3 px-10 rounded-full shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
    >
      Browse All Courses →
    </Link>
  </div>
</div>

  );
};

export default CoursesSection;