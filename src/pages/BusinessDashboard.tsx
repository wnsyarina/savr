
import React, { useState } from 'react';
import { PlusCircle, Trash2, BarChart2, Package, ChartBarIcon, ChartLineIcon } from 'lucide-react';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { useFoodListings } from '@/contexts/FoodListingContext';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { format } from 'date-fns';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/components/ui/table';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import SearchBar from '@/components/SearchBar';

const BusinessDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { businessItems, deleteListing } = useFoodListings();
  const [activeTab, setActiveTab] = useState('inventory');
  const [searchTerm, setSearchTerm] = useState('');
  
  if (!user || user.role !== 'business') {
    return (
      <div className="app-container">
        <Header title="Business Dashboard" showBackButton />
        <div className="p-6 text-center">
          <p className="mb-4">You need a business account to access this page</p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-orange text-white rounded-lg"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }
  
  // Filter items based on search term
  const filteredItems = searchTerm 
    ? businessItems.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : businessItems;
  
  const handleDelete = async (id: string) => {
    try {
      await deleteListing(id);
      toast.success('Item deleted successfully');
    } catch (err) {
      toast.error('Failed to delete item');
    }
  };
  
  const handleAddItem = () => {
    navigate('/add-item');
  };

  // Prepare analytics data
  const currentMonth = new Date().getMonth();
  
  // Generate mock monthly revenue data
  const monthlyRevenueData = Array(6).fill(0).map((_, index) => {
    const monthIndex = (currentMonth - 5 + index) % 12;
    const monthName = new Date(0, monthIndex).toLocaleString('default', { month: 'short' });
    
    // Generate realistic values with a slight upward trend and some randomness
    const baseValue = 800 + (index * 100);
    const randomFactor = Math.random() * 300 - 150; // Random variation between -150 and 150
    const value = Math.max(0, Math.round(baseValue + randomFactor));
    
    return {
      name: monthName,
      revenue: value,
    };
  });

  // Generate mock category distribution data
  const categoryData = [
    { name: 'Bakery', value: businessItems.filter(item => item.category === 'Bakery').length || 3 },
    { name: 'Fresh', value: businessItems.filter(item => item.category === 'Fresh').length || 2 },
    { name: 'Dairy', value: businessItems.filter(item => item.category === 'Dairy').length || 1 },
    { name: 'Prepared', value: businessItems.filter(item => item.category === 'Prepared').length || 2 },
  ];

  // Generate mock weekly sales data
  const weeklyData = [
    { day: 'Mon', sales: 12 },
    { day: 'Tue', sales: 19 },
    { day: 'Wed', sales: 15 },
    { day: 'Thu', sales: 22 },
    { day: 'Fri', sales: 30 },
    { day: 'Sat', sales: 18 },
    { day: 'Sun', sales: 10 },
  ];

  // Colors for the pie chart
  const COLORS = ['#F97316', '#fb923c', '#fdba74', '#ffedd5'];

  return (
    <div className="app-container pb-20">
      <Header title="Business Dashboard" showNotification />
      
      <div className="p-4 bg-white shadow-sm mb-4">
        <h2 className="font-bold text-xl">Welcome, {user.businessName}</h2>
        <p className="text-sm text-neutralGray">{user.businessAddress}</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4 px-4 mb-6">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <BarChart2 className="h-6 w-6 text-orange" />
            <span className="text-xs text-neutralGray">This Month</span>
          </div>
          <p className="text-2xl font-bold mb-1">$1,240</p>
          <p className="text-xs text-neutralGray">Revenue</p>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <Package className="h-6 w-6 text-green-500" />
            <span className="text-xs text-neutralGray">This Month</span>
          </div>
          <p className="text-2xl font-bold mb-1">{businessItems.length}</p>
          <p className="text-xs text-neutralGray">Items Listed</p>
        </div>
      </div>
      
      <div className="px-4 mb-4">
        <div className="flex border-b border-gray-200">
          <button
            className={`flex-1 py-3 text-sm font-medium ${
              activeTab === 'inventory' ? 'text-orange border-b-2 border-orange' : 'text-neutralGray'
            }`}
            onClick={() => setActiveTab('inventory')}
          >
            Inventory
          </button>
          <button
            className={`flex-1 py-3 text-sm font-medium ${
              activeTab === 'orders' ? 'text-orange border-b-2 border-orange' : 'text-neutralGray'
            }`}
            onClick={() => setActiveTab('orders')}
          >
            Orders
          </button>
          <button
            className={`flex-1 py-3 text-sm font-medium ${
              activeTab === 'analytics' ? 'text-orange border-b-2 border-orange' : 'text-neutralGray'
            }`}
            onClick={() => setActiveTab('analytics')}
          >
            Analytics
          </button>
        </div>
      </div>
      
      {activeTab === 'inventory' && (
        <div>
          <div className="flex justify-between items-center px-4 mb-4">
            <h3 className="text-lg font-semibold">Your Items</h3>
            <button
              onClick={handleAddItem}
              className="flex items-center bg-orange text-white px-3 py-1.5 rounded-lg text-sm"
            >
              <PlusCircle className="h-4 w-4 mr-1" />
              Add Item
            </button>
          </div>
          
          <SearchBar 
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search your inventory..."
          />
          
          <div className="px-4 space-y-3">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg p-3 flex items-center">
                  <img 
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md mr-3"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://placehold.co/600x400/orange/white?text=Food+Image';
                    }}
                  />
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <div className="flex items-center text-xs text-neutralGray">
                      <span>${item.discountedPrice.toFixed(2)}</span>
                      <span className="mx-1">•</span>
                      <span>{item.quantity} {item.unit}</span>
                    </div>
                    <div className="text-xs text-neutralGray">
                      Expires: {format(new Date(item.expiryDate), 'MMM d, yyyy')}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-red-500"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-neutralGray mb-4">No items in your inventory</p>
                <button
                  onClick={handleAddItem}
                  className="bg-orange text-white px-4 py-2 rounded-lg"
                >
                  Add your first item
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      
      {activeTab === 'orders' && (
        <div className="p-4 text-center py-12">
          <p className="text-neutralGray mb-2">Order management coming soon</p>
          <p className="text-xs text-neutralGray">
            Track pickup times, manage customer orders, and process payments
          </p>
        </div>
      )}
      
      {activeTab === 'analytics' && (
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-4">Business Analytics</h3>
          
          <div className="mb-6 bg-white rounded-lg p-4 shadow-sm">
            <h4 className="text-md font-medium mb-3">Monthly Revenue</h4>
            <div className="h-64">
              <ChartContainer
                config={{
                  revenue: { label: "Revenue", color: "#F97316" }
                }}
              >
                <BarChart data={monthlyRevenueData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis 
                    tickFormatter={(value) => `$${value}`} 
                    width={45}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent 
                        labelKey="name" 
                        formatter={(value) => [`$${value}`, "Revenue"]} 
                      />
                    }
                  />
                  <Bar dataKey="revenue" fill="#F97316" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h4 className="text-md font-medium mb-3">Product Categories</h4>
              <div className="h-56">
                <ChartContainer
                  config={{
                    value: { color: "#F97316" }
                  }}
                >
                  <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={70}
                      fill="#F97316"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          formatter={(value, name) => [`${value} items`, name]}
                        />
                      }
                    />
                  </PieChart>
                </ChartContainer>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h4 className="text-md font-medium mb-3">Weekly Sales</h4>
              <div className="h-56">
                <ChartContainer
                  config={{
                    sales: { label: "Items Sold", color: "#F97316" }
                  }}
                >
                  <LineChart data={weeklyData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="day" />
                    <YAxis width={30} />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          formatter={(value) => [`${value} items`, "Sold"]}
                        />
                      }
                    />
                    <Line type="monotone" dataKey="sales" stroke="#F97316" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ChartContainer>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h4 className="text-md font-medium mb-3">Top Selling Items</h4>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Units Sold</TableHead>
                    <TableHead className="text-right">Revenue</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {businessItems.slice(0, 3).map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell className="text-right">{Math.floor(Math.random() * 20) + 10}</TableCell>
                      <TableCell className="text-right">${(item.discountedPrice * (Math.floor(Math.random() * 20) + 10)).toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                  {businessItems.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-4 text-neutralGray">
                        No data available
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
          
          <div className="mt-6 text-sm text-neutralGray text-center px-4">
            <p>Data shown is for demonstration purposes. Connect your payment provider to see actual revenue analytics.</p>
          </div>
        </div>
      )}
      
      <BottomNavigation />
    </div>
  );
};

export default BusinessDashboard;
