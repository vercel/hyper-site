# Next.js App Router Migration

This repository has been migrated from Next.js Pages Router to App Router.

## Migration Details

- Updated Next.js from 13.0.5 to 14.1.0
- Created app directory structure to replace pages directory
- Converted getStaticProps/getStaticPaths to Server Components with generateStaticParams
- Added 'use client' directives to client components
- Updated metadata handling from Next/head to metadata objects
- Implemented Google Tag Manager using @next/third-parties
- Added mdx-components.js for MDX content rendering

## File Structure Changes

Pages Router (old) | App Router (new)
------------------- | ----------------
/pages/index.js | /app/page.js
/pages/blog/index.mdx | /app/blog/page.js and /app/blog/page.mdx
/pages/plugins/index.js | /app/plugins/page.js
/pages/plugins/newest.js | /app/plugins/newest/page.js
/pages/themes/index.js | /app/themes/page.js
/pages/themes/newest.js | /app/themes/newest/page.js
/pages/store/[name]/index.js | /app/store/[name]/page.js
/pages/store/[name]/source.js | /app/store/[name]/source/page.js
/pages/store/security-notice.mdx | /app/store/security-notice/page.js
/pages/store/submit.mdx | /app/store/submit/page.js
/pages/_app.js | /app/layout.js
/pages/_document.js | /app/layout.js

## Global Functionality Migration

- SearchContext Provider → Moved to app/search-provider.js
- Google Tag Manager → Implemented using @next/third-parties
- Navigation Progress → Implemented using a custom ProgressBar component
- Metadata → Migrated to metadata export objects in layout.js and page files
