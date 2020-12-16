import Head from "next/head";
import Layout from '../../components/layout'
import Date from '../../components/date'
import { getAllPostIds, getPostData } from '../../lib/posts'

export default function Post({ postData }) {
  
  return (
    <Layout>
      <Head>
        {/* <title>{postData.title}</title> */}
      </Head>

      {/* {postData.title} */}
      <br />
      {postData.id}
      <br />
      {postData.date}
      <br />
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />

       <Date dateString={postData.date} />
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps({ params }) {
  console.log(params)
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}