'use client'

import Link from 'next/link'
import Plugin from '../plugin'
import styles from './plugin-list.module.css'

export default ({ query, plugins, filteredBy }) =>
  filteredBy === 'featured' ? (
    <div className={styles.featuredWrapper}>
      {plugins.map((plugin) => (
        <Link
          key={plugin.name}
          href={`/store/${plugin.name}`}
          className={styles.featuredElemContent}
        >
          <Plugin {...plugin} query={query} featured={true} />
        </Link>
      ))}
    </div>
  ) : (
    <div className={styles.listWrapper}>
      {plugins.map((plugin) => (
        <Link
          key={plugin.name}
          href={`/store/${plugin.name}`}
          className={styles.listElemContainer}
        >
          <div className={styles.listElemContent}>
            <Plugin {...plugin} query={query} featured={false} />
          </div>
        </Link>
      ))}
    </div>
  )
