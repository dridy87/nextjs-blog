// import Layout from '../../components/layout'
// import Date from '../../components/date'
import React, { useState, useEffect } from 'react';
import useSwr from 'swr'
import Link from 'next/link'
import YoutubePlayer ,{playList} from "../components/youtubu";

const fetcher = (url) => fetch(url).then((res) =>   res.json())

export default function Index() {
  const { data, error } = useSwr('/api/billboard', fetcher)

   const [videoId, setVideoId] = useState('MS82JAkBkDY');
   useEffect(() => {
    console.log('billboard change',videoId)
    //setVideoId(videoId)
  });
 
  if (error) return <div>Failed to load users</div>
  if (!data) return <div>Loading...</div>

  return (
    <ul>
{/* aAkMkVFwAoo */}
      {/* <Example videoId = {`${user.videoId}`}/>  */}
      <YoutubePlayer videoId = {videoId}/> 
      {data.map((user, index) => (
        <li key={user._id} onClick={()=>setVideoId(user.videoId)}>
          
          {/* <Example videoId = {`${user.videoId}`}/>   */}
          <img
              src={`${user.image}`}
              // className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
              // alt={name}
            />
          

          <Link href="/user/[id]" as={`/user/${user.id}`}>
            <a>{`${user.title}`}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}