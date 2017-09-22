import Plugin from './Plugin'

export default ({ plugins }) => (
  <div className="plugins-list">
    {
      plugins.map((plugin, i) => (
        <div key={ plugin.package.name } className="plugin">
          <Plugin {...plugin.package} />
        </div>
      ))
    }

    <style jsx>{`
      .plugins-list {
        padding-top: 48px;
      }

      .plugin:not(:last-of-type) {
        border-bottom: 1px solid #333333;
        margin-bottom: 16px;
      }
    `}</style>
  </div>
)
