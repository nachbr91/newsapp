import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import PageLayout from '../components/PageLayout'

import styles from '../styles/Home.module.css'

export default function Home({ articles }) {
  return (
    <PageLayout title="NewsApp - Home">
      <div className={styles.container}>
        {articles.length === 0 && <p>No tenemos artículos</p>}
        {articles.length > 0 &&
          articles.map((article, index) => (
            <article key={index}>
              <img
                src={article.urlToImage}
                alt={`Image for the article ${article.title}`}
              />
              <h2>{article.title}</h2>
              <p>{article.description}</p>
            </article>
          ))}
      </div>
    </PageLayout>
  )
}

export async function getServerSideProps() {
  const response = await fetch(
    'https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=b5dbd67693af4df080df4680eb8b164b'
  )
  const { articles } = await response.json()
  return {
    props: {
      articles,
    },
  }
}
