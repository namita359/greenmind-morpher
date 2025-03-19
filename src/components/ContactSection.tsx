
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin } from "lucide-react";

export const ContactSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent",
        description: "We'll get back to you as soon as possible.",
      });
      
      // Reset form
      setName("");
      setEmail("");
      setMessage("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="w-full bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-tdGreen-900 mb-4">
            Contact Us
          </h2>
          <p className="text-lg text-tdGreen-700 max-w-2xl mx-auto">
            Have questions? We're here to help. Reach out to our team.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="glass-panel p-8 rounded-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="border-tdGreen-200 focus-visible:ring-tdGreen-500"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-tdGreen-200 focus-visible:ring-tdGreen-500"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Your message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="min-h-[120px] border-tdGreen-200 focus-visible:ring-tdGreen-500"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-tdGreen-600 hover:bg-tdGreen-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
          
          <div className="flex flex-col justify-center">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-tdGreen-100 p-3 rounded-full">
                  <Mail className="text-tdGreen-600 h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-tdGreen-800 mb-1">Email Us</h3>
                  <p className="text-tdGreen-600">info@knowai.example.com</p>
                  <p className="text-tdGreen-600">support@knowai.example.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-tdGreen-100 p-3 rounded-full">
                  <Phone className="text-tdGreen-600 h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-tdGreen-800 mb-1">Call Us</h3>
                  <p className="text-tdGreen-600">+1 (123) 456-7890</p>
                  <p className="text-tdGreen-600">Mon-Fri, 9AM-5PM EST</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-tdGreen-100 p-3 rounded-full">
                  <MapPin className="text-tdGreen-600 h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-tdGreen-800 mb-1">Visit Us</h3>
                  <p className="text-tdGreen-600">123 Innovation Drive</p>
                  <p className="text-tdGreen-600">Tech City, CA 94103</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
