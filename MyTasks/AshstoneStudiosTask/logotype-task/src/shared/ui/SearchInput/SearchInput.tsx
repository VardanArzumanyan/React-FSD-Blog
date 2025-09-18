import { forwardRef } from "react";
import { useSearch } from "../../context/search/SearchContext";
import "./SearchInput.css";

interface Props {
  autoFocus?: boolean;
}

const SearchInput = forwardRef<HTMLInputElement, Props>(
  ({ autoFocus }, ref) => {
    const { query, setQuery } = useSearch();

    return (
      <input
        ref={ref}
        className="search-input"
        type="search"
        placeholder="Search posts..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoFocus={autoFocus}
      />
    );
  }
);

SearchInput.displayName = "SearchInput";

export default SearchInput;
