import { createContext, useContext } from 'react'

export const SearchContext = createContext(null)

export const useSearch = () => {
  const context = useContext(SearchContext)
  // Provide a default value if context is null (e.g., during SSR/SSG outside provider)
  if (context === null) {
    return { search: '', setSearch: () => {} }
  }
  return context
}
