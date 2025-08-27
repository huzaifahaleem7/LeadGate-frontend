import { motion } from "framer-motion";

const StatCard = ({ label, value, bg, text }) => (
  <motion.div
    className={`${bg} rounded-lg p-6 shadow-lg flex flex-col items-center cursor-pointer`}
    whileHover={{ scale: 1.06 }}
    transition={{ type: "spring", stiffness: 220, damping: 18 }}
  >
    <p className={`font-medium ${text}`}>{label}</p>
    <p className={`text-3xl font-bold ${text}`}>{value}</p>
  </motion.div>
);

export default StatCard;
