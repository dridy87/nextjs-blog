// import Layout from '../../components/layout'
// import Date from '../../components/date'
import React, { useState, useEffect } from 'react';
import Layout from '../components/layout'
import useSwr from 'swr'
import Link from 'next/link'
import YoutubePlayer from "../components/youtubu";
import { Container, Button, Icon, Image, Item, Label } from 'semantic-ui-react'

const fetcher = (url) => fetch(url).then((res) => {
    return res.json()
})

export default function Index() {
    const { data, error } = useSwr('/api/humorbooks', fetcher, {
        onSuccess: (data) => {
            console.log(data);
        }
    })

    const [videoId, setVideoId] = useState();
    useEffect(() => {
        if (data != undefined) {
            // console.log(data);
            // console.log(data[0].videoId);

            // setVideoId(data[0].videoId);
            console.log('billboard change', videoId)
            //setVideoId(videoId)
        }

    });

    function onClick(e) {
        console.log(e);
    }



    //if (error) return <div>Failed to load users</div>
    if (!data) return <div>Loading...</div>


    return (
        <Layout>
            {/* aAkMkVFwAoo */}
            {/* <Example videoId = {`${user.videoId}`}/>  */}
            {/* <YoutubePlayer data={data} videoId={videoId}  /> */}
            <Container style={{ 'maxHeight': '380px', 'overflowY': 'scroll' }}>
                {data.map((user, index) => (
                    <div key={user._pid}>
                    <Link href={`/humorbook/${encodeURIComponent(user.pid)}`}>{user.title}</Link>
                    {user.pid}
                    </div>
                ))}
            </Container>
        </Layout>
    )
}