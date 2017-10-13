import React from 'react'
import Router from 'next/router'
import InputSearch from '../components/InputSearch'

export let search = null

// The variable "let search" will be sent to the "pages/search",
// so that it receives the data that the user wrote.

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = { inputValue: '' }
    this.handleInput = this.handleInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.data = null
  }

  handleInput = e => {
    this.setState({
      inputValue: e.target.value
    })
  }

  handleSubmit = e => {
    search = this.state.inputValue
    e.preventDefault()
    Router.push('/search')
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
