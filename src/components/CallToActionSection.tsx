
import { Button } from "@/components/ui/button";

export const CallToActionSection = () => {
  return (
    <div className="bg-tdGreen-700 py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to Transform Your Knowledge Management?
        </h2>
        <p className="text-lg text-tdGreen-100 max-w-2xl mx-auto mb-8">
          Start using KnowAI today and unlock the full potential of your organization's knowledge
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" className="bg-white text-tdGreen-700 hover:bg-tdGreen-50 px-8 py-6 text-lg">
            Get Started Free
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-tdGreen-600 px-8 py-6 text-lg">
            Request Demo
          </Button>
        </div>
      </div>
    </div>
  );
};
