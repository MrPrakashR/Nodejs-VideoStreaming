import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import VideoPlayer from './Components/VideoPlayes';

function App() {

  const [videoId,setVideoId] = useState(null)

function playVideo(e,videoId) {
  e.preventDefault()
  setVideoId(videoId)
}

  return (
    <div className="App">
      {videoId && <VideoPlayer videoId={videoId}></VideoPlayer>} <br/>
      <button onClick={(e)=>{playVideo(e,"cdn")}}>Play Video 1</button>
      <button onClick={(e)=>{playVideo(e,"cdn")}}>Play Video 2</button>
      <button onClick={(e)=>{playVideo(e,"cdn")}}>Play Video 3</button>
    </div>
  );
}

export default App;
