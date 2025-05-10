
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Settings, HelpCircle, Star, ShoppingBag, Store } from 'lucide-react';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { useAuth } from '@/contexts/AuthContext';

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  if (!user) {
    navigate('/login');
    return null;
  }
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const menuItems = [
    {
      icon: <ShoppingBag className="h-5 w-5 text-orange" />,
      label: 'My Orders',
      onClick: () => navigate('/orders')
    },
    {
      icon: <Star className="h-5 w-5 text-orange" />,
      label: 'Favorites',
      onClick: () => navigate('/favorites')
    }
  ];
  
  if (user.role === 'business') {
    menuItems.unshift({
      icon: <Store className="h-5 w-5 text-orange" />,
      label: 'Business Dashboard',
      onClick: () => navigate('/business-dashboard')
    });
  }
  
  const secondaryMenuItems = [
    {
      icon: <Settings className="h-5 w-5 text-neutralGray" />,
      label: 'Settings',
      onClick: () => navigate('/settings')
    },
    {
      icon: <HelpCircle className="h-5 w-5 text-neutralGray" />,
      label: 'Help & Support',
      onClick: () => navigate('/help')
    },
    {
      icon: <LogOut className="h-5 w-5 text-red-500" />,
      label: 'Log Out',
      onClick: handleLogout
    }
  ];

  return (
    <div className="app-container pb-20">
      <Header title="Profile" />
      
      <div className="bg-orange/10 p-6">
        <div className="flex items-center">
          <div className="h-16 w-16 bg-orange rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {user.name.substring(0, 1)}
          </div>
          <div className="ml-4">
            <h2 className="font-semibold text-lg">{user.name}</h2>
            <p className="text-sm text-neutralGray">{user.email}</p>
            {user.role === 'business' && (
              <span className="inline-block mt-1 bg-orange/20 text-orange text-xs px-2 py-0.5 rounded-full">
                Business
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-4 space-y-6">
        <div>
          <p className="font-medium mb-3">Account</p>
          <div className="bg-white rounded-lg shadow-sm">
            {menuItems.map((item, index) => (
              <div key={index} className="border-b border-gray-100 last:border-none">
                <button
                  onClick={item.onClick}
                  className="w-full flex items-center justify-between p-4"
                >
                  <div className="flex items-center">
                    {item.icon}
                    <span className="ml-3">{item.label}</span>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <p className="font-medium mb-3">General</p>
          <div className="bg-white rounded-lg shadow-sm">
            {secondaryMenuItems.map((item, index) => (
              <div key={index} className="border-b border-gray-100 last:border-none">
                <button
                  onClick={item.onClick}
                  className="w-full flex items-center justify-between p-4"
                >
                  <div className="flex items-center">
                    {item.icon}
                    <span className="ml-3">{item.label}</span>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <p className="text-center text-xs text-neutralGray pt-4">
          Version 1.0.0
        </p>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default ProfilePage;
