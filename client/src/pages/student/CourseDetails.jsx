
import React, { useContext, useEffect, useState } from 'react';
import Footer from '../../components/student/Footer';
import { assets } from '../../assets/assets';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import humanizeDuration from 'humanize-duration'
import YouTube from 'react-youtube';
import { useAuth } from '@clerk/clerk-react';
import Loading from '../../components/student/Loading';

const CourseDetails = () => {

  const { id } = useParams()

  const [courseData, setCourseData] = useState(null)
  const [playerData, setPlayerData] = useState(null)
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false)

  const { backendUrl, currency, userData, calculateChapterTime, calculateCourseDuration, calculateRating, calculateNoOfLectures } = useContext(AppContext)
  const { getToken } = useAuth()


  const fetchCourseData = async () => {

    try {

      const { data } = await axios.get(backendUrl + '/api/course/' + id)

      if (data.success) {
        setCourseData(data.courseData)
      } else {
        toast.error(data.message)
      }

    } catch (error) {

      toast.error(error.message)

    }

  }

  const [openSections, setOpenSections] = useState({});

  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };


const enrollCourse = async () => {
  try {
    if (!userData) return toast.warn('Login to Enroll');
    if (isAlreadyEnrolled) return toast.warn('Already Enrolled');

    const token = await getToken();

    // Step 1: Create Razorpay order
    const { data: orderData } = await axios.post(
      `${backendUrl}/api/user/create-razorpay-order`,
      { amount: courseData.coursePrice, courseId: courseData._id },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (!orderData.success) return toast.error(orderData.message);

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, 
      amount: orderData.order.amount,
      currency: 'INR',
      name: courseData.courseTitle,
      description: 'Course Enrollment',
      image: courseData.courseThumbnail,
      order_id: orderData.order.id,
      handler: async function (response) {
        // Step 2: Verify payment
        try {
          const verifyRes = await axios.post(
            `${backendUrl}/api/user/verify-razorpay-payment`,
            {
              ...response,
              courseId: courseData._id,
              amount: orderData.order.amount,
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          if (verifyRes.data.success) {
            toast.success('Enrollment successful!');
            setIsAlreadyEnrolled(true);
          } else {
            toast.error('Payment verification failed.');
          }
        } catch (err) {
          toast.error('Verification error: ' + err.message);
        }
      },
      prefill: {
        name: userData?.name || '',
        email: userData?.email || '',
      },
      theme: {
        color: '#0d6efd',
      },
    };

    const rzp = new Razorpay(options);
    rzp.open();
  } catch (error) {
    toast.error(error.message);
  }
};


  useEffect(() => {
    fetchCourseData()
  }, [])

  useEffect(() => {

    if (userData && courseData) {
      setIsAlreadyEnrolled(userData.enrolledCourses.includes(courseData._id))
    }

  }, [userData, courseData])

  return courseData ? (
    <>
     <div className="flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-24 pt-16 text-left  bg-gradient-to-b from-gray-100">
  
  {/* Decorative background element */}
  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-cyan-100/30 via-white/50 to-transparent -z-10" />

  {/* Left Column - Course Details */}
  <div className="max-w-3xl z-10 text-gray-700">
    <h1 className="md:text-4xl text-2xl font-semibold text-gray-800 leading-tight">
      {courseData.courseTitle}
    </h1>
    <p
      className="pt-4 text-sm md:text-base leading-relaxed text-gray-600"
      dangerouslySetInnerHTML={{ __html: courseData.courseDescription.slice(0, 200) }}
    ></p>

    <div className="flex flex-wrap items-center gap-3 pt-4 text-sm text-gray-600">
      <span className="flex items-center gap-1">
        <strong className="text-blue-600">{calculateRating(courseData)}</strong>
        {[...Array(5)].map((_, i) => (
          <img
            key={i}
            src={i < Math.floor(calculateRating(courseData)) ? assets.star : assets.star_blank}
            alt="star"
            className="w-4 h-4"
          />
        ))}
      </span>
      <span className="text-blue-600">
        ({courseData.courseRatings.length} {courseData.courseRatings.length > 1 ? 'ratings' : 'rating'})
      </span>
      <span>• {courseData.enrolledStudents.length} enrolled</span>
      <span>• by <span className="text-blue-600 underline">{courseData.educator.name}</span></span>
    </div>

    {/* Course Structure */}
    <div className="pt-10">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Course Structure</h2>
      {courseData.courseContent.map((chapter, index) => (
        <div key={index} className="mb-3 border border-gray-200 rounded-lg bg-white shadow-sm">
          <div
            onClick={() => toggleSection(index)}
            className="flex justify-between items-center px-4 py-3 cursor-pointer hover:bg-gray-50 transition-all"
          >
            <div className="flex items-center gap-2">
              <img
                src={assets.down_arrow_icon}
                alt="arrow icon"
                className={`w-4 transform transition-transform ${openSections[index] ? "rotate-180" : ""}`}
              />
              <p className="font-medium">{chapter.chapterTitle}</p>
            </div>
            <p className="text-sm text-gray-500">
              {chapter.chapterContent.length} lectures • {calculateChapterTime(chapter)}
            </p>
          </div>

          <div className={`overflow-hidden transition-all duration-300 ${openSections[index] ? "max-h-96" : "max-h-0"}`}>
            <ul className="px-6 py-3 border-t border-gray-200 text-sm text-gray-600">
              {chapter.chapterContent.map((lecture, i) => (
                <li key={i} className="flex justify-between py-1.5">
                  <div className="flex items-center gap-2">
                    <img src={assets.play_icon} className="w-4 h-4 mt-0.5" alt="play icon" />
                    <p>{lecture.lectureTitle}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    {lecture.isPreviewFree && (
                      <span
                        onClick={() => setPlayerData({ videoId: lecture.lectureUrl.split('/').pop() })}
                        className="text-blue-600 cursor-pointer"
                      >
                        Preview
                      </span>
                    )}
                    <span>{humanizeDuration(lecture.lectureDuration * 60000, { units: ['h', 'm'] })}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>

    {/* Full Course Description */}
    <div className="pt-10 pb-20">
      <h3 className="text-xl font-semibold text-gray-800">Course Description</h3>
      <div className="pt-3 text-sm leading-relaxed text-gray-600">
        <p dangerouslySetInnerHTML={{ __html: courseData.courseDescription }}></p>
      </div>
    </div>
  </div>

  {/* Right Column - Price Card */}
  <div className="w-full max-w-md mx-auto md:mx-0 z-10 rounded-lg shadow-lg bg-white overflow-hidden">
    {playerData ? (
      <YouTube
        videoId={playerData.videoId}
        opts={{ playerVars: { autoplay: 1 } }}
        iframeClassName="w-full aspect-video"
      />
    ) : (
      <img src={courseData.courseThumbnail} alt="course thumbnail" className="w-full" />
    )}

    <div className="p-5">
      <div className="flex items-center gap-2 mb-2 text-sm text-red-600 font-medium">
        <img src={assets.time_left_clock_icon} alt="" className="w-4" />
        <span>5 days left at this price!</span>
      </div>

      <div className="flex items-center gap-3 text-2xl font-bold text-gray-800">
        <span>{currency}{(courseData.coursePrice - (courseData.discount * courseData.coursePrice) / 100).toFixed(2)}</span>
        <span className="text-base text-gray-500 line-through">{currency}{courseData.coursePrice}</span>
        <span className="text-base text-green-600">{courseData.discount}% off</span>
      </div>

      <div className="flex items-center gap-4 mt-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <img src={assets.star} alt="star" className="w-4" />
          {calculateRating(courseData)}
        </div>
        <span className="h-4 w-px bg-gray-400/30" />
        <div className="flex items-center gap-1">
          <img src={assets.time_clock_icon} alt="time" className="w-4" />
          {calculateCourseDuration(courseData)}
        </div>
        <span className="h-4 w-px bg-gray-400/30" />
        <div className="flex items-center gap-1">
          <img src={assets.lesson_icon} alt="lessons" className="w-4" />
          {calculateNoOfLectures(courseData)} lessons
        </div>
      </div>

      <button
        onClick={enrollCourse}
        className="w-full mt-6 py-3 bg-gray-600 hover:bg-gray-800 text-white rounded-md font-medium text-center transition-all duration-300"
      >
        {isAlreadyEnrolled ? "Already Enrolled" : "Enroll Now"}
      </button>

      <div className="mt-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-2">What’s included:</h4>
        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
          <li>Lifetime access with free updates</li>
          <li>Step-by-step, hands-on project guidance</li>
          <li>Downloadable resources and source code</li>
          <li>Quizzes to test your knowledge</li>
          <li>Certificate of completion</li>
        </ul>
      </div>
    </div>
  </div>
</div>

      <Footer />
    </>
  ) : <Loading />
};

export default CourseDetails;
