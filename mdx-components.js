'use client'

import { MDXProvider } from '@mdx-js/react'
import NextLink from 'next/link'
import Author from 'components/blog/author'
import styles from 'components/blog/with-post.module.css'

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
      <NextLink href={href} className={styles.link}>
        {children}
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

export function useMDXComponents(components) {
  return {
    Image,
    Video,
    a: Link,
    ...components,
  }
}
