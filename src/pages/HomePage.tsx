
import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import CategoryFilter from '@/components/CategoryFilter';
import FoodCard from '@/components/FoodCard';
import { useFoodListings } from '@/contexts/FoodListingContext';
import { useAuth } from '@/contexts/AuthContext';

const categories = ['All', 'Bakery', 'Fresh', 'Dairy', 'Cooked', 'Snacks', 'Drinks'];

const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { listings, filterListings } = useFoodListings();
  const { user } = useAuth();
  const [filteredItems, setFilteredItems] = useState(listings);

  useEffect(() => {
    const filtered = filterListings(selectedCategory === 'All' ? undefined : selectedCategory);
    setFilteredItems(filtered);
  }, [selectedCategory, listings]);

  return (
    <div className="app-container">
      <Header 
        title="FoodSaver" 
        showMenu 
        showNotification 
      />
      
      <div className="px-4 py-3 flex items-center text-sm">
        <MapPin className="h-4 w-4 text-orange mr-1" />
        <span className="font-medium">San Francisco</span>
        <span className="mx-1">•</span>
        <span className="text-neutralGray">2 miles radius</span>
      </div>
      
      <CategoryFilter 
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <div className="px-4 py-3">
        <h2 className="text-xl font-semibold mb-1">Available nearby</h2>
        <p className="text-sm text-neutralGray">
          Save food and money with these great deals
        </p>
      </div>
      
      <div className="px-4 space-y-4 pb-20">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <FoodCard key={item.id} item={item} />
          ))
        ) : (
          <div className="py-10 text-center">
            <p className="text-neutralGray">No items found</p>
            {user?.role === 'business' && (
              <p className="mt-2 text-sm">
                Why not <span className="text-orange font-medium">add some items</span> to your inventory?
              </p>
            )}
          </div>
        )}
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default HomePage;
