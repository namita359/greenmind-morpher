
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MessageSquare, Code, FileText, Settings } from "lucide-react";

interface NavbarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const Navbar = ({ activeSection, onSectionChange }: NavbarProps) => {
  const [hovered, setHovered] = useState<string | null>(null);

  const navItems = [
    { id: "chat", label: "Ask Questions", icon: MessageSquare },
    { id: "code", label: "Translate Code", icon: Code },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <nav className="w-full py-4 px-6 flex items-center justify-between glass-panel rounded-xl mb-8 animate-fade-in">
      <div className="flex items-center">
        <span className="text-2xl font-semibold text-tdGreen-700">
          Know<span className="text-tdGreen-500">AI</span>
        </span>
      </div>
      
      <div className="flex items-center space-x-2">
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant={activeSection === item.id ? "default" : "ghost"}
            className={cn(
              "px-4 py-2 transition-all duration-300 relative",
              activeSection === item.id ? "bg-tdGreen-700 text-white" : "text-tdGreen-800",
              "hover:bg-tdGreen-100",
              "group"
            )}
            onClick={() => onSectionChange(item.id)}
            onMouseEnter={() => setHovered(item.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <item.icon className={cn(
              "w-5 h-5 mr-2",
              activeSection === item.id ? "text-white" : "text-tdGreen-700",
              "group-hover:text-tdGreen-700"
            )} />
            <span>{item.label}</span>
            
            {/* Animation under active button */}
            {(activeSection === item.id || hovered === item.id) && (
              <span 
                className={cn(
                  "absolute bottom-0 left-0 w-full h-0.5 rounded-full",
                  activeSection === item.id ? "bg-white" : "bg-tdGreen-500",
                  "transform origin-left transition-all duration-300",
                  activeSection === item.id ? "scale-100" : "scale-0 group-hover:scale-100"
                )}
              ></span>
            )}
          </Button>
        ))}
      </div>
    </nav>
  );
};
