
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useAuth } from './AuthContext';

// Define food item type
export interface FoodItem {
  id: string;
  businessId: string;
  businessName: string;
  name: string;
  description: string;
  image: string;
  originalPrice: number;
  discountedPrice: number;
  expiryDate: string; // ISO date string
  category: string;
  quantity: number;
  unit: string;
  createdAt: string; // ISO date string
}

// Mock data
const MOCK_FOOD_ITEMS: FoodItem[] = [
  {
    id: '1',
    businessId: '1',
    businessName: 'Fresh Bakery',
    name: 'Artisan Sourdough Bread',
    description: 'Freshly baked sourdough bread, best consumed within 2 days',
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
    originalPrice: 8.50,
    discountedPrice: 4.25,
    expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
    category: 'Bakery',
    quantity: 5,
    unit: 'loaf',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    businessId: '1',
    businessName: 'Fresh Bakery',
    name: 'Chocolate Croissants',
    description: 'Flaky croissants with rich chocolate filling',
    image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
    originalPrice: 4.75,
    discountedPrice: 2.50,
    expiryDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day from now
    category: 'Bakery',
    quantity: 8,
    unit: 'piece',
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    businessId: '1',
    businessName: 'Fresh Bakery',
    name: 'Vegetable Salad Box',
    description: 'Fresh mixed vegetables with house dressing',
    image: 'https://images.unsplash.com/photo-1466721591366-2d5fba72006d',
    originalPrice: 9.99,
    discountedPrice: 4.99,
    expiryDate: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(), // 12 hours from now
    category: 'Fresh',
    quantity: 3,
    unit: 'box',
    createdAt: new Date().toISOString()
  },
];

interface FoodListingContextType {
  listings: FoodItem[];
  isLoading: boolean;
  error: string | null;
  businessItems: FoodItem[];
  addListing: (item: Omit<FoodItem, 'id' | 'createdAt' | 'businessName'>) => Promise<void>;
  updateListing: (id: string, updates: Partial<FoodItem>) => Promise<void>;
  deleteListing: (id: string) => Promise<void>;
  getListingById: (id: string) => FoodItem | undefined;
  filterListings: (category?: string, searchTerm?: string) => FoodItem[];
}

const FoodListingContext = createContext<FoodListingContextType | undefined>(undefined);

export const FoodListingProvider = ({ children }: { children: ReactNode }) => {
  const [listings, setListings] = useState<FoodItem[]>(MOCK_FOOD_ITEMS);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Get business items (if user is a business)
  const businessItems = listings.filter(item => 
    user?.role === 'business' && item.businessId === user.id
  );

  const addListing = async (item: Omit<FoodItem, 'id' | 'createdAt' | 'businessName'>) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (!user || user.role !== 'business') {
        throw new Error('Only businesses can add listings');
      }
      
      const newItem: FoodItem = {
        ...item,
        id: `${Date.now()}`, // Generate an ID (would be done by backend in real app)
        businessName: user.businessName || 'Unknown Business',
        createdAt: new Date().toISOString()
      };
      
      setListings(prev => [newItem, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateListing = async (id: string, updates: Partial<FoodItem>) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setListings(prev => prev.map(item => 
        item.id === id ? { ...item, ...updates } : item
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteListing = async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setListings(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getListingById = (id: string) => {
    return listings.find(item => item.id === id);
  };

  const filterListings = (category?: string, searchTerm?: string) => {
    let filtered = [...listings];
    
    if (category && category !== 'All') {
      filtered = filtered.filter(item => item.category === category);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(term) || 
        item.description.toLowerCase().includes(term) ||
        item.businessName.toLowerCase().includes(term)
      );
    }
    
    return filtered;
  };

  return (
    <FoodListingContext.Provider
      value={{
        listings,
        isLoading,
        error,
        businessItems,
        addListing,
        updateListing,
        deleteListing,
        getListingById,
        filterListings
      }}
    >
      {children}
    </FoodListingContext.Provider>
  );
};

export const useFoodListings = () => {
  const context = useContext(FoodListingContext);
  if (context === undefined) {
    throw new Error('useFoodListings must be used within a FoodListingProvider');
  }
  return context;
};
