import React, { useState } from 'react';
import { 
  CreditCard, 
  Building2, 
  Shield, 
  CheckCircle, 
  AlertCircle,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';

interface BankAccount {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'credit';
  balance: number;
  lastFour: string;
  status: 'connected' | 'pending' | 'failed';
}

const BankConnection: React.FC = () => {
  const [accounts, setAccounts] = useState<BankAccount[]>([
    {
      id: '1',
      name: 'Chase Bank',
      type: 'checking',
      balance: 15420.50,
      lastFour: '1234',
      status: 'connected'
    },
    {
      id: '2',
      name: 'American Express',
      type: 'credit',
      balance: -2340.75,
      lastFour: '5678',
      status: 'connected'
    },
    {
      id: '3',
      name: 'Wells Fargo',
      type: 'savings',
      balance: 8750.00,
      lastFour: '9012',
      status: 'pending'
    }
  ]);

  const [isConnecting, setIsConnecting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsConnecting(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'failed':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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

      {/* Security Info */}
      <div 
        className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6 rounded-xl text-white"
      >
        <div className="flex items-center space-x-3 mb-4">
          <Shield className="w-8 h-8" />
          <h3 className="text-xl font-semibold">Bank-Level Security</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Lock className="w-4 h-4" />
            <span>256-bit encryption</span>
          </div>
          <div className="flex items-center space-x-2">
            <Eye className="w-4 h-4" />
            <span>Read-only access</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4" />
            <span>FDIC insured</span>
          </div>
        </div>
      </div>

      {/* Connected Accounts */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Connected Accounts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {accounts.map((account, index) => (
            <div
              key={account.id}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    account.type === 'checking' ? 'bg-blue-100' :
                    account.type === 'savings' ? 'bg-green-100' : 'bg-purple-100'
                  }`}>
                    <CreditCard className={`w-6 h-6 ${
                      account.type === 'checking' ? 'text-blue-600' :
                      account.type === 'savings' ? 'text-green-600' : 'text-purple-600'
                    }`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{account.name}</h4>
                    <p className="text-sm text-gray-500 capitalize">{account.type}</p>
                  </div>
                </div>
                {getStatusIcon(account.status)}
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Balance:</span>
                  <span className={`font-semibold ${
                    account.balance < 0 ? 'text-red-600' : 'text-green-600'
                  }`}>
                    ${Math.abs(account.balance).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Card ending in:</span>
                  <span className="font-mono text-sm">****{account.lastFour}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Status:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(account.status)}`}>
                    {account.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add New Account */}
      <div 
        className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-xl text-white"
      >
        <h3 className="text-xl font-semibold mb-4">Add New Account</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Bank Name</label>
            <input 
              type="text" 
              className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              placeholder="Enter bank name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Account Type</label>
            <select className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-white/50">
              <option value="checking">Checking</option>
              <option value="savings">Savings</option>
              <option value="credit">Credit Card</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Username</label>
            <input 
              type="text" 
              className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              placeholder="Enter username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 pr-10"
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
        
        <button
          onClick={handleConnect}
          disabled={isConnecting}
          className="mt-6 w-full bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isConnecting ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
              <span>Connecting...</span>
            </div>
          ) : (
            'Connect Account'
          )}
        </button>
      </div>
    </div>
  );
};

export default BankConnection; 