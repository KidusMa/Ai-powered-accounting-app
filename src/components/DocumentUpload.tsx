import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Upload, 
  FileText, 
  FolderOpen, 
  CheckCircle, 
  AlertCircle,
  Download,
  Trash2,
  Eye,
  Clock,
  FileType,
  Database
} from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  category?: string;
}

const DocumentUpload: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Q4_Financial_Report.pdf',
      type: 'PDF',
      size: '2.4 MB',
      uploadDate: '2024-01-15',
      status: 'completed',
      category: 'Financial Reports'
    },
    {
      id: '2',
      name: 'Invoice_2024_001.xlsx',
      type: 'Excel',
      size: '156 KB',
      uploadDate: '2024-01-14',
      status: 'completed',
      category: 'Invoices'
    },
    {
      id: '3',
      name: 'Contract_Agreement.docx',
      type: 'Word',
      size: '892 KB',
      uploadDate: '2024-01-13',
      status: 'processing',
      category: 'Contracts'
    }
  ]);

  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      await handleFiles(files);
    }
  };

  const handleFiles = async (files: FileList) => {
    setIsUploading(true);
    
    // Simulate file processing
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const newDoc: Document = {
        id: Date.now().toString() + i,
        name: file.name,
        type: file.name.split('.').pop()?.toUpperCase() || 'Unknown',
        size: (file.size / 1024 / 1024).toFixed(1) + ' MB',
        uploadDate: new Date().toISOString().split('T')[0],
        status: 'uploading'
      };
      
      setDocuments(prev => [newDoc, ...prev]);
      
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update status to completed
      setDocuments(prev => prev.map(doc => 
        doc.id === newDoc.id ? { ...doc, status: 'completed' } : doc
      ));
    }
    
    setIsUploading(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'processing':
        return <Clock className="w-5 h-5 text-yellow-500 animate-pulse" />;
      case 'uploading':
        return <Upload className="w-5 h-5 text-blue-500 animate-bounce" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'uploading':
        return 'bg-blue-100 text-blue-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getFileTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return <FileText className="w-6 h-6 text-red-500" />;
      case 'xlsx':
      case 'xls':
        return <FileText className="w-6 h-6 text-green-500" />;
      case 'docx':
      case 'doc':
        return <FileText className="w-6 h-6 text-blue-500" />;
      default:
        return <FileText className="w-6 h-6 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold gradient-text mb-2">
          Document Upload
        </h2>
        <p className="text-gray-600">
          Upload corporate documents for AI-powered processing and categorization
        </p>
      </div>

      {/* Upload Area */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-500 to-pink-500 p-8 rounded-xl text-white"
      >
        <div 
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
            dragActive ? 'border-white bg-white/20' : 'border-white/30'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="w-16 h-16 mx-auto mb-4 text-white/70" />
          <h3 className="text-xl font-semibold mb-2">Upload Corporate Documents</h3>
          <p className="text-white/80 mb-6">
            Drag and drop files here, or click to browse
          </p>
          
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileSelect}
            className="hidden"
            accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.txt"
          />
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            {isUploading ? (
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                <span>Uploading...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <FolderOpen className="w-5 h-5" />
                <span>Choose Files</span>
              </div>
            )}
          </motion.button>
          
          <div className="mt-4 text-sm text-white/70">
            Supported formats: PDF, DOC, DOCX, XLS, XLSX, CSV, TXT
          </div>
        </div>
      </motion.div>

      {/* Document Categories */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        {[
          { label: 'Financial Reports', count: 12, color: 'from-blue-500 to-cyan-500' },
          { label: 'Invoices', count: 45, color: 'from-green-500 to-emerald-500' },
          { label: 'Contracts', count: 8, color: 'from-purple-500 to-pink-500' },
          { label: 'Receipts', count: 156, color: 'from-orange-500 to-red-500' }
        ].map((category, index) => (
          <div key={category.label} className={`bg-gradient-to-r ${category.color} p-6 rounded-xl text-white text-center`}>
            <Database className="w-8 h-8 mx-auto mb-2" />
            <h3 className="text-lg font-semibold">{category.label}</h3>
            <p className="text-2xl font-bold">{category.count}</p>
          </div>
        ))}
      </motion.div>

      {/* Uploaded Documents */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Recent Documents</h3>
        <div className="space-y-3">
          {documents.map((doc, index) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    {getFileTypeIcon(doc.type)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{doc.name}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                      <span>{doc.type}</span>
                      <span>{doc.size}</span>
                      <span>{doc.uploadDate}</span>
                      {doc.category && (
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                          {doc.category}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  {getStatusIcon(doc.status)}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                    {doc.status}
                  </span>
                  <div className="flex space-x-2">
                    <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Processing Stats */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {[
          { label: 'Total Documents', value: '221', color: 'from-purple-500 to-pink-500' },
          { label: 'Processing Now', value: '3', color: 'from-yellow-500 to-orange-500' },
          { label: 'Storage Used', value: '2.4 GB', color: 'from-blue-500 to-cyan-500' }
        ].map((stat, index) => (
          <div key={stat.label} className={`bg-gradient-to-r ${stat.color} p-6 rounded-xl text-white text-center`}>
            <h3 className="text-2xl font-bold">{stat.value}</h3>
            <p className="text-sm opacity-90">{stat.label}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default DocumentUpload; 