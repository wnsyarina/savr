
import React from 'react';
import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory
}) => {
  return (
    <div className="overflow-x-auto">
      <div className="flex space-x-2 px-4 py-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={cn(
              "whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium border",
              selectedCategory === category
                ? "bg-orange text-white border-orange"
                : "bg-white text-neutralGray border-gray-200"
            )}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
