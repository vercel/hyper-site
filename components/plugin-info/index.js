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
      value: plugin.name,
    })
    setModalOpen(true)
  }

  return <>
    <InstallModal
      pluginName={plugin.name}
      open={modalOpen}
      onClose={() => setModalOpen(false)}
    />
    <div className={styles.root}>
      <>
        <div className={`${styles.author} ${styles.borderFollowed}`}>
          <Gravatar
            className={styles.avatar}
            email={plugin.publisher.email}
          />
          <span>{plugin.publisher.username}</span>
        </div>
        <span className={`${styles.downloads} ${styles.borderFollowed}`}>
          {plugin.downloads > 0 ? (
            <>
              {plugin.downloads.toLocaleString()}{' '}
              downloads in the last month
            </>
          ) : (
            <>Brand new!</>
          )}
        </span>
        <a
          href={plugin.links.repository}
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
          as={`/store/${plugin.name}/source`}
          className={styles.link}>
          view source code
        </Link>
      ) : (
        <Link
          href="/store/[name]"
          as={`/store/${plugin.name}`}
          className={styles.link}>
          view description
        </Link>
      )}
      <span className={styles.version}>
        Version {plugin.version}
      </span>
      <a
        className={`${styles.install} ${styles.loaded}`}
        onClick={handleOpenModal}
      >
        Install
      </a>
    </div>
  </>;
}
