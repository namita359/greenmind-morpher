
import React from "react";
import { NavBar } from "@/components/NavBar";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { TestimonialSection } from "@/components/TestimonialSection";
import { CallToActionSection } from "@/components/CallToActionSection";
import { FooterSection } from "@/components/FooterSection";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <NavBar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <TestimonialSection />
        <CallToActionSection />
      </main>
      <FooterSection />
    </div>
  );
};

export default HomePage;
