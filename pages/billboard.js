// import Layout from '../../components/layout'
// import Date from '../../components/date'
import React, { useState, useEffect } from 'react';
import Layout from '../components/layout'
import useSwr from 'swr'
import Link from 'next/link'
import YoutubePlayer from "../components/youtubu";
import { Container ,Button, Icon, Image, Item, Label } from 'semantic-ui-react'

const fetcher = (url) => fetch(url).then((res) =>  {
  return res.json()})

export default function Index() {
  const { data, error } = useSwr('/api/billboard', fetcher, {
    onSuccess:(data) =>{
      setVideoId(data[0].videoId)
    }
  })

  const [videoId, setVideoId] = useState();
  useEffect(() => {
    if(data !=undefined){
      // console.log(data);
      // console.log(data[0].videoId);
  
      // setVideoId(data[0].videoId);
      console.log('billboard change', videoId)
      //setVideoId(videoId)
    }

  });




  //if (error) return <div>Failed to load users</div>
  if (!data) return <div>Loading...</div>

  return (
    <Layout>
      {/* aAkMkVFwAoo */}
      {/* <Example videoId = {`${user.videoId}`}/>  */}
      <YoutubePlayer data={data} videoId={videoId}  />
      <Container style={{'maxHeight': '380px', 'overflowY':'scroll'}}>
      {data.map((user, index) => (
        <Item.Group divided onClick={() => setVideoId(user.videoId)}>
            <Item key={user._id} >
              <Item.Image src={`${user.image}`}  />
              <Item.Content>
                <Item.Header as='a'>{user.rank} {user.title}</Item.Header>
                <Item.Meta>
                  <span className='cinema'>{user.artist}</span>
                </Item.Meta>
                <Item.Description></Item.Description>
                <Item.Extra>
                  <Label>IMAX</Label>
                  <Label icon='globe' content='Additional Languages' />
                </Item.Extra>
              </Item.Content>
            </Item>
        </Item.Group>
      ))}
      </Container>
    </Layout>
  )
}