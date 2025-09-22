import { createContext, useContext } from "react";

export interface SearchContextType {
  query: string;
  setQuery: (value: string) => void;
}

export const SearchContext = createContext<SearchContextType | undefined>(
  undefined
);

export const useSearch = (): SearchContextType => {
  const ctx = useContext(SearchContext);
  if (!ctx) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return ctx;
};
