import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  limit,
  getCountFromServer,
} from "firebase/firestore";
import { db } from "../firebase";
import WishCard from "./WishCard";

const IBADAN_VISIT = new Date("2026-05-17T00:00:00");
const BIRTHDAY = new Date("2026-05-25T00:00:00");

const getWallPhase = () => {
  const now = Date.now();
  if (now >= BIRTHDAY.getTime()) return "birthday";
  if (now >= IBADAN_VISIT.getTime()) return "ibadan";
  return "pre";
};

const phaseConfig = {
  pre: {
    heading: "🙏 Wishes Are Being Collected...",
    subtitle:
      "Join the world in celebrating a man sent by God. Your wish matters.",
    counterLabel: "wishes submitted so far",
  },
  ibadan: {
    heading: "🌍 Wishes From All Locations",
    subtitle:
      "Displaying wishes submitted from every location as we celebrate in the city.",
    counterLabel: "wishes submitted from all locations",
  },
  birthday: {
    heading: "🎂 Birthday Wishes & Prayers From The World 🌍",
    subtitle: "The world has spoken. A generation honours a Prophet.",
    counterLabel: "wishes submitted worldwide",
  },
};

const WishesWall = () => {
  const [wishes, setWishes] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [phase] = useState(getWallPhase);
  const [pulse, setPulse] = useState(false);
  const prevCountRef = useRef(0);

  const isBirthday = phase === "birthday";

  useEffect(() => {
    // Get REAL total count from ALL documents
    const getTotalCount = async () => {
      const snapshot = await getCountFromServer(collection(db, "wishes"));
      setTotalCount(snapshot.data().count);
    };
    getTotalCount();

    // Show only last 5 pre-birthday, all wishes during the celebration phases
    const q = isBirthday
      ? query(collection(db, "wishes"), orderBy("timestamp", "desc"))
      : query(collection(db, "wishes"), orderBy("timestamp", "desc"), limit(5));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setWishes(data);
      setLoading(false);

      if (data.length > prevCountRef.current) {
        setPulse(true);
        setTimeout(() => setPulse(false), 800);
        prevCountRef.current = data.length;
        // Refresh total count when new wish comes in
        getTotalCount();
      }
    });

    return () => unsubscribe();
  }, [isBirthday]);

  const displayedWishes = wishes;

  const { heading, subtitle, counterLabel } = phaseConfig[phase];

  return (
    <section className="py-20 px-4" style={{ background: "#0f0f20" }}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3"
            style={{ fontFamily: "Georgia, serif", color: "#ffffff" }}
          >
            {heading}
          </h2>
          <p
            className="text-sm sm:text-base"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            {subtitle}
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
        </motion.div>

        {/* Live wish counter — shows REAL total */}
        <motion.div
          className="mx-auto mb-10 w-fit"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div
            className="flex flex-col items-center px-8 py-5 rounded-2xl"
            style={{
              background: "rgba(10,10,26,0.9)",
              border: "1px solid rgba(212,160,23,0.35)",
              boxShadow:
                "0 0 30px rgba(212,160,23,0.12), 0 8px 32px rgba(0,0,0,0.4)",
            }}
          >
            <motion.span
              key={totalCount}
              animate={pulse ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.4 }}
              className="font-bold leading-none"
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "clamp(2.5rem, 8vw, 4rem)",
                color: "#d4a017",
                textShadow: "0 0 30px rgba(212,160,23,0.5)",
              }}
            >
              {loading ? "..." : totalCount}
            </motion.span>
            <p
              className="text-xs sm:text-sm mt-1 uppercase"
              style={{
                color: "rgba(255,255,255,0.6)",
                letterSpacing: "0.18em",
              }}
            >
              {counterLabel}
            </p>
          </div>
        </motion.div>

        {!isBirthday && displayedWishes.length > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-xs uppercase mb-6"
            style={{ color: "rgba(212,160,23,0.5)", letterSpacing: "0.2em" }}
          >
            ✨ Most recent wishes
          </motion.p>
        )}

        {loading ? (
          <div className="text-center py-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 mx-auto rounded-full border-2"
              style={{
                borderColor: "rgba(212,160,23,0.2)",
                borderTopColor: "#d4a017",
              }}
            />
            <p
              className="mt-4 text-sm italic"
              style={{
                color: "rgba(212,160,23,0.5)",
                fontFamily: "Georgia, serif",
              }}
            >
              Gathering wishes...
            </p>
          </div>
        ) : displayedWishes.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-5xl mb-5">🙏</div>
            <h3
              className="italic text-xl sm:text-2xl mb-3"
              style={{ fontFamily: "Georgia, serif", color: "#d4a017" }}
            >
              Be the first to send a wish
            </h3>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.9rem" }}>
              Submit your birthday wish and prayer above. It will appear here for all to see.
            </p>
          </motion.div>
        ) : (
          <div className="flex flex-col gap-5">
            <AnimatePresence>
              {displayedWishes.map((wish, i) => (
                <WishCard
                  key={wish.id || i}
                  wish={wish}
                  index={i}
                  showMessage={true}
                />
              ))}
            </AnimatePresence>
          </div>
        )}

        {!isBirthday && displayedWishes.length > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-xs italic mt-8"
            style={{
              color: "rgba(212,160,23,0.4)",
              fontFamily: "Georgia, serif",
            }}
          >
            All wishes from every location will be fully revealed to Prophet Sam Olu Alo on his birthday — 25th May 2026 🎂
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default WishesWall;
