import React ,{useEffect,useRef} from "react";

const VideoPlayer = ({videoId})=>{
    const videoRef = useRef(null)

    useEffect(()=>{
        if (videoRef.current) {
            videoRef.current.pause()
            videoRef.current.removeAttribute('src')
            videoRef.current.load()
        }
    },[])

    return (
        <video ref={videoRef} width={320} height={240} controls autoPlay>
            <source src= {`http://localhost:3000/videos/${videoId}`} type="video/mp4"></source>
            Your Browser doesn't support video tag
        </video>
    )
}

export default VideoPlayer