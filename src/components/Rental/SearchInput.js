import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const SearchInput = () => {
  const [location, setLocation] = useState('');
  const history = useHistory();
  const handleSearch = () => {
    location ? history.push(`/rentals/${location}/homes`) : history.push('/');
  };
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };
  return (
    <div className="search-container">
      <input
        onKeyPress={handleKeyPress}
        type="search"
        name="search"
        placeholder="Search"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button
        type="button"
        className="btn btn-secondary"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchInput;
