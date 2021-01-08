// import Layout from '../../components/layout'
// import Date from '../../components/date'
import React, { useState, useEffect } from 'react';
import Layout from '../components/layout'
import useSwr from 'swr'
import Link from 'next/link'
import YoutubePlayer from "../components/youtubu";
import { Container, Button, Icon, Image, Item, Label } from 'semantic-ui-react'
import axios from 'axios';

const fetcher = (url) => fetch(url).then((res) => {
  return res.json()
})

export default function Index(ddd) {

  const { data, error } = useSwr('/api/billboard', fetcher, {
    onSuccess: (data) => {

      console.log(data)
      // data = data.forEach(element => {
      //   element.inventory_docs.push({like:'red'})
      // });
      setVideoId(data[0].videoId)
      setList(data);
    }
  })

  const [list, setList] = useState();
  const [videoId, setVideoId] = useState();
  const [count, setCount] = useState(0);


  function onClick(e) { 
    var t = list.find(t=>t.rank == e.rank);
    
    if(t.inventory_docs.length == 0) {
      t.inventory_docs.push({'YN': ''})
    }
    t.inventory_docs[0].YN = t.inventory_docs[0].YN == 'red' ? '' : 'red';

    setCount(count + 1)

      axios.post(`/api/billboard/${t._id}`, {
        id: t._id,
        videoId: t.videoId,
        YN: t.inventory_docs[0].YN
      });
    
  }

  //if (error) return <div>Failed to load users</div>
  if (!data) return <div>Loading...</div>

  return (
    <Layout>
      {/* aAkMkVFwAoo */}
      {/* <Example videoId = {`${user.videoId}`}/>  */}
      
      <div style={{display:"none"}}>{count}</div>
      <YoutubePlayer data={list} videoId={videoId} />
      <Container style={{ 'maxHeight': '380px', 'overflowY': 'scroll' }}>
        {list.map((user, index) => (
          <Item.Group divided >
            <Item key={user._id} >
              <Item.Image src={`${user.image}`} />
              <Item.Content>
                <Item.Header as='a' onClick={() => {
                  setVideoId(user.videoId)
                  
                }}>{user.rank} {user.title}</Item.Header>
                

                  {user.inventory_docs.length > 0 
                  ?  
                  <Item.Meta>
                  <Button as='div' labelPosition='right'>
                  
                    <Button color={user.inventory_docs[0].YN} onClick={() => {
                      onClick(user);
                    }} >
                      <Icon name='heart' />
                      Like
                    </Button>
                    <Label as='a' basic color='red' pointing='left'>
                      2,048
                    </Label>
                  </Button>
                  <span className='cinema'>{user.artist}</span>
                </Item.Meta> 
                : 
                <Item.Meta>
                  <Button as='div' labelPosition='right'>
                  
                    <Button color={user.YN} onClick={() => {
                      onClick(user);
                    }} >
                      <Icon name='heart' />
                      Like
                    </Button>
                    <Label as='a' basic color='red' pointing='left'>
                      2,048
                    </Label>
                  </Button>
                  <span className='cinema'>{user.artist}</span>
                </Item.Meta>}
                
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


// This gets called on every request
export async function getServerSideProps() {


  console.log('getServerSideProps')
  
  // Pass data to the page via props
  return { props: { 'data': 123 } }
}