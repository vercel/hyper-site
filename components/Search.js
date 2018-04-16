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
          placeholder="Search store..."
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
            font-size: 1.4rem;
            padding-right: 8px;
            width: 120px;
            transition: width 0.2s ease;
          }

          input:focus {
            width: 136px;
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
            -webkit-backface-visibility: hidden;
          }

          input:focus + :global(.search__icon) {
            opacity: 1;
          }
        `}</style>
      </div>
    )
  }
}
