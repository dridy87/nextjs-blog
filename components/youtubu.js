
import YouTube from 'react-youtube';
import React, { useState, useEffect } from 'react';
import useSwr from 'swr'
import { store } from "../pages/billboard";

const videoIdA = 'XxVg_s8xAms';
const videoIdB = '-DX3vJiqxm4';

let videoIdaaa = '';

export default function Example(props) {


  // const [videoId, setVideoId] = useState(props.videoId);
  const [player, setPlayer] = useState(null);
  const [isReady, setReady] = useState(false);
 
  useEffect(() => {
    if (isReady) {
      


      let data = store.getState().youtubu.youtubuList;
      let currentID = store.getState().youtubu.currentID;
      //player.loadVideoById(store.getState().youtubu.currentID)
        // // console.log(props.data);
        let t = [];
        store.getState().youtubu.youtubuList.map((you) => (
          // console.log(you.videoId),
          t.push(you.videoId)
        ))
        let index = data.findIndex(t => t.videoId == currentID);
        //console.log(props.videoId)
        //console.log(index)
        player.loadPlaylist(t, index)
      //store.dispatch(getYoutubuID())
      //let id = store.dispatch(getYoutubuID())
      //console.log(id)
      //console.log(store.dispatch(getYoutubuID()))

 
      //console.log('youtubu change', props.videoId)
      // player.loadVideoById(props.videoId)

      // if (videoIdaaa != id) {
      //   videoIdaaa = id;
      //   // console.log(props.data);
      //   let t = [];
      //   props.data.map((you) => (
      //     // console.log(you.videoId),
      //     t.push(you.videoId)
      //   ))
      //   let index = props.data.findIndex(t => t.videoId == props.videoId);
      //   //console.log(props.videoId)
      //   //console.log(index)
      //   player.loadPlaylist(t, index)
      // }



    }

    // 
  });

  const onReady = (event) => {
    // eslint-disable-next-line

    console.log(`YouTube Player object for videoId: "${props.videoId}" has been saved to state.`);
    setPlayer(event.target);
    setReady(true);



  };

  const onPlayVideo = () => {
    player.playVideo();
  };

  const onPauseVideo = () => {
    player.pauseVideo();
  };

  const onChangeVideo = () => {
    setVideoId(videoId === videoIdA ? videoIdB : videoIdA);
  };



  return (
    <div>
      <YouTube videoId={props.videoId} onReady={onReady} />
      <button type="button" onClick={onPlayVideo} disabled={!player}>
        Play
      </button>
      <button type="button" onClick={onPauseVideo} disabled={!player}>
        Pause
      </button>
      {/* <button type="button" onClick={onChangeVideo} disabled={!player}>
        Change Video
      </button> */}
    </div>
  );
}

