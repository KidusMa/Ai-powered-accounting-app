import React, { useState } from 'react';

interface Feature {
  id: string;
  title: string;
  description: string;
  color: string;
  component: React.ReactNode;
}

// Simple icon components using Unicode symbols
const CreditCardIcon = () => <span className="text-2xl">💳</span>;
const ReceiptIcon = () => <span className="text-2xl">🧾</span>;
const FileIcon = () => <span className="text-2xl">📄</span>;
const BrainIcon = () => <span className="text-2xl">🧠</span>;
const CheckIcon = () => <span className="text-2xl">✅</span>;
const ChartIcon = () => <span className="text-2xl">📊</span>;
const UserIcon = () => <span className="text-2xl">👤</span>;
const SparkleIcon = () => <span className="text-2xl">✨</span>;

const BankConnection: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold gradient-text mb-2">
          Connect Your Accounts
        </h2>
        <p className="text-gray-600">
          Securely connect your bank and credit accounts for automated transaction processing
        </p>
      </div>
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6 rounded-xl text-white">
        <h3 className="text-xl font-semibold mb-4">Bank Connection</h3>
        <p>This feature allows you to securely connect your bank and credit accounts.</p>
      </div>
    </div>
  );
};

const ReceiptScanner: React.FC = () => {
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
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6 rounded-xl text-white">
        <h3 className="text-xl font-semibold mb-4">Receipt Processing</h3>
        <p>Scan receipts and process invoices automatically with AI.</p>
      </div>
    </div>
  );
};

const DocumentUpload: React.FC = () => {
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
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-xl text-white">
        <h3 className="text-xl font-semibold mb-4">Document Management</h3>
        <p>Upload and manage corporate documents with AI assistance.</p>
      </div>
    </div>
  );
};

const Categorization: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold gradient-text mb-2">
          AI Categorization
        </h2>
        <p className="text-gray-600">
          Automatic transaction categorization with intelligent learning
        </p>
      </div>
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6 rounded-xl text-white">
        <h3 className="text-xl font-semibold mb-4">Smart Categorization</h3>
        <p>AI-powered transaction categorization with 94% accuracy.</p>
      </div>
    </div>
  );
};

const Reconciliation: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold gradient-text mb-2">
          Account Reconciliation
        </h2>
        <p className="text-gray-600">
          Automated reconciliation with intelligent discrepancy detection
        </p>
      </div>
      <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 rounded-xl text-white">
        <h3 className="text-xl font-semibold mb-4">Reconciliation</h3>
        <p>Automated account reconciliation with discrepancy detection.</p>
      </div>
    </div>
  );
};

const MonthlyReport: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold gradient-text mb-2">
          Monthly Reports
        </h2>
        <p className="text-gray-600">
          Comprehensive financial reports with AI-powered insights
        </p>
      </div>
      <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-6 rounded-xl text-white">
        <h3 className="text-xl font-semibold mb-4">Financial Reports</h3>
        <p>Generate comprehensive monthly reports with AI insights.</p>
      </div>
    </div>
  );
};

const HumanReview: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold gradient-text mb-2">
          Human Review
        </h2>
        <p className="text-gray-600">
          Final review and approval process for AI-processed items
        </p>
      </div>
      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-6 rounded-xl text-white">
        <h3 className="text-xl font-semibold mb-4">Review Process</h3>
        <p>Human review and approval workflow for quality control.</p>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<string>('dashboard');

  const features: Feature[] = [
    {
      id: 'bank-connection',
      title: 'Connect Accounts',
      description: 'Connect your bank and credit accounts securely',
      color: 'from-blue-500 to-cyan-500',
      component: <BankConnection />
    },
    {
      id: 'receipt-scanner',
      title: 'Receipt Scanner',
      description: 'Snap receipts or forward email invoices',
      color: 'from-green-500 to-emerald-500',
      component: <ReceiptScanner />
    },
    {
      id: 'document-upload',
      title: 'Document Upload',
      description: 'Upload corporate documents for processing',
      color: 'from-purple-500 to-pink-500',
      component: <DocumentUpload />
    },
    {
      id: 'categorization',
      title: 'AI Categorization',
      description: 'Automatic transaction categorization',
      color: 'from-indigo-500 to-purple-500',
      component: <Categorization />
    },
    {
      id: 'reconciliation',
      title: 'Reconciliation',
      description: 'Automated account reconciliation',
      color: 'from-orange-500 to-red-500',
      component: <Reconciliation />
    },
    {
      id: 'monthly-report',
      title: 'Monthly Reports',
      description: 'Generate comprehensive monthly reports',
      color: 'from-teal-500 to-cyan-500',
      component: <MonthlyReport />
    },
    {
      id: 'human-review',
      title: 'Human Review',
      description: 'Final review and approval process',
      color: 'from-yellow-500 to-orange-500',
      component: <HumanReview />
    }
  ];

  const handleFeatureClick = (featureId: string) => {
    setActiveFeature(featureId);
  };

  const getActiveComponent = () => {
    const feature = features.find(f => f.id === activeFeature);
    return feature?.component || <Dashboard />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="glass sticky top-0 z-50 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <SparkleIcon />
              </div>
              <h1 className="text-2xl font-bold gradient-text">
                AI Accounting Agent
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">AI Active</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass rounded-2xl p-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Features
              </h2>
              {features.map((feature, index) => (
                <button
                  key={feature.id}
                  onClick={() => handleFeatureClick(feature.id)}
                  className={`w-full p-4 rounded-xl transition-all duration-300 hover:scale-105 ${
                    activeFeature === feature.id
                      ? 'bg-gradient-to-r ' + feature.color + ' text-white shadow-lg'
                      : 'bg-white/50 hover:bg-white/70 text-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      activeFeature === feature.id ? 'bg-white/20' : 'bg-gray-100'
                    }`}>
                      {feature.id === 'bank-connection' && <CreditCardIcon />}
                      {feature.id === 'receipt-scanner' && <ReceiptIcon />}
                      {feature.id === 'document-upload' && <FileIcon />}
                      {feature.id === 'categorization' && <BrainIcon />}
                      {feature.id === 'reconciliation' && <CheckIcon />}
                      {feature.id === 'monthly-report' && <ChartIcon />}
                      {feature.id === 'human-review' && <UserIcon />}
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold">{feature.title}</h3>
                      <p className="text-sm opacity-80">{feature.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <div className="glass rounded-2xl p-8 min-h-[600px]">
              {getActiveComponent()}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Dashboard Component
const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold gradient-text mb-4">
          Welcome to AI Accounting Agent
        </h1>
        <p className="text-gray-600 text-lg">
          Your intelligent financial assistant is ready to help!
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {[
          { title: 'Connected Accounts', value: '3', color: 'from-blue-500 to-cyan-500' },
          { title: 'Transactions This Month', value: '127', color: 'from-green-500 to-emerald-500' },
          { title: 'Pending Reviews', value: '5', color: 'from-orange-500 to-red-500' },
          { title: 'AI Accuracy', value: '94%', color: 'from-purple-500 to-pink-500' },
          { title: 'Monthly Savings', value: '$2,450', color: 'from-teal-500 to-cyan-500' },
          { title: 'Reports Generated', value: '12', color: 'from-indigo-500 to-purple-500' }
        ].map((stat, index) => (
          <div
            key={stat.title}
            className={`bg-gradient-to-r ${stat.color} p-6 rounded-xl text-white floating-card`}
          >
            <h3 className="text-lg font-semibold">{stat.title}</h3>
            <p className="text-3xl font-bold mt-2">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App; 