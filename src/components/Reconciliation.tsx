import React, { useState } from 'react';
import { 
  CheckCircle, 
  AlertCircle,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  Filter,
  Search,
  Eye,
  Download
} from 'lucide-react';

interface ReconciliationItem {
  id: string;
  account: string;
  expectedAmount: number;
  actualAmount: number;
  difference: number;
  date: string;
  status: 'matched' | 'unmatched' | 'pending';
  description: string;
}

const Reconciliation: React.FC = () => {
  const [reconciliationItems, setReconciliationItems] = useState<ReconciliationItem[]>([
    {
      id: '1',
      account: 'Chase Checking',
      expectedAmount: 15420.50,
      actualAmount: 15420.50,
      difference: 0,
      date: '2024-01-15',
      status: 'matched',
      description: 'All transactions reconciled'
    },
    {
      id: '2',
      account: 'American Express',
      expectedAmount: -2340.75,
      actualAmount: -2340.75,
      difference: 0,
      date: '2024-01-15',
      status: 'matched',
      description: 'All transactions reconciled'
    },
    {
      id: '3',
      account: 'Wells Fargo Savings',
      expectedAmount: 8750.00,
      actualAmount: 8745.25,
      difference: -4.75,
      date: '2024-01-15',
      status: 'unmatched',
      description: 'Pending transaction not yet posted'
    }
  ]);

  const [isReconciling, setIsReconciling] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredItems = selectedStatus === 'all' 
    ? reconciliationItems 
    : reconciliationItems.filter(item => item.status === selectedStatus);

  const handleReconcile = async () => {
    setIsReconciling(true);
    // Simulate reconciliation process
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsReconciling(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'matched':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'unmatched':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'pending':
        return <RefreshCw className="w-5 h-5 text-yellow-500 animate-spin" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'matched':
        return 'bg-green-100 text-green-800';
      case 'unmatched':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const totalDifference = reconciliationItems.reduce((sum, item) => sum + item.difference, 0);
  const matchedCount = reconciliationItems.filter(item => item.status === 'matched').length;
  const unmatchedCount = reconciliationItems.filter(item => item.status === 'unmatched').length;

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

      {/* Reconciliation Stats */}
      <div 
        className="bg-gradient-to-r from-orange-500 to-red-500 p-6 rounded-xl text-white"
      >
        <div className="flex items-center space-x-3 mb-4">
          <CheckCircle className="w-8 h-8" />
          <h3 className="text-xl font-semibold">Reconciliation Summary</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <p className="text-2xl font-bold">{matchedCount}</p>
            <p>Accounts Matched</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{unmatchedCount}</p>
            <p>Accounts Unmatched</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">${Math.abs(totalDifference).toFixed(2)}</p>
            <p>Total Difference</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">98.5%</p>
            <p>Accuracy Rate</p>
          </div>
        </div>
      </div>

      {/* Status Filter */}
      <div className="flex items-center space-x-4">
        <Filter className="w-5 h-5 text-gray-600" />
        <div className="flex flex-wrap gap-2">
          {[
            { value: 'all', label: 'All Accounts' },
            { value: 'matched', label: 'Matched' },
            { value: 'unmatched', label: 'Unmatched' },
            { value: 'pending', label: 'Pending' }
          ].map(filter => (
            <button
              key={filter.value}
              onClick={() => setSelectedStatus(filter.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedStatus === filter.value
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bulk Reconciliation */}
      <div 
        className="bg-gradient-to-r from-green-500 to-emerald-500 p-4 rounded-xl text-white"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <RefreshCw className="w-5 h-5" />
            <span className="font-semibold">Bulk Reconciliation</span>
          </div>
          <button
            onClick={handleReconcile}
            disabled={isReconciling}
            className="bg-white text-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            {isReconciling ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                <span>Reconciling...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>Reconcile All Accounts</span>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Reconciliation Items */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Account Reconciliation</h3>
        <div className="space-y-3">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <DollarSign className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{item.account}</h4>
                    <p className="text-sm text-gray-500">{item.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                      <span>{item.date}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">Expected:</span>
                        <span className="font-semibold text-gray-800">${item.expectedAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">Actual:</span>
                        <span className="font-semibold text-gray-800">${item.actualAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">Difference:</span>
                        <span className={`font-semibold ${
                          item.difference === 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          ${item.difference.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(item.status)}
                    <div className="flex space-x-2">
                      <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reconciliation Charts */}
      <div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Reconciliation Status</h3>
          <div className="space-y-4">
            {[
              { label: 'Matched Accounts', value: matchedCount, total: reconciliationItems.length, color: 'bg-green-500' },
              { label: 'Unmatched Accounts', value: unmatchedCount, total: reconciliationItems.length, color: 'bg-red-500' },
              { label: 'Pending Review', value: reconciliationItems.length - matchedCount - unmatchedCount, total: reconciliationItems.length, color: 'bg-yellow-500' }
            ].map((stat, index) => (
              <div key={stat.label} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{stat.label}</span>
                  <span className="font-semibold">{stat.value}/{stat.total}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`${stat.color} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${(stat.value / stat.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Difference Analysis</h3>
          <div className="space-y-4">
            {[
              { label: 'Total Difference', value: totalDifference, color: totalDifference === 0 ? 'text-green-600' : 'text-red-600' },
              { label: 'Largest Discrepancy', value: Math.max(...reconciliationItems.map(item => Math.abs(item.difference))), color: 'text-orange-600' },
              { label: 'Average Difference', value: totalDifference / reconciliationItems.length, color: 'text-blue-600' }
            ].map((stat, index) => (
              <div key={stat.label} className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{stat.label}</span>
                <span className={`text-lg font-bold ${stat.color}`}>
                  ${Math.abs(stat.value).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div 
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {[
          { label: 'Export Report', value: 'PDF', color: 'from-blue-500 to-cyan-500', icon: <Download className="w-6 h-6" /> },
          { label: 'View Details', value: 'Full Analysis', color: 'from-green-500 to-emerald-500', icon: <Eye className="w-6 h-6" /> },
          { label: 'Schedule Auto', value: 'Daily', color: 'from-purple-500 to-pink-500', icon: <Calendar className="w-6 h-6" /> }
        ].map((action, index) => (
          <div key={action.label} className={`bg-gradient-to-r ${action.color} p-6 rounded-xl text-white text-center cursor-pointer hover:scale-105 transition-transform`}>
            <div className="flex justify-center mb-2">
              {action.icon}
            </div>
            <h3 className="text-lg font-semibold">{action.label}</h3>
            <p className="text-sm opacity-90">{action.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reconciliation; 