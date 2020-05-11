import { useState } from 'react'
import InstallModal from './install-modal'
import styles from './plugin-info.module.css'
import useSWR from 'swr'
import { event as gTagEvent } from 'lib/gtag'
import { GitHub } from '../icons'
import Gravatar from 'react-gravatar'
import Link from 'next/link'

export default ({ pluginName, variant }) => {
  const { data: plugin, error } = useSWR(
    `https://api.npms.io/v2/package/${pluginName}`
  )
  const [modalOpen, setModalOpen] = useState(false)

  const handleOpenModal = () => {
    gTagEvent({
      action: 'Opened install modal',
      category: 'plugin',
      label: 'open_install_modal',
      value: pluginName,
    })
    setModalOpen(true)
  }

  return (
    <>
      <InstallModal
        pluginName={pluginName}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
      <div className={styles.root}>
        {error ? (
          <span>We can't currently find information for this extension 😰</span>
        ) : !plugin ? (
          <div className={styles.author}>
            <span className={styles.avatar} />
            <span>Loading plugin information...</span>
          </div>
        ) : (
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
        )}
        &nbsp;
        {variant === 'description' ? (
          <Link href="/store/[name]/source" as={`/store/${pluginName}/source`}>
            <a className={styles.link}>view source code</a>
          </Link>
        ) : (
          <Link href="/store/[name]" as={`/store/${pluginName}`}>
            <a className={styles.link}>view description</a>
          </Link>
        )}
        {plugin && (
          <span className={styles.version}>
            Version {plugin.collected.metadata.version}
          </span>
        )}
        <a
          className={`${styles.install} ${plugin ? styles.loaded : ''}`}
          onClick={handleOpenModal}
        >
          Install
        </a>
      </div>
    </>
  )
}
