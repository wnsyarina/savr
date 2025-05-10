
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { FoodItem } from '@/contexts/FoodListingContext';
import { formatDistanceToNow } from 'date-fns';

interface FoodCardProps {
  item: FoodItem;
}

const FoodCard: React.FC<FoodCardProps> = ({ item }) => {
  const navigate = useNavigate();
  
  const discountPercentage = Math.round(
    ((item.originalPrice - item.discountedPrice) / item.originalPrice) * 100
  );
  
  const expiryDate = new Date(item.expiryDate);
  const expiryTimeLeft = formatDistanceToNow(expiryDate, { addSuffix: true });
  
  const handleClick = () => {
    navigate(`/item/${item.id}`);
  };
  
  return (
    <div className="food-card cursor-pointer" onClick={handleClick}>
      <div className="relative">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-40 object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://placehold.co/600x400/orange/white?text=Food+Image';
          }}
        />
        <span className="discount-badge">-{discountPercentage}%</span>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
          <div className="flex items-center text-white gap-1">
            <Clock className="h-4 w-4" />
            <span className="text-xs">{expiryTimeLeft}</span>
          </div>
        </div>
      </div>
      
      <div className="p-3">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg mb-1 line-clamp-1">{item.name}</h3>
        </div>
        
        <p className="text-xs text-neutralGray mb-2">{item.businessName}</p>
        <p className="text-sm line-clamp-2 text-gray-600 mb-3">{item.description}</p>
        
        <div className="flex justify-between items-center">
          <div>
            <span className="text-orange font-bold mr-2">${item.discountedPrice.toFixed(2)}</span>
            <span className="text-neutralGray text-sm line-through">${item.originalPrice.toFixed(2)}</span>
          </div>
          <div className="text-sm text-neutralGray">
            {item.quantity} {item.unit}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
