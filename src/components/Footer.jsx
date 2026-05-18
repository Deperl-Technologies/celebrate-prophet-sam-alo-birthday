import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="py-10 px-4 text-center"
      style={{
        background: "#0a0a1a",
        borderTop: "1px solid rgba(212,160,23,0.15)",
      }}
    >
      <div className="flex items-center gap-3 max-w-xs mx-auto mb-6">
        <div
          className="flex-1 h-px"
          style={{ background: "linear-gradient(90deg, transparent, #b8860b)" }}
        />
        <div
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: "#d4a017" }}
        />
        <div
          className="flex-1 h-px"
          style={{ background: "linear-gradient(90deg, #b8860b, transparent)" }}
        />
      </div>

      <p
        className="text-xs italic mb-2"
        style={{ color: "rgba(212,160,23,0.5)", fontFamily: "Georgia, serif" }}
      >
        In honour of a man sent by God — Prophet Sam Olu Alo
      </p>

      <p
        className="text-xs uppercase mb-4"
        style={{ color: "rgba(212,160,23,0.35)", letterSpacing: "0.3em" }}
      >
        C.A.C Grace of Mercy · Adamimogo Worldwide
      </p>

      <p className="text-xs" style={{ color: "rgba(212,160,23,0.5)" }}>
        Built with ❤️ by{" "}
        <a
          href="https://portfoliozone.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#d4a017", textDecoration: "underline" }}
        >
          Adeperl Innovations
        </a>
      </p>
    </motion.footer>
  );
};

export default Footer;
