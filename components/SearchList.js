import React from 'react'
import css from 'styled-jsx/css'
import cachedFetch from '../lib/cached-json-fetch'
import getPlugins from '../lib/get-plugins'
import escapeHtml from 'escape-html'
import PluginsList from './PluginsList'

const searchStyling = css`
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
`

export default class extends React.Component {
  async componentWillMount() {
    const searchTerm = this.props.query
    const plugins = await getPlugins({ query: escapeHtml(searchTerm) })

    this.setState({
      plugins,
      searchTerm
    })
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.query === this.props.query) return
    const searchTerm = this.props.query
    const plugins = await getPlugins({ query: escapeHtml(searchTerm) })

    this.setState({
      plugins,
      searchTerm
    })
  }

  render() {
    // Make sure plugins have loaded
    if (!this.state) return null

    const plugins = this.state.plugins
    const totalResults = this.state.plugins.length
    const { searchTerm } = this.state

    if (!searchTerm) {
      return (
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
      )
    }

    // In the case of search results, render the plugins list
    if (totalResults > 0) {
      return <PluginsList plugins={plugins} query={searchTerm} />
    }

    // In the case of no search results, return this
    return (
      <div>
        <div className="search__error">
          <p>
            Your search for "<b>{searchTerm}</b>" did not match any plugins or
            themes 😱 <br />
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
      </div>
    )
  }
}
