import { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import Countdown from "./components/Countdown";
import WishForm from "./components/WishForm";
import WishesWall from "./components/WishesWall";
import Footer from "./components/Footer";

function App() {
  const [hideHeroCta, setHideHeroCta] = useState(false);
  const formCtaRef = useRef(null);

  useEffect(() => {
    const target = formCtaRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHideHeroCta(entry.isIntersecting);
      },
      {
        threshold: 0.6,
        rootMargin: "-10% 0px -10% 0px",
      },
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Hero hideGrandPageCta={hideHeroCta} />
              <div className="py-12 px-4" style={{ background: "#0a0a1a" }}>
                <Countdown />
              </div>
              <WishForm grandPageCtaRef={formCtaRef} />
              <WishesWall />
              <Footer />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
