import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import Router components
import LandingPage from "./pages/LandingPage";
import ContactUsPage from "./pages/ContactUsPage";
import NotFoundPage from "./pages/NotFoundPage"; // Import the new NotFoundPage

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="*" element={<NotFoundPage />} /> {/* Catch-all route for 404 */}
      </Routes>
      <Analytics />
      <SpeedInsights />
    </Router>
  );
};

export default App;