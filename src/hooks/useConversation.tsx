
import { useState, useCallback } from "react";
import { Message, Conversation } from "@/lib/types";
import { useToast } from "@/components/ui/use-toast";
import { v4 as uuidv4 } from 'uuid';

export const useConversation = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const startNewConversation = useCallback(() => {
    const newConversation: Conversation = {
      id: uuidv4(),
      title: "New Conversation",
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setConversations(prev => [newConversation, ...prev]);
    setActiveConversation(newConversation);
    return newConversation;
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;
    
    let currentConversation = activeConversation;
    if (!currentConversation) {
      currentConversation = startNewConversation();
    }
    
    const userMessage: Message = {
      id: uuidv4(),
      role: "user",
      content,
      timestamp: new Date(),
    };
    
    // Update conversation with user message
    const updatedMessages = [...currentConversation.messages, userMessage];
    const updatedConversation = {
      ...currentConversation,
      messages: updatedMessages,
      updatedAt: new Date(),
    };
    
    setActiveConversation(updatedConversation);
    
    // Update conversations list
    setConversations(prev => 
      prev.map(conv => conv.id === updatedConversation.id ? updatedConversation : conv)
    );
    
    // Simulate AI response
    setIsLoading(true);
    try {
      // This would be replaced with actual Azure OpenAI API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const assistantMessage: Message = {
        id: uuidv4(),
        role: "assistant",
        content: `This is a simulated response to: "${content}". In production, this would call Azure OpenAI.`,
        timestamp: new Date(),
      };
      
      const finalMessages = [...updatedMessages, assistantMessage];
      const finalConversation = {
        ...updatedConversation,
        messages: finalMessages,
        title: finalMessages.length === 2 ? content.slice(0, 30) + "..." : updatedConversation.title,
        updatedAt: new Date(),
      };
      
      setActiveConversation(finalConversation);
      setConversations(prev => 
        prev.map(conv => conv.id === finalConversation.id ? finalConversation : conv)
      );
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get response. Please check Azure configuration.",
        variant: "destructive",
      });
      console.error("Error getting AI response:", error);
    } finally {
      setIsLoading(false);
    }
  }, [activeConversation, startNewConversation, toast]);

  const selectConversation = useCallback((conversationId: string) => {
    const conversation = conversations.find(c => c.id === conversationId);
    if (conversation) {
      setActiveConversation(conversation);
    }
  }, [conversations]);

  const deleteConversation = useCallback((conversationId: string) => {
    setConversations(prev => prev.filter(c => c.id !== conversationId));
    if (activeConversation?.id === conversationId) {
      setActiveConversation(null);
    }
  }, [activeConversation]);

  return {
    conversations,
    activeConversation,
    isLoading,
    startNewConversation,
    sendMessage,
    selectConversation,
    deleteConversation,
  };
};
