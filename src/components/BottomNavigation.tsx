
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, PlusCircle, ShoppingBag, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

const BottomNavigation = () => {
  const location = useLocation();
  const { user } = useAuth();
  const isBusiness = user?.role === 'business';

  const navItems = [
    {
      label: 'Home',
      icon: <Home className="h-6 w-6" />,
      path: '/',
      showFor: 'all'
    },
    {
      label: 'Search',
      icon: <Search className="h-6 w-6" />,
      path: '/search',
      showFor: 'all'
    },
    {
      label: 'Add Item',
      icon: <PlusCircle className="h-6 w-6" />,
      path: '/add-item',
      showFor: 'business'
    },
    {
      label: 'Orders',
      icon: <ShoppingBag className="h-6 w-6" />,
      path: '/orders',
      showFor: 'all'
    },
    {
      label: 'Profile',
      icon: <User className="h-6 w-6" />,
      path: '/profile',
      showFor: 'all'
    }
  ];

  const filteredItems = navItems.filter(item => 
    item.showFor === 'all' || (item.showFor === 'business' && isBusiness)
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg py-2">
      <div className="flex justify-around items-center">
        {filteredItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center px-3 py-1",
              location.pathname === item.path
                ? "text-orange"
                : "text-gray-500"
            )}
          >
            {item.icon}
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;
