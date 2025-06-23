import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../../components/student/Loading';

const Dashboard = () => {

  const { backendUrl, isEducator, currency, getToken } = useContext(AppContext)

  const [dashboardData, setDashboardData] = useState(null)

  const fetchDashboardData = async () => {
    try {

      const token = await getToken()

      const { data } = await axios.get(backendUrl + '/api/educator/dashboard',
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (data.success) {
        setDashboardData(data.dashboardData)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {

    if (isEducator) {
      fetchDashboardData()
    }

  }, [isEducator])




  return dashboardData ? (
    <div className="min-h-screen flex flex-col gap-10 md:p-10 p-6 ">
  {/* Metrics Cards */}
  <div className="flex flex-wrap gap-6">
    <div className="flex items-center gap-4 bg-white border border-blue-100 shadow-md p-5 rounded-xl w-64 hover:shadow-lg transition">
      <img src={assets.patients_icon} alt="enrollments" className="w-10 h-10" />
      <div>
        <p className="text-3xl font-semibold text-black">{dashboardData.enrolledStudentsData.length}</p>
        <p className="text-sm text-gray-600">Total Enrolments</p>
      </div>
    </div>

    <div className="flex items-center gap-4 bg-white border border-blue-100 shadow-md p-5 rounded-xl w-64 hover:shadow-lg transition">
      <img src={assets.appointments_icon} alt="courses" className="w-10 h-10" />
      <div>
        <p className="text-3xl font-semibold text-black">{dashboardData.totalCourses}</p>
        <p className="text-sm text-gray-600">Total Courses</p>
      </div>
    </div>

    {/* Optional: Earnings (Uncomment if needed) */}
    <div className="flex items-center gap-4 bg-white border border-blue-100 shadow-md p-5 rounded-xl w-64 hover:shadow-lg transition">
      <img src={assets.earning_icon} alt="earnings" className="w-10 h-10" />
      <div>
        <p className="text-3xl font-semibold text-black">{currency}{Math.floor(dashboardData.totalEarnings)}</p>
        <p className="text-sm text-gray-600">Total Earnings</p>
      </div>
    </div>
    
  </div>

  {/* Latest Enrollments */}
  <div>
    <h2 className="text-xl font-semibold text-gray-800 mb-5">Latest Enrolments</h2>
    <div className="overflow-x-auto bg-white border border-gray-200 rounded-xl shadow-md">
      <table className="w-full min-w-[500px] text-sm text-left text-gray-600">
        <thead className="bg-gray-100 text-gray-700 border-b border-gray-200">
          <tr>
            <th className="px-5 py-4 font-medium text-center hidden sm:table-cell">#</th>
            <th className="px-5 py-4 font-medium">Student Name</th>
            <th className="px-5 py-4 font-medium">Course Title</th>
          </tr>
        </thead>
        <tbody>
          {dashboardData.enrolledStudentsData.map((item, index) => (
            <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition">
              <td className="px-5 py-4 text-center hidden sm:table-cell">{index + 1}</td>
              <td className="px-5 py-4 flex items-center gap-3">
                <img
                  src={item.student.imageUrl}
                  alt="Profile"
                  className="w-9 h-9 rounded-full border border-gray-300"
                />
                <span className="truncate font-medium">{item.student.name}</span>
              </td>
              <td className="px-5 py-4 truncate">{item.courseTitle}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>

  ) : <Loading />
}

export default Dashboard