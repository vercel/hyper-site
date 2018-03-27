import React from 'react'
import Router from 'next/router'
import SearchIcon from '../static/search.svg'

export default class extends React.Component {
  constructor() {
    super()

    this.handleSearch = this.handleSearch.bind(this)
    this.focusSearchInput = this.focusSearchInput.bind(this)
  }

  handleSearch(event) {
    this.props.handleSearch(event.target.value)
  }

  focusSearchInput() {
    this.searchInput.focus()
  }

  render() {
    return (
      <div className="search-input">
        <input
          type="text"
          placeholder="Search..."
          onKeyUp={this.handleSearch}
          ref={input => {
            this.searchInput = input
          }}
        />
        <SearchIcon className="search__icon" onClick={this.focusSearchInput} />

        <style jsx>{`
          .search-input {
            display: flex;
            justify-content: center;
            align-items: center;
          }
          input {
            background: transparent;
            border: none;
            color: white;
            font-size: 1.2rem;
            padding-right: 8px;
            width: 78px;
            transition: width 0.2s ease;
          }
          input:focus {
            width: 128px;
          }
          input::placeholder {
            color: #999999;
          }
          input::-webkit-input-placeholder {
            color: #999999;
          }
          input::-ms-input-placeholder {
            color: #999999;
          }
          :global(.search__icon) {
            opacity: 0.5;
            transition: opacity 0.2s ease;
          }
          input:focus + :global(.search__icon) {
            opacity: 1;
          }
        `}</style>
      </div>
    )
  }
}
