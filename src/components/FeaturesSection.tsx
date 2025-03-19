
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const FeaturesSection = () => {
  const features = [
    {
      title: "Ask Questions",
      description: "Get instant answers from your knowledge base using natural language.",
      icon: "🔍",
    },
    {
      title: "Translate Code",
      description: "Convert code between programming languages with a single click.",
      icon: "💻",
    },
    {
      title: "Document Intelligence",
      description: "Extract insights from your documents and make them searchable.",
      icon: "📄",
    },
    {
      title: "Azure Powered",
      description: "Enterprise-grade AI powered by Azure OpenAI and AI Search.",
      icon: "☁️",
    },
  ];

  return (
    <div className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-tdGreen-900 mb-4">
            Features that Empower Your Knowledge
          </h2>
          <p className="text-lg text-tdGreen-700 max-w-2xl mx-auto">
            Our platform combines the power of AI with your organization's unique knowledge
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border border-tdGreen-100 hover:shadow-md transition-shadow duration-300">
              <CardHeader>
                <div className="text-4xl mb-4">{feature.icon}</div>
                <CardTitle className="text-xl text-tdGreen-800">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-tdGreen-600">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
