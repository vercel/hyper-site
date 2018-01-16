import React from 'react'
import getPluginInfo from '../lib/get-plugin'

export default class extends React.Component {
  async componentWillMount() {
    const plugin = await getPluginInfo(this.props.name)

    this.setState({
      plugin
    })

    // Preload image from plugin source ready for page transition
    if (plugin.plugin) {
      new Image().src = plugin.plugin.preview
    }
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
                <div
                  className="plugin__color"
                  style={{ background: color }}
                  key={i}
                />
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
