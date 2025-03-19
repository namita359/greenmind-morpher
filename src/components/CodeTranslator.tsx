
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeTranslationRequest } from "@/lib/types";
import { RefreshCw, Copy, Check } from "lucide-react";

interface CodeTranslatorProps {
  isTranslating: boolean;
  translationResult: { targetCode: string; explanation: string } | null;
  onTranslate: (request: CodeTranslationRequest) => void;
  onClear: () => void;
}

const LANGUAGE_OPTIONS = [
  "Python",
  "JavaScript",
  "TypeScript",
  "Java",
  "C#",
  "Go",
  "Ruby",
  "Rust",
  "PHP",
  "Swift",
  "Kotlin",
];

export const CodeTranslator = ({
  isTranslating,
  translationResult,
  onTranslate,
  onClear,
}: CodeTranslatorProps) => {
  const [sourceLanguage, setSourceLanguage] = useState<string>("");
  const [targetLanguage, setTargetLanguage] = useState<string>("");
  const [sourceCode, setSourceCode] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const handleTranslate = () => {
    if (sourceLanguage && targetLanguage && sourceCode.trim()) {
      onTranslate({
        sourceCode,
        sourceLanguage,
        targetLanguage,
      });
    }
  };

  const handleCopy = () => {
    if (translationResult?.targetCode) {
      navigator.clipboard.writeText(translationResult.targetCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col h-full w-full glass-panel rounded-xl p-6 animate-fade-in">
      <h2 className="text-xl font-semibold text-tdGreen-700 mb-4">Code Translation</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <Label htmlFor="sourceLanguage" className="text-tdGreen-800">Source Language</Label>
          <Select
            value={sourceLanguage}
            onValueChange={setSourceLanguage}
          >
            <SelectTrigger className="bg-white border-tdGreen-200 focus:ring-tdGreen-500">
              <SelectValue placeholder="Select source language" />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGE_OPTIONS.map((lang) => (
                <SelectItem key={lang} value={lang}>
                  {lang}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="targetLanguage" className="text-tdGreen-800">Target Language</Label>
          <Select
            value={targetLanguage}
            onValueChange={setTargetLanguage}
          >
            <SelectTrigger className="bg-white border-tdGreen-200 focus:ring-tdGreen-500">
              <SelectValue placeholder="Select target language" />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGE_OPTIONS.map((lang) => (
                <SelectItem key={lang} value={lang} disabled={lang === sourceLanguage}>
                  {lang}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="mb-4">
        <Label htmlFor="sourceCode" className="text-tdGreen-800">Source Code</Label>
        <Textarea
          id="sourceCode"
          value={sourceCode}
          onChange={(e) => setSourceCode(e.target.value)}
          placeholder="Paste your code here..."
          className="min-h-[200px] bg-white border-tdGreen-200 focus-visible:ring-tdGreen-500 font-mono text-sm"
        />
      </div>
      
      <div className="flex gap-2 mb-6">
        <Button
          onClick={handleTranslate}
          disabled={!sourceLanguage || !targetLanguage || !sourceCode.trim() || isTranslating}
          className="bg-tdGreen-700 hover:bg-tdGreen-800 flex-grow"
        >
          {isTranslating ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Translating...
            </>
          ) : (
            "Translate Code"
          )}
        </Button>
        
        {translationResult && (
          <Button
            variant="outline"
            onClick={onClear}
            className="text-tdGreen-700 border-tdGreen-200 hover:bg-tdGreen-50"
          >
            Clear
          </Button>
        )}
      </div>
      
      {translationResult && (
        <Card className="border-tdGreen-100 flex-grow animate-fade-in overflow-hidden">
          <Tabs defaultValue="code" className="w-full">
            <TabsList className="bg-tdGreen-50 p-1 w-full">
              <TabsTrigger value="code" className="data-[state=active]:bg-white data-[state=active]:text-tdGreen-700">
                Translated Code
              </TabsTrigger>
              <TabsTrigger value="explanation" className="data-[state=active]:bg-white data-[state=active]:text-tdGreen-700">
                Explanation
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="code" className="p-4 mt-0">
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 text-tdGreen-600 hover:bg-tdGreen-50"
                  onClick={handleCopy}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
                <pre className="bg-gray-50 p-4 rounded-md overflow-auto max-h-[300px] whitespace-pre-wrap font-mono text-sm">
                  {translationResult.targetCode}
                </pre>
              </div>
            </TabsContent>
            
            <TabsContent value="explanation" className="p-4 mt-0">
              <div className="bg-gray-50 p-4 rounded-md overflow-auto max-h-[300px]">
                <p className="whitespace-pre-wrap text-sm">
                  {translationResult.explanation}
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      )}
    </div>
  );
};
