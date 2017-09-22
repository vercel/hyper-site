import Meta from './Meta'
import Header from './Header'

export default ({children}) => (
  <div className="main">
    <Meta />
    <Header />

    <div className="page">
      { children }
    </div>

    <style jsx>{`
      .main {
        padding-left: 40px;
        padding-right: 40px;
      }
    `}</style>
  </div>
)
