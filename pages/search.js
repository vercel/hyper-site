import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'

const Search = () => {
  const router = useRouter()
  const { q } = router.query

  return (
    <div>
      <Head>
        {q ? (
          <title>Hyper Store - Search for "{q}"</title>
        ) : (
          <title>Hyper Store - No search term</title>
        )}
      </Head>
      <Layout query={q}>
        {!q && (
          <div className="search__error">
            Please enter a search term to find a plugin or theme
          </div>
        )}
        <style jsx>{`
          .search__error {
            width: 100%;
            text-align: center;
            height: calc(100vh - 122px);
            min-height: 124px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.4rem;
          }
        `}</style>
      </Layout>
    </div>
  )
}

export default Search
