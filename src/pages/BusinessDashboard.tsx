
import React, { useState } from 'react';
import { PlusCircle, Trash2, BarChart2, Package } from 'lucide-react';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { useFoodListings } from '@/contexts/FoodListingContext';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { format } from 'date-fns';

const BusinessDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { businessItems, deleteListing } = useFoodListings();
  const [activeTab, setActiveTab] = useState('inventory');
  
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
          
          <div className="px-4 space-y-3">
            {businessItems.length > 0 ? (
              businessItems.map((item) => (
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
        <div className="p-4 text-center py-12">
          <p className="text-neutralGray mb-2">Analytics coming soon</p>
          <p className="text-xs text-neutralGray">
            Gain insights into your sales, customer trends, and inventory management
          </p>
        </div>
      )}
      
      <BottomNavigation />
    </div>
  );
};

export default BusinessDashboard;
