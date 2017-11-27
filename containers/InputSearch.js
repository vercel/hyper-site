import React from 'react'
import IconSearch from '../static/search.svg'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = { focus: null }
  }

  onFocus() {
    this.setState({ focus: true })
  }

  onBlur() {
    this.setState({ focus: false })
  }
  render() {
    return (
      <div className={this.state.focus ? 'focus' : null}>
        <style jsx>{`
          .search-form {
            display: inline;
          }

          .search-field {
            background: transparent;
            border: none;
            color: #999999;
            font-size: 14px;
            font-size: 1.4rem;
            font-weight: 400;
            transform: translateX(40%);
            line-height: 2.3rem;
            left: 40%;
            width: 70px;
            padding-left: 5px;
          }

          .search-field :focus {
            color: #fff;
          }

          .search-icon {
            cursor: pointer;
            display: inline;
            border: none;
            margin-left: 28px;
            width: 0px;
          }

          .focus .search-icon :global(path) {
            opacity: 1;
          }
        `}</style>
        <form className="search-form" onSubmit={this.props.handleSubmit}>
          <input
            onFocus={this.onFocus.bind(this)}
            onBlur={this.onBlur.bind(this)}
            className="search-field"
            type="text"
            placeholder="Search..."
            maxLength="45"
            onChange={this.props.handleInput}
            value={this.props.inputValue}
          />
          <span onClick={this.props.handleSubmit} className="search-icon">
            <IconSearch />
          </span>
        </form>
      </div>
    )
  }
}
