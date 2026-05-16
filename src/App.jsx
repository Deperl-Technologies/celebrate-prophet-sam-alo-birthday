import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import Countdown from "./components/Countdown";
import WishForm from "./components/WishForm";
import WishesWall from "./components/WishesWall";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Hero />
              <div className="py-12 px-4" style={{ background: "#0a0a1a" }}>
                <Countdown />
              </div>
              <WishForm />
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
