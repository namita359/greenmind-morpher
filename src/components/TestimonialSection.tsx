
import { Card, CardContent } from "@/components/ui/card";

export const TestimonialSection = () => {
  const testimonials = [
    {
      quote: "KnowAI has transformed how we access and use information across our organization.",
      author: "Sarah Johnson",
      position: "CIO, Global Finance",
      image: "https://placehold.co/100/e9fbf0/008a00?text=SJ"
    },
    {
      quote: "The code translation feature saves our developers countless hours when migrating legacy systems.",
      author: "Michael Chen",
      position: "VP Engineering, Tech Innovations",
      image: "https://placehold.co/100/e9fbf0/008a00?text=MC"
    },
    {
      quote: "Document ingestion capabilities have made our compliance documents instantly searchable and accessible.",
      author: "Emily Rodriguez",
      position: "Compliance Director, Healthcare Solutions",
      image: "https://placehold.co/100/e9fbf0/008a00?text=ER"
    },
  ];

  return (
    <div className="bg-tdGreen-50 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-tdGreen-900 mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-lg text-tdGreen-700 max-w-2xl mx-auto">
            See what our customers are saying about KnowAI
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white border-none shadow-md">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden mb-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.author} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <blockquote className="text-tdGreen-700 italic mb-4">
                    "{testimonial.quote}"
                  </blockquote>
                  <p className="font-medium text-tdGreen-800">{testimonial.author}</p>
                  <p className="text-sm text-tdGreen-600">{testimonial.position}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
