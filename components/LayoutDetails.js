import Meta from './Meta'

export default ({ children }) => (
  <div className="main">
    <Meta />

    <div className="page">{children}</div>

    <style jsx>{`
      .main {
        padding-left: 40px;
        padding-right: 40px;
      }
    `}</style>
  </div>
)
