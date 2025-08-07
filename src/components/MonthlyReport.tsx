import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Calendar,
  Download,
  Eye,
  Filter,
  PieChart,
  LineChart,
  FileText,
  Share2
} from 'lucide-react';

interface ReportData {
  month: string;
  income: number;
  expenses: number;
  profit: number;
  categories: { name: string; amount: number; percentage: number }[];
}

const MonthlyReport: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>('2024-01');
  const [isGenerating, setIsGenerating] = useState(false);

  const reportData: ReportData = {
    month: 'January 2024',
    income: 125000,
    expenses: 89450,
    profit: 35550,
    categories: [
      { name: 'Office Expenses', amount: 23450, percentage: 26.2 },
      { name: 'Marketing', amount: 18750, percentage: 21.0 },
      { name: 'Travel', amount: 15600, percentage: 17.4 },
      { name: 'Utilities', amount: 12300, percentage: 13.8 },
      { name: 'Software', amount: 8900, percentage: 10.0 },
      { name: 'Other', amount: 10450, percentage: 11.6 }
    ]
  };

  const months = [
    { value: '2024-01', label: 'January 2024' },
    { value: '2023-12', label: 'December 2023' },
    { value: '2023-11', label: 'November 2023' },
    { value: '2023-10', label: 'October 2023' }
  ];

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGenerating(false);
  };

  const getCategoryColor = (index: number) => {
    const colors = [
      'from-blue-500 to-cyan-500',
      'from-green-500 to-emerald-500',
      'from-purple-500 to-pink-500',
      'from-orange-500 to-red-500',
      'from-indigo-500 to-purple-500',
      'from-teal-500 to-cyan-500'
    ];
    return colors[index % colors.length];
  };

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

      {/* Report Controls */}
      <div 
        className="bg-gradient-to-r from-teal-500 to-cyan-500 p-6 rounded-xl text-white"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Calendar className="w-6 h-6" />
            <div>
              <label className="block text-sm font-medium mb-1">Select Month</label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                {months.map(month => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <button
            onClick={handleGenerateReport}
            disabled={isGenerating}
            className="bg-white text-teal-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            {isGenerating ? (
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 border-2 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
                <span>Generating...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5" />
                <span>Generate Report</span>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Financial Summary */}
      <div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {[
          { 
            label: 'Total Income', 
            value: reportData.income, 
            color: 'from-green-500 to-emerald-500',
            icon: <TrendingUp className="w-8 h-8" />
          },
          { 
            label: 'Total Expenses', 
            value: reportData.expenses, 
            color: 'from-red-500 to-pink-500',
            icon: <TrendingDown className="w-8 h-8" />
          },
          { 
            label: 'Net Profit', 
            value: reportData.profit, 
            color: 'from-blue-500 to-cyan-500',
            icon: <DollarSign className="w-8 h-8" />
          }
        ].map((stat, index) => (
          <div key={stat.label} className={`bg-gradient-to-r ${stat.color} p-6 rounded-xl text-white`}>
            <div className="flex items-center justify-between mb-4">
              {stat.icon}
              <span className="text-sm opacity-90">{stat.label}</span>
            </div>
            <p className="text-3xl font-bold">${stat.value.toLocaleString()}</p>
          </div>
        ))}
      </div>

      {/* Expense Categories */}
      <div 
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Expense Categories</h3>
          <div className="space-y-4">
            {reportData.categories.map((category, index) => (
              <div key={category.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${getCategoryColor(index)}`}></div>
                  <span className="text-sm font-medium text-gray-700">{category.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full bg-gradient-to-r ${getCategoryColor(index)}`}
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-800">
                    ${category.amount.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Profit Margin</h3>
          <div className="text-center">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  strokeDasharray={`${(reportData.profit / reportData.income) * 339.292} 339.292`}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-800">
                    {((reportData.profit / reportData.income) * 100).toFixed(1)}%
                  </p>
                  <p className="text-sm text-gray-500">Margin</p>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Profit margin for {reportData.month}
            </p>
          </div>
        </div>
      </div>

      {/* Monthly Trends */}
      <div 
        className="bg-white rounded-xl p-6 shadow-lg"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Trends</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Income Growth', value: '+12.5%', color: 'text-green-600', icon: <TrendingUp className="w-5 h-5" /> },
            { label: 'Expense Growth', value: '+8.2%', color: 'text-orange-600', icon: <TrendingDown className="w-5 h-5" /> },
            { label: 'Profit Growth', value: '+18.3%', color: 'text-blue-600', icon: <DollarSign className="w-5 h-5" /> },
            { label: 'Efficiency', value: '94.2%', color: 'text-purple-600', icon: <PieChart className="w-5 h-5" /> }
          ].map((trend, index) => (
            <div key={trend.label} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-center mb-2">
                <div className={`${trend.color}`}>
                  {trend.icon}
                </div>
              </div>
              <p className="text-sm text-gray-600">{trend.label}</p>
              <p className={`text-lg font-bold ${trend.color}`}>{trend.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Report Actions */}
      <div 
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        {[
          { label: 'Download PDF', value: 'Full Report', color: 'from-red-500 to-pink-500', icon: <Download className="w-6 h-6" /> },
          { label: 'View Online', value: 'Interactive', color: 'from-blue-500 to-cyan-500', icon: <Eye className="w-6 h-6" /> },
          { label: 'Share Report', value: 'Email/PDF', color: 'from-green-500 to-emerald-500', icon: <Share2 className="w-6 h-6" /> },
          { label: 'Export Data', value: 'Excel/CSV', color: 'from-purple-500 to-pink-500', icon: <FileText className="w-6 h-6" /> }
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

      {/* AI Insights */}
      <div 
        className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6 rounded-xl text-white"
      >
        <h3 className="text-xl font-semibold mb-4">AI Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-2">Key Findings</h4>
            <ul className="space-y-2 text-sm">
              <li>• Office expenses increased by 15% due to new equipment purchases</li>
              <li>• Marketing ROI improved by 23% compared to last month</li>
              <li>• Travel expenses are 12% below budget</li>
              <li>• Software subscriptions show 8% cost optimization opportunity</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Recommendations</h4>
            <ul className="space-y-2 text-sm">
              <li>• Consider bulk software licensing for 15% savings</li>
              <li>• Review office supply vendors for better pricing</li>
              <li>• Implement automated expense tracking</li>
              <li>• Set up monthly budget alerts</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyReport; 