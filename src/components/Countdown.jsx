import { useState, useEffect } from "react";

const BIRTHDAY = new Date("2026-05-25T00:00:00");
const CLOSE_DATE = new Date("2026-05-26T00:00:00");

function Countdown() {
  const [timeLeft, setTimeLeft] = useState({});
  const [phase, setPhase] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();

      if (now >= CLOSE_DATE) {
        setPhase("closed");
        clearInterval(timer);
        return;
      }

      if (now >= BIRTHDAY) {
        setPhase("birthday");
        const diff = CLOSE_DATE - now;
        setTimeLeft(calculateTime(diff));
        return;
      }

      setPhase("countdown");
      const diff = BIRTHDAY - now;
      setTimeLeft(calculateTime(diff));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const calculateTime = (diff) => {
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  if (phase === "closed") {
    return (
      <div style={styles.container}>
        <p style={styles.legacyText}>
          🏛️ The gates are sealed. A legacy lives forever.
        </p>
      </div>
    );
  }

  if (phase === "birthday") {
    return (
      <div style={styles.container}>
        <p style={styles.label}>🔐 Wishes close in</p>
        <div style={styles.timerRow}>
          <TimeBox value={timeLeft.hours} label="Hours" />
          <TimeBox value={timeLeft.minutes} label="Minutes" />
          <TimeBox value={timeLeft.seconds} label="Seconds" />
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <p style={styles.label}>🎂 Prophet's birthday in</p>
      <div style={styles.timerRow}>
        <TimeBox value={timeLeft.days} label="Days" />
        <TimeBox value={timeLeft.hours} label="Hours" />
        <TimeBox value={timeLeft.minutes} label="Minutes" />
        <TimeBox value={timeLeft.seconds} label="Seconds" />
      </div>
    </div>
  );
}

function TimeBox({ value, label }) {
  return (
    <div style={styles.box}>
      <span style={styles.number}>{String(value).padStart(2, "0")}</span>
      <span style={styles.boxLabel}>{label}</span>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "2rem 1rem",
    backgroundColor: "#1a1a2e",
    borderRadius: "16px",
    maxWidth: "600px",
    margin: "0 auto 2rem",
  },
  label: {
    color: "#b8860b",
    fontSize: "1rem",
    fontWeight: "bold",
    marginBottom: "1rem",
    letterSpacing: "1px",
  },
  timerRow: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    flexWrap: "wrap",
  },
  box: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#ffffff10",
    borderRadius: "10px",
    padding: "0.8rem 1.2rem",
    minWidth: "70px",
  },
  number: {
    fontSize: "2.2rem",
    fontWeight: "bold",
    color: "#b8860b",
    fontFamily: "Georgia, serif",
  },
  boxLabel: {
    fontSize: "0.75rem",
    color: "#ffffff80",
    marginTop: "0.3rem",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  legacyText: {
    color: "#b8860b",
    fontSize: "1.1rem",
    fontFamily: "Georgia, serif",
  },
};

export default Countdown;
