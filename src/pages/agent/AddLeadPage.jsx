// src/pages/agent/AddLeadPage.jsx
import AddLeadForm from "../../components/leads/AddLeadForm.jsx";
import { motion } from "framer-motion";

const AddLeadPage = () => {
  // Parent container animation
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20,
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.5,
      },
    },
  };

  // Child animation (header, text, form)
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15, duration: 0.3 },
    },
  };

  return (
    <div className="p-6 min-h-screen bg-gray-900 flex items-center justify-center">
      {/* Animated Card */}
      <motion.div
        className="bg-gray-800 text-gray-100 p-8 rounded-xl shadow-2xl w-full max-w-3xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ scale: 1.02 }} // subtle pop on hover
      >
        {/* Animated Header */}
        <motion.h2
          className="text-3xl font-bold mb-3 text-indigo-400 text-center"
          variants={itemVariants}
        >
          Add New Lead
        </motion.h2>

        {/* Subtext */}
        <motion.p
          className="text-gray-400 mb-8 text-center"
          variants={itemVariants}
        >
          Fill in the lead details below.
        </motion.p>

        {/* Form Component */}
        <motion.div variants={itemVariants}>
          <AddLeadForm />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AddLeadPage;
