import Highlighter from 'react-highlighter'
import styles from './plugin.module.css'

const MAX_COLORS = 4

export default ({ featured, name, description, colors, preview, query }) =>
  featured ? (
    <div
      className={styles.featured}
      style={{ backgroundImage: `url(${preview})` }}
    >
      <div className={styles.featuredContent}>
        <h4>{name}</h4>
        <p>{description}</p>
        {colors && (
          <div className={styles.colors}>
            {colors.slice(0, MAX_COLORS).map((color, i) => (
              <span style={{ background: color }} key={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className={styles.listContent}>
      <div>
        <h4 className={styles.listName}>
          {query ? (
            <Highlighter matchClass={styles.highlight} search={query}>
              {name}
            </Highlighter>
          ) : (
            name
          )}
        </h4>
        <p className={styles.listDescription}>
          {query ? (
            <Highlighter matchClass={styles.highlight} search={query}>
              {description}
            </Highlighter>
          ) : (
            description
          )}
        </p>
      </div>
      {colors && (
        <div className={styles.colors}>
          {colors.slice(0, MAX_COLORS).map((color, i) => (
            <span style={{ background: color }} key={i} />
          ))}
        </div>
      )}
    </div>
  )
