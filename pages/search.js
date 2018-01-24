import React from 'react'
import Layout from '../components/Layout'
import SearchList from '../components/SearchList'

export default class extends React.Component {
  render() {
    return <Layout query={this.props.url.query.q} />
  }
}
