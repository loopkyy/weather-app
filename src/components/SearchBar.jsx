import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ onSearch, loading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && !loading) {
      onSearch(query);
      setQuery('');
    }
  };

  const POPULAR_CITIES = ['Jakarta', 'Bandung', 'Surabaya', 'Tokyo', 'London'];

  return (
    <div className="space-y-3">
      {/* Search Form */}
      <form onSubmit={handleSubmit}>
        <div className="flex space-x-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search city..."
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={!query.trim() || loading}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            <Search size={20} />
          </button>
        </div>
      </form>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2">
        {popularCities.map((city) => (
          <button
            key={city}
            onClick={() => onSearch(city)}
            className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;