import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react"
import LandingPage from "./pages/LandingPage"; // Import the new LandingPage component

const App = () => {
  return (
    <>
      <LandingPage /> {/* Render the LandingPage component */}
      <Analytics />
      <SpeedInsights />
    </>
  );
};

export default App;