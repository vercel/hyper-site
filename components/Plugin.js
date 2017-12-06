import Link from 'next/link'

export default ({ name, description }) => (
  <div className="plugin">
    <div className="plugin__content">
      <h4 className="plugin__name">{name}</h4>
      <p className="plugin__description">{description}</p>
    </div>

    <style jsx>{`
      .plugin {
        display: flex;
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
    `}</style>
  </div>
)
