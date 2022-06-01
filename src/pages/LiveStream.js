import React, { useState, useEffect, useRef } from 'react'
import { JitsiMeeting } from '@jitsi/react-sdk';
import { useParams } from "react-router-dom";
import Peer from 'peerjs';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import VideoCam from '@mui/icons-material/Videocam';
import Search from '@mui/icons-material/Search';
import PresentToAll from '@mui/icons-material/PresentToAll';
import PeopleAlt from '@mui/icons-material/PeopleAlt';
import Chat from '@mui/icons-material/Chat';
import CallEnd from '@mui/icons-material/CallEnd';
import VideoCamOff from '@mui/icons-material/VideocamOff';
import Mic from '@mui/icons-material/Mic';
import MicOff from '@mui/icons-material/MicOff';
import Send from '@mui/icons-material/Send';
import Close from '@mui/icons-material/Close';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import user from '../img/user.jpg'
import socket from './../socket/socket';
import { useSelector, useDispatch } from 'react-redux'
import api from "../api/api"

import { useHistory } from "react-router-dom";

const ParticipantDetail = ({ item }) => {
    return (
        <div className='m-2 flex justify-center'>
            <div className=''>
                <img src={item.photo} className="rounded-full h-10 w-10 mr-3" />
            </div>
            <div className='flex-1 flex flex-col justify-center'>
                <p className='font-semibold text-sm'>{item.name} </p>
                <p className='text-gray-700 text-xs'>Alumni</p>
            </div>

        </div>
    )
}
const ChatPopUp = ({ setPopUp, sendMessage, Chats }) => {
    const [message, setMessage] = useState('')
    return (
        <div className=" bg-white w-full shadow-sm rounded-md h-full p-2 flex flex-col overflow-hidden ">
            <div className='flex justify-between items-center px-2'>
                <p className='font-semibold'>In-Call Messages</p>
                <IconButton aria-label="close" size="medium" onClick={() => { setPopUp('none') }}>
                    <Close fontSize="inherit" />
                </IconButton>

            </div>

            <div className='flex-1 overflow-auto flex flex-col-reverse'>
                {
                    Chats.slice(0).reverse().map((item, index) => {
                        return (
                            <div key={index} className='px-3 m-1'>
                                <p className='font-semibold text-sm'>{item.name}<span className=' text-gray-700 font-normal text-sm'> {item.time}</span></p>
                                <p className='text-gray-700'>{item.message}</p>
                            </div>
                        )
                    })
                }
            </div>


            <div className=''>
                <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                    <InputLabel htmlFor="Message">Type your message</InputLabel>
                    <Input
                        id="Message"
                        type={'text'}
                        onChange={(e) => { setMessage(e.target.value) }}
                        onKeyUp={(e) => {
                            if (e.code === "Enter") {
                                sendMessage(message)
                                setMessage('')
                            }
                        }}
                        value={message}
                        autoComplete='off'
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => {
                                        sendMessage(message)
                                        setMessage('')
                                    }}
                                    disabled={message == null || message.replace(" ", '').length === 0}
                                >
                                    <Send color={message == null || message.replace(" ", '').length === 0 ? '' : 'primary'} />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </div>
        </div>
    )
}
const ParticipantPopUp = ({ setPopUp, participants }) => {
    return (
        <div className=" bg-white w-full shadow-sm rounded-md h-full p-2 flex flex-col overflow-hidden">
            <div className=' justify-between items-center px-2 flex'>
                <p className='font-semibold'>Participants ({participants.length})</p>
                <IconButton aria-label="close" size="medium" onClick={() => { setPopUp('none') }}>
                    <Close fontSize="inherit" />
                </IconButton>
            </div>
            <div className='h-full w-full flex flex-col p-3 pb-10 '>
                <div>
                    <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                        <InputLabel htmlFor="Participant">Search Participants</InputLabel>
                        <Input
                            id="Participant"
                            type={'text'}
                            onChange={() => { }}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => { }}

                                    >
                                        <Search />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </div>
                <div className='flex-1  overflow-auto'>
                    {
                        participants.map((item, index) => {

                            return (
                                <ParticipantDetail key={index} item={item} />
                            )
                        })
                    }
                </div>
            </div>
            {/* <div className=''>

            </div> */}
        </div>
    )
}

export default function LiveStream() {
    // const apiRef = useRef();
    //     let history = useHistory();
    // let { meetingID, uID, type } = useParams();
    // const [ logItems, updateLog ] = useState([]);
    // const [ showNew, toggleShowNew ] = useState(false);
    // const [ knockingParticipants, updateKnockingParticipants ] = useState([]);

    // const printEventOutput = payload => {
    //     updateLog(items => [ ...items, JSON.stringify(payload) ]);
    // };

    // const handleAudioStatusChange = (payload, feature) => {
    //     if (payload.muted) {
    //         updateLog(items => [ ...items, `${feature} off` ])
    //     } else {
    //         updateLog(items => [ ...items, `${feature} on` ])
    //     }
    // };

    // const handleChatUpdates = payload => {
    //     if (payload.isOpen || !payload.unreadCount) {
    //         return;
    //     }
    //     apiRef.current.executeCommand('toggleChat');
    //     updateLog(items => [ ...items, `you have ${payload.unreadCount} unread messages` ])
    // };

    // const handleKnockingParticipant = payload => {
    //     updateLog(items => [ ...items, JSON.stringify(payload) ]);
    //     updateKnockingParticipants(participants => [ ...participants, payload?.participant ])
    // };

    // const resolveKnockingParticipants = condition => {
    //     knockingParticipants.forEach(participant => {
    //         apiRef.current.executeCommand('answerKnockingParticipant', participant?.id, condition(participant));
    //         updateKnockingParticipants(participants => participants.filter(item => item.id === participant.id));
    //     });
    // };

    // const handleJitsiIFrameRef1 = iframeRef => {
    //     iframeRef.style.border = '10px solid #3d3d3d';
    //     iframeRef.style.background = '#3d3d3d';
    //     iframeRef.style.height = '400px';
    // };

    // const handleJitsiIFrameRef2 = iframeRef => {
    //     iframeRef.style.marginTop = '10px';
    //     iframeRef.style.border = '10px dashed #df486f';
    //     iframeRef.style.padding = '5px';
    //     iframeRef.style.height = '400px';
    // };

    // const handleApiReady = apiObj => {
    //     apiRef.current = apiObj;
    //     apiRef.current.on('knockingParticipant', handleKnockingParticipant);
    //     apiRef.current.on('audioMuteStatusChanged', payload => handleAudioStatusChange(payload, 'audio'));
    //     apiRef.current.on('videoMuteStatusChanged', payload => handleAudioStatusChange(payload, 'video'));
    //     apiRef.current.on('raiseHandUpdated', printEventOutput);
    //     apiRef.current.on('titleViewChanged', printEventOutput);
    //     apiRef.current.on('chatUpdated', handleChatUpdates);
    //     apiRef.current.on('knockingParticipant', handleKnockingParticipant);
    // };

    // const handleReadyToClose = () => {
    //     /* eslint-disable-next-line no-alert */
    //     alert('Ready to close...');
    // };

    // const generateRoomName = () => `JitsiMeetRoomNo${Math.random() * 100}-${Date.now()}`;

    // // Multiple instances demo
    // const renderNewInstance = () => {
    //     if (!showNew) {
    //         return null;
    //     }

    //     return (
    //         <JitsiMeeting
    //             roomName = { generateRoomName() }
    //             getIFrameRef = { handleJitsiIFrameRef2 } />
    //     );
    // };

    // const renderButtons = () => (
    //     <div style = {{ margin: '15px 0' }}>
    //         <div style = {{
    //             display: 'flex',
    //             justifyContent: 'center'
    //         }}>
    //             <button
    //                 type = 'text'
    //                 title = 'Click to execute toggle raise hand command'
    //                 style = {{
    //                     border: 0,
    //                     borderRadius: '6px',
    //                     fontSize: '14px',
    //                     background: '#f8ae1a',
    //                     color: '#040404',
    //                     padding: '12px 46px',
    //                     margin: '2px 2px'
    //                 }}
    //                 onClick = { () => apiRef.current.executeCommand('toggleRaiseHand') }>
    //                 Raise hand
    //             </button>
    //             <button
    //                 type = 'text'
    //                 title = 'Click to approve/reject knocking participant'
    //                 style = {{
    //                     border: 0,
    //                     borderRadius: '6px',
    //                     fontSize: '14px',
    //                     background: '#0056E0',
    //                     color: 'white',
    //                     padding: '12px 46px',
    //                     margin: '2px 2px'
    //                 }}
    //                 onClick = { () => resolveKnockingParticipants(({ name }) => !name.includes('test')) }>
    //                 Resolve lobby
    //             </button>
    //             <button
    //                 type = 'text'
    //                 title = 'Click to execute subject command'
    //                 style = {{
    //                     border: 0,
    //                     borderRadius: '6px',
    //                     fontSize: '14px',
    //                     background: '#df486f',
    //                     color: 'white',
    //                     padding: '12px 46px',
    //                     margin: '2px 2px'
    //                 }}
    //                 onClick = { () => apiRef.current.executeCommand('subject', 'New Subject')}>
    //                 Change subject
    //             </button>
    //             <button
    //                 type = 'text'
    //                 title = 'Click to create a new JitsiMeeting instance'
    //                 style = {{
    //                     border: 0,
    //                     borderRadius: '6px',
    //                     fontSize: '14px',
    //                     background: '#3D3D3D',
    //                     color: 'white',
    //                     padding: '12px 46px',
    //                     margin: '2px 2px'
    //                 }}
    //                 onClick = { () => toggleShowNew(!showNew) }>
    //                 Toggle new instance
    //             </button>
    //         </div>
    //     </div>
    // );

    // const renderLog = () => logItems.map(
    //     (item, index) => (
    //         <div
    //             style = {{
    //                 fontFamily: 'monospace',
    //                 padding: '5px'
    //             }}
    //             key = { index }>
    //             {item}
    //         </div>
    //     )
    // );

    // const renderSpinner = () => (
    //     <div style = {{
    //         fontFamily: 'sans-serif',
    //         textAlign: 'center'
    //     }}>
    //         Loading..
    //     </div>
    // );


    // return (
    //     <>

    //         <JitsiMeeting
    //             roomName = { meetingID }
    //             spinner = { renderSpinner }
    //             config = {{
    //                 subject: 'Meeting Title Here',
    //                 hideConferenceSubject: false
    //             }}
    //             onApiReady = { externalApi => handleApiReady(externalApi) }
    //             onReadyToClose = { handleReadyToClose }
    //             getIFrameRef = { handleJitsiIFrameRef1 } />

    //     </>
    // );

    // old
    let history = useHistory();
    let { meetingID, uID, type } = useParams();
    // const [stype, setType] = useState(null)
    const myVideo = useRef()
    const ScreenShare = useRef()
    const Audios = useRef([])
    const userData = useSelector(state => state.userData.data)
    const [participants, setParticipants] = useState([])
    const [Chats, setChats] = useState([])
    const [popUp, setPopUp] = useState('none')
    const [video, setVideo] = useState(null)
    const [isScreenShare, setScreenShare] = useState(false)
    const [Allowvideo, setAllowVideo] = useState(true)
    const [AllowMic, setAllowMic] = useState(true)
    const [peerIDs, setPeerIDs] = useState([])

    // useEffect(() => {
    //     api.get(`/users/meetings/verifyHost/${meetingID}/${uID}`)
    //     .then((result) => {
    //         if(result?.data?.success ){
    //             setType('host')
    //         }
    //         else{
    //             setType('pariticpant')
    //         }
    //     })
    //     .catch((e)=>{console.log(e)})
    // },[])
    var peer = null
    console.log(peerIDs)
    useEffect(() => {
        peer = new Peer({

        });
        setTimeout(() => {
            console.log('timeout')
        }, 5000)
        console.log('hello')

        console.log(peer)
        // socket.connect()

        peer.on('open', (id) => {
            socket.emit('JoinMeeting',
                {
                    meetingID: meetingID,
                    name: userData.firstName + " " + userData.lastName,
                    id,
                    type,
                    photo: userData.profilePhoto
                },
                (list, updateMessages) => {
                    setParticipants(list)
                    setChats(updateMessages)
                })

            if (type === 'host') {
                console.log('me dheet hoon')
                navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                    .then((stream) => {
                        setVideo(stream)
                        myVideo.current.srcObject = stream
                    })
            }


        })

        socket.on('CallAgain', () => {

            peer.disconnect()
            peer.reconnect()

        })
        socket.on('UpdateParticipants', ({ updateMeetingUsers }, id, Utype) => {
            setParticipants(updateMeetingUsers)
            console.log(id, type)
            setPeerIDs([...peerIDs, id])
            if (type === 'host') {
                peer.call(id, myVideo.current.srcObject);
            }

        })

        socket.on('toggle-Video', (state) => {
            setAllowVideo(state)
        })
        socket.on('Recieve-Message', ({ updateMessages }) => {
            setChats(updateMessages)
        })

        peer.on('call', (call) => {
            // console.log(call)
            // navigator.mediaDevices.getUserMedia({ video: false, audio: true })
            //     .then((stream) => {
            //         var ansStream = stream
            //         ansStream.getAudioTracks()[0].enabled = false
            call.answer();
            call.on('stream', (remoteStream) => {
                console.log('hello')
                setVideo(remoteStream)
                myVideo.current.srcObject = remoteStream
            });
            // })

        });


    }, [socket])

    // useEffect(() => {

    // }, [Allowvideo])


    const sendMessage = (message) => {
        socket.emit('Send-Message',
            { meetingID: meetingID, name: userData.firstName + " " + userData.lastName, message: message },
            (updateMessages) => {
                console.log('cb chaaloo')
                setChats(updateMessages)
            }
        )

    }
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    const toggleMic = () => {
        myVideo.current.srcObject.getAudioTracks()[0].enabled = !AllowMic
        console.log(myVideo.current.srcObject.getAudioTracks()[0])
        setAllowMic(!AllowMic)
    }
    const toggleVideo = () => {
        myVideo.current.srcObject.getVideoTracks()[0].enabled = !Allowvideo
        console.log(myVideo.current.srcObject.getVideoTracks()[0])
        socket.emit('update-Video-toggle', !Allowvideo)
        setAllowVideo(!Allowvideo)
    }
    const shareScreenToggle = () => {
        if (!isScreenShare) {
            navigator.mediaDevices.getDisplayMedia({
                video: {
                    cursor: "always"
                },
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    sampleRate: 44100
                }
            })
                .then((stream) => {
                    myVideo.current.srcObject.getTracks().forEach(function (track) {
                        track.stop();
                    });
                    video.getTracks().forEach(function (track) {
                        track.stop();
                    });
                    setVideo(stream)
                    myVideo.current.srcObject = stream

                    socket.emit('Screen-Share-toggle')
                    setScreenShare(true)
                })
        }
        else {
            navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                .then((stream) => {
                    myVideo.current.srcObject.getTracks().forEach(function (track) {
                        track.stop();
                    });
                    video.getTracks().forEach(function (track) {
                        track.stop();
                    });
                    setVideo(stream)
                    myVideo.current.srcObject = stream
                    socket.emit('Screen-Share-toggle')
                    setScreenShare(false)

                })
        }
    }

    return (
        <div className=' w-full h-screen bg-gray-900 '>
            <div className="grid grid-cols-4 gap-4 p-5" style={{ height: '85%' }}>
                {/* video screen */}
                <div className={`col-span-3 text-white w-full h-full rounded-md flex flex-col bg-gray-700 justify-center items-center`}>
                    <div>
                        <video muted={type === 'host'} ref={myVideo} autoPlay playsInline className={` object-cover `} style={{ display: video == null || !Allowvideo ? 'none' : 'block' }} />

                        {
                            video == null || !Allowvideo ?
                                <Avatar sx={{ width: 100, height: 100, bgcolor: deepPurple[500] }}>HA</Avatar>
                                :
                                <></>
                        }

                    </div>
                    <div>
                        <p className='font-semibold'>Hammad Jamil</p>
                    </div>
                </div>
                {/* chat wala & participant wala*/}

                {
                    popUp === 'participant' ? <ParticipantPopUp setPopUp={setPopUp} participants={participants} /> : <></>
                }
                {
                    popUp === 'chat' ? <ChatPopUp setPopUp={setPopUp} sendMessage={sendMessage} Chats={Chats} /> : <></>
                }
            </div>
            <div className={`h-20 w-full fixed bottom-0 bg-gray-900 text-white flex justify-center items-center z-50`}>
                <div>
                    <ThemeProvider theme={darkTheme}>
                        <Stack direction="row" spacing={1}>

                            {
                                type === 'host' ?
                                    AllowMic ?
                                        <IconButton aria-label="mic" size="large" onClick={() => { toggleMic() }}>
                                            <Mic fontSize="inherit" />
                                        </IconButton>
                                        :
                                        <IconButton color='error' aria-label="mic" size="large" onClick={() => { toggleMic() }}>
                                            <MicOff fontSize="inherit" />
                                        </IconButton>
                                    :
                                    <></>
                            }

                            {
                                type === 'host' ?
                                    Allowvideo ?
                                        <IconButton aria-label="cam" size="large" onClick={() => { toggleVideo() }}>
                                            <VideoCam fontSize="inherit" />
                                        </IconButton>
                                        :
                                        <IconButton color='error' aria-label="cam" size="large" onClick={() => { toggleVideo() }}>
                                            <VideoCamOff fontSize="inherit" />
                                        </IconButton>
                                    :
                                    <></>
                            }
                            {
                                type === 'host' ?

                                    <IconButton aria-label="cam" size="large" onClick={() => { shareScreenToggle() }}>
                                        <PresentToAll fontSize="inherit" />
                                    </IconButton>
                                    :
                                    <></>
                            }
                            <IconButton color='error' aria-label="cam" size="large" onClick={() => {
                                socket.emit('leaveMeeting')
                                if (myVideo.current.srcObject !== null) {
                                    myVideo.current.srcObject.getTracks().forEach(function (track) {
                                        track.stop();
                                    });
                                }
                                if (video !== null) {
                                    video.getTracks().forEach(function (track) {
                                        track.stop();
                                    });
                                }
                                history.push('/')

                            }}>
                                <CallEnd fontSize="inherit" />
                            </IconButton>
                            <IconButton aria-label="participant" size="large" onClick={() => { setPopUp(popUp === 'none' || popUp === 'chat' ? 'participant' : 'none') }}>
                                <PeopleAlt fontSize="inherit" />
                            </IconButton>
                            <IconButton aria-label="chat" size="large" onClick={() => { setPopUp(popUp === 'none' || popUp === 'participant' ? 'chat' : 'none') }}>
                                <Chat fontSize="inherit" />
                            </IconButton>
                        </Stack>
                    </ThemeProvider>
                </div>
            </div>
        </div>
    )
}
