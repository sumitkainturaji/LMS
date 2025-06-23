import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { Line } from 'rc-progress';
import Footer from '../../components/student/Footer';

const MyEnrollments = () => {

    const { userData, enrolledCourses, fetchUserEnrolledCourses, navigate, backendUrl, getToken, calculateCourseDuration, calculateNoOfLectures } = useContext(AppContext)

    const [progressArray, setProgressData] = useState([])

    const getCourseProgress = async () => {
        try {
            const token = await getToken();

            // Use Promise.all to handle multiple async operations
            const tempProgressArray = await Promise.all(
                enrolledCourses.map(async (course) => {
                    const { data } = await axios.post(
                        `${backendUrl}/api/user/get-course-progress`,
                        { courseId: course._id },
                        { headers: { Authorization: `Bearer ${token}` } }
                    );

                    // Calculate total lectures
                    let totalLectures = calculateNoOfLectures(course);

                    const lectureCompleted = data.progressData ? data.progressData.lectureCompleted.length : 0;
                    return { totalLectures, lectureCompleted };
                })
            );

            setProgressData(tempProgressArray);
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (userData) {
            fetchUserEnrolledCourses()
        }
    }, [userData])

    useEffect(() => {

        if (enrolledCourses.length > 0) {
            getCourseProgress()
        }

    }, [enrolledCourses])

    return (
        <>

           <div className="md:px-36 px-6 pt-12 pb-20">
  <h1 className="text-3xl font-bold text-gray-800 mb-8">My Enrollments</h1>

  <div className="overflow-x-auto rounded-xl shadow-sm bg-white border border-gray-200">
    <table className="w-full text-sm text-left">
      <thead className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider hidden sm:table-header-group">
        <tr>
          <th className="px-6 py-4">Course</th>
          <th className="px-6 py-4">Duration</th>
          <th className="px-6 py-4">Progress</th>
          <th className="px-6 py-4 text-center">Status</th>
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-200">
        {enrolledCourses.map((course, index) => {
          const progress = progressArray[index];
          const percent = progress ? (progress.lectureCompleted * 100) / progress.totalLectures : 0;
          const isCompleted = percent === 100;

          return (
            <tr key={index} className="hover:bg-gray-50 transition duration-200">
              {/* Course Info */}
              <td className="px-4 sm:px-6 py-5 flex items-center gap-4">
                <img
                  src={course.courseThumbnail}
                  alt={course.courseTitle}
                  className="w-16 sm:w-24 rounded-lg object-cover shadow"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800 line-clamp-2">{course.courseTitle}</p>
                  <div className="mt-2 w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-600 h-full transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{Math.floor(percent)}% completed</p>
                </div>
              </td>

              {/* Duration (desktop only) */}
              <td className="px-6 py-5 hidden sm:table-cell whitespace-nowrap text-gray-600">
                {calculateCourseDuration(course)}
              </td>

              {/* Lecture Count (desktop only) */}
              <td className="px-6 py-5 hidden sm:table-cell text-gray-600">
                {progress && (
                  <span className="text-sm font-medium">
                    {progress.lectureCompleted} / {progress.totalLectures}
                    <span className="text-xs ml-1 text-gray-400">Lectures</span>
                  </span>
                )}
              </td>

              {/* Status */}
              <td className="px-4 sm:px-6 py-5 text-right">
                <button
                  onClick={() => navigate('/player/' + course._id)}
                  className={`px-4 py-2 text-sm rounded-full font-medium transition-all duration-300 ${
                    isCompleted
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {isCompleted ? 'Completed' : 'Continue'}
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
</div>


            <Footer />

        </>
    )
}

export default MyEnrollments