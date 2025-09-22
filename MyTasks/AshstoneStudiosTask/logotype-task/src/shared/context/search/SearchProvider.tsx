import React, { useState, type ReactNode } from "react";
import { SearchContext, type SearchContextType } from "./SearchContext";

export const SearchProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [query, setQuery] = useState<string>("");

  const value: SearchContextType = { query, setQuery };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};
