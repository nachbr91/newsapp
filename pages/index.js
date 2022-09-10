import Image from 'next/image'

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
              <Image
                width={450}
                height={300}
                layout="responsive"
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

const API_KEY = process.env.API_KEY

// Llamada a API renderizando info desde el servidor
// Se utiliza para datos que necesitas que sean MUY live
// ó tiene demasiados datos dinámicos
// N request --> se ejecuta N veces

// export async function getServerSideProps() {
//   const response = await fetch(
//     `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${API_KEY}`
//   )
//   const { articles } = await response.json()
//   return {
//     props: {
//       articles,
//     },
//   }
// }

// Nos permite crear páginas estáticas en la app
// Prerenderiza la página entera con la info que creamos aquí
// N requets --> se ejecuta 1 vez en build time (o para refrescar la página)

export async function getStaticProps() {
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${API_KEY}`
  )
  const { articles } = await response.json()
  return {
    props: {
      articles,
    },
  }
}
