import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Page from '../../../components/Page'
import PluginInfo from '../../../components/PluginInfo'
import plugins from '../../../plugins.json'

const Plugin = ({ plugin }) => {
  const router = useRouter()

  if (!plugin) {
    return (
      <Page>
        <div className="plugin__notfound">
          <span>
            Couldn't find plugin <b>{router.query.id}</b>
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
      </Page>
    )
  }

  return (
    <Page>
      <Head>
        <title>Hyper Store - {plugin.name}</title>
        <meta property="og:title" content={`Hyper Store - ${plugin.name}`} />
        <meta property="og:type" content="website" />
        {typeof window === 'object' ? (
          <meta property="og:url" content={window.location.href} />
        ) : null}
        <meta property="og:image" content={plugin.preview} />
        <meta property="og:description" content={plugin.description} />
        <meta property="og:site_name" content="Hyper Store" />
      </Head>
      <div className="plugin">
        <h1>{plugin ? plugin.name : plugin.collected.metadata.name}</h1>
        <p>
          {plugin ? plugin.description : plugin.collected.metadata.description}
        </p>
        {plugin ? (
          <img src={plugin.preview} alt={`${plugin.title} preview`} />
        ) : null}

        <PluginInfo plugin={plugin} />
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
    </Page>
  )
}

Plugin.getInitialProps = ({ res, query: { id } }) => {
  if (res) {
    res.setHeader('Cache-Control', 's-maxage=7200, stale-while-revalidate')
  }

  const plugin = id && plugins.find(p => p.name === id)

  return plugin ? { plugin } : {}
}

export default Plugin
