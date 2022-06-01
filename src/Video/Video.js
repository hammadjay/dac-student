import React, { useContext, useEffect, useRef } from "react";
import VideoContext from "../context/VideoContext";
import "./Video.css";
// import { Input, Avatar } from "antd";
import Avatar from '@mui/material/Avatar';
import VideoIcon from "../assets/video.svg";
import VideoOff from "../assets/video-off.svg";
import Hang from "../assets/hang.svg";
import CallEndIcon from '@mui/icons-material/CallEnd';
import ScreenShare from '../assets/share_screen.svg'
// import { UserOutlined } from "@ant-design/icons";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AppBar from '@mui/material/AppBar';
import logo from '../img/logoMain.png'


const Video = () => {
  const {
    call,
    callAccepted,
    myVideo,
    userVideo,
    stream,
    setStream,
    name,
    callEnded,
    callUser,
    leaveCall,
    answerCall,
    userName,
    myVdoStatus,
    screenShare,
    fullScreen,
    handleScreenSharing,
    userVdoStatus,
    updateVideo,
    myMicStatus,
    userMicStatus,
    updateMic,
    isstream,
    setIsStream
  } = useContext(VideoContext);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        setIsStream(true)
        myVideo.current.srcObject = currentStream;
      });
  }, [])

  useEffect(() => {
    if (isstream) {
      let params = new URLSearchParams(window.location.search);
      let q = params.get("action")
      let p = params.get("receiverId")

      if (q === 'call' && p && !callAccepted) {
        callUser(p)
        console.log(q, p)
      }
      else if (q === 'accept' && !callAccepted) {
        console.log('answer hua')
        answerCall()
      }
    }
    else {
      console.log('not ready')
    }
  }, [isstream])

  return (
    <div className=' min-h-screen h-full bg-gradient-to-b from-primary to-secondary'>
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <img src={logo} alt='DAC logo' className='mx-auto h-auto' />
      </AppBar>
      <div className="grid1 ">
        {stream ? (
          <div
            style={{ textAlign: "center" }}
            className="card"
            id={callAccepted && !callEnded ? "video1" : "video3"}
          >
            <div style={{ height: "2rem" }}>
              <h3>{myVdoStatus && name}</h3>
            </div>
            <div className="video-avatar-container">
              <video
                playsInline
                muted
                onClick={fullScreen}
                ref={myVideo}
                autoPlay
                className="video-active"
                style={{
                  opacity: `${myVdoStatus ? "1" : "0"}`,
                }}
              />

              <Avatar
                style={{
                  backgroundColor: "#116",
                  position: "absolute",
                  opacity: `${myVdoStatus ? "-1" : "2"}`,
                }}
                size={98}
                icon={!name && <PersonOutlineIcon />}
              >
                {name}
              </Avatar>
            </div>

            <div className="iconsDiv">
              <div
                className="icons"
                onClick={() => {
                  updateMic();
                }}
                tabIndex="0"
              >
                <i
                  className={`fa fa-microphone${myMicStatus ? "" : "-slash"}`}
                  style={{ transform: "scaleX(-1)" }}
                  aria-label={`${myMicStatus ? "mic on" : "mic off"}`}
                  aria-hidden="true"
                ></i>
              </div>


              {callAccepted && !callEnded && (
                <>
                  <div
                    className="icons"
                    onClick={() => handleScreenSharing()}
                    tabIndex="0"
                  >
                    <img src={ScreenShare} alt="share screen" />
                  </div>
                  <div
                    className="icons bg-red-600"
                    onClick={() => leaveCall()}
                    tabIndex="0"
                  >
                    <CallEndIcon />
                  </div>
                </>
              )}

              <div className="icons" onClick={() => updateVideo()} tabIndex="0">
                {myVdoStatus ? (
                  <img src={VideoIcon} alt="video on icon" />
                ) : (
                  <img src={VideoOff} alt="video off icon" />
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bouncing-loader">
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}

        {callAccepted && !callEnded && userVideo && (
          <div className="card2" style={{ textAlign: "center" }} id="video2">
            <div style={{ height: "2rem" }}>
              <h3>{userVdoStatus && (call.name || userName)}</h3>
            </div>

            <div className="video-avatar-container">
              <video
                playsInline
                ref={userVideo}
                onClick={fullScreen}
                autoPlay
                className="video-active"
                style={{
                  opacity: `${userVdoStatus ? "1" : "0"}`,
                }}
              />

              <Avatar
                style={{
                  backgroundColor: "#116",
                  position: "absolute",
                  opacity: `${userVdoStatus ? "-1" : "2"}`,
                }}
                size={98}
                icon={!(userName || call.name) && <PersonOutlineIcon />}
              >
                {userName || call.name}
              </Avatar>
              {!userMicStatus && (
                <i
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    padding: "0.3rem",
                    backgroundColor: "#fefefebf",
                  }}
                  className="fad fa-volume-mute fa-2x"
                  aria-hidden="true"
                  aria-label="microphone muted"
                ></i>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Video;
