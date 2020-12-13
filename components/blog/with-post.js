import { MDXProvider } from '@mdx-js/react'
import NextLink from 'next/link'
import styles from './with-post.module.css'
import Page from 'components/page'
import Author from './author'

const Video = ({ src, caption, oversize }) => (
  <figure>
    <video
      src={src}
      loop
      muted
      autoPlay
      playsInline
      className={oversize ? styles.oversize : null}
    />
    {caption && <figcaption>{caption}</figcaption>}
  </figure>
)

const Image = ({ src, caption, oversize, ...props }) => (
  <figure>
    <img src={src} className={oversize ? styles.oversize : null} {...props} />
    {caption && <figcaption>{caption}</figcaption>}
  </figure>
)

const Link = ({ href, children }) => {
  const IS_INTERNAL = /^\/(?!\/)/.test(href)

  if (IS_INTERNAL)
    return (
      <NextLink href={href}>
        <a className={styles.link}>{children}</a>
      </NextLink>
    )

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.link}
    >
      {children}
    </a>
  )
}

const components = {
  Image,
  Video,
  a: Link,
}

export default (meta) => ({ children }) => (
  <Page
    title={meta?.metaTitle}
    description={meta?.metaDescription}
    image={meta?.metaImage}
  >
    <div className={styles.root}>
      <div className={styles.header}>
        <h1>{meta.title}</h1>
        {meta.authors && (
          <div className={styles.authors}>
            {meta.authors.map((author, i) => (
              <Author key={i} {...author} />
            ))}
          </div>
        )}
      </div>

      <MDXProvider components={components}>
        <div className={styles.post}>{children}</div>
      </MDXProvider>
    </div>
  </Page>
)
