import { useState, useEffect } from 'react'
import Link from 'next/link'
import Plugin from '../Plugin'
import styles from './plugin-list.module.css'

export default ({ query, plugins, filteredBy }) => {
  const [sortedPlugins, setSortedPlugins] = useState(plugins)

  useEffect(() => {
    if (filteredBy === 'newest') {
      setSortedPlugins(
        [...plugins].sort((objA, objB) => {
          if (objA.dateAdded < objB.dateAdded) return 1
          if (objA.dateAdded > objB.dateAdded) return -1
          return 0
        })
      )
    }
    if (filteredBy === 'featured') {
      setSortedPlugins(plugins.filter(plugin => plugin.featured === true))
    }
  }, [filteredBy])

  if (filteredBy === 'featured') {
    return (
      <div className={styles.featuredWrapper}>
        {sortedPlugins.map(plugin => (
          <div key={plugin.name} className={styles.featuredElemContainer}>
            <Link href="/plugins/[id]" as={`/plugins/${plugin.name}`}>
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
          href="/plugins/[id]"
          as={`/plugins/${plugin.name}`}
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
