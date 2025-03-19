
import React from "react";
import { LandingNavBar } from "@/components/LandingNavBar";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { FAQSection } from "@/components/FAQSection";
import { ContactSection } from "@/components/ContactSection";
import { FooterSection } from "@/components/FooterSection";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <LandingNavBar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <FAQSection />
        <ContactSection />
      </main>
      <FooterSection />
    </div>
  );
};

export default HomePage;
