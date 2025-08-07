import React, { useState, useRef } from 'react';
import { 
  Camera, 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertCircle,
  Download,
  Mail,
  Smartphone,
  Image,
  Trash2
} from 'lucide-react';

interface Receipt {
  id: string;
  name: string;
  amount: number;
  date: string;
  category: string;
  status: 'processing' | 'completed' | 'error';
  image?: string;
}

const ReceiptScanner: React.FC = () => {
  const [receipts, setReceipts] = useState<Receipt[]>([
    {
      id: '1',
      name: 'Starbucks Coffee',
      amount: 4.75,
      date: '2024-01-15',
      category: 'Food & Dining',
      status: 'completed'
    },
    {
      id: '2',
      name: 'Office Supplies',
      amount: 127.50,
      date: '2024-01-14',
      category: 'Office Expenses',
      status: 'completed'
    },
    {
      id: '3',
      name: 'Gas Station',
      amount: 45.20,
      date: '2024-01-13',
      category: 'Transportation',
      status: 'processing'
    }
  ]);

  const [isScanning, setIsScanning] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState<'camera' | 'upload' | 'email'>('camera');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleScan = async () => {
    setIsScanning(true);
    // Simulate scanning process
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsScanning(false);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setIsUploading(true);
      // Simulate upload process
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsUploading(false);
    }
  };

  const handleEmailForward = () => {
    // Simulate email forwarding
    alert('Email forwarding feature would be implemented here');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'processing':
        return <AlertCircle className="w-5 h-5 text-yellow-500 animate-pulse" />;
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
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold gradient-text mb-2">
          Receipt Scanner
        </h2>
        <p className="text-gray-600">
          Snap receipts or forward email invoices for automatic processing
        </p>
      </div>

      {/* Input Methods */}
      <div 
        className="bg-gradient-to-r from-green-500 to-emerald-500 p-6 rounded-xl text-white"
      >
        <div className="flex space-x-2 mb-6">
          {[
            { id: 'camera', label: 'Camera', icon: <Camera className="w-5 h-5" /> },
            { id: 'upload', label: 'Upload', icon: <Upload className="w-5 h-5" /> },
            { id: 'email', label: 'Email', icon: <Mail className="w-5 h-5" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === tab.id 
                  ? 'bg-white text-green-600' 
                  : 'text-white hover:bg-white/20'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Camera Tab */}
        {activeTab === 'camera' && (
          <div className="text-center space-y-4">
            <div className="bg-white/20 rounded-xl p-8 border-2 border-dashed border-white/30">
              <Camera className="w-16 h-16 mx-auto mb-4 text-white/70" />
              <h3 className="text-xl font-semibold mb-2">Camera Scanner</h3>
              <p className="text-white/80 mb-4">
                Point your camera at a receipt to automatically capture and process
              </p>
              <button
                onClick={handleScan}
                disabled={isScanning}
                className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                {isScanning ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                    <span>Scanning...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Camera className="w-5 h-5" />
                    <span>Start Scanning</span>
                  </div>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Upload Tab */}
        {activeTab === 'upload' && (
          <div className="text-center space-y-4">
            <div className="bg-white/20 rounded-xl p-8 border-2 border-dashed border-white/30">
              <Upload className="w-16 h-16 mx-auto mb-4 text-white/70" />
              <h3 className="text-xl font-semibold mb-2">Upload Receipts</h3>
              <p className="text-white/80 mb-4">
                Drag and drop or click to upload receipt images
              </p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                {isUploading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                    <span>Uploading...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Upload className="w-5 h-5" />
                    <span>Choose Files</span>
                  </div>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Email Tab */}
        {activeTab === 'email' && (
          <div className="text-center space-y-4">
            <div className="bg-white/20 rounded-xl p-8 border-2 border-dashed border-white/30">
              <Mail className="w-16 h-16 mx-auto mb-4 text-white/70" />
              <h3 className="text-xl font-semibold mb-2">Email Forwarding</h3>
              <p className="text-white/80 mb-4">
                Forward invoice emails to receipts@aiaccounting.com
              </p>
              <div className="bg-white/10 rounded-lg p-4 mb-4">
                <p className="text-sm font-mono">receipts@aiaccounting.com</p>
              </div>
              <button
                onClick={handleEmailForward}
                className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <Mail className="w-5 h-5" />
                  <span>Set Up Email Forwarding</span>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Recent Receipts */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Recent Receipts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {receipts.map((receipt, index) => (
            <div
              key={receipt.id}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <FileText className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{receipt.name}</h4>
                    <p className="text-sm text-gray-500">{receipt.date}</p>
                  </div>
                </div>
                {getStatusIcon(receipt.status)}
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Amount:</span>
                  <span className="font-semibold text-green-600">
                    ${receipt.amount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Category:</span>
                  <span className="text-sm font-medium">{receipt.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Status:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(receipt.status)}`}>
                    {receipt.status}
                  </span>
                </div>
              </div>
              
              <div className="flex space-x-2 mt-4">
                <button className="flex-1 bg-blue-100 text-blue-600 px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors">
                  <Download className="w-4 h-4 inline mr-1" />
                  Download
                </button>
                <button className="flex-1 bg-red-100 text-red-600 px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors">
                  <Trash2 className="w-4 h-4 inline mr-1" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Processing Stats */}
      <div 
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {[
          { label: 'Processed Today', value: '12', color: 'from-green-500 to-emerald-500' },
          { label: 'Pending Review', value: '3', color: 'from-yellow-500 to-orange-500' },
          { label: 'Total This Month', value: '156', color: 'from-blue-500 to-cyan-500' }
        ].map((stat, index) => (
          <div key={stat.label} className={`bg-gradient-to-r ${stat.color} p-6 rounded-xl text-white text-center`}>
            <h3 className="text-2xl font-bold">{stat.value}</h3>
            <p className="text-sm opacity-90">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReceiptScanner; 