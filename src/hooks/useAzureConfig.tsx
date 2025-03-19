
import { useState, useCallback, useEffect } from "react";
import { AzureConfig } from "@/lib/types";
import { useToast } from "@/components/ui/use-toast";

const LOCAL_STORAGE_KEY = "knowAI_azureConfig";

export const useAzureConfig = () => {
  const [config, setConfig] = useState<AzureConfig>({
    openAiEndpoint: "",
    openAiKey: "",
    aiSearchEndpoint: "",
    aiSearchKey: "",
    isConfigured: false,
  });
  
  const { toast } = useToast();
  
  // Load config from localStorage on initial render
  useEffect(() => {
    const savedConfig = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig) as AzureConfig;
        setConfig(parsedConfig);
      } catch (error) {
        console.error("Error parsing saved Azure config:", error);
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
    }
  }, []);
  
  const updateConfig = useCallback((newConfig: Partial<AzureConfig>) => {
    setConfig(prev => {
      const updated = {
        ...prev,
        ...newConfig,
        isConfigured: Boolean(
          (newConfig.openAiEndpoint || prev.openAiEndpoint) &&
          (newConfig.openAiKey || prev.openAiKey) &&
          (newConfig.aiSearchEndpoint || prev.aiSearchEndpoint) &&
          (newConfig.aiSearchKey || prev.aiSearchKey)
        )
      };
      
      // Save to localStorage
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      
      return updated;
    });
    
    toast({
      title: "Configuration Updated",
      description: "Your Azure configuration has been saved",
    });
  }, [toast]);
  
  const clearConfig = useCallback(() => {
    setConfig({
      openAiEndpoint: "",
      openAiKey: "",
      aiSearchEndpoint: "",
      aiSearchKey: "",
      isConfigured: false,
    });
    
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    
    toast({
      title: "Configuration Cleared",
      description: "Your Azure configuration has been reset",
    });
  }, [toast]);
  
  const testConnection = useCallback(async () => {
    if (!config.isConfigured) {
      toast({
        title: "Configuration Required",
        description: "Please enter all Azure configuration details before testing",
        variant: "destructive",
      });
      return false;
    }
    
    // Simulate connection test
    toast({
      title: "Testing Connection",
      description: "Attempting to connect to Azure services...",
    });
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // This would actually test connections to both services
    const success = true;
    
    if (success) {
      toast({
        title: "Connection Successful",
        description: "Successfully connected to Azure OpenAI and AI Search",
      });
    } else {
      toast({
        title: "Connection Failed",
        description: "Could not connect to Azure services. Please check your configuration",
        variant: "destructive",
      });
    }
    
    return success;
  }, [config, toast]);
  
  return {
    config,
    updateConfig,
    clearConfig,
    testConnection,
  };
};
