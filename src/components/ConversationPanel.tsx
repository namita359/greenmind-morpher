
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { PlusCircle, Send, User, Bot } from "lucide-react";
import { Message } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ConversationPanelProps {
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (content: string) => void;
  onNewConversation: () => void;
}

export const ConversationPanel = ({
  messages,
  isLoading,
  onSendMessage,
  onNewConversation,
}: ConversationPanelProps) => {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    // Focus input when component mounts
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-full w-full glass-panel rounded-xl p-4 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-tdGreen-700">Conversation</h2>
        <Button 
          variant="outline" 
          className="flex items-center gap-2 text-tdGreen-600 border-tdGreen-200 hover:bg-tdGreen-50"
          onClick={onNewConversation}
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Chat</span>
        </Button>
      </div>
      
      <Separator className="bg-tdGreen-100 mb-4" />
      
      <ScrollArea className="flex-1 pr-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-8">
            <div className="bg-tdGreen-50 rounded-full p-4 mb-4">
              <Bot className="w-8 h-8 text-tdGreen-600" />
            </div>
            <h3 className="text-xl font-medium text-tdGreen-700 mb-2">How can I help you today?</h3>
            <p className="text-gray-500 max-w-md">
              Ask me anything about your documents, code translation needs, or general knowledge questions.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((message) => (
              <Card 
                key={message.id}
                className={cn(
                  "p-4 overflow-hidden animate-slide-up",
                  message.role === "user" 
                    ? "bg-tdGreen-50 border-tdGreen-100" 
                    : "bg-white border-gray-100"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "rounded-full p-2 flex-shrink-0",
                    message.role === "user" ? "bg-tdGreen-100" : "bg-tdGreen-700"
                  )}>
                    {message.role === "user" ? (
                      <User className="w-4 h-4 text-tdGreen-700" />
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium mb-1 text-gray-500">
                      {message.role === "user" ? "You" : "Assistant"}
                    </div>
                    <div className="text-gray-800 whitespace-pre-wrap">
                      {message.content}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
            {isLoading && (
              <Card className="p-4 bg-white border-gray-100 animate-slide-up">
                <div className="flex items-start gap-3">
                  <div className="bg-tdGreen-700 rounded-full p-2">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium mb-1 text-gray-500">
                      Assistant
                    </div>
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-tdGreen-300 animate-pulse"></div>
                      <div className="w-2 h-2 rounded-full bg-tdGreen-400 animate-pulse delay-150"></div>
                      <div className="w-2 h-2 rounded-full bg-tdGreen-500 animate-pulse delay-300"></div>
                    </div>
                  </div>
                </div>
              </Card>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </ScrollArea>
      
      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
        <Input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border-tdGreen-200 focus-visible:ring-tdGreen-500"
          disabled={isLoading}
        />
        <Button 
          type="submit" 
          disabled={!input.trim() || isLoading}
          className="bg-tdGreen-700 hover:bg-tdGreen-800"
        >
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
};
