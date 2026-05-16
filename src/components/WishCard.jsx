import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const WishCard = ({ wish, index = 0, showMessage = true }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      whileHover={{
        y: -4,
        boxShadow:
          "0 16px 48px rgba(184,134,11,0.2), 0 4px 16px rgba(0,0,0,0.3)",
      }}
      className="relative rounded-xl overflow-hidden"
      style={{
        background: "#fffdf5",
        borderLeft: "4px solid #d4a017",
        boxShadow:
          "0 4px 24px rgba(184,134,11,0.12), 0 2px 8px rgba(0,0,0,0.15)",
      }}
    >
      <div className="relative p-5 sm:p-6">
        {showMessage && (
          <p
            className="italic text-base leading-relaxed mb-4"
            style={{
              fontFamily: "Georgia, serif",
              color: "#1a1a2e",
              lineHeight: 1.75,
            }}
          >
            {wish.message}
          </p>
        )}

        {showMessage && (
          <div
            className="w-12 h-px mb-3"
            style={{
              background: "linear-gradient(90deg, #d4a017, transparent)",
            }}
          />
        )}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
          <div>
            <p className="font-semibold text-sm" style={{ color: "#0a0a1a" }}>
              — {wish.name}
            </p>
            {wish.branch && (
              <p
                className="text-xs mt-0.5"
                style={{ color: "#b8860b", letterSpacing: "0.05em" }}
              >
                {wish.branch}
              </p>
            )}
          </div>
          <p
            className="text-xs flex items-center gap-1"
            style={{ color: "rgba(26,26,46,0.5)" }}
          >
            <MapPin size={11} />
            <span>{wish.location}</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default WishCard;
