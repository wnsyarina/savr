
import React from 'react';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';

const OrdersPage: React.FC = () => {
  return (
    <div className="app-container pb-20">
      <Header title="My Orders" />
      
      <div className="p-10 flex flex-col items-center justify-center h-[60vh]">
        <div className="bg-orange/10 p-6 rounded-full">
          <svg className="w-16 h-16 text-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h3 className="font-semibold text-lg mt-6">No orders yet</h3>
        <p className="text-neutralGray text-sm mt-2 text-center max-w-xs">
          Start exploring and purchase surplus food to reduce waste and save money
        </p>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default OrdersPage;
