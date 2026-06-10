
function SearchBar({ query, setQuery }) {
  return (
    <div className="search-bar">
      {/* Input place for searching plants */}
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)} // updates search state
        placeholder="Search plants (e.g. snake plant)"
      />
    </div>
  );
}

export default SearchBar;
