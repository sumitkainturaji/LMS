import { motion } from 'framer-motion';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
  <div className="flex flex-col items-center justify-center min-h-[100vh] w-full px-6 md:px-0 py-28 space-y-14 text-center bg-gradient-to-br from-blue-50 via-blue-50 to-white overflow-hidden transition-all">

  {/* Main Heading */}
  <motion.h1
    initial={{ opacity: 0, y: -30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="text-4xl md:text-5xl font-extrabold text-gray-800 max-w-4xl leading-tight"
  >
    Educate. Empower. Elevate.
<span className="text-indigo-700">Transform lives through knowledge — anytime, anywhere.</span>


  </motion.h1>

  {/* Subheading */}
  <motion.h2
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.2, duration: 0.6 }}
  className="text-lg md:text-xl text-gray-600 font-medium max-w-2xl"
>
  Turn your knowledge into impact. Teach with purpose, inspire change, and grow on your own terms.
</motion.h2>


  {/* Description */}
  <motion.p
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.3, duration: 0.6 }}
  className="text-gray-600 max-w-3xl mx-auto md:text-lg text-md leading-relaxed"
>
  At SkillSphere, we believe that knowledge is power — especially when it's shared. Our platform empowers educators, creators, and professionals to reach underserved communities with meaningful, high-quality education. Whether you're an artist, engineer, teacher, or expert, your voice matters. Inspire lives, earn fairly, and be part of a global movement for accessible learning.
</motion.p>


  {/* Feature Cards */}
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ delay: 0.5, duration: 0.6 }}
  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full text-gray-700"
>
  <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
    <h3 className="text-lg font-semibold mb-2 text-indigo-700">📈 Teach & Earn with Purpose</h3>
    <p className="text-sm text-gray-600">
      Set your course prices, grow your income, and make a difference. Each enrollment fuels real change.
    </p>
  </div>
  <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
    <h3 className="text-lg font-semibold mb-2 text-indigo-700">🌍 Share Knowledge Globally</h3>
    <p className="text-sm text-gray-600">
      Connect with thousands of learners across the globe — from remote villages to urban centers.
    </p>
  </div>
  <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
    <h3 className="text-lg font-semibold mb-2 text-indigo-700">⚙️ Seamless Course Publishing</h3>
    <p className="text-sm text-gray-600">
      Focus on teaching. We'll handle the tech, hosting, and support — so your content shines.
    </p>
  </div>
</motion.div>


  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.6, duration: 0.6 }}
    className="max-w-3xl text-center text-sm md:text-base text-gray-700 leading-relaxed pt-6 px-4"
  >
    <p>
      Get started in minutes: create your profile, upload your course materials, set your price — and you’re ready to inspire. We’re here to help you reach more learners, simplify your teaching, and grow your personal brand.
    </p>
  </motion.div>


  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.8, duration: 0.6 }}
    className="pt-6"
  >
    <Link
      to={'/educator'}
      onClick={() => window.scrollTo(0, 0)} 
      className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-7 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
    >
      Start Teaching Today →
    </Link>
  </motion.div>
</div>

  );
};

export default Hero;
