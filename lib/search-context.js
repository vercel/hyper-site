import { createContext, useContext } from 'react'

export const SearchContext = createContext(null)

export const useSearch = () => useContext(SearchContext)
