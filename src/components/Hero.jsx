import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gmpmLogo from "../assets/logo_right_refined.png";
import cacLogo from "../assets/logo_left_refined.png";
import prophetImg from "../assets/prophet.jpg";

const generateParticles = (count) =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 5,
  }));

const particles = generateParticles(60);

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.2 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: "easeOut" },
  },
};

const Hero = ({ hideGrandPageCta = false }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let frame = 0;
    let animId;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height * 0.42;
      frame += 0.005;

      const rayCount = 10;
      for (let i = 0; i < rayCount; i++) {
        const angle = (i / rayCount) * Math.PI * 2 + frame;
        const opacity = ((Math.sin(frame * 2 + i) + 1) / 2) * 0.06 + 0.02;
        const grad = ctx.createLinearGradient(
          cx,
          cy,
          cx + Math.cos(angle) * 900,
          cy + Math.sin(angle) * 900,
        );
        grad.addColorStop(0, `rgba(212,160,23,${opacity})`);
        grad.addColorStop(1, "rgba(212,160,23,0)");
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(
          cx + Math.cos(angle - 0.06) * 1000,
          cy + Math.sin(angle - 0.06) * 1000,
        );
        ctx.lineTo(
          cx + Math.cos(angle + 0.06) * 1000,
          cy + Math.sin(angle + 0.06) * 1000,
        );
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.fill();
      }

      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 280);
      glow.addColorStop(
        0,
        `rgba(212,160,23,${0.08 + Math.sin(frame * 2) * 0.03})`,
      );
      glow.addColorStop(0.5, "rgba(184,134,11,0.03)");
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, 280, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #0a0a1a 0%, #1a1a2e 50%, #0f0f20 100%)",
      }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
      />

      <motion.a
        href="https://happy-birthday-prophet-sam-olu-alo.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: hideGrandPageCta ? 0 : 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] shadow-lg transition-opacity duration-300"
        style={{
          background: "rgba(10,10,26,0.9)",
          borderColor: "#d4a017",
          color: "#d4a017",
          boxShadow: "0 0 18px rgba(212,160,23,0.18)",
          backdropFilter: "blur(8px)",
          pointerEvents: hideGrandPageCta ? "none" : "auto",
        }}
      >
        <span>Open Grand Page</span>
        <span aria-hidden="true">↗</span>
      </motion.a>

      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ zIndex: 2 }}
      >
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: "rgba(212, 160, 23, 0.6)",
              boxShadow: `0 0 ${p.size * 3}px rgba(212,160,23,0.4)`,
            }}
            animate={{
              y: [0, -20, -10, -25, 0],
              x: [0, 5, -8, 3, 0],
              opacity: [0.2, 0.6, 0.3, 0.7, 0.2],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.div
        className="relative flex flex-col items-center text-center px-4 sm:px-8 max-w-5xl mx-auto"
        style={{ zIndex: 10 }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={fadeUp}
          className="text-xs sm:text-sm font-medium uppercase mb-4"
          style={{ color: "#d4a017", letterSpacing: "0.3em" }}
        >
          C.A.C Grace of Mercy Prayer Mountain International
        </motion.p>

        <motion.div
          variants={fadeIn}
          className="flex items-center gap-3 mb-6 w-full max-w-md"
        >
          <div
            className="flex-1 h-px"
            style={{
              background: "linear-gradient(90deg, transparent, #d4a017)",
            }}
          />
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: "#d4a017" }}
          />
          <div
            className="flex-1 h-px"
            style={{
              background: "linear-gradient(90deg, #d4a017, transparent)",
            }}
          />
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="flex items-center justify-center gap-6 w-full mb-5"
        >
          <div
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(212,160,23,0.15) 100%)",
              border: "2px solid rgba(212,160,23,0.6)",
              borderRadius: "50%",
              padding: "6px",
              boxShadow:
                "0 0 25px rgba(212,160,23,0.4), 0 0 60px rgba(212,160,23,0.15), inset 0 0 20px rgba(255,255,255,0.05)",
              flexShrink: 0,
              backdropFilter: "blur(4px)",
            }}
          >
            <img
              src={cacLogo}
              alt="C.A.C Logo"
              style={{
                width: "85px",
                height: "85px",
                objectFit: "cover",
                filter:
                  "brightness(1.3) drop-shadow(0 0 10px rgba(212,160,23,0.6))",
                borderRadius: "50%",
              }}
            />
          </div>

          <p
            className="text-xs sm:text-sm uppercase font-medium"
            style={{ color: "#ffffff", letterSpacing: "0.35em", opacity: 0.8 }}
          >
            We Celebrate
          </p>

          <div
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(212,160,23,0.15) 100%)",
              border: "2px solid rgba(212,160,23,0.6)",
              borderRadius: "50%",
              padding: "6px",
              boxShadow:
                "0 0 25px rgba(212,160,23,0.4), 0 0 60px rgba(212,160,23,0.15), inset 0 0 20px rgba(255,255,255,0.05)",
              flexShrink: 0,
              backdropFilter: "blur(4px)",
            }}
          >
            <img
              src={gmpmLogo}
              alt="GMPM Logo"
              style={{
                width: "85px",
                height: "85px",
                objectFit: "cover",
                filter:
                  "brightness(1.3) drop-shadow(0 0 10px rgba(212,160,23,0.6))",
                borderRadius: "50%",
              }}
            />
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mb-6"
          style={{
            width: "180px",
            height: "220px",
            borderRadius: "12px",
            overflow: "hidden",
            border: "3px solid #d4a017",
            boxShadow:
              "0 0 40px rgba(212,160,23,0.4), 0 0 80px rgba(212,160,23,0.15)",
            margin: "0 auto",
          }}
        >
          <img
            src={prophetImg}
            alt="Prophet Sam Olu Alo"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top",
            }}
          />
        </motion.div>

        <motion.h1
          variants={scaleIn}
          className="font-bold mb-4 leading-none gold-text-glow"
          style={{
            fontSize: "clamp(2.8rem, 8vw, 7rem)",
            fontFamily: "Georgia, serif",
            color: "#ffffff",
            textShadow:
              "0 0 40px rgba(212,160,23,0.4), 0 4px 24px rgba(0,0,0,0.8)",
          }}
        >
          Prophet Sam Olu Alo
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-sm sm:text-base uppercase font-medium mb-6"
          style={{ color: "#d4a017", letterSpacing: "0.18em" }}
        >
          Planter & Zonal <br />
          Superintendent of CAC <br />
          GMPM Adamimogo Global Outreach
        </motion.p>

        <motion.div
          variants={fadeIn}
          className="flex items-center gap-3 mb-8 w-full max-w-sm"
        >
          <div
            className="flex-1 h-px"
            style={{
              background: "linear-gradient(90deg, transparent, #b8860b)",
            }}
          />
          <div
            className="w-1.5 h-1.5 rounded-full rotate-45"
            style={{ background: "#b8860b" }}
          />
          <div
            className="flex-1 h-px"
            style={{
              background: "linear-gradient(90deg, #b8860b, transparent)",
            }}
          />
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="italic text-lg sm:text-xl md:text-2xl mb-4 max-w-2xl leading-relaxed"
          style={{
            fontFamily: "Georgia, serif",
            color: "rgba(255,255,255,0.88)",
            textShadow: "0 2px 12px rgba(0,0,0,0.6)",
          }}
        >
          "A man sent by God. A father to nations. A voice that shakes the
          heavens."
        </motion.p>

        <motion.p
          variants={fadeIn}
          className="text-xs sm:text-sm italic mb-8"
          style={{ color: "rgba(212,160,23,0.6)", letterSpacing: "0.05em" }}
        >
          — Jeremiah 1:5
        </motion.p>

        <motion.div
          variants={scaleIn}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full mb-6 border"
          style={{
            background: "rgba(184,134,11,0.15)",
            borderColor: "#d4a017",
            boxShadow:
              "0 0 20px rgba(212,160,23,0.2), 0 0 60px rgba(212,160,23,0.08)",
          }}
        >
          <span className="text-lg">🎂</span>
          <span
            className="text-xs sm:text-sm font-medium uppercase"
            style={{ color: "#d4a017", letterSpacing: "0.2em" }}
          >
            Celebrating a Legend · 25th May 2026
          </span>
        </motion.div>

        <motion.p
          variants={fadeIn}
          className="text-xs uppercase"
          style={{ color: "rgba(212,160,23,0.45)", letterSpacing: "0.4em" }}
        >
          Adamimogo Worldwide
        </motion.p>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ zIndex: 10 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <span
          className="text-xs uppercase tracking-widest"
          style={{ color: "rgba(212,160,23,0.5)" }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 5v14M5 12l7 7 7-7"
              stroke="#d4a017"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.6"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
