import React, { useState } from 'react';
import { 
  Brain, 
  Tag, 
  CheckCircle, 
  AlertCircle,
  Edit,
  TrendingUp,
  PieChart,
  Filter,
  Search,
  RefreshCw
} from 'lucide-react';

interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
  confidence: number;
  status: 'auto' | 'manual' | 'review';
  merchant: string;
}

const Categorization: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      description: 'Starbucks Coffee',
      amount: 4.75,
      date: '2024-01-15',
      category: 'Food & Dining',
      confidence: 95,
      status: 'auto',
      merchant: 'Starbucks'
    },
    {
      id: '2',
      description: 'Office Depot Purchase',
      amount: 127.50,
      date: '2024-01-14',
      category: 'Office Expenses',
      confidence: 98,
      status: 'auto',
      merchant: 'Office Depot'
    },
    {
      id: '3',
      description: 'Shell Gas Station',
      amount: 45.20,
      date: '2024-01-13',
      category: 'Transportation',
      confidence: 92,
      status: 'auto',
      merchant: 'Shell'
    },
    {
      id: '4',
      description: 'Amazon.com',
      amount: 89.99,
      date: '2024-01-12',
      category: 'Shopping',
      confidence: 78,
      status: 'review',
      merchant: 'Amazon'
    },
    {
      id: '5',
      description: 'Netflix Subscription',
      amount: 15.99,
      date: '2024-01-11',
      category: 'Entertainment',
      confidence: 99,
      status: 'auto',
      merchant: 'Netflix'
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isProcessing, setIsProcessing] = useState(false);

  const categories = [
    'Food & Dining',
    'Office Expenses',
    'Transportation',
    'Shopping',
    'Entertainment',
    'Healthcare',
    'Travel',
    'Utilities'
  ];

  const filteredTransactions = selectedCategory === 'all' 
    ? transactions 
    : transactions.filter(t => t.category === selectedCategory);

  const handleCategoryChange = (transactionId: string, newCategory: string) => {
    setTransactions(prev => prev.map(t => 
      t.id === transactionId ? { ...t, category: newCategory, status: 'manual' } : t
    ));
  };

  const handleBulkCategorize = async () => {
    setIsProcessing(true);
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'auto':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'manual':
        return <Edit className="w-5 h-5 text-blue-500" />;
      case 'review':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'auto':
        return 'bg-green-100 text-green-800';
      case 'manual':
        return 'bg-blue-100 text-blue-800';
      case 'review':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Food & Dining': 'bg-orange-100 text-orange-800',
      'Office Expenses': 'bg-blue-100 text-blue-800',
      'Transportation': 'bg-green-100 text-green-800',
      'Shopping': 'bg-purple-100 text-purple-800',
      'Entertainment': 'bg-pink-100 text-pink-800',
      'Healthcare': 'bg-red-100 text-red-800',
      'Travel': 'bg-cyan-100 text-cyan-800',
      'Utilities': 'bg-gray-100 text-gray-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

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

      {/* AI Stats */}
      <div 
        className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6 rounded-xl text-white"
      >
        <div className="flex items-center space-x-3 mb-4">
          <Brain className="w-8 h-8" />
          <h3 className="text-xl font-semibold">AI Performance</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <p className="text-2xl font-bold">94%</p>
            <p>Accuracy Rate</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">1,247</p>
            <p>Transactions Processed</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">8</p>
            <p>Categories Learned</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">2.3s</p>
            <p>Avg Processing Time</p>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex items-center space-x-4">
        <Filter className="w-5 h-5 text-gray-600" />
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'bg-indigo-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Categories
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Bulk Actions */}
      <div 
        className="bg-gradient-to-r from-green-500 to-emerald-500 p-4 rounded-xl text-white"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <RefreshCw className="w-5 h-5" />
            <span className="font-semibold">Bulk Categorization</span>
          </div>
          <button
            onClick={handleBulkCategorize}
            disabled={isProcessing}
            className="bg-white text-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            {isProcessing ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                <span>Processing...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Brain className="w-4 h-4" />
                <span>Re-categorize All</span>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Transactions List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Recent Transactions</h3>
        <div className="space-y-3">
          {filteredTransactions.map((transaction, index) => (
            <div
              key={transaction.id}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <Tag className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{transaction.description}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                      <span>{transaction.merchant}</span>
                      <span>{transaction.date}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(transaction.category)}`}>
                        {transaction.category}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-semibold text-gray-800">${transaction.amount.toFixed(2)}</p>
                    <p className="text-xs text-gray-500">{transaction.confidence}% confidence</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(transaction.status)}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </div>
                  
                  <select
                    value={transaction.category}
                    onChange={(e) => handleCategoryChange(transaction.id, e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Distribution */}
      <div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Category Distribution</h3>
          <div className="space-y-3">
            {categories.map((category, index) => {
              const count = transactions.filter(t => t.category === category).length;
              const percentage = (count / transactions.length) * 100;
              return (
                <div key={category} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">{category}</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold text-gray-800">{count}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Processing Stats</h3>
          <div className="space-y-4">
            {[
              { label: 'Auto-categorized', value: '1,156', color: 'text-green-600' },
              { label: 'Manual review', value: '89', color: 'text-yellow-600' },
              { label: 'Pending review', value: '2', color: 'text-red-600' }
            ].map((stat, index) => (
              <div key={stat.label} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{stat.label}</span>
                <span className={`text-lg font-bold ${stat.color}`}>{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categorization; 