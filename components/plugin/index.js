import Highlighter from 'react-highlighter'
import styles from './plugin.module.css'
import Image from 'next/image'

const MAX_COLORS = 4

export default ({ featured, name, description, colors, preview, query }) =>
  featured ? (
    <div className={styles.featured}>
      {preview.isGIF ? (
        <img
          src={preview.src}
          alt={`${name}'s preview image`}
          className={styles.image}
        />
      ) : (
        <Image
          src={preview.src}
          alt={`${name}'s preview image`}
          objectFit="cover"
          layout="responsive"
          objectPosition="center top"
          width={preview.width}
          height={preview.height}
        />
      )}

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
