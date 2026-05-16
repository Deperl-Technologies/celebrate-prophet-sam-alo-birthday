import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const CLOSE_DATE = new Date("2026-05-26T00:00:00");

const isGateClosed = () => Date.now() >= CLOSE_DATE.getTime();

const inputBaseStyle = {
  width: "100%",
  background: "transparent",
  border: "none",
  borderBottom: "1px solid rgba(212,160,23,0.3)",
  outline: "none",
  color: "#ffffff",
  fontSize: "1rem",
  padding: "10px 0",
  fontFamily: "Inter, sans-serif",
  transition: "border-color 0.3s",
};

const Field = ({ label, optional, children }) => (
  <div className="mb-8">
    <label
      className="block text-xs font-medium uppercase mb-2"
      style={{ color: "#d4a017", letterSpacing: "0.2em" }}
    >
      {label}{" "}
      {optional && (
        <span style={{ color: "rgba(212,160,23,0.5)", fontSize: "0.65rem" }}>
          (Optional)
        </span>
      )}
    </label>
    {children}
  </div>
);

const WishForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    branch: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [focusedField, setFocusedField] = useState(null);

  const gateClosed = isGateClosed();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.name.trim() ||
      !formData.location.trim() ||
      !formData.message.trim()
    ) {
      setError("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await addDoc(collection(db, "wishes"), {
        name: formData.name.trim(),
        location: formData.location.trim(),
        branch: formData.branch.trim(),
        message: formData.message.trim(),
        timestamp: serverTimestamp(),
      });
      setSubmitted(true);
      setFormData({ name: "", location: "", branch: "", message: "" });
    } catch (err) {
      console.error("Error submitting wish:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getInputStyle = (fieldName) => ({
    ...inputBaseStyle,
    borderBottomColor:
      focusedField === fieldName ? "#d4a017" : "rgba(212,160,23,0.25)",
    boxShadow:
      focusedField === fieldName ? "0 2px 0 rgba(212,160,23,0.4)" : "none",
  });

  return (
    <section className="py-20 px-4" style={{ background: "#0a0a1a" }}>
      <motion.div
        className="max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Section heading */}
        <div className="text-center mb-12">
          <p
            className="text-xs uppercase font-medium mb-3"
            style={{ color: "rgba(212,160,23,0.6)", letterSpacing: "0.35em" }}
          >
            Leave a Message
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3"
            style={{ fontFamily: "Georgia, serif", color: "#ffffff" }}
          >
            Send Your Birthday Wish & Prayer 🎂🙏
          </h2>
          <p
            className="text-sm sm:text-base"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Leave a message for Prophet Sam Olu Alo
          </p>
          <div className="flex items-center gap-3 mt-6 max-w-xs mx-auto">
            <div
              className="flex-1 h-px"
              style={{
                background: "linear-gradient(90deg, transparent, #b8860b)",
              }}
            />
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#d4a017" }}
            />
            <div
              className="flex-1 h-px"
              style={{
                background: "linear-gradient(90deg, #b8860b, transparent)",
              }}
            />
          </div>
        </div>

        {/* Card */}
        <div
          className="relative rounded-2xl p-8 sm:p-10"
          style={{
            background:
              "linear-gradient(145deg, rgba(26,26,46,0.9) 0%, rgba(10,10,26,0.95) 100%)",
            border: "1px solid rgba(212,160,23,0.2)",
            boxShadow:
              "0 0 60px rgba(212,160,23,0.06), 0 20px 60px rgba(0,0,0,0.5)",
          }}
        >
          <AnimatePresence mode="wait">
            {gateClosed ? (
              <motion.div
                key="closed"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="text-6xl mb-5">🔒</div>
                <h3
                  className="italic text-2xl sm:text-3xl mb-3"
                  style={{ fontFamily: "Georgia, serif", color: "#d4a017" }}
                >
                  The Wish Gate Has Closed
                </h3>
                <div
                  className="w-20 h-px mx-auto mb-4"
                  style={{ background: "#b8860b" }}
                />
                <p
                  style={{ color: "rgba(255,255,255,0.6)" }}
                  className="text-sm sm:text-base"
                >
                  Submissions closed on 26th May 2026. The wishes have been
                  received and treasured.
                </p>
              </motion.div>
            ) : submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center py-8"
              >
                <motion.div
                  className="text-6xl mb-5"
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 0.6, repeat: 2 }}
                >
                  🙏
                </motion.div>
                <h3
                  className="text-2xl sm:text-3xl font-semibold mb-3"
                  style={{ fontFamily: "Georgia, serif", color: "#d4a017" }}
                >
                  Your Wish Has Been Sent
                </h3>
                <div
                  className="w-20 h-px mx-auto mb-4"
                  style={{ background: "#b8860b" }}
                />
                <p
                  className="italic text-base sm:text-lg"
                  style={{
                    fontFamily: "Georgia, serif",
                    color: "rgba(255,255,255,0.75)",
                  }}
                >
                  May God honour your prayers and bless you as you have blessed
                  His servant.
                </p>
                <p
                  className="mt-6 text-xs uppercase"
                  style={{
                    color: "rgba(212,160,23,0.5)",
                    letterSpacing: "0.3em",
                  }}
                >
                  Adamimogo Worldwide
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-xs uppercase underline"
                  style={{
                    color: "rgba(212,160,23,0.6)",
                    cursor: "pointer",
                    background: "none",
                    border: "none",
                  }}
                >
                  Send Another Wish
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleSubmit}
              >
                <Field label="Full Name">
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    style={{ ...getInputStyle("name"), caretColor: "#d4a017" }}
                    className="placeholder-gray-600"
                  />
                </Field>

                <Field label="Your Location">
                  <input
                    type="text"
                    name="location"
                    placeholder="e.g. Sango, Ibadan"
                    value={formData.location}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("location")}
                    onBlur={() => setFocusedField(null)}
                    style={{
                      ...getInputStyle("location"),
                      caretColor: "#d4a017",
                    }}
                    className="placeholder-gray-600"
                  />
                </Field>

                <Field label="Branch / Church Name" optional>
                  <input
                    type="text"
                    name="branch"
                    placeholder="e.g. Adamimogo Grace Assembly Ibadan"
                    value={formData.branch}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("branch")}
                    onBlur={() => setFocusedField(null)}
                    style={{
                      ...getInputStyle("branch"),
                      caretColor: "#d4a017",
                    }}
                    className="placeholder-gray-600"
                  />
                </Field>

                <Field label="Your Wish & Prayer">
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Write your heartfelt birthday wish and prayer for the Prophet..."
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    style={{
                      ...getInputStyle("message"),
                      resize: "none",
                      lineHeight: "1.7",
                    }}
                    className="placeholder-gray-600"
                  />
                </Field>

                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-sm mb-4"
                      style={{ color: "#f87171" }}
                    >
                      ⚠️ {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                <motion.button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl font-semibold text-base uppercase"
                  style={{
                    background: loading
                      ? "rgba(184,134,11,0.5)"
                      : "linear-gradient(135deg, #b8860b 0%, #d4a017 50%, #c9920f 100%)",
                    color: "#0a0a1a",
                    letterSpacing: "0.18em",
                    cursor: loading ? "not-allowed" : "pointer",
                    border: "none",
                    boxShadow: loading
                      ? "none"
                      : "0 4px 24px rgba(212,160,23,0.3)",
                  }}
                  whileHover={
                    !loading
                      ? {
                          scale: 1.02,
                          boxShadow: "0 8px 32px rgba(212,160,23,0.5)",
                        }
                      : {}
                  }
                  whileTap={!loading ? { scale: 0.98 } : {}}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeOpacity="0.3"
                        />
                        <path
                          d="M12 2a10 10 0 0 1 10 10"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Send My Wish 🙏"
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
};

export default WishForm;
