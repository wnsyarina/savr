
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import SearchBar from '@/components/SearchBar';
import FoodCard from '@/components/FoodCard';
import CategoryFilter from '@/components/CategoryFilter';
import { useFoodListings } from '@/contexts/FoodListingContext';

const categories = ['All', 'Bakery', 'Fresh', 'Dairy', 'Cooked', 'Snacks', 'Drinks'];

const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { filterListings } = useFoodListings();
  const [filteredItems, setFilteredItems] = useState(filterListings());
  
  useEffect(() => {
    const filtered = filterListings(
      selectedCategory === 'All' ? undefined : selectedCategory,
      searchTerm
    );
    setFilteredItems(filtered);
  }, [searchTerm, selectedCategory]);
  
  return (
    <div className="app-container pb-20">
      <Header title="Search" />
      
      <SearchBar 
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search for items, businesses..."
      />
      
      <CategoryFilter 
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      
      <div className="p-4">
        {searchTerm || selectedCategory !== 'All' ? (
          filteredItems.length > 0 ? (
            <div className="space-y-4">
              <p className="text-sm text-neutralGray">
                {filteredItems.length} items found
              </p>
              {filteredItems.map((item) => (
                <FoodCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="py-10 text-center">
              <p className="text-neutralGray">No results found</p>
              <p className="text-sm text-neutralGray mt-1">
                Try different keywords or categories
              </p>
            </div>
          )
        ) : (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-3">Popular searches</h3>
              <div className="flex flex-wrap gap-2">
                {['Bread', 'Pastries', 'Salad', 'Fruits', 'Meals'].map((term) => (
                  <button 
                    key={term}
                    onClick={() => setSearchTerm(term)} 
                    className="px-4 py-2 bg-gray-100 rounded-full text-sm"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-3">Trending now</h3>
              <div className="space-y-4">
                {filterListings().slice(0, 2).map((item) => (
                  <FoodCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default SearchPage;
