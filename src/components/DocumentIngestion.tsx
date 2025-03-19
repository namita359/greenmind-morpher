
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { FileUp, Trash2, Database, FileText } from "lucide-react";
import { Document } from "@/lib/types";
import { cn } from "@/lib/utils";

interface DocumentIngestionProps {
  documents: Document[];
  isProcessing: boolean;
  onUpload: (file: File) => string;
  onRemove: (documentId: string) => void;
  onProcess: () => void;
}

export const DocumentIngestion = ({
  documents,
  isProcessing,
  onUpload,
  onRemove,
  onProcess,
}: DocumentIngestionProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      Array.from(files).forEach((file) => {
        onUpload(file);
      });
      // Reset the input to allow uploading the same file again
      event.target.value = "";
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  return (
    <div className="flex flex-col h-full w-full glass-panel rounded-xl p-6 animate-fade-in">
      <h2 className="text-xl font-semibold text-tdGreen-700 mb-4">Document Ingestion</h2>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Button
          onClick={handleUploadClick}
          className="bg-tdGreen-700 hover:bg-tdGreen-800 flex-grow"
        >
          <FileUp className="w-4 h-4 mr-2" />
          Upload Documents
        </Button>
        
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          multiple
          accept=".pdf,.doc,.docx,.txt,.md"
        />
        
        <Button
          onClick={onProcess}
          disabled={documents.filter(d => d.status === "ready").length === 0 || isProcessing}
          className="bg-tdGreen-600 hover:bg-tdGreen-700 flex-grow"
        >
          <Database className="w-4 h-4 mr-2" />
          {isProcessing ? "Processing..." : "Process Documents for RAG"}
        </Button>
      </div>
      
      <div className="flex-grow bg-white rounded-lg border border-tdGreen-100 overflow-hidden">
        <div className="bg-tdGreen-50 p-3 border-b border-tdGreen-100 flex items-center justify-between">
          <h3 className="font-medium text-tdGreen-800">Uploaded Documents</h3>
          <span className="text-sm text-tdGreen-600">
            {documents.length} document{documents.length !== 1 ? "s" : ""}
          </span>
        </div>
        
        {documents.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="bg-tdGreen-50 rounded-full p-4 mb-4">
              <FileText className="w-8 h-8 text-tdGreen-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-500 mb-2">No documents uploaded</h3>
            <p className="text-gray-400 max-w-md">
              Upload documents to process them for RAG/langchain tuning.
            </p>
          </div>
        ) : (
          <ScrollArea className="max-h-[300px]">
            <div className="p-1">
              {documents.map((doc) => (
                <Card
                  key={doc.id}
                  className={cn(
                    "flex items-center p-3 mb-2 border transition-colors",
                    doc.status === "error" ? "border-red-200 bg-red-50" :
                    doc.status === "ready" ? "border-green-200 bg-green-50" :
                    "border-tdGreen-100 bg-white"
                  )}
                >
                  <div className="flex-1">
                    <div className="flex items-center">
                      <FileText className={cn(
                        "w-4 h-4 mr-2",
                        doc.status === "error" ? "text-red-500" :
                        doc.status === "ready" ? "text-green-500" :
                        "text-tdGreen-500"
                      )} />
                      <span className="font-medium text-sm truncate max-w-[200px]">{doc.name}</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <span className="text-xs text-gray-500 mr-2">
                        {formatFileSize(doc.size)}
                      </span>
                      <span className={cn(
                        "text-xs px-2 py-0.5 rounded-full",
                        doc.status === "uploading" ? "bg-blue-100 text-blue-700" :
                        doc.status === "processing" ? "bg-yellow-100 text-yellow-700" :
                        doc.status === "ready" ? "bg-green-100 text-green-700" :
                        "bg-red-100 text-red-700"
                      )}>
                        {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                      </span>
                    </div>
                    
                    {doc.status === "uploading" || doc.status === "processing" ? (
                      <Progress 
                        value={doc.status === "uploading" ? 50 : 80} 
                        className="h-1 mt-2"
                      />
                    ) : null}
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemove(doc.id)}
                    className="text-gray-400 hover:text-red-500 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </Card>
              ))}
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  );
};
