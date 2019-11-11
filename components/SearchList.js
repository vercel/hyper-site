import React from 'react'
import Head from 'next/head'
import getPlugins from '../lib/get-plugins'
import escapeHtml from 'escape-html'
import PluginsList from './PluginsList'

const SearchList = ({ query }) => {
  const plugins = React.useMemo(
    () => getPlugins({ query: escapeHtml(query) }),
    [query]
  )

  if (!query) {
    return (
      <React.Fragment>
        <Head>
          <title>Hyper Store - Search for plugins or themes</title>
        </Head>
        <div className="search__error">
          <p>Please enter a search term to find a plugin or theme 🕵️</p>

          <style jsx>{`
            .search__error {
              width: 100%;
              text-align: center;
              height: calc(100vh - 122px);
              min-height: 124px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 1.4rem;
            }
          `}</style>
        </div>
      </React.Fragment>
    )
  }

  // In the case of search results, render the plugins list
  if (plugins.length > 0) {
    return (
      <React.Fragment>
        <Head>
          <title>Hyper Store - Searching for "{query}"</title>
        </Head>
        <PluginsList plugins={plugins} query={query} />
      </React.Fragment>
    )
  }

  // In the case of no search results, return this
  return (
    <React.Fragment>
      <Head>
        <title>Hyper Store - No results for "{query}"</title>
      </Head>
      <div className="search__error">
        <p>
          Your search for "<b>{query}</b>" did not match any plugins or themes
          😱 <br />
          Make sure the search term is spelled correctly.
        </p>
      </div>

      <style jsx>{`
        .search__error {
          width: 100%;
          text-align: center;
          height: calc(100vh - 122px);
          min-height: 124px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
        }
      `}</style>
    </React.Fragment>
  )
}

export default SearchList
