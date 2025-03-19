
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
    <div className="w-full bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 md:pr-12 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-tdGreen-900 leading-tight mb-4 animate-fade-in">
            Make Your Knowledge <span className="text-tdGreen-600">Actionable</span>
          </h1>
          <p className="text-xl text-tdGreen-700 mb-8 animate-slide-up">
            Transform your organization's knowledge into insights with our AI-powered platform.
            Ask questions, translate code, and unlock the value in your documents.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-tdGreen-600 hover:bg-tdGreen-700 px-8 py-6 text-lg">
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="border-tdGreen-600 text-tdGreen-700 hover:bg-tdGreen-50 px-8 py-6 text-lg">
              See Demo
            </Button>
          </div>
        </div>
        <div className="md:w-1/2 animate-fade-in">
          <div className="glass-panel rounded-2xl overflow-hidden shadow-xl p-2">
            <img 
              src="https://placehold.co/600x400/e9fbf0/008a00?text=KnowAI+Platform" 
              alt="KnowAI Platform" 
              className="w-full h-auto rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
