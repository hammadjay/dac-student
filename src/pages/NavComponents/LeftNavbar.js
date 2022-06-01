import logo from '../../img/logoMain.png'
import { AiOutlineSearch, } from "react-icons/ai";
import { BsFillBriefcaseFill } from "react-icons/bs";
import { MdHome, MdGroup, MdLiveTv, MdNotifications, MdSettings } from "react-icons/md";
import { IoChatboxEllipsesSharp } from "react-icons/io5";
import { HiUserGroup } from "react-icons/hi";
import { FaBullhorn } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import '../../App.css'
import { useSelector, useDispatch } from 'react-redux'

import { Link } from 'react-router-dom';


import { createBrowserHistory } from 'history'

export default function LeftNavbar() {

    const userData = useSelector(state => state.userData.data)
    const { _id, profilePhoto, firstName, lastName } = userData
    const history = createBrowserHistory();
    let notifData = useSelector(state => state.notifData.data)
    notifData = notifData.filter((item) => { return item.isRead === false })

    return (
        <div className=" lg:block hidden w-1/3 justify-evenly overflow-auto no-scrollbar sticky top-0 h-screen p-1 ">
            <img className='ml-2 px-2 pb-2 w-32 h-auto' src={logo} alt="DAC LOGO" />

            {/* <div className='mb-5 flex w-11/12 mx-auto'>
                <form className="my-auto w-full rounded-md bg-gray-300 flex">
                    <input className="  focus:outline-none rounded-md  bg-gray-300 h-full w-full p-2  placeholder-gray-500" placeholder="Search here..." />
                    <button> <AiOutlineSearch onClick={() => { alert('search hogya') }} size={32} className=" text-gray-500 my-auto mr-3" /></button>
                </form>
            </div> */}
            <Link to={{
                pathname: `/Profile/${_id}`,
            }}>
                <button className='flex mr-10 px-5'>
                    <div className='my-auto mx-2'>
                        <img src={profilePhoto} alt='user image' className="rounded-full " width={50} height={50} />
                    </div>
                    <div className="my-auto">
                        <p className='text-black text-sm font-semibold'>{`${firstName} ${lastName}`}</p>
                        <p className='text-black text-xs text-left'>View Profile</p>
                    </div>
                </button>
            </Link>

            <div className="px-5 h-full" >
                <div className="flex ml-3 my-3">
                    <Link to='/'>
                        <button className="flex ">
                            <div className='bg-primary p-2 rounded-full'>
                                <MdHome className='text-white bg-transparent' size={20} />
                            </div>
                            <p className='my-auto text-sm ml-2'>Home</p>
                        </button>
                    </Link>
                </div>
                <div className="flex ml-3 my-3">
                    <Link to='/Chat'>
                        <button className="flex ">
                            <div className='bg-primary p-2 rounded-full'>
                                <IoChatboxEllipsesSharp className='text-white bg-transparent' size={20} />
                            </div>

                            <p className='my-auto  text-sm text-left pl-2'>Messages</p>


                        </button>
                    </Link>
                </div>
                <div className="flex ml-3 my-3">
                    <Link to='/Connections'>
                        <button className="flex ">
                            <div className='bg-primary p-2 rounded-full'>
                                <MdGroup className='text-white bg-transparent' size={20} />
                            </div>
                            <p className='my-auto text-sm ml-2'>Connections</p>
                        </button>
                    </Link>
                </div>
                <div className="flex ml-3 my-3">
                    <Link to='/JobManagement'>
                        <button className="flex ">
                            <div className='bg-primary p-2 rounded-full'>
                                <BsFillBriefcaseFill className='text-white bg-transparent' size={20} />
                            </div>
                            <p className='my-auto  text-sm ml-2'>Job management</p>
                        </button>
                    </Link>
                </div>
                <div className="flex ml-3 my-3">
                    <Link to='/Notifications'>
                        <button className="flex ">
                            <div className='bg-primary p-2 rounded-full'>
                                <MdNotifications className='text-white bg-transparent' size={20} />
                            </div>
                            <div>
                                <p className='my-auto text-sm ml-2'>Notifications</p>

                                {
                                    notifData.length === 0 ?
                                        <></> :
                                        <div className='flex'>
                                            <div className="h-2 w-2 rounded-full bg-red-600 my-auto mx-1"></div>
                                            <p className="text-xs">{notifData.length} unread notifications</p>
                                        </div>
                                }
                            </div>

                        </button>
                    </Link>
                </div>
                <div className="flex ml-3 my-3">
                    <Link to='/Groups'>
                        <button className="flex ">
                            <div className='bg-primary p-2 rounded-full'>
                                <HiUserGroup className='text-white bg-transparent' size={20} />
                            </div>
                            <p className='my-auto text-sm ml-2'>Groups</p>
                        </button>
                    </Link>
                </div>
                <div className="flex ml-3 my-3">
                    <Link to='/Meetings'>
                        <button className="flex ">
                            <div className='bg-primary p-2 rounded-full'>
                                <MdLiveTv className='text-white bg-transparent' size={20} />
                            </div>
                            <p className='my-auto text-sm ml-2'>Live meetings</p>
                        </button>
                    </Link>
                </div>
                <div className="flex ml-3 my-3">
                    <Link to='/Noticeboard'>
                        <button className="flex ">
                            <div className='bg-primary p-2 rounded-full'>
                                <FaBullhorn className='text-white bg-transparent' size={20} />
                            </div>
                            <p className='my-auto text-sm ml-2'>Noticeboard</p>
                        </button>
                    </Link>
                </div>
                <div className="flex ml-3 my-3">
                    <Link to='/EditProfile'>
                        <button className="flex ">
                            <div className='bg-primary p-2 rounded-full'>
                                <MdSettings className='text-white bg-transparent' size={20} />
                            </div>
                            <p className='my-auto text-sm ml-2'>Settings</p>
                        </button>
                    </Link>
                </div>
                <div className="flex ml-3 my-3">
                    <Link to='/'>
                        <button className="flex " onClick={() => {
                            localStorage.removeItem("accessToken")
                            localStorage.removeItem("loggedUser")
                            history.go(0)
                        }} >
                            <div className='bg-primary p-2 rounded-full'>
                                <BiLogOut className='text-white bg-transparent' size={20} />
                            </div>
                            <p className='my-auto text-sm ml-2'>Logout</p>
                        </button>
                    </Link>
                </div>

                <hr className=' border-gray-300' />
            </div>
        </div>
    )
}