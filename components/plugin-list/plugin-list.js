import Link from 'next/link'
import Plugin from '../Plugin'
import styles from './plugin-list.module.css'

export default ({ query, plugins, filteredBy }) => {
  const sortedPlugins =
    filteredBy === 'newest'
      ? [...plugins].sort((objA, objB) => {
          if (objA.dateAdded < objB.dateAdded) return 1
          if (objA.dateAdded > objB.dateAdded) return -1
          return 0
        })
      : filteredBy === 'featured'
      ? plugins.filter(plugin => plugin.featured === true)
      : plugins

  if (filteredBy === 'featured') {
    return (
      <div className={styles.featuredWrapper}>
        {sortedPlugins.map(plugin => (
          <div key={plugin.name} className={styles.featuredElemContainer}>
            <Link href="/store/[name]" as={`/store/${plugin.name}`}>
              <a className={styles.featuredElemContent}>
                <Plugin {...plugin} query={query} featured={true} />
              </a>
            </Link>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={styles.listWrapper}>
      {sortedPlugins.map(plugin => (
        <Link
          key={plugin.name}
          href="/store/[name]"
          as={`/store/${plugin.name}`}
        >
          <a className={styles.listElemContainer}>
            <div className={styles.listElemContent}>
              <Plugin {...plugin} query={query} featured={false} />
            </div>
          </a>
        </Link>
      ))}
    </div>
  )
}
