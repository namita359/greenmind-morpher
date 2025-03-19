
import { useState, useCallback } from "react";
import { CodeTranslationRequest, CodeTranslationResult } from "@/lib/types";
import { useToast } from "@/components/ui/use-toast";

export const useCodeTranslation = () => {
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationResult, setTranslationResult] = useState<CodeTranslationResult | null>(null);
  const { toast } = useToast();

  const translateCode = useCallback(async (request: CodeTranslationRequest) => {
    if (!request.sourceCode.trim()) {
      toast({
        title: "Error",
        description: "Source code cannot be empty",
        variant: "destructive",
      });
      return;
    }

    setIsTranslating(true);
    setTranslationResult(null);

    try {
      // This would be replaced with actual Azure OpenAI API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate a translation result
      const result: CodeTranslationResult = {
        targetCode: `# Translated from ${request.sourceLanguage} to ${request.targetLanguage}\n` +
                    `# Original code: ${request.sourceCode.slice(0, 50)}...\n\n` +
                    `print("This is a simulated translation. In production, this would use Azure OpenAI.")`,
        explanation: `This is a simulated explanation of the translation from ${request.sourceLanguage} to ${request.targetLanguage}.`
      };
      
      setTranslationResult(result);
      toast({
        title: "Translation Complete",
        description: `Successfully translated from ${request.sourceLanguage} to ${request.targetLanguage}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to translate code. Please check Azure configuration.",
        variant: "destructive",
      });
      console.error("Error translating code:", error);
    } finally {
      setIsTranslating(false);
    }
  }, [toast]);

  const clearTranslation = useCallback(() => {
    setTranslationResult(null);
  }, []);

  return {
    isTranslating,
    translationResult,
    translateCode,
    clearTranslation,
  };
};
