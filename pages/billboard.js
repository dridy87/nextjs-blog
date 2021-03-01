// import Layout from '../../components/layout'
// import Date from '../../components/date'
import React, { useState, useEffect } from 'react';
import Layout from '../components/layout'
import useSwr, { mutate } from 'swr'
import Link from 'next/link'
import YoutubePlayer from "../components/youtubu";
import { Container ,Button, Icon, Image, Item, Label } from 'semantic-ui-react'

import { createStore, combineReducers}  from 'redux'
import timelineReducer, {
  addTimeline,
  removeTimeline,
  editTimeline,
  increaseNextPage,
} from '../timeline/state';
import friendReducer, {
  addFriend,
  removeFriend,
  editFriend,
} from '../friend/state';

import youtubuReducer, {
   setData,
   setYoutubuID
} from '../youtubu/state';


const reducer = combineReducers({
  timeline: timelineReducer,
  friend: friendReducer,
  youtubu: youtubuReducer
});
export const store = createStore(reducer);
store.subscribe(() => {
  const state = store.getState();
  console.log(state);
});

// store.dispatch(addTimeline({ id: 1, desc: '코딩은 즐거워' }));
// store.dispatch(addTimeline({ id: 2, desc: '리덕스 좋아' }));
// store.dispatch(increaseNextPage());
// store.dispatch(editTimeline({ id: 2, desc: '리덕스 너무 좋아' }));
// store.dispatch(removeTimeline({ id: 1, desc: '코딩은 즐거워' }));

// store.dispatch(addFriend({ id: 1, name: '아이유' }));
// store.dispatch(addFriend({ id: 2, name: '손나은' }));
// store.dispatch(editFriend({ id: 2, name: '수지' }));
// store.dispatch(removeFriend({ id: 1, name: '아이유' }));



const fetcher = (url) => fetch(url).then((res) =>  {
  console.log('왜 자꾸 실행됨')
  return res.json()
 
})

let isFirst = false;

export default function Index() {
  const { data, error } = useSwr('/api/billboard', fetcher, {
    onSuccess:(data) =>{
      //setVideoId(data[0].videoId)
       
      if(isFirst == false){
        store.dispatch(setData({youtubuList: data}))
        store.dispatch(setYoutubuID({currentID: data[0].videoId}))
        isFirst = true
      }
      

    }
  })

  const [videoId, setVideoId] = useState();
  // useEffect(() => {
  //   if(data !=undefined){
  //     // console.log(data);
  //     // console.log(data[0].videoId);
  
  //     // setVideoId(data[0].videoId);
  //     console.log('billboard change', videoId)
  //     //setVideoId(videoId)
  //   }

  // });

  function onClick(e){
    console.log(e);
    setVideoId(e)
    store.dispatch(setYoutubuID({currentID : e}))
  }



  //if (error) return <div>Failed to load users</div>
  if (!data) return <div>Loading...</div>

  return (
    <Layout>
      {/* aAkMkVFwAoo */}
      {/* <Example videoId = {`${user.videoId}`}/>  */}
      <div style={{'text-align': 'center'}}>
      <YoutubePlayer videoId={videoId} />
      </div>
      <Container style={{'maxHeight': '380px', 'overflowY':'scroll'}}>
      {data.map((user, index) => (
        <Item.Group divided onClick={() => {
          //setVideoId(user.videoId)
          onClick(user.videoId);
        }}>
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