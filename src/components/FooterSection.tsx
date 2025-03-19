
import React from "react";
import { Separator } from "@/components/ui/separator";

export const FooterSection = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = {
    "Product": ["Features", "Solutions", "Integrations", "Pricing", "Security"],
    "Resources": ["Documentation", "Guides", "API Reference", "Community", "Support"],
    "Company": ["About Us", "Careers", "Blog", "Press", "Contact"],
    "Legal": ["Terms of Service", "Privacy Policy", "Cookie Policy", "GDPR"]
  };

  return (
    <footer className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-medium text-tdGreen-800 mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a 
                      href="#" 
                      className="text-tdGreen-600 hover:text-tdGreen-800 text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <Separator className="mb-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <span className="text-xl font-semibold text-tdGreen-700">
              Know<span className="text-tdGreen-500">AI</span>
            </span>
          </div>
          
          <div className="text-sm text-tdGreen-600">
            © {currentYear} KnowAI. All rights reserved.
          </div>
          
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-tdGreen-600 hover:text-tdGreen-800">
              Twitter
            </a>
            <a href="#" className="text-tdGreen-600 hover:text-tdGreen-800">
              LinkedIn
            </a>
            <a href="#" className="text-tdGreen-600 hover:text-tdGreen-800">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
