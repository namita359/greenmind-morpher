
import React from "react";
import { LandingNavBar } from "@/components/LandingNavBar";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <LandingNavBar />
      <main>
        <HeroSection />
        <FeaturesSection />
      </main>
    </div>
  );
};

export default HomePage;
