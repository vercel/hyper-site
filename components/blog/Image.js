import React, { Component } from 'react'
import PropTypes from 'prop-types'

// This component might look a little complex
// because one could argue that keeping the aspect ratio
// of an image can be solved with `height: auto`,
// but it's actually not that easy if you want to prevent
// element flickering

// Because if you want to do that, you need to set the aspect
// ratio of the image's container BEFORE the image loads

class Image extends Component {
  constructor(props) {
    super(props)
  }

  static defaultProps = {
    lazy: true
  }

  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  }

  state = {
    src: this.props.src
  }

  render() {
    const {
      caption,
      height,
      margin = 40,
      width,
      captionSpacing = null,
      oversize = true,
      borderRadius = false,
      children
    } = this.props

    const aspectRatio = String((height / width) * 100) + '%'
    const classes = width > 650 && oversize ? 'oversize' : ''

    return (
      <figure className={classes}>
        <main style={{ width }}>
          <div className="container" style={{ paddingBottom: aspectRatio }}>
            {this.state.src ? (
              <img
                decoding="async"
                loading="lazy"
                src={this.state.src || null}
              />
            ) : (
              children
            )}
          </div>

          {caption && (
            <p style={captionSpacing ? { marginTop: captionSpacing } : {}}>
              {caption}
            </p>
          )}
        </main>

        <style jsx>{`
          figure {
            display: block;
            text-align: center;
            margin: ${margin}px 0;
          }

          main {
            margin: 0 auto;
            max-width: 100%;
          }

          div {
            position: relative;
          }

          img {
            height: 100%;
            left: 0;
            position: absolute;
            top: 0;
            width: 100%;
            ${borderRadius ? `border-radius: 5px;` : ''};
          }

          .container {
            display: flex;
            justify-content: center;
          }

          p {
            color: #999;
            font-size: 12px;
            margin: 0;
            text-align: center;
          }

          @media (min-width: 992px) {
            figure.oversize {
              width: ${width}px;
              margin: ${margin}px 0 ${margin}px
                calc(((${width}px - 650px) / 2) * -1);
            }
          }
        `}</style>
      </figure>
    )
  }
}

export const Video = props => <Image {...props} video />

export default Image
