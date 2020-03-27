import styles from './author.module.css'
import Link from 'next/link'

export default ({ name, twitter, thumbnail }) => (
  <div className={styles.root}>
    <img
      className={styles.img}
      src={thumbnail}
      alt={`${name} profile picture`}
    />
    <div className={styles.content}>
      <span className={styles.name}>{name}</span>
      <Link href={`https://twitter.com/${twitter}`}>
        <a>@{twitter}</a>
      </Link>
    </div>
  </div>
)
