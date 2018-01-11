import React from 'react'
import getPluginInfo from '../lib/get-plugin'

export default class extends React.Component {
  async componentDidMount() {
    const plugin = await getPluginInfo(this.props.name)
    if (
      !window.__HYPER_PLUGINS__ ||
      !window.__HYPER_PLUGINS__[this.props.name]
    ) {
      // If package information doesn't exist, get it from npm
      this.setState({
        plugin
      })

      window.__HYPER_PLUGINS__ = window.__HYPER_PLUGINS__ || {}
      window.__HYPER_PLUGINS__[this.props.name] = { ...this.state.plugin }
    } else {
      // If the package exists, re-assign it to the state for use in the UI
      this.setState({
        plugin: window.__HYPER_PLUGINS__[this.props.name]
      })
    }

    // Preload image from plugin source ready for page transition
    new Image().src = plugin.plugin.preview
  }

  render() {
    return (
      <div className="plugin">
        <div className="plugin__content">
          <div className="plugin__left">
            <h4 className="plugin__name">{this.props.name}</h4>
            <p className="plugin__description">{this.props.description}</p>
          </div>
          {this.state &&
          this.state.plugin &&
          this.state.plugin.plugin &&
          this.state.plugin.plugin.colors ? (
            <div className="plugin__colors">
              {this.state.plugin.plugin.colors.map((color, i) => (
                <div className="plugin__color" style={{ background: color }} />
              ))}
            </div>
          ) : null}
        </div>

        <style jsx>{`
          .plugin {
            display: flex;
          }

          .plugin__content {
            display: flex;
            align-items: center;
            width: 100%;
          }

          .plugin__name {
            font-size: 1.6rem;
            font-weight: 400;
            margin-bottom: 4px;
          }

          .plugin__description {
            font-size: 1.2rem;
            color: #999999;
          }

          .plugin__colors {
            display: flex;
            margin-left: auto;
          }

          .plugin__color {
            width: 12px;
            height: 12px;
            border-radius: 50%;
          }

          .plugin__color:not(:last-child) {
            margin-right: 4px;
          }

          h4,
          p {
            margin: 0;
          }
        `}</style>
      </div>
    )
  }
}
