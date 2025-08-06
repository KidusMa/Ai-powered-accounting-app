import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  Receipt, 
  FileText, 
  BarChart3, 
  CheckCircle, 
  UserCheck,
  Brain,
  Sparkles
} from 'lucide-react';
import BankConnection from './components/BankConnection';
import ReceiptScanner from './components/ReceiptScanner';
import DocumentUpload from './components/DocumentUpload';
import Categorization from './components/Categorization';
import Reconciliation from './components/Reconciliation';
import MonthlyReport from './components/MonthlyReport';
import HumanReview from './components/HumanReview';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  component: React.ReactNode;
}

const App: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<string>('dashboard');
  const [isProcessing, setIsProcessing] = useState(false);

  const features: Feature[] = [
    {
      id: 'bank-connection',
      title: 'Connect Accounts',
      description: 'Connect your bank and credit accounts securely',
      icon: <CreditCard className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-500',
      component: <BankConnection />
    },
    {
      id: 'receipt-scanner',
      title: 'Receipt Scanner',
      description: 'Snap receipts or forward email invoices',
      icon: <Receipt className="w-8 h-8" />,
      color: 'from-green-500 to-emerald-500',
      component: <ReceiptScanner />
    },
    {
      id: 'document-upload',
      title: 'Document Upload',
      description: 'Upload corporate documents for processing',
      icon: <FileText className="w-8 h-8" />,
      color: 'from-purple-500 to-pink-500',
      component: <DocumentUpload />
    },
    {
      id: 'categorization',
      title: 'AI Categorization',
      description: 'Automatic transaction categorization',
      icon: <Brain className="w-8 h-8" />,
      color: 'from-indigo-500 to-purple-500',
      component: <Categorization />
    },
    {
      id: 'reconciliation',
      title: 'Reconciliation',
      description: 'Automated account reconciliation',
      icon: <CheckCircle className="w-8 h-8" />,
      color: 'from-orange-500 to-red-500',
      component: <Reconciliation />
    },
    {
      id: 'monthly-report',
      title: 'Monthly Reports',
      description: 'Generate comprehensive monthly reports',
      icon: <BarChart3 className="w-8 h-8" />,
      color: 'from-teal-500 to-cyan-500',
      component: <MonthlyReport />
    },
    {
      id: 'human-review',
      title: 'Human Review',
      description: 'Final review and approval process',
      icon: <UserCheck className="w-8 h-8" />,
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
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass sticky top-0 z-50 border-b border-white/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <Sparkles className="w-8 h-8 text-white" />
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
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="glass rounded-2xl p-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Features
              </h2>
              {features.map((feature, index) => (
                <motion.button
                  key={feature.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
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
                      {feature.icon}
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold">{feature.title}</h3>
                      <p className="text-sm opacity-80">{feature.description}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Main Content Area */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3"
          >
            <div className="glass rounded-2xl p-8 min-h-[600px]">
              {getActiveComponent()}
            </div>
          </motion.div>
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
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-gradient-to-r ${stat.color} p-6 rounded-xl text-white floating-card`}
          >
            <h3 className="text-lg font-semibold">{stat.title}</h3>
            <p className="text-3xl font-bold mt-2">{stat.value}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default App; 