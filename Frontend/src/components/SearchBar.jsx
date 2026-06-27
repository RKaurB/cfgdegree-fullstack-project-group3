
function SearchBar({ query, setQuery, onSearch }) {
  // User can enter to get the result
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };
  
  return (
    <div className="search-bar">
      {/* Place to input for searching plants */}
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)} // updates search state
        onKeyDown={handleKeyDown}
        placeholder="Search plants (e.g. snake plant)"
      />
      <button className="search-btn" onClick={onSearch}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;
