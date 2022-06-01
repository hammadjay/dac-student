import { BsFillBriefcaseFill } from "react-icons/bs";
import { MdHome, MdGroup, MdNotifications } from "react-icons/md";
import { IoChatboxEllipsesSharp } from "react-icons/io5";
import '../../App.css'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'

export default function TopNav({ digitalWall = false, chat = false, connections = false, notifications = false, job = false }) {
    let notifData = useSelector(state => state.notifData.data)
    let chatData = useSelector(state => state.chatsData.data)
    notifData = notifData.filter((item) => { return item.isRead === false })
    chatData = chatData.filter((item) => { return item.isUnread === true })


    return (
        <div className=' flex-1 bg-gradient-to-r from-secondary z-10  to-primary py-2 w-96 sticky top-0 rounded-b-xl mx-auto mb-2 justify-between px-10 hidden lg:flex '>
            <button className='my-auto' >
                <Link to='/'>
                    {/* <div className="w-4 h-4 bg-red-600 rounded-full relative right-1 left-5 top-0 bottom-1 "><p className=" text-xs text-white font-semibold">3</p></div> */}
                    <MdHome className='text-white bg-transparent ' size={30} />
                    {digitalWall ?
                        <hr className={' border-white border-2 rounded '} />
                        :
                        <hr className={' border-white border-2 rounded hidden '} />
                    }
                </Link>
            </button>
            <button className='my-auto' >
                <Link to='/Chat'>
                    {
                        chatData.length > 0 ?
                            <div className="w-4 h-4 bg-red-600 rounded-full relative right-1 left-5 top-0 bottom-1 "><p className=" text-xs text-white font-semibold">{chatData.length}</p></div>
                            :
                            <></>
                    }

                    <IoChatboxEllipsesSharp className={`text-white bg-transparent ${chatData.length > 0 ? '-mt-3' : ''}`} size={30} />
                    {chat ?
                        <hr className={' border-white border-2 rounded '} />
                        :
                        <hr className={' border-white border-2 rounded hidden '} />
                    }
                </Link>
            </button>
            <button className='my-auto' >
                <Link to='/Connections'>
                    <MdGroup className='text-white bg-transparent' size={30} />
                    {connections ?
                        <hr className={' border-white border-2 rounded '} />
                        :
                        <hr className={' border-white border-2 rounded hidden '} />
                    }
                </Link>
            </button>
            <button className='my-auto' >
                <Link to='/JobManagement'>
                    <BsFillBriefcaseFill className='text-white bg-transparent' size={30} />
                    {job ?
                        <hr className={' border-white border-2 rounded '} />
                        :
                        <hr className={' border-white border-2 rounded hidden '} />
                    }
                </Link>
            </button>
            <button className='my-auto' >
                <Link to='/Notifications'>
                    {
                        notifData.length > 0 ?
                            <div className="w-4 h-4 bg-red-600 rounded-full relative right-1 left-5 top-0 bottom-1 "><p className=" text-xs text-white font-semibold">{notifData.length}</p></div>
                            :
                            <></>
                    }

                    <MdNotifications className={`text-white bg-transparent ${notifData.length > 0 ? '-mt-3' : ''}`} size={32} />
                    {notifications ?
                        <hr className={' border-white border-2 rounded '} />
                        :
                        <hr className={' border-white border-2 rounded hidden '} />
                    }
                </Link>
            </button>
        </div>
    )
}