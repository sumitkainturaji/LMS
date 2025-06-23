import { assets } from '../../assets/assets';
import SearchBar from '../../components/student/SearchBar';
import { motion } from 'framer-motion';

const Hero = ({ navigate }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] w-full pt-24 px-6 md:px-0 space-y-12 text-center bg-gradient-to-b from-gray-300 to-white transition-all overflow-hidden">
      
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="md:text-5xl text-3xl font-extrabold text-gray-800 max-w-4xl relative leading-tight"
      >
        Unlock Potential Through <span className="text-blue-700">Inclusive Online Learning</span>
        <img 
          src={assets.sketch} 
          alt="highlight sketch" 
          className="md:block hidden absolute -bottom-6 right-0 w-28 animate-pulse"
        />
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-gray-700 max-w-2xl mx-auto text-lg leading-relaxed"
      >
        At SkillSphere, we believe that education is the key to lasting change. Our affordable online courses are designed to empower underserved communities by providing practical skills, personal growth, and career-ready knowledge — all at your fingertips.
      </motion.p>

      {/* Mini Features */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full text-gray-700"
      >
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
          <h3 className="text-xl font-semibold mb-2 text-gray-700">Affordable for All</h3>
          <p className="text-sm">High-impact learning starting at just ₹49 — so no one is left behind.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
          <h3 className="text-xl font-semibold mb-2 text-gray-700">Learn from the Best</h3>
          <p className="text-sm">Courses created and taught by real-world experts and passionate educators.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
          <h3 className="text-xl font-semibold mb-2 text-gray-700">Learn Anytime, Anywhere</h3>
          <p className="text-sm">Study at your own pace, on your schedule — from any device.</p>
        </div>
      </motion.div>

      {/* Stats Block */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 text-gray-700 font-bold text-lg"
      >
        <div className="text-center">
          <p className="text-2xl">10K+</p>
          <p className="text-sm text-gray-600 font-medium">Empowered Learners</p>
        </div>
        <div className="text-center">
          <p className="text-2xl">100+</p>
          <p className="text-sm text-gray-600 font-medium">Expert-Led Courses</p>
        </div>
        <div className="text-center">
          <p className="text-2xl">200+</p>
          <p className="text-sm text-gray-600 font-medium">Passionate Volunteers</p>
        </div>
        <div className="text-center">
          <p className="text-2xl">50+</p>
          <p className="text-sm text-gray-600 font-medium">Communities Reached</p>
        </div>
      </motion.div>

      {/* Search + CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="flex flex-col gap-4 items-center w-full max-w-xl"
      >
        <SearchBar />
      </motion.div>
    </div>
  );
};

export default Hero;
