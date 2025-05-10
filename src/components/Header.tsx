
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, Menu } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  showNotification?: boolean;
  showMenu?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton = false,
  showNotification = false,
  showMenu = false
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  return (
    <div className="sticky top-0 z-10 bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          {showBackButton && (
            <button
              onClick={() => navigate(-1)}
              className="mr-2 p-1 rounded-full hover:bg-gray-100"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
          )}
          
          {showMenu && (
            <button className="mr-2 p-1 rounded-full hover:bg-gray-100">
              <Menu className="h-6 w-6" />
            </button>
          )}
          
          <h1 className="text-lg font-semibold">{title}</h1>
        </div>
        
        {showNotification && (
          <button className="p-1 rounded-full hover:bg-gray-100 relative">
            <Bell className="h-6 w-6" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-orange" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
