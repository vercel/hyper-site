import { useState } from 'react'
import InstallModal from './install-modal'
import styles from './plugin-info.module.css'
import { event as gTagEvent } from 'lib/gtag'
import { GitHub } from '../icons'
import Gravatar from 'react-gravatar'
import Link from 'next/link'

export default ({ npmData: plugin, variant }) => {
  const [modalOpen, setModalOpen] = useState(false)

  const handleOpenModal = () => {
    gTagEvent({
      action: 'Opened install modal',
      category: 'plugin',
      label: 'open_install_modal',
      value: plugin.collected.metadata.name,
    })
    setModalOpen(true)
  }

  return (
    <>
      <InstallModal
        pluginName={plugin.collected.metadata.name}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
      <div className={styles.root}>
        <>
          <div className={`${styles.author} ${styles.borderFollowed}`}>
            <Gravatar
              className={styles.avatar}
              email={plugin.collected.metadata.publisher.email}
            />
            <span>{plugin.collected.metadata.publisher.username}</span>
          </div>
          <span className={`${styles.downloads} ${styles.borderFollowed}`}>
            {plugin.collected.npm.downloads[2].count > 0 ? (
              <>
                {plugin.collected.npm.downloads[2].count.toLocaleString()}{' '}
                downloads in the last month
              </>
            ) : (
              <>Brand new!</>
            )}
          </span>
          <a
            href={plugin.collected.metadata.links.repository}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.github}
          >
            <GitHub size={14} />
          </a>
        </>
        {variant === 'description' ? (
          <Link
            href="/store/[name]/source"
            as={`/store/${plugin.collected.metadata.name}/source`}
          >
            <a className={styles.link}>view source code</a>
          </Link>
        ) : (
          <Link
            href="/store/[name]"
            as={`/store/${plugin.collected.metadata.name}`}
          >
            <a className={styles.link}>view description</a>
          </Link>
        )}
        <span className={styles.version}>
          Version {plugin.collected.metadata.version}
        </span>
        <a
          className={`${styles.install} ${styles.loaded}`}
          onClick={handleOpenModal}
        >
          Install
        </a>
      </div>
    </>
  )
}
