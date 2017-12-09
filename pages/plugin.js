import React from 'react'

export default class extends React.Component {
  static getInitialProps({ query: { id } }) {
    return { plugin: id }
  }
  render() {
    return (
      <div>
        <h1>{this.props.plugin}</h1>
        <style jsx>{`
          div {
            display: flex;
            aling-items: center;
            justify-content: center;
            height: 100vh;
          }
        `}</style>
      </div>
    )
  }
}
