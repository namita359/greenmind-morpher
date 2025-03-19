
import { useState, useCallback } from "react";
import { Document } from "@/lib/types";
import { useToast } from "@/components/ui/use-toast";
import { v4 as uuidv4 } from 'uuid';

export const useDocumentIngestion = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const uploadDocument = useCallback((file: File) => {
    const newDocument: Document = {
      id: uuidv4(),
      name: file.name,
      size: file.size,
      type: file.type,
      uploadedAt: new Date(),
      status: "uploading",
    };
    
    setDocuments(prev => [newDocument, ...prev]);
    
    // Simulate document upload and processing
    setTimeout(() => {
      setDocuments(prev => 
        prev.map(doc => 
          doc.id === newDocument.id 
            ? { ...doc, status: "processing" } 
            : doc
        )
      );
      
      // Simulate processing completion after another delay
      setTimeout(() => {
        setDocuments(prev => 
          prev.map(doc => 
            doc.id === newDocument.id 
              ? { ...doc, status: "ready" } 
              : doc
          )
        );
        
        toast({
          title: "Document Ready",
          description: `${file.name} has been processed and is ready for use`,
        });
      }, 3000);
    }, 1500);

    return newDocument.id;
  }, [toast]);

  const removeDocument = useCallback((documentId: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== documentId));
  }, []);

  const processDocuments = useCallback(async () => {
    const docsToProcess = documents.filter(doc => doc.status === "ready");
    
    if (docsToProcess.length === 0) {
      toast({
        title: "No Documents",
        description: "There are no ready documents to process",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // This would be replaced with actual Azure AI Search service call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      toast({
        title: "Processing Complete",
        description: `${docsToProcess.length} documents have been indexed and are ready for queries`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process documents. Please check Azure configuration.",
        variant: "destructive",
      });
      console.error("Error processing documents:", error);
    } finally {
      setIsProcessing(false);
    }
  }, [documents, toast]);

  return {
    documents,
    isProcessing,
    uploadDocument,
    removeDocument,
    processDocuments,
  };
};
