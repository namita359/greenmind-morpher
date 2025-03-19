
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full py-4 px-6 flex items-center justify-between bg-white sticky top-0 z-50 shadow-sm">
      <div className="flex items-center">
        <span className="text-2xl font-semibold text-tdGreen-700">
          Know<span className="text-tdGreen-500">AI</span>
        </span>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-8">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-tdGreen-800 hover:text-tdGreen-600">Solutions</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-tdGreen-50 to-tdGreen-100 p-6 no-underline outline-none focus:shadow-md"
                        href="#"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium text-tdGreen-900">
                          AI Assistant
                        </div>
                        <p className="text-sm leading-tight text-tdGreen-700">
                          Get instant answers from your organization's knowledge
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <SolutionItem title="Code Translation" href="#">
                    Convert code between programming languages
                  </SolutionItem>
                  <SolutionItem title="Document Intelligence" href="#">
                    Extract insights from your documents
                  </SolutionItem>
                  <SolutionItem title="Knowledge Management" href="#">
                    Organize and make knowledge accessible
                  </SolutionItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-tdGreen-800 hover:text-tdGreen-600">Platform</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px]">
                  <SolutionItem title="Azure Integration" href="#">
                    Enterprise-grade AI powered by Azure
                  </SolutionItem>
                  <SolutionItem title="Security" href="#">
                    Enterprise security and compliance
                  </SolutionItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink className="text-tdGreen-800 hover:text-tdGreen-600 font-medium" href="#">
                Why KnowAI
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink className="text-tdGreen-800 hover:text-tdGreen-600 font-medium" href="#">
                Resources
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <Link to="/app">
          <Button variant="outline" className="border-tdGreen-600 text-tdGreen-700 hover:bg-tdGreen-50 mr-2">
            Dashboard
          </Button>
        </Link>

        <Button className="bg-tdGreen-600 hover:bg-tdGreen-700">Get Started</Button>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <Button 
          variant="ghost" 
          className="text-tdGreen-800"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "Close" : "Menu"}
        </Button>
        
        {isOpen && (
          <div className="absolute top-16 left-0 w-full bg-white shadow-md p-4 z-50">
            <ul className="space-y-4">
              <li><a href="#" className="text-tdGreen-800 hover:text-tdGreen-600">Solutions</a></li>
              <li><a href="#" className="text-tdGreen-800 hover:text-tdGreen-600">Platform</a></li>
              <li><a href="#" className="text-tdGreen-800 hover:text-tdGreen-600">Why KnowAI</a></li>
              <li><a href="#" className="text-tdGreen-800 hover:text-tdGreen-600">Resources</a></li>
              <li>
                <Link to="/app" className="block mb-2">
                  <Button variant="outline" className="w-full border-tdGreen-600 text-tdGreen-700 hover:bg-tdGreen-50">
                    Dashboard
                  </Button>
                </Link>
              </li>
              <li>
                <Button className="w-full bg-tdGreen-600 hover:bg-tdGreen-700">Get Started</Button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const SolutionItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-tdGreen-50 hover:text-tdGreen-700 focus:bg-tdGreen-50 focus:text-tdGreen-700",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
SolutionItem.displayName = "SolutionItem";
