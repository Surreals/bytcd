import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import Router components
import LandingPage from "./pages/LandingPage";
import ContactUsPage from "./pages/ContactUsPage"; // Import the new ContactUsPage

const App = () => {
  return (
    <Router> {/* Wrap your app with Router */}
      <Routes> {/* Define your routes */}
        <Route path="/" element={<LandingPage />} /> {/* Landing page at root */}
        <Route path="/contact-us" element={<ContactUsPage />} /> {/* New contact us page */}
      </Routes>
      <Analytics />
      <SpeedInsights />
    </Router>
  );
};

export default App;