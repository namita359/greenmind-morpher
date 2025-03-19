
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AzureConfig } from "@/lib/types";
import { Save, RefreshCw, Trash } from "lucide-react";

interface SettingsPanelProps {
  config: AzureConfig;
  onUpdateConfig: (config: Partial<AzureConfig>) => void;
  onClearConfig: () => void;
  onTestConnection: () => Promise<boolean>;
}

export const SettingsPanel = ({
  config,
  onUpdateConfig,
  onClearConfig,
  onTestConnection,
}: SettingsPanelProps) => {
  const [formState, setFormState] = useState<Partial<AzureConfig>>({
    openAiEndpoint: config.openAiEndpoint,
    openAiKey: config.openAiKey,
    aiSearchEndpoint: config.aiSearchEndpoint,
    aiSearchKey: config.aiSearchKey,
  });
  const [isTesting, setIsTesting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onUpdateConfig(formState);
  };

  const handleTestConnection = async () => {
    setIsTesting(true);
    try {
      await onTestConnection();
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full glass-panel rounded-xl p-6 animate-fade-in">
      <h2 className="text-xl font-semibold text-tdGreen-700 mb-4">Azure Settings</h2>
      
      <div className="grid grid-cols-1 gap-8">
        <Card className="p-4 border-tdGreen-100">
          <h3 className="text-lg font-medium text-tdGreen-800 mb-2">Azure OpenAI Configuration</h3>
          <Separator className="bg-tdGreen-100 mb-4" />
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="openAiEndpoint" className="text-tdGreen-800">OpenAI Endpoint</Label>
              <Input
                id="openAiEndpoint"
                name="openAiEndpoint"
                value={formState.openAiEndpoint || ""}
                onChange={handleChange}
                placeholder="https://your-resource-name.openai.azure.com/"
                className="bg-white border-tdGreen-200 focus-visible:ring-tdGreen-500"
              />
            </div>
            
            <div>
              <Label htmlFor="openAiKey" className="text-tdGreen-800">OpenAI API Key</Label>
              <Input
                id="openAiKey"
                name="openAiKey"
                type="password"
                value={formState.openAiKey || ""}
                onChange={handleChange}
                placeholder="Enter your API key"
                className="bg-white border-tdGreen-200 focus-visible:ring-tdGreen-500"
              />
            </div>
          </div>
        </Card>
        
        <Card className="p-4 border-tdGreen-100">
          <h3 className="text-lg font-medium text-tdGreen-800 mb-2">Azure AI Search Configuration</h3>
          <Separator className="bg-tdGreen-100 mb-4" />
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="aiSearchEndpoint" className="text-tdGreen-800">AI Search Endpoint</Label>
              <Input
                id="aiSearchEndpoint"
                name="aiSearchEndpoint"
                value={formState.aiSearchEndpoint || ""}
                onChange={handleChange}
                placeholder="https://your-resource-name.search.windows.net/"
                className="bg-white border-tdGreen-200 focus-visible:ring-tdGreen-500"
              />
            </div>
            
            <div>
              <Label htmlFor="aiSearchKey" className="text-tdGreen-800">AI Search API Key</Label>
              <Input
                id="aiSearchKey"
                name="aiSearchKey"
                type="password"
                value={formState.aiSearchKey || ""}
                onChange={handleChange}
                placeholder="Enter your API key"
                className="bg-white border-tdGreen-200 focus-visible:ring-tdGreen-500"
              />
            </div>
          </div>
        </Card>
      </div>
      
      <div className="flex gap-3 mt-6">
        <Button 
          onClick={handleSave}
          className="bg-tdGreen-700 hover:bg-tdGreen-800 flex-grow"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Configuration
        </Button>
        
        <Button
          variant="outline"
          onClick={handleTestConnection}
          disabled={!config.isConfigured || isTesting}
          className="text-tdGreen-700 border-tdGreen-200 hover:bg-tdGreen-50 flex-grow"
        >
          {isTesting ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Testing...
            </>
          ) : (
            <>
              <RefreshCw className="w-4 h-4 mr-2" />
              Test Connection
            </>
          )}
        </Button>
        
        <Button
          variant="outline"
          onClick={onClearConfig}
          className="text-red-500 border-red-200 hover:bg-red-50"
        >
          <Trash className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
