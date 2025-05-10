
import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search for food items...'
}) => {
  return (
    <div className="relative flex items-center px-4 py-2">
      <div className="absolute inset-y-0 left-4 flex items-center pl-3 pointer-events-none">
        <Search className="h-5 w-5 text-neutralGray" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full bg-gray-100 pl-10 pr-4 py-2.5 rounded-full text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange focus:bg-white"
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchBar;
