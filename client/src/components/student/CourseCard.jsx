
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

const CourseCard = ({ course }) => {
    const { currency, calculateRating } = useContext(AppContext)
    const discountedPrice = course.coursePrice - (course.discount * course.coursePrice / 100)
    const hasDiscount = course.discount > 0

    return (
       <Link
  onClick={() => window.scrollTo(0, 0)}
  to={`/course/${course._id}`}
  className="relative group bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
>
  {/* Discount Badge */}
  {hasDiscount && (
    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md z-10 shadow-md">
      {course.discount}% OFF
    </div>
  )}

  {/* Thumbnail */}
  <div className="relative h-44 overflow-hidden">
    <img
      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
      src={course.courseThumbnail}
      alt={course.courseTitle}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  </div>

  {/* Content */}
  <div className="p-5">
    {/* Title */}
    <h3 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-2 mb-1">
      {course.courseTitle}
    </h3>

    {/* Educator Name */}
    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
      {course.educator.name}
    </p>

    {/* Ratings */}
    <div className="flex items-center mb-4">
      <div className="flex items-center gap-1 text-yellow-400">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i < Math.floor(calculateRating(course)) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-500'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
        {calculateRating(course).toFixed(1)} ({course.courseRatings.length} reviews)
      </span>
    </div>

    {/* Price */}
    <div className="flex items-center gap-2 mb-4">
      <span className="text-xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
        {currency}{discountedPrice.toFixed(2)}
      </span>
      {hasDiscount && (
        <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
          {currency}{course.coursePrice.toFixed(2)}
        </span>
      )}
    </div>

    {/* CTA Button */}
    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <button className="w-full py-2 px-4 bg-white hover:bg-black hover:text-white text-black text-sm font-medium rounded-md transition duration-300 shadow-md">
        View Course
      </button>
    </div>
  </div>
</Link>

    )
}

export default CourseCard