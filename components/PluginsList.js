import React from 'react'
import Plugin from './Plugin'
import {
  plugins as featuredPlugins,
  themes as featuredThemes
} from '../featured.json'

export default class extends React.Component {
  constructor(props) {
    super()

    this.orderPlugins = this.orderPlugins.bind(this)
  }

  orderPlugins(plugins, orderBy) {
    let sortedPlugins

    if (orderBy === 'newest') {
      const copy = [...plugins]

      sortedPlugins = copy.sort((objA, objB) => {
        if (objA.package.date < objB.package.date) return 1
        if (objA.package.date > objB.package.date) return -1
        return 0
      })
    } else if (orderBy === 'featured') {
      sortedPlugins = plugins.filter(
        plugin =>
          featuredPlugins.includes(plugin.package.name) ||
          featuredThemes.includes(plugin.package.name)
      )
    }

    return sortedPlugins || plugins
  }

  render() {
    const plugins = this.orderPlugins(this.props.plugins, this.props.filteredBy)

    return (
      <div className="plugins-list">
        {plugins.map((plugin, i) => (
          <div key={plugin.package.name} className="plugin">
            <div className="plugin-contents">
              <Plugin {...plugin.package} />
            </div>
          </div>
        ))}

        <style jsx>{`
          .plugins-list {
            padding-top: 48px;
            margin-left: -40px;
            margin-right: -40px;
          }

          .plugin {
            padding: 0 40px;
            padding-bottom: 16px;
            cursor: pointer;
          }

          .plugin:hover {
            background: #121212;
          }

          .plugin-contents {
            padding-top: 16px;
          }

          .plugin:not(:first-of-type) .plugin-contents {
            border-top: 1px solid #333333;
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
