function SearchBar({
  value,
  onChange,
  onSearch,
  placeholder = "Search schemes, benefits, or categories",
}) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch?.(value);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        placeholder={placeholder}
      />
      <button className="auth-button" type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
