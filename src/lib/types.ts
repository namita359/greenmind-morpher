
export interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CodeTranslationRequest {
  sourceCode: string;
  sourceLanguage: string;
  targetLanguage: string;
}

export interface CodeTranslationResult {
  targetCode: string;
  explanation: string;
}

export interface Document {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: Date;
  status: "uploading" | "processing" | "ready" | "error";
  error?: string;
}

export interface AzureConfig {
  openAiEndpoint: string;
  openAiKey: string;
  aiSearchEndpoint: string;
  aiSearchKey: string;
  isConfigured: boolean;
}
