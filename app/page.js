import Footer from 'components/footer'
import { ClientDownloadButton } from './client-components'
import { Download, LogoBig } from 'components/icons'
import heroStyles from 'styles/pages/home/hero.module.css'
import contentStyles from 'styles/pages/home/content.module.css'
import installationStyles from 'styles/pages/home/installation.module.css'
import Terminal from 'components/terminal'
import Path from '../components/path'
import PathLink from '../components/path-link'
import { installationTableData } from '../lib/installation-data'

export const metadata = {
  title: 'Hyper™',
}

async function getData() {
  const res = await fetch(
    'https://api.github.com/repos/vercel/hyper/releases/latest',
    { next: { revalidate: 60 * 60 * 24 } }
  )
  
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  
  return res.json()
}

export default async function HomePage() {
  const latestRelease = await getData()
  
  return (
    <>
      {/**
       * Hero
       */}
      <div className={heroStyles.root}>
        <LogoBig className={heroStyles.logo} />
        <div className={heroStyles.terminal}>
          <Terminal />
        </div>
        <div className={heroStyles.download}>
          <ClientDownloadButton fixedWidth />
          <a className={heroStyles.other} href="#installation">
            View other platforms
          </a>
        </div>
      </div>

      {/**
       * Content
       */}
      <div className={contentStyles.root} id="content">
        {/**
         * Installation
         */}
        <h2 className={installationStyles.title} id="installation">
          <a href="#installation">Installation</a>
        </h2>
        <span>latest version: {latestRelease.tag_name}</span>
        <div className="table">
          <table className={installationStyles.table}>
            <tbody>
              <tr>
                <td className={installationStyles.invisibleTopLeft} />
                <td className={installationStyles.withSpacing}>64-bit</td>
                <td className={installationStyles.withSpacing}>arm64</td>
              </tr>
              {installationTableData.map(
                ({ os: _os, renderText, path, arm64Path }) => (
                  <tr key={_os}>
                    <td className={installationStyles.withSpacing}>
                      {renderText()}
                    </td>
                    {[path, arm64Path].map((archPath) => (
                      <td
                        key={archPath}
                        className={
                          archPath || installationStyles.withSpacing
                        }
                      >
                        {archPath ? (
                          <a
                            href={`https://releases.hyper.is/download/${archPath}`}
                          >
                            <Download
                              height={12}
                              width={16}
                              className={installationStyles.icon}
                            />
                            {latestRelease.tag_name}
                          </a>
                        ) : (
                          'N/A'
                        )}
                      </td>
                    ))}
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        {/* Rest of the content from pages/index.js */}
        {/* Project goals section */}
        <h2 id="hashtag-goals">
          <a href="#hashtag-goals">Project Goals</a>
        </h2>
        <p>
          The goal of the project is to create a beautiful and extensible
          experience for command-line interface users, built on open web
          standards. In the beginning, our focus will be primarily around speed,
          stability and the development of the correct API for extension
          authors.
        </p>
        <p>
          In the future, we anticipate the community will come up with
          innovative additions to enhance what could be the simplest, most
          powerful and well-tested interface for productivity.
        </p>

        {/* Extensions section */}
        <h2 id="extensions">
          <a href="#extensions">Extensions</a>
        </h2>
        <p>
          Extensions are available on npm. We encourage everyone to include{' '}
          <code>hyper</code> in the <code>keywords</code>
          field in <code>package.json</code>.
        </p>
        <pre>
          <code>$ npm search hyper</code>
        </pre>
        <p>
          Then edit <PathLink path=".hyper.js" type="config" /> and add
          it to <code>plugins</code>
        </p>
        <pre>
          <code>
            module.exports = {'{'}
            {'\n'}
            {'\n'}
            {'  '}config: {'{'} /*... */ {'}'},{'\n'}
            {'\n'}
            {'  '}plugins: [{'\n'}
            {'    '}
            <b>"hyperpower"</b>
            {'\n'}
            {'  '}]{'\n'}
            {'\n'}
            {'}'};
          </code>
        </pre>
        <p>
          <code>Hyper</code> will show a notification when your modules are
          installed to <PathLink path=".hyper_plugins" type="plugins" />
          .
        </p>

        {/* Remaining sections from pages/index.js */}
        {/* ... */}
      </div>
    </>
  )
}
