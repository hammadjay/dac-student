import React, { useState, useEffect, useRef } from "react";
import VideoContext from "./VideoContext";
import Peer from "simple-peer";
// import { message } from "antd";
import socket from '../socket/socket'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";
// const URL = "https://fathomless-tundra-67025.herokuapp.com/";
// const SERVER_URL = "http://localhost:5000/";


const VideoState = ({ children }) => {
  const history = useHistory()
  const userData = useSelector(state => state.userData.data)
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [isstream, setIsStream] = useState(false);
  const [name, setName] = useState(`${userData.firstName} ${userData.lastName}`);
  const [call, setCall] = useState({});
  const [me, setMe] = useState(userData._id);
  const [userName, setUserName] = useState("");
  const [otherUser, setOtherUser] = useState("");
  const [myVdoStatus, setMyVdoStatus] = useState(true);
  const [userVdoStatus, setUserVdoStatus] = useState();
  const [myMicStatus, setMyMicStatus] = useState(true);
  const [userMicStatus, setUserMicStatus] = useState();
  const [screenShare, setScreenShare] = useState(false)

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  const screenTrackRef = useRef();

  useEffect(() => {

    socket.on("endCall", () => {
      socket.emit("endCall", { id: otherUser });
      myVideo.current.srcObject.getTracks().forEach(function (track) {
        track.stop();
      });
      userVideo.current.srcObject.getTracks().forEach(function (track) {
        track.stop();
      });
      setCallAccepted(false)
      setCallEnded(false)
      setStream()
      setIsStream(false)
      setCall({})
      setUserName("")
      setOtherUser("")
      setMyVdoStatus(true)
      setUserVdoStatus()
      setMyMicStatus(true)
      setUserMicStatus()
      setScreenShare(false)

      history.push('/chat')
    });

    socket.on("updateUserMedia", ({ type, currentMediaStatus }) => {
      if (currentMediaStatus !== null || currentMediaStatus !== []) {
        switch (type) {
          case "video":
            setUserVdoStatus(currentMediaStatus);
            break;
          case "mic":
            setUserMicStatus(currentMediaStatus);
            break;
          default:
            setUserMicStatus(currentMediaStatus[0]);
            setUserVdoStatus(currentMediaStatus[1]);
            break;
        }
      }
    });

    socket.on("callUser", ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });

  }, []);



  const answerCall = () => {
    setCallAccepted(true);
    setOtherUser(call.from);
    console.log(call.from)
    console.log(stream)
    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("answerCall", {
        signal: data,
        to: call.from,
        userName: name,
        type: "both",
        myMediaStatus: [myMicStatus, myVdoStatus],
      });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
    console.log(connectionRef.current);
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });
    setOtherUser(id);
    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on("callAccepted", ({ signal, userName }) => {
      setCallAccepted(true);
      setUserName(userName);
      peer.signal(signal);
      socket.emit("updateMyMedia", {
        type: "both",
        currentMediaStatus: [myMicStatus, myVdoStatus],
      });
    });

    connectionRef.current = peer;
    console.log(connectionRef.current);
  };

  const updateVideo = () => {
    setMyVdoStatus((currentStatus) => {
      socket.emit("updateMyMedia", {
        type: "video",
        currentMediaStatus: !currentStatus,
      });
      stream.getVideoTracks()[0].enabled = !currentStatus;
      return !currentStatus;
    });
  };

  const updateMic = () => {
    setMyMicStatus((currentStatus) => {
      socket.emit("updateMyMedia", {
        type: "mic",
        currentMediaStatus: !currentStatus,
      });
      stream.getAudioTracks()[0].enabled = !currentStatus;
      return !currentStatus;
    });
  };


  //SCREEN SHARING 
  const handleScreenSharing = () => {

    // if(!myVdoStatus){
    //   message.error("Turn on your video to share the content", 2);
    //   return;
    // }

    if (!screenShare) {
      navigator.mediaDevices
        .getDisplayMedia({ cursor: true })
        .then((currentStream) => {
          const screenTrack = currentStream.getTracks()[0];


          // replaceTrack (oldTrack, newTrack, oldStream);
          connectionRef.current.replaceTrack(
            connectionRef.current.streams[0]
              .getTracks()
              .find((track) => track.kind === 'video'),
            screenTrack,
            stream
          );

          // Listen click end
          screenTrack.onended = () => {
            connectionRef.current.replaceTrack(
              screenTrack,
              connectionRef.current.streams[0]
                .getTracks()
                .find((track) => track.kind === 'video'),
              stream
            );

            myVideo.current.srcObject = stream;
            setScreenShare(false);
          };

          myVideo.current.srcObject = currentStream;
          screenTrackRef.current = screenTrack;
          setScreenShare(true);
        }).catch((error) => {
          console.log("No stream for sharing")
        });
    } else {
      screenTrackRef.current.onended();
    }
  };

  //full screen
  const fullScreen = (e) => {
    const elem = e.target;

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Chrome, Safari & Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE/Edge */
      elem.msRequestFullscreen();
    }
  };

  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current.destroy();
    socket.emit("endCall", { id: otherUser });
    myVideo.current.srcObject.getTracks().forEach(function (track) {
      track.stop();
    });
    userVideo.current.srcObject.getTracks().forEach(function (track) {
      track.stop();
    });
    setCallAccepted(false)
    setCallEnded(false)
    setStream()
    setIsStream(false)
    setCall({})
    setUserName("")
    setOtherUser("")
    setMyVdoStatus(true)
    setUserVdoStatus()
    setMyMicStatus(true)
    setUserMicStatus()
    setScreenShare(false)
    history.push('/chat')
  };

  const leaveCall1 = () => {
    socket.emit("endCall", { id: otherUser });

  };

  return (
    <VideoContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
        setOtherUser,
        leaveCall1,
        userName,
        myVdoStatus,
        setMyVdoStatus,
        userVdoStatus,
        setUserVdoStatus,
        updateVideo,
        myMicStatus,
        userMicStatus,
        updateMic,
        screenShare,
        handleScreenSharing,
        fullScreen,
        setStream,
        isstream,
        setIsStream
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export default VideoState;
