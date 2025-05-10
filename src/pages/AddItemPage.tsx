
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { useAuth } from '@/contexts/AuthContext';
import { useFoodListings } from '@/contexts/FoodListingContext';
import { toast } from 'sonner';

const CATEGORIES = ['Bakery', 'Fresh', 'Dairy', 'Cooked', 'Snacks', 'Drinks'];

const AddItemPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { addListing, isLoading } = useFoodListings();
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07');
  const [originalPrice, setOriginalPrice] = useState('');
  const [discountedPrice, setDiscountedPrice] = useState('');
  const [category, setCategory] = useState('Bakery');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('piece');
  const [expiryDate, setExpiryDate] = useState('');
  
  if (!user || user.role !== 'business') {
    navigate('/');
    return null;
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !description || !originalPrice || !discountedPrice || !quantity || !expiryDate) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    try {
      await addListing({
        businessId: user.id,
        name,
        description,
        image,
        originalPrice: parseFloat(originalPrice),
        discountedPrice: parseFloat(discountedPrice),
        expiryDate: new Date(expiryDate).toISOString(),
        category,
        quantity: parseInt(quantity),
        unit
      });
      
      toast.success('Item added successfully');
      navigate('/business-dashboard');
    } catch (err) {
      toast.error('Failed to add item');
    }
  };

  return (
    <div className="app-container pb-6">
      <Header title="Add New Item" showBackButton />
      
      <form onSubmit={handleSubmit} className="p-4 space-y-5">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Item Name*
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:outline-none"
            placeholder="e.g. Sourdough Bread"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium text-gray-700">
            Description*
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:outline-none"
            placeholder="Describe your item..."
            rows={3}
            required
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Image URL
          </label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:outline-none"
            placeholder="https://example.com/image.jpg"
          />
          <p className="text-xs text-neutralGray">
            Enter a URL for your product image (a sample image is provided)
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="originalPrice" className="text-sm font-medium text-gray-700">
              Original Price ($)*
            </label>
            <input
              id="originalPrice"
              type="number"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:outline-none"
              placeholder="10.00"
              step="0.01"
              min="0"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="discountedPrice" className="text-sm font-medium text-gray-700">
              Discounted Price ($)*
            </label>
            <input
              id="discountedPrice"
              type="number"
              value={discountedPrice}
              onChange={(e) => setDiscountedPrice(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:outline-none"
              placeholder="5.00"
              step="0.01"
              min="0"
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="category" className="text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:outline-none"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="quantity" className="text-sm font-medium text-gray-700">
              Quantity*
            </label>
            <input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:outline-none"
              placeholder="1"
              min="1"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="unit" className="text-sm font-medium text-gray-700">
              Unit
            </label>
            <select
              id="unit"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:outline-none"
            >
              <option value="piece">Piece</option>
              <option value="box">Box</option>
              <option value="kg">Kg</option>
              <option value="lb">Lb</option>
              <option value="portion">Portion</option>
              <option value="bag">Bag</option>
              <option value="loaf">Loaf</option>
            </select>
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="expiryDate" className="text-sm font-medium text-gray-700">
            Expiry Date & Time*
          </label>
          <input
            id="expiryDate"
            type="datetime-local"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:outline-none"
            required
          />
        </div>
        
        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-orange hover:bg-orange-dark text-white font-medium py-3.5 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange"
          >
            {isLoading ? 'Adding Item...' : 'Add Item'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddItemPage;
