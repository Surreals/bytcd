"use client";

import React, { lazy, Suspense } from "react"; // Import lazy and Suspense
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BackToTopButton, CustomCursor } from "./components"; // Import CustomCursor

// Lazy load page components
const LazyLandingPage = lazy(() => import("./pages/LandingPage"));
const LazyContactUsPage = lazy(() => import("./pages/ContactUsPage"));
const LazyNotFoundPage = lazy(() => import("./pages/NotFoundPage"));

const App = () => {
  return (
    <Router>
      <CustomCursor /> {/* Render CustomCursor here globally */}
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen" style={{ background: 'var(--paper)', color: 'var(--ink)' }}>
          Loading...
        </div>
      }> {/* Add Suspense for lazy loaded components */}
        <Routes>
          <Route path="/" element={<LazyLandingPage />} />
          <Route path="/contact-us" element={<LazyContactUsPage />} />
          <Route path="*" element={<LazyNotFoundPage />} />
        </Routes>
      </Suspense>
      <Analytics />
      <SpeedInsights />
      <BackToTopButton /> {/* Render BackToTopButton here globally */}
    </Router>
  );
};

export default App;