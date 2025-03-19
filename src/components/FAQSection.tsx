
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const FAQSection = () => {
  const faqs = [
    {
      question: "What is KnowAI?",
      answer: "KnowAI is an AI-powered platform that helps organizations transform their knowledge into actionable insights. It allows users to ask questions, translate code, and extract valuable information from their documents."
    },
    {
      question: "How does the document intelligence feature work?",
      answer: "Our document intelligence feature uses advanced AI to analyze your uploaded documents, extract key information, and make it searchable. This allows you to quickly find specific information across your entire document library."
    },
    {
      question: "Is KnowAI secure for enterprise use?",
      answer: "Yes, KnowAI is built with enterprise-grade security in mind. We leverage Azure's robust security infrastructure and implement best practices for data protection, including encryption and secure access controls."
    },
    {
      question: "Can I integrate KnowAI with my existing tools?",
      answer: "KnowAI is designed to be easily integrated with your existing workflow and tools. We provide APIs and connectors for popular enterprise software solutions to ensure a seamless experience."
    },
    {
      question: "What types of documents can KnowAI process?",
      answer: "KnowAI can process a wide range of document formats including PDFs, Word documents, Excel spreadsheets, PowerPoint presentations, and various text formats. Our system is constantly being improved to support additional formats."
    },
  ];

  return (
    <div className="w-full bg-tdGreen-50 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-tdGreen-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-tdGreen-700 max-w-2xl mx-auto">
            Find answers to common questions about our platform
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-tdGreen-800 hover:text-tdGreen-600 text-lg font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-tdGreen-700">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};
