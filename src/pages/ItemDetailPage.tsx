
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Clock, MapPin, Building, ChevronRight, Share2 } from 'lucide-react';
import Header from '@/components/Header';
import { useFoodListings } from '@/contexts/FoodListingContext';
import { formatDistanceToNow, format } from 'date-fns';
import { toast } from 'sonner';

const ItemDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getListingById } = useFoodListings();
  
  const item = id ? getListingById(id) : undefined;
  
  if (!item) {
    return (
      <div className="app-container flex flex-col items-center justify-center">
        <Header title="Item not found" showBackButton />
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <p className="text-neutralGray mb-4">The item you're looking for doesn't exist</p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-orange text-white rounded-lg"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }
  
  const expiryDate = new Date(item.expiryDate);
  const expiryTimeLeft = formatDistanceToNow(expiryDate, { addSuffix: true });
  const formattedExpiryDate = format(expiryDate, 'MMM d, yyyy h:mm a');
  
  const discountPercentage = Math.round(
    ((item.originalPrice - item.discountedPrice) / item.originalPrice) * 100
  );
  
  const handleBuy = () => {
    toast.success('Item added to cart');
    // In a real app, this would add the item to the cart or process the order
  };
  
  const handleShare = () => {
    toast.success('Sharing link copied to clipboard');
    // In a real app, this would share the item
  };

  return (
    <div className="app-container pb-20">
      <Header title={item.name} showBackButton />
      
      <div className="relative">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-64 object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://placehold.co/600x400/orange/white?text=Food+Image';
          }}
        />
        <div className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md">
          <Share2 
            className="h-5 w-5 text-neutralGray"
            onClick={handleShare}
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <span className="bg-orange px-2 py-1 rounded-full text-white text-xs font-medium">
            -{discountPercentage}% off
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h1 className="text-2xl font-bold">{item.name}</h1>
        </div>
        
        <div className="flex space-x-1 items-center text-sm text-neutralGray mb-4">
          <Building className="h-4 w-4" />
          <span>{item.businessName}</span>
        </div>
        
        <div className="bg-orange/10 rounded-lg p-3 mb-4">
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-orange mr-2" />
            <div>
              <p className="font-medium text-darkPurple">
                Expires {expiryTimeLeft}
              </p>
              <p className="text-xs text-neutralGray">
                {formattedExpiryDate}
              </p>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="font-semibold text-lg mb-2">About this item</h2>
          <p className="text-gray-600">{item.description}</p>
        </div>
        
        <div className="border-t border-gray-200 pt-4 mb-6">
          <div className="flex justify-between items-center mb-1">
            <span className="text-neutralGray">Original price</span>
            <span className="text-neutralGray line-through">${item.originalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold">Discounted price</span>
            <span className="text-xl font-bold text-orange">${item.discountedPrice.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="bg-gray-100 rounded-lg p-3 mb-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-neutralGray mr-2" />
              <div>
                <p className="font-medium">Pickup location</p>
                <p className="text-xs text-neutralGray">Tap to view on map</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-neutralGray" />
          </div>
        </div>
        
        <div className="flex justify-between space-x-4">
          <button 
            className="flex-1 bg-white border-2 border-orange text-orange font-medium py-3 rounded-lg"
          >
            Contact Business
          </button>
          <button 
            className="flex-1 bg-orange text-white font-medium py-3 rounded-lg"
            onClick={handleBuy}
          >
            Purchase Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailPage;
