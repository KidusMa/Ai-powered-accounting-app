import React, { useState } from 'react';
import { 
  UserCheck, 
  CheckCircle, 
  XCircle,
  Eye,
  Edit,
  Clock,
  Filter,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  DollarSign,
  FileText,
  Tag,
  Download
} from 'lucide-react';

interface ReviewItem {
  id: string;
  type: 'transaction' | 'receipt' | 'document' | 'categorization';
  title: string;
  description: string;
  amount?: number;
  date: string;
  status: 'pending' | 'approved' | 'rejected' | 'reviewed';
  priority: 'low' | 'medium' | 'high';
  aiConfidence: number;
  reviewer?: string;
  notes?: string;
}

const HumanReview: React.FC = () => {
  const [reviewItems, setReviewItems] = useState<ReviewItem[]>([
    {
      id: '1',
      type: 'transaction',
      title: 'Amazon.com Purchase',
      description: 'Large purchase flagged for review',
      amount: 1250.00,
      date: '2024-01-15',
      status: 'pending',
      priority: 'high',
      aiConfidence: 78
    },
    {
      id: '2',
      type: 'receipt',
      title: 'Office Supplies Receipt',
      description: 'Receipt image unclear, needs verification',
      amount: 234.50,
      date: '2024-01-14',
      status: 'approved',
      priority: 'medium',
      aiConfidence: 92,
      reviewer: 'John Smith',
      notes: 'Verified with vendor'
    },
    {
      id: '3',
      type: 'categorization',
      title: 'Starbucks Coffee',
      description: 'AI categorized as Food, but might be Business Expense',
      amount: 4.75,
      date: '2024-01-13',
      status: 'pending',
      priority: 'low',
      aiConfidence: 85
    },
    {
      id: '4',
      type: 'document',
      title: 'Contract Agreement',
      description: 'Legal document requires human review',
      amount: 5000.00,
      date: '2024-01-12',
      status: 'reviewed',
      priority: 'high',
      aiConfidence: 65,
      reviewer: 'Sarah Johnson',
      notes: 'Pending legal team approval'
    }
  ]);

  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [isProcessing, setIsProcessing] = useState(false);

  const filteredItems = reviewItems.filter(item => {
    const statusMatch = selectedStatus === 'all' || item.status === selectedStatus;
    const priorityMatch = selectedPriority === 'all' || item.priority === selectedPriority;
    return statusMatch && priorityMatch;
  });

  const handleApprove = (itemId: string) => {
    setReviewItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, status: 'approved', reviewer: 'Current User' } : item
    ));
  };

  const handleReject = (itemId: string) => {
    setReviewItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, status: 'rejected', reviewer: 'Current User' } : item
    ));
  };

  const handleBulkApprove = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setReviewItems(prev => prev.map(item => 
      item.status === 'pending' ? { ...item, status: 'approved', reviewer: 'Current User' } : item
    ));
    setIsProcessing(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'reviewed':
        return <Eye className="w-5 h-5 text-blue-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'reviewed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'transaction':
        return <DollarSign className="w-6 h-6 text-blue-600" />;
      case 'receipt':
        return <FileText className="w-6 h-6 text-green-600" />;
      case 'document':
        return <FileText className="w-6 h-6 text-purple-600" />;
      case 'categorization':
        return <Tag className="w-6 h-6 text-orange-600" />;
      default:
        return <FileText className="w-6 h-6 text-gray-600" />;
    }
  };

  const pendingCount = reviewItems.filter(item => item.status === 'pending').length;
  const approvedCount = reviewItems.filter(item => item.status === 'approved').length;
  const rejectedCount = reviewItems.filter(item => item.status === 'rejected').length;

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
      <div 
        className="bg-gradient-to-r from-yellow-500 to-orange-500 p-6 rounded-xl text-white"
      >
        <div className="flex items-center space-x-3 mb-4">
          <UserCheck className="w-8 h-8" />
          <h3 className="text-xl font-semibold">Review Summary</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <p className="text-2xl font-bold">{pendingCount}</p>
            <p>Pending Review</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{approvedCount}</p>
            <p>Approved</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{rejectedCount}</p>
            <p>Rejected</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">94%</p>
            <p>Approval Rate</p>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Filter className="w-5 h-5 text-gray-600" />
        <div className="flex flex-wrap gap-2">
          {[
            { value: 'all', label: 'All Items' },
            { value: 'pending', label: 'Pending' },
            { value: 'approved', label: 'Approved' },
            { value: 'rejected', label: 'Rejected' },
            { value: 'reviewed', label: 'Reviewed' }
          ].map(filter => (
            <button
              key={filter.value}
              onClick={() => setSelectedStatus(filter.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedStatus === filter.value
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
        
        <div className="ml-4">
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
        </div>
      </div>

      <div 
        className="bg-gradient-to-r from-green-500 to-emerald-500 p-4 rounded-xl text-white"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5" />
            <span className="font-semibold">Bulk Actions</span>
          </div>
          <button
            onClick={handleBulkApprove}
            disabled={isProcessing || pendingCount === 0}
            className="bg-white text-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            {isProcessing ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                <span>Processing...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <ThumbsUp className="w-4 h-4" />
                <span>Approve All Pending</span>
              </div>
            )}
          </button>
        </div>
      </div>


      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Items for Review</h3>
        <div className="space-y-3">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    {getTypeIcon(item.type)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                      <span>{item.date}</span>
                      {item.amount && (
                        <span className="font-semibold text-gray-800">${item.amount.toFixed(2)}</span>
                      )}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                        {item.priority} priority
                      </span>
                      <span className="text-xs text-gray-500">AI Confidence: {item.aiConfidence}%</span>
                    </div>
                    {item.notes && (
                      <p className="text-sm text-blue-600 mt-2">{item.notes}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(item.status)}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </div>
                  
                  {item.status === 'pending' && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleApprove(item.id)}
                        className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                      >
                        <ThumbsUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleReject(item.id)}
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                      >
                        <ThumbsDown className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                        <MessageSquare className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                  
                  {item.reviewer && (
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Reviewed by</p>
                      <p className="text-sm font-medium text-gray-800">{item.reviewer}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>


      <div 
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {[
          { label: 'Export Review', value: 'PDF Report', color: 'from-blue-500 to-cyan-500', icon: <Download className="w-6 h-6" /> },
          { label: 'Review History', value: 'Past Reviews', color: 'from-green-500 to-emerald-500', icon: <Eye className="w-6 h-6" /> },
          { label: 'Settings', value: 'Auto-approval', color: 'from-purple-500 to-pink-500', icon: <Edit className="w-6 h-6" /> }
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

export default HumanReview; 