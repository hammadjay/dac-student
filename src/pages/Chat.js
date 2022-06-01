import { useState, useEffect, useRef } from 'react'
import { AiOutlineSearch } from "react-icons/ai";
import '../App.css'
import Send from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import { Badge, Divider } from '@mui/material';
import TopNav from './NavComponents/TopNav';
import ResponsiveTopNav from './NavComponents/ResponsiveTopNav';
import api from '../api/api'
import { useSelector, useDispatch } from 'react-redux'
import { updateChats } from '../features/Chats/chats'
import { useSnackbar } from 'notistack';
import moment from 'moment';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import socket from './../socket/socket';
import { Link } from 'react-router-dom'

const ITEM_HEIGHT = 48;

const MyMessage = ({ message }) => {
    return (
        <div className='bg-secondary max-w-xs ml-auto m-2 rounded-lg p-3'>
            <p className='text-white text-sm'>{message.message}</p>
            <p className=' text-xs text-white text-right pt-2'>{moment(message.createdAt).subtract().calendar()}</p>
        </div>

    )
}
const OtherMessage = ({ message }) => {
    return (
        <div className='bg-primary max-w-xs mr-auto m-2 rounded-lg p-3'>
            <p className='text-white text-sm'>{message.message}</p>
            <p className=' text-xs text-white text-right pt-2'>{moment(message.createdAt).subtract().calendar()}</p>
        </div>

    )
}
const ChatItem = ({ item, setActiveChat }) => {
    const userData = useSelector(state => state.userData.data)
    const [chatPerson, setChatPerson] = useState(item.conversationId.participants.filter((item) => { return item._id !== userData._id })[0])
    const dispatch = useDispatch()

    const markRead = () => {
        api.put(`/users/markRead/${item.conversationId._id}/${userData._id}`)
            .then(() => {
                api.get(`/users/inbox/${userData._id}`)
                    .then((result2) => {

                        dispatch(updateChats(result2.data))
                    })
                    .catch((e) => {
                        console.log(e)
                    })
            })
    }
    return (
        <div className={`${item.isUnread ? 'bg-white' : 'bg-gray-200'} shadow-md cursor-pointer`}
            onClick={() => {
                setActiveChat(item)
                markRead()
            }}>
            <div className='flex flex-1 my-1 ' >
                <img src={chatPerson.profilePhoto} alt='user pic' className='rounded-full h-14' />
                <div className='my-auto'>
                    <div >
                        <p className='text-sm font-semibold inline-block'>{chatPerson.firstName} {chatPerson.lastName}</p>
                        {
                            item.isUnread ?
                                <Badge color='error' variant='dot' className='ml-2' >
                                </Badge>
                                : <></>
                        }
                        {
                            item.messages.length > 0 ?
                                <p className='text-xs font-light float-right inline-block mt-1'>{moment(item.messages[item.messages.length - 1].createdAt).fromNow()}</p>
                                :
                                <></>
                        }
                    </div>
                    {
                        item.messages.length > 0 ?
                            <div className="w-64 text-gray-500 text-xs truncate">
                                <span>{item.messages[item.messages.length - 1].message}</span>
                            </div>
                            :
                            <></>
                    }
                </div>
            </div>
            <Divider />
        </div >
    )
}
const ConvoScreen = ({ activeChat }) => {
    console.log(activeChat)
    const [anchorEl, setAnchorEl] = useState(null);
    const [isUserOnline, setisUserOnline] = useState(false);
    const userData = useSelector(state => state.userData.data)
    const [message, setMessage] = useState('')
    const [chatPerson, setChatPerson] = useState(activeChat.conversationId.participants.filter((item) => { return item._id !== userData._id })[0])
    // const [convo, setConvo] = useState()
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const dispatch = useDispatch()

    useEffect(() => {
        socket.emit('getOnlineStatus', { id: chatPerson._id })
        socket.on('onlineStatus', ({ isOnline }) => {
            setisUserOnline(isOnline)
        })
    })
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleSnackbar = (message, variant) => {
        enqueueSnackbar(message, { variant });
    };

    const sendSocketUpdate = () => {
        socket.emit('sendChatUpdate', { receiverId: chatPerson._id, senderId: userData._id })
    }
    const refreshChats = () => {
        api.get(`/users/inbox/${userData._id}`)
            .then((result2) => {

                dispatch(updateChats(result2.data))
            })
            .catch((e) => {
                console.log(e)
            })
    }
    const sendMessage = (text) => {
        if (!activeChat.conversationId.isInitialized) {
            api.put(`/users/initializeConvo/${activeChat.conversationId._id}`)
                .then(result => {
                    handleSnackbar('Chat started', 'success')
                    api.put(`/users/message/${activeChat.conversationId._id}/${userData._id}/${chatPerson._id}`, { message: text })
                        .then(result => {
                            sendSocketUpdate()
                            refreshChats()
                        })
                        .catch((e) => handleSnackbar('Oops An error encountered', 'error'))
                })
                .catch((e) => handleSnackbar('Oops An error encountered', 'error'))
        }
        else {
            api.put(`/users/message/${activeChat.conversationId._id}/${userData._id}/${chatPerson._id}`, { message: text })
                .then(result => {
                    sendSocketUpdate()
                    refreshChats()

                })
                .catch((e) => handleSnackbar('Oops An error encountered', 'error'))
        }
    }

    const clearChat = () => {
        api.put(`/users/clearChat/${activeChat.conversationId._id}/${userData._id}`)
            .then(result => {
                sendSocketUpdate()
                refreshChats()
                handleSnackbar('Chat Cleared', 'success')

            })
            .catch((e) => handleSnackbar('Oops An error encountered', 'error'))
    }
    const blockChat = () => {
        api.put(`/users/blockConvo/${activeChat.conversationId._id}/${userData._id}`)
            .then(result => {
                sendSocketUpdate()
                refreshChats()
                handleSnackbar('Chat blocked', 'success')
            })
            .catch((e) => handleSnackbar('Oops An error encountered', 'error'))
    }
    const unblockChat = () => {
        api.put(`/users/unblockConvo/${activeChat.conversationId._id}/${userData._id}`)
            .then(result => {
                sendSocketUpdate()
                refreshChats()

                handleSnackbar('Chat unblocked', 'success')
            })
            .catch((e) => handleSnackbar('Oops An error encountered', 'error'))
    }
    return (
        <div className='bg-white h-full w-full mx-auto shadow-md overflow-none rounded-sm flex flex-col'>
            <div className=' bg-white flex justify-between p-2'>
                <div className='flex'>
                    <img src={chatPerson.profilePhoto} alt='user img' className='h-12 w-12 rounded-full' />
                    <p className='ml-2 my-auto font-semibold '>{chatPerson.firstName} {chatPerson.lastName} {isUserOnline ? '(online)' : '(offline)'}</p>
                </div>
                <div >
                    <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={open ? 'long-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        id="long-menu"
                        MenuListProps={{
                            'aria-labelledby': 'long-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                            style: {
                                maxHeight: ITEM_HEIGHT * 4.5,
                                width: '20ch',
                            },
                        }}
                    >
                        <div>
                            <MenuItem onClick={() => {
                                clearChat()
                            }}>
                                Clear Chat
                            </MenuItem>
                            {
                                activeChat.conversationId.isBlocked ?
                                    <></>
                                    :
                                    <Link to={`/call?action=call&receiverId=${chatPerson._id}`}>
                                        <MenuItem >
                                            Call
                                        </MenuItem>
                                    </Link>
                            }
                            {
                                activeChat.conversationId.isBlocked ?
                                    activeChat.conversationId.blockedBy === userData._id ?
                                        <MenuItem onClick={() => {
                                            unblockChat()
                                        }}>
                                            Unblock
                                        </MenuItem>
                                        :
                                        <></>
                                    :
                                    <MenuItem onClick={() => {
                                        blockChat()
                                    }}>
                                        Block
                                    </MenuItem>
                            }

                        </div>

                    </Menu>
                </div>

            </div>
            <Divider />
            <div className='overflow-auto h-full bg-white shadow-inner flex flex-col-reverse ' >
                {
                    !activeChat.conversationId.isInitialized ?
                        <div className='mx-auto self-center shadow-md border rounded-md my-2 p-2'><p className=' font-sans font-semibold'>Send message to start a conversation </p></div> : <></>
                }
                {
                    [...activeChat.messages].reverse().map((message) => {
                        if (message.senderId === userData._id) {
                            return <MyMessage key={message._id} message={message} />
                        }
                        else {
                            return <OtherMessage key={message._id} message={message} />;
                        }
                    })
                }

            </div>
            <div className=' bg-white flex justify-between px-2 border-t-2 py-2 border-gray-300 '>
                {/* <button  >
                                <HiPlusCircle className=' text-primary' size={28} />
                            </button> */}

                <div className=' flex w-11/12 mx-auto my-auto'>
                    {activeChat.conversationId.isBlocked ?
                        <div className='mx-auto self-center shadow-md border rounded-md my-2 p-2'><p className=' font-sans font-semibold'>This Chat has been Blocked</p></div>
                        :
                        <div className="my-auto w-full rounded-full bg-gray-200 px-3 flex ">

                            {/* <button> <HiOutlineEmojiHappy onClick={() => { setViewEmoji(true) }} ref={anchor} size={28} className=" text-gray-600 my-auto mr-3" /></button> */}

                            <input className=" focus:outline-none  h-full w-full p-2  bg-transparent placeholder-gray-600" placeholder="Type your message ..."
                                value={message}
                                onChange={(e) => { setMessage(e.target.value) }}
                                onKeyUp={(e) => {
                                    if (e.code === "Enter") {
                                        if (!(message == null || message.replaceAll(" ", '').length === 0)) {
                                            // commentPost(message)
                                            setMessage('')
                                            sendMessage(message)
                                        }
                                    }
                                }}
                            />
                            <IconButton
                                onClick={() => {
                                    setMessage('')
                                    sendMessage(message)
                                }}
                                disabled={message == null || message.replaceAll(" ", '').length === 0}
                            >
                                <Send color={message == null || message.replaceAll(" ", '').length === 0 ? '' : 'primary'} />
                            </IconButton>
                        </div>
                    }
                </div>
            </div>

        </div >
    )
}

function Chat() {

    const userData = useSelector(state => state.userData.data)
    const chatData = useSelector(state => state.chatsData.data)

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [inboxes, setInboxes] = useState(chatData)
    const [activeChat, setActiveChat] = useState(null)

    useEffect(() => {
        let params = new URLSearchParams(window.location.search);
        let q = params.get("newConvo")

        if (q) {
            api.post(`/users/createConversation/${userData._id}/${q}`)
                .then((result) => {
                    setActiveChat(result.data)
                    console.log(result.data)
                })
                .catch(() => { handleSnackbar('Oops An error encountered', 'error') })
        }
    }, [])
    useEffect(() => {
        if (activeChat !== null) {
            for (var i = 0; i < chatData.length; i++) {
                if (chatData[i]._id === activeChat._id) {
                    const newObj = { ...chatData[i] }
                    setActiveChat({ ...newObj })
                    break;
                }
            }
        }
        setInboxes(chatData)
    }, [chatData])

    const handleSnackbar = (message, variant) => {
        enqueueSnackbar(message, { variant });
    };



    return (
        <div className=" h-screen bg-gray-100 overflow-none 2xl:w-8/12  ">

            {/*Header*/}
            <div className=' flex flex-1 bg-white h-12 shadow-md lg:hidden '>
                <ResponsiveTopNav />
            </div>

            <TopNav chat />
            {/*Body*/}
            <div className='flex flex-1 h-5/6 overflow-none mx-auto justify-center bg-white shadow-md '>
                {/*Left*/}
                <div className=" w-2/4 md:w-1/4 justify-evenly h-full overflow-auto no-scrollbar border-2  ">
                    {/* <img className='ml-2 my-1 px-2 pb-2 w-32 h-auto' src={logo} alt="DAC LOGO" /> */}
                    <div className=' bg-white px-3 py-1 my-1 shadow-md'>
                        <div className=' flex justify-between my-2 '>
                            <p className='font-semibold my-auto text-lg' >Chats</p>
                            {/* <IoCreateOutline size={28} className='text-gray-600 ' /> */}
                        </div>
                        <div className='mb-1 flex w-11/12 mx-auto shadow-md'>
                            <form className="my-auto w-full rounded-md border-2 border-gray-500 bg-white flex ">
                                <input className=" focus:outline-none rounded-md  h-full w-full p-2  placeholder-gray-500" placeholder="Search here..." />
                                <button> <AiOutlineSearch onClick={() => { console.log('temp') }} size={28} className=" text-gray-500 my-auto mr-3" /></button>
                            </form>
                        </div>
                    </div>
                    {
                        inboxes.map((item) => {
                            return <ChatItem key={item._id} item={item} setActiveChat={setActiveChat} />
                        })
                    }

                </div>
                {/*Center*/}
                <div className=" w-2/4 lg:w-2/3 overflow-none">
                    {activeChat !== null ?

                        <ConvoScreen activeChat={activeChat} />
                        :
                        <p className='text-center font-semibold'>Select a chat to view here</p>
                    }
                </div>

            </div>

        </div>
    );
}

export default Chat;
