import { MdMoreVert, MdAdd, MdCancel } from "react-icons/md";
import CircularProgress from '@mui/material/CircularProgress';
import '../App.css'
import TopNav from './NavComponents/TopNav';
import ProfileNav from './NavComponents/ProfileNav';
import ResponsiveTopNav from './NavComponents/ResponsiveTopNav';
import { useState, useEffect } from 'react';
import { Redirect, useParams, useHistory } from 'react-router-dom'
import api from '../api/api'
import Timeline from './profileComponents/Timeline'
import Connections from './profileComponents/Connections'
import Photos from './profileComponents/Photos'
import Videos from './profileComponents/Videos'
import { useSelector, useDispatch } from 'react-redux'
import { updateData } from '../features/userData/userData'
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import socket from '../socket/socket';

function Profile() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const userData = useSelector(state => state.userData.data)
    const dispatch = useDispatch()
    const [isSelfProfile, setIsSelfProfile] = useState(true)
    const [currentProfile, setcurrentProfile] = useState(userData)
    const [isInvalidLink, setIsInvalidLink] = useState(false)
    const [isConnectionAPI, setIsConnectionAPI] = useState(false)
    const [isloadingProfile, setIsLoadingProfile] = useState(true)
    const { id } = useParams()
    const history = useHistory()

    useEffect(() => {
        return history.listen((location) => {
            api.get(`/users/viewuser/${location.pathname.split('/')[2]}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            }).then((result) => {
                if (result.data === null) {
                    setIsInvalidLink(true)
                }
                else {
                    setcurrentProfile(result.data)
                    setIsLoadingProfile(false)
                }
            })
        })
    }, [history])

    useEffect(() => {
        if (id.length === 0) {
            setIsInvalidLink(true)
        }
        api.get(`/users/viewuser/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then((result) => {
            if (result.data === null) {
                setIsInvalidLink(true)
            }
            else {
                setcurrentProfile(result.data)
                setIsLoadingProfile(false)
            }
        })
    }, [])

    const [screen, setScreen] = useState('timeline')
    const timelineHandler = () => {
        setScreen('timeline')
    }
    const connectionsHandler = () => {
        setScreen('connections')
    }
    const photosHandler = () => {
        setScreen('photos')
    }
    const videosHandler = () => {
        setScreen('videos')
    }
    console.log(currentProfile._id)
    if (isInvalidLink) {
        return <Redirect to='*' />
    }
    if (userData._id !== currentProfile._id && isSelfProfile) {
        setIsSelfProfile(false)
    }
    if (userData._id === currentProfile._id && !isSelfProfile) {
        setIsSelfProfile(true)
    }

    const handleSnackbar = (message, variant) => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar(message, { variant });
    };

    const handleAddConnection = () => {
        api.post(`/users/sendRequest/${userData._id}/receiver/${currentProfile._id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then((response) => {
            console.log('response', response.data)
            setcurrentProfile(response.data.receiver)
            dispatch(updateData(response.data.sender))
            localStorage.setItem('loggedUser', JSON.stringify(response.data.sender))

            api.post('/users/createNotification', {
                receiverId: currentProfile._id,
                message: `${userData.firstName} ${userData.lastName} has sent you a connection request`,
                referenceId: userData._id,
                Notiftype: 'user'
            })
                .then(() => {
                    socket.emit('sendNotificationUpdate', { uid: currentProfile._id })
                }).catch((err) => { console.log(err) })


        }).catch((err) => {
            console.log('response', err)

        })
    }


    const handleRemoveConnection = () => {
        api.post(`/users/removeFriend/${userData._id}/receiver/${currentProfile._id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then((response) => {
            console.log('response', response.data)
            setcurrentProfile(response.data.receiver)
            dispatch(updateData(response.data.sender))
            localStorage.setItem('loggedUser', JSON.stringify(response.data.sender))
        }).catch((err) => {
            console.log('response', err)
        })
    }
    const handleCancelRequest = () => {
        api.post(`/users/cancelRequest/${userData._id}/receiver/${currentProfile._id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then((response) => {
            console.log('response', response.data)
            setcurrentProfile(response.data.receiver)
            dispatch(updateData(response.data.sender))
            localStorage.setItem('loggedUser', JSON.stringify(response.data.sender))
        }).catch((err) => {
            console.log('response', err)
        })
    }
    const handleRejectRequest = () => {
        api.post(`/users/cancelRequest/${currentProfile._id}/receiver/${userData._id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then((response) => {
            console.log('response', response.data)
            setcurrentProfile(response.data.sender)
            dispatch(updateData(response.data.receiver))
            localStorage.setItem('loggedUser', JSON.stringify(response.data.receiver))
        }).catch((err) => {
            console.log('response', err)
        })
    }
    const acceptRequestHandler = () => {
        api.post(`/users/acceptRequest/${currentProfile._id}/receiver/${userData._id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then((response) => {
            console.log('response', response.data)
            setcurrentProfile(response.data.sender)
            dispatch(updateData(response.data.receiver))
            localStorage.setItem('loggedUser', JSON.stringify(response.data.receiver))

            api.post('/users/createNotification', {
                receiverId: currentProfile._id,
                message: `${userData.firstName} ${userData.lastName} has accepted your connection request`,
                referenceId: userData._id,
                Notiftype: 'user'
            })
                .then(() => {
                    socket.emit('sendNotificationUpdate', { uid: currentProfile._id })
                }).catch((err) => { console.log(err) })

        }).catch((err) => {
            console.log('response', err)

        })
    }

    const isFriend = () => {
        var bool = false
        var array = userData.connections
        array.forEach(element => {
            if (element._id === currentProfile._id) {
                bool = true
            }
        });
        return bool
    }
    const isPending = () => {
        var array = userData.sentRequest
        var bool = false
        array.forEach(element => {
            console.log(element._id === currentProfile._id)
            if (element._id === currentProfile._id) {
                bool = true
            }
        });
        return bool
    }
    const isRecieved = () => {
        var array = userData.pendingRequest
        var bool = false
        array.forEach(element => {
            console.log(element._id === currentProfile._id)
            if (element._id === currentProfile._id) {
                bool = true
            }
        });
        return bool
    }
    // console.log(isPending() ,"hehe")
    // console.log('yo'+currentProfile)

    if (!isloadingProfile) {


        return (
            <div className=" h-full bg-gray-100 ">
                <div className='2xl:w-8/12 mx-auto'>
                    <div className='sticky top-0'>
                        {/*Header*/}
                        <div className=' flex flex-1 bg-white h-12 shadow-md lg:hidden '>
                            <ResponsiveTopNav />
                        </div>
                    </div>

                    {/*Body*/}
                    <div className='flex lg:w-2/3 flex-1 flex-col h-full mx-auto '>
                        {/*navigator*/}
                        <TopNav />
                        <div className='border-2 h-full'>
                            <div className='bg-white pb-5'>
                                <div className='h-32 bg-gray-300 '>
                                    <MdMoreVert className='ml-auto mr-2' size={26} />
                                </div>
                                <img alt="user" src={currentProfile.profilePhoto} className='mx-auto z -mt-16 rounded-full w-32 h-32 ' />
                                <p className='font-semibold text-center text-lg' >{currentProfile.firstName + " " + currentProfile.lastName}</p>
                                <p className='text-center text-sm' >{currentProfile.userType + " " + currentProfile.program} Department</p>
                                <p className='text-xs text-center' >{currentProfile.city + ',' + currentProfile.country}</p>

                                <div className=' flex lg:flex-row flex-col  justify-center items-center my-4 '>
                                    <div className='inline-block'>
                                        <div className=' inline-block mx-2 '>
                                            <p className='text-center font-semibold text-sm ' >{currentProfile.connections.length}</p>
                                            <p className='text-center font-semibold text-sm '>Connections</p>
                                        </div>
                                        {isSelfProfile ?
                                            <Link to='/EditProfile'>
                                                <button className='border rounded-2xl border-secondary mx-2 inline-block px-2 py-1 ' >
                                                    <div className='flex my-auto ' >
                                                        <MdAdd className='text-secondary' />
                                                        <p className='text-secondary font-semibold text-sm '>Edit Profile</p>
                                                    </div>
                                                </button>
                                            </Link>
                                            :
                                            <></>
                                        }
                                        {
                                            isFriend() && !isSelfProfile ?
                                                <button className='border rounded-2xl border-secondary mx-2 inline-block px-2 py-1' onClick={handleRemoveConnection}>
                                                    <div className='flex my-auto ' >
                                                        <MdAdd className='text-secondary' />
                                                        <p className='text-secondary font-semibold text-sm '>Remove connection</p>
                                                    </div>
                                                </button>
                                                :
                                                isPending() && !isSelfProfile ?
                                                    <button className='border rounded-2xl border-secondary mx-2 inline-block px-2 py-1' onClick={handleCancelRequest}  >
                                                        <div className='flex my-auto ' >
                                                            <MdCancel className='text-secondary' />
                                                            <p className='text-secondary font-semibold text-sm '>Cancel request</p>
                                                        </div>
                                                    </button>
                                                    : isRecieved() && !isSelfProfile ?
                                                        <>
                                                            <button className='border rounded-2xl border-secondary mx-2 inline-block px-2 py-1' onClick={acceptRequestHandler} >
                                                                <div className='flex my-auto ' >
                                                                    <MdAdd className='text-secondary' />
                                                                    <p className='text-secondary font-semibold text-sm ' >Accept Request</p>
                                                                </div>
                                                            </button>
                                                            <button className='border rounded-2xl border-secondary mx-2 inline-block px-2 py-1' onClick={handleRejectRequest} >
                                                                <div className='flex my-auto ' >
                                                                    <MdCancel className='text-secondary' />
                                                                    <p className='text-secondary font-semibold text-sm ' >Reject Request</p>
                                                                </div>
                                                            </button>
                                                        </> :
                                                        !isSelfProfile ?
                                                            <button className='border rounded-2xl border-secondary mx-2 inline-block px-2 py-1' onClick={handleAddConnection} >
                                                                <div className='flex my-auto ' >
                                                                    <MdAdd className='text-secondary' />
                                                                    <p className='text-secondary font-semibold text-sm '>Add Connection</p>
                                                                </div>
                                                            </button>
                                                            :
                                                            <></>

                                        }

                                        {
                                            isSelfProfile ? <></> :
                                                <Link to={`/chat?newConvo=${currentProfile._id}`}>
                                                    <button className='border rounded-2xl border-primary mx-2 inline-block px-2 py-1' disabled={!isFriend()} onClick={() => { console.log('me disabled nahi hu') }} >
                                                        <p className='text-primary text-sm font-semibold'>Message</p>
                                                    </button>
                                                </Link>
                                        }

                                    </div>
                                </div>
                            </div>
                            {/* content */}
                            {
                                (screen === 'timeline') ?
                                    <ProfileNav timeline timelineHandler={timelineHandler} connectionsHandler={connectionsHandler} photosHandler={photosHandler} videosHandler={videosHandler} /> : screen === 'connections' ?
                                        <ProfileNav connection timelineHandler={timelineHandler} connectionsHandler={connectionsHandler} photosHandler={photosHandler} videosHandler={videosHandler} /> : screen === 'photos' ?
                                            <ProfileNav photo timelineHandler={timelineHandler} connectionsHandler={connectionsHandler} photosHandler={photosHandler} videosHandler={videosHandler} /> : <ProfileNav video timelineHandler={timelineHandler} connectionsHandler={connectionsHandler} photosHandler={photosHandler} videosHandler={videosHandler} />
                            }
                            {

                                screen === 'timeline' ?
                                    <Timeline user={currentProfile} setcurrentProfile={setcurrentProfile} /> : screen === 'connections' ?
                                        <Connections user={currentProfile} /> : <></>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    else {
        return (
            <div className=" flex flex-1 h-screen w-full justify-center items-center ">
                <CircularProgress color="primary" />
            </div>
        )
    }
}

export default Profile;
