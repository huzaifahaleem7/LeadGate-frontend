// src/components/leads/LeadCard.jsx
import { motion } from "framer-motion";
import { useState } from "react";
import AddLeadForm from "./AddLeadForm.jsx";
import ParseMessageForm from "./ParseMessageForm.jsx";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 20,
      when: "beforeChildren",
      staggerChildren: 0.05,
      duration: 0.4,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15, duration: 0.3 },
  },
};

const LeadCard = () => {
  const [mode, setMode] = useState("number"); // default tab

  return (
    <motion.div
      className="bg-gray-800 text-gray-100 p-8 rounded-xl shadow-2xl w-full max-w-3xl"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.02 }}
    >
      <AnimatedHeader />
      <AnimatedSubtext />

      {/* Tabs */}
      <motion.div
        className="flex justify-center gap-4 mb-6"
        variants={itemVariants}
      >
        <button
          className={`px-4 py-2 rounded-xl font-semibold transition-colors cursor-pointer ${
            mode === "number"
              ? "bg-indigo-600 text-white"
              : "bg-gray-700 text-gray-200"
          }`}
          onClick={() => setMode("number")}
        >
          Check by Number
        </button>
        <button
          className={`px-4 py-2 rounded-xl font-semibold transition-colors cursor-pointer ${
            mode === "message"
              ? "bg-indigo-600 text-white"
              : "bg-gray-700 text-gray-200"
          }`}
          onClick={() => setMode("message")}
        >
          Check by Message
        </button>
      </motion.div>

      {/* Content */}
      <motion.div
        key={mode} // ensures re-render/animation when switching tabs
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        {mode === "number" ? <AddLeadForm /> : <ParseMessageForm />}
      </motion.div>
    </motion.div>
  );
};

export default LeadCard;

// ------------------------
// Sub-components
// ------------------------
const AnimatedHeader = () => (
  <motion.h2
    className="text-3xl font-bold mb-3 text-indigo-400 text-center"
    variants={itemVariants}
  >
    Add New Lead
  </motion.h2>
);

const AnimatedSubtext = () => (
  <motion.p
    className="text-gray-400 mb-8 text-center"
    variants={itemVariants}
  >
    Fill in the lead details below or parse a message.
  </motion.p>
);
