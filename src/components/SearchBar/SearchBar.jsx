import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  return (
    <div className="input-group mb-3 mr-lg-5">
      <input
        type="text"
        className="form-control"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <div className="input-group-append">
        <button className="btn btn-outline-secondary" type="button" onClick={handleSearch}>
          Buscar
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
