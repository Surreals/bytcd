import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ContactUsPage from "./pages/ContactUsPage";
import NotFoundPage from "./pages/NotFoundPage";
import { BackToTopButton, CustomCursor } from "./components"; // Import CustomCursor

const App = () => {
  return (
    <Router>
      <CustomCursor /> {/* Render CustomCursor here globally */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Analytics />
      <SpeedInsights />
      <BackToTopButton /> {/* Render BackToTopButton here globally */}
    </Router>
  );
};

export default App;