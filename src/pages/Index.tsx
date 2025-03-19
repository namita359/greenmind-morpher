
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { ConversationPanel } from "@/components/ConversationPanel";
import { CodeTranslator } from "@/components/CodeTranslator";
import { DocumentIngestion } from "@/components/DocumentIngestion";
import { SettingsPanel } from "@/components/SettingsPanel";
import { useConversation } from "@/hooks/useConversation";
import { useCodeTranslation } from "@/hooks/useCodeTranslation";
import { useDocumentIngestion } from "@/hooks/useDocumentIngestion";
import { useAzureConfig } from "@/hooks/useAzureConfig";

const Index = () => {
  const [activeSection, setActiveSection] = useState("chat");
  
  const { 
    activeConversation, 
    isLoading, 
    sendMessage, 
    startNewConversation 
  } = useConversation();
  
  const { 
    isTranslating, 
    translationResult, 
    translateCode, 
    clearTranslation 
  } = useCodeTranslation();
  
  const { 
    documents, 
    isProcessing, 
    uploadDocument, 
    removeDocument, 
    processDocuments 
  } = useDocumentIngestion();
  
  const { 
    config, 
    updateConfig, 
    clearConfig, 
    testConnection 
  } = useAzureConfig();

  const renderActiveSection = () => {
    switch (activeSection) {
      case "chat":
        return (
          <ConversationPanel
            messages={activeConversation?.messages || []}
            isLoading={isLoading}
            onSendMessage={sendMessage}
            onNewConversation={startNewConversation}
          />
        );
      case "code":
        return (
          <CodeTranslator
            isTranslating={isTranslating}
            translationResult={translationResult}
            onTranslate={translateCode}
            onClear={clearTranslation}
          />
        );
      case "documents":
        return (
          <DocumentIngestion
            documents={documents}
            isProcessing={isProcessing}
            onUpload={uploadDocument}
            onRemove={removeDocument}
            onProcess={processDocuments}
          />
        );
      case "settings":
        return (
          <SettingsPanel
            config={config}
            onUpdateConfig={updateConfig}
            onClearConfig={clearConfig}
            onTestConnection={testConnection}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-tdGreen-50 to-tdGreen-100 p-6">
      <div className="max-w-6xl mx-auto section-transition">
        <Navbar activeSection={activeSection} onSectionChange={setActiveSection} />
        
        <div className="flex-grow h-[calc(100vh-140px)]">
          {renderActiveSection()}
        </div>
      </div>
    </div>
  );
};

export default Index;
