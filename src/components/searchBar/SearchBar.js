import React from 'react';

import './SearchBar.scss';

function SearchBar({searchTerm, setSearchTerm}) {

    const updateSearchTerm = (e) => {
        setSearchTerm(e.target.value);
    }

    return (
        <input 
            className="searchBar" 
            placeholder="Search by name"
            value={searchTerm} 
            onChange={updateSearchTerm}
        />
    );
}

export default SearchBar;