import React from 'react'
import fetch from 'isomorphic-unfetch'
import Markdown from 'react-markdown'
import Layout from '../components/Layout'
import PluginInfo from '../components/PluginInfo'

export default class extends React.Component {
  static async getInitialProps({ query }) {
    const result = await fetch(`https://api.npms.io/v2/package/${query.name}`)
    const json = await result.json()
    return { plugin: json.collected }
  }

  render() {
    return (
      <Layout>
        <div className="plugin">
          <Markdown
            className="plugin-readme"
            source={this.props.plugin.metadata.readme}
            escapeHtml={false}
          />

          <div className="plugin-installation" id="installation">
            <h3>Installation</h3>
            <p>
              To install {this.props.plugin.metadata.name}, simply copy and
              paste the following line to your terminal, then hit <b>"Enter"</b>{' '}
              to install!
            </p>
            <code>hyper install {this.props.plugin.metadata.name}</code>
          </div>

          <PluginInfo plugin={this.props.plugin} />
        </div>

        <style jsx>{`
          .plugin {
            padding-bottom: 64px;
          }

          .plugin-installation {
            background: #111111;
            width: 100%;
            padding: 16px 32px 32px;
            margin-bottom: 64px;
          }
        `}</style>

        <style jsx global>{`
          /* Readme Heading */
          .plugin-readme h1:first-of-type {
            font-size: 1.6rem;
            font-weight: 400;
            text-align: center;
            display: block;
            margin-bottom: 16px;
          }

          /* Readme subheading */
          .plugin-readme h1:first-of-type + h2:first-of-type {
            color: #999999;
            text-align: center;
            max-width: 40rem;
            margin: 0 auto;
            margin-bottom: 32px;
            font-size: 1.2rem;
            font-weight: 400;
          }

          /* Readme image container */
          .plugin-readme h1:first-of-type + h2:first-of-type + p {
            text-align: center;
            width: 100%;
          }

          .plugin-readme h1:first-of-type + h2:first-of-type + p img {
            max-width: 100%;
            width: 600px;
            margin-bottom: 40px;
          }
        `}</style>
      </Layout>
    )
  }
}
