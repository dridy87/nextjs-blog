import Head from 'next/head'
//import Layout, { siteTitle } from '../components/layout'
import Layout, { siteTitle } from '../components/layout'
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import Date from "../components/date";
import utilStyles from '../styles/utils.module.css'
import 'semantic-ui-css/semantic.min.css'
import { getSortedPostsData } from "../lib/posts";
export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

export default function Home({ allPostsData}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
       
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${encodeURIComponent(id)}`}>{title}</Link> 
              <br />
              id:{id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>
    </Layout>

    
  )
}
