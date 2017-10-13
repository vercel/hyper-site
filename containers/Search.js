import React from 'react'
import Router from 'next/router'
import InputSearch from '../components/InputSearch'

// The value of "this.state.inputValue" will be sent to the "page/search",
// so you can use the value that the user entered in the search box :)

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = { inputValue: '' }
    this.handleInput = this.handleInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInput = e => {
    this.setState({
      inputValue: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    Router.push(`/search?q=${this.state.inputValue}`)
  }

  render() {
    return (
      <div>
        <InputSearch
          handleSubmit={this.handleSubmit}
          handleInput={this.handleInput}
          inputValue={this.state.inputValue}
        />
      </div>
    )
  }
}
