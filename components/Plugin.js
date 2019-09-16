import Highlighter from 'react-highlighter'

const Plugin = ({ featured, name, description, colors, preview, query }) => {
  if (featured) {
    return (
      <div className="plugin">
        <div className="plugin__content">
          <h4 className="plugin__name">{name}</h4>
          <p>{description}</p>
          {colors ? (
            <div className="plugin__colors">
              {colors.map((color, i) => (
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
              height: 200px;
              background: url('${preview}') top center/cover no-repeat;
              position: relative;
            }

            .plugin__content {
              position: absolute;
              bottom: 0;
              padding: 48px 16px 16px;
              background-image: linear-gradient(-180deg, rgba(0,0,0,0.00) 0%, #000000 100%);
              width: 100%;
            }

            .plugin__content h4 {
              margin-top: 0;
              margin-bottom: 4px;
              font-size: 1.6rem;
              font-weight: 400;
            }

            .plugin__content p {
              margin-bottom: 0;
              font-size: 1.2rem;
              color: #999999;
            }

            .plugin__colors {
              margin-top: 4px;
              display: flex;
              margin-left: auto;
            }

            .plugin__color {
              width: 12px;
              height: 12px;
              border-radius: 50%;
              border: 1px solid #333333;
            }

            .plugin__color:not(:last-child) {
              margin-right: 4px;
            }
          `}</style>
      </div>
    )
  }

  return (
    <div className="plugin container">
      <div className="plugin__content container">
        <div className="plugin__left">
          <h4 className="plugin__name">
            {query ? (
              <Highlighter search={query}>{name}</Highlighter>
            ) : (
              <span>{name}</span>
            )}
          </h4>
          <p className="plugin__description">
            {query ? (
              <Highlighter search={query}>{description}</Highlighter>
            ) : (
              description
            )}
          </p>
        </div>
        {colors ? (
          <div className="plugin__colors">
            {colors.map((color, i) => (
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

        .plugin__content :global(.highlight) {
          background: yellow;
          color: #000000;
          padding-left: 4px;
          padding-right: 4px;
          font-weight: 400;
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
          border: 1px solid #333333;
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

export default Plugin
