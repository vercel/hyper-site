import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import Highlighter from 'react-highlighter'
import Plugin from './Plugin'

export default class PluginsList extends React.Component {
  constructor(props) {
    super()

    this.orderPlugins = this.orderPlugins.bind(this)
  }

  orderPlugins(plugins, orderBy) {
    let sortedPlugins = [...plugins]

    if (orderBy === 'newest') {
      const copy = [...sortedPlugins]

      sortedPlugins = copy.sort((objA, objB) => {
        if (objA.dateAdded < objB.dateAdded) return 1
        if (objA.dateAdded > objB.dateAdded) return -1
        return 0
      })
    } else if (orderBy === 'featured') {
      sortedPlugins = sortedPlugins.filter(plugin => plugin.featured === true)
    }

    return sortedPlugins
  }

  componentDidMount() {
    // Optimization
    Router.prefetch('/plugin')
  }

  render() {
    const plugins = this.orderPlugins(this.props.plugins, this.props.filteredBy)

    // Featured boxes UI
    if (this.props.filteredBy == 'featured') {
      return (
        <div className="plugins-list container">
          {plugins.map((plugin, i) => (
            <div key={plugin.name} className="plugin">
              <Link href="/plugins/[id]" as={`/plugins/${plugin.name}`}>
                <div className="plugin-contents">
                  <Plugin
                    {...plugin}
                    query={this.props.query}
                    featured={true}
                  />
                </div>
              </Link>
            </div>
          ))}

          <style jsx>{`
            .plugins-list {
              padding-top: 48px;
              display: flex;
              flex-flow: row wrap;
            }

            .plugin {
              width: 50%;
              margin-bottom: 24px;
            }

            .plugin:nth-child(odd) {
              padding-right: 16px;
            }

            .plugin:nth-child(even) {
              padding-left: 16px;
            }

            .plugin-contents {
              cursor: pointer;
              border: 1px solid #333;
              transition: border 0.2s ease;
              border-radius: 5px;
              overflow: hidden;
            }

            .plugin:hover .plugin-contents {
              border-color: white;
            }

            @media (max-width: 48em) {
              .plugin {
                width: 100%;
                margin-bottom: 16px;
              }

              .plugin:nth-child(odd),
              .plugin:nth-child(even) {
                padding: 0;
              }
            }
          `}</style>
        </div>
      )
    }

    return (
      <div className="plugins-list">
        {plugins.map((plugin, i) => (
          <Link
            key={plugin.name}
            href="/plugins/[id]"
            as={`/plugins/${plugin.name}`}
          >
            <div className="plugin">
              <div className="plugin-contents">
                <Plugin {...plugin} query={this.props.query} featured={false} />
              </div>
            </div>
          </Link>
        ))}

        <style jsx>{`
          .plugins-list {
            padding-top: 48px;
          }

          .plugin {
            padding-bottom: 16px;
            cursor: pointer;
            transition: background 0.2s ease;
          }

          .plugin:hover {
            background: #121212;
          }

          .plugin-contents {
            padding-top: 16px;
            padding-left: 40px;
            padding-right: 40px;
          }

          .plugin:not(:first-of-type) .plugin-contents {
            border-top: 1px solid #333333;
            transition: border 0.2s ease;
          }

          .plugin:hover .plugin-contents {
            border-color: transparent;
          }

          .plugin:hover + .plugin .plugin-contents {
            border-color: transparent;
          }
        `}</style>
      </div>
    )
  }
}
