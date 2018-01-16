import react from 'react'
import Router from 'next/router'
import cachedFetch from '../lib/cached-json-fetch'
import Layout from '../components/Layout'
import PluginInfo from '../components/PluginInfo'
import getPluginInfo from '../lib/get-plugin'

export default class extends React.Component {
  static async getInitialProps({ query: { id } }) {
    let plugin, pluginPackage

    try {
      plugin = await cachedFetch(`https://api.npms.io/v2/package/${id}`)
      pluginPackage = await cachedFetch(`https://npmjs.now.sh/${id}/latest`)
    } catch (err) {
      console.error(err)
    }

    const keywords = plugin.collected.metadata.keywords || []

    if (
      !keywords.includes('hyper-plugin') &&
      !keywords.includes('hyper-theme')
    ) {
      return {}
    }

    return { plugin: plugin.collected, pluginPackage }
  }

  render() {
    if (!this.props.plugin) {
      return (
        <Layout>
          <div className="plugin__notfound">
            <span>
              Couldn't find plugin <b>{this.props.url.query.id}</b>
            </span>

            <style jsx>{`
              .plugin__notfound {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
              }
            `}</style>
          </div>
        </Layout>
      )
    }

    const pluginInfo =
      this.props.pluginPackage && this.props.pluginPackage.plugin
        ? this.props.pluginPackage.plugin
        : null

    return (
      <Layout>
        <div className="plugin">
          <h1>
            {pluginInfo ? pluginInfo.title : this.props.plugin.metadata.name}
          </h1>
          <p>
            {pluginInfo
              ? pluginInfo.caption
              : this.props.plugin.metadata.description}
          </p>
          {pluginInfo ? (
            <img src={pluginInfo.preview} alt={`${pluginInfo.title} preview`} />
          ) : null}

          <PluginInfo plugin={this.props.plugin} />
        </div>

        <style jsx>{`
          .plugin {
            padding-bottom: 64px;
            max-width: 764px;
            margin: 0 auto;
            text-align: center;
          }

          .plugin-installation {
            background: #111111;
            width: 100%;
            padding: 16px 32px 32px;
            margin-bottom: 64px;
          }

          /* Readme Heading */
          .plugin h1 {
            font-size: 1.6rem;
            font-weight: 400;
            text-align: center;
            display: block;
            margin-bottom: 16px;
            margin-top: 40px;
          }

          /* Readme subheading */
          .plugin p:first-of-type {
            color: #999999;
            text-align: center;
            max-width: 40rem;
            margin: 0 auto;
            margin-bottom: 32px;
            font-size: 1.2rem;
            font-weight: 400;
          }

          .plugin img {
            max-width: 100%;
            width: 600px;
            margin-bottom: 40px;
          }
        `}</style>

        <style jsx global>{`
          /* Readme image container */
          .plugin-readme h1:first-of-type + h2:first-of-type + p {
            text-align: center;
            width: 100%;
          }
        `}</style>
      </Layout>
    )
  }
}
