import Link from 'next/link'

export default ({
  name,
  description,
  version,
  keywords,
  links,
  publisher,
  maintainers
}) => (
  <div className="plugin">
    <div className="plugin__content">
      <a href={links.homepage} target="_blank">
        <h4 className="plugin__name">{name}</h4>
      </a>
      <p className="plugin__description">{description}</p>
    </div>

    <div className="plugin__options" />

    <style jsx>{`
      .plugin {
        padding-bottom: 16px;
        display: flex;
      }

      .plugin__name {
        font-size: 16px;
        font-size: 1.6rem;
        font-weight: 400;
        margin-bottom: 4px;
      }

      .plugin__description {
        font-size: 12px;
        font-size: 1.2rem;
        color: #999999;
      }

      .plugin__options {
        margin-left: auto;
        display: flex;
        align-items: center;
      }
    `}</style>
  </div>
)
