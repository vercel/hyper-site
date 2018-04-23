import React from 'react'

function getSelection() {
  return window.getSelection ? window.getSelection() : { removeAllRanges() {}, selectAllChildren() {} }
}

export default class Selecting extends React.Component {
  select({ target }) {
    getSelection().selectAllChildren(target)
  }
  deselect({ target }) {
    getSelection().removeAllRanges()
  }
  render() {
    return React.cloneElement(React.Children.only(this.props.children), {
      onMouseEnter: this.select,
      onMouseLeave: this.deselect
    })
  }
}