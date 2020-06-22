import styles from './author.module.css'

export default ({ name, twitter, thumbnail }) => (
  <div className={styles.root}>
    <img
      className={styles.img}
      src={thumbnail}
      alt={`${name} profile picture`}
    />
    <div className={styles.content}>
      <span className={styles.name}>{name}</span>
      <a
        href={`https://twitter.com/${twitter}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        @{twitter}
      </a>
    </div>
  </div>
)
