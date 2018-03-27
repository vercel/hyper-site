import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import Highlighter from 'react-highlighter'
import Plugin from './Plugin'

export default class extends React.Component {
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

  render() {
    const plugins = this.orderPlugins(this.props.plugins, this.props.filteredBy)

    return (
      <div className="plugins-list">
        {plugins.map((plugin, i) => (
          <Link
            key={plugin.name}
            href={`/plugin?id=${plugin.name}`}
            as={`/plugins/${plugin.name}`}
          >
            <div
              className="plugin"
              onMouseEnter={() => {
                Router.prefetch(
                  `/plugin?id=${plugin.name}`,
                  `/plugins/${plugin.name}`
                )
              }}
            >
              <div className="plugin-contents">
                <Plugin {...plugin} query={this.props.query} />
              </div>
            </div>
          </Link>
        ))}

        <style jsx>{`
          .plugins-list {
            padding-top: 48px;
            margin-left: -40px;
            margin-right: -40px;
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
