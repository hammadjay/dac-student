
import { BsFillBriefcaseFill } from "react-icons/bs";
import { MdHome, MdGroup, MdLiveTv, MdSettings, MdMenu, MdNotifications } from "react-icons/md";
import { IoChatboxEllipsesSharp } from "react-icons/io5";
import { HiUserGroup } from "react-icons/hi";
import { FaBullhorn, FaChevronLeft } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { Link } from 'react-router-dom'
import logo from '../../img/logoMain.png'
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { useSelector, useDispatch } from 'react-redux'
import { createBrowserHistory } from 'history'


export default function ResponsiveTopNav() {
    const userData = useSelector(state => state.userData.data)
    const { _id, profilePhoto, firstName, lastName } = userData
    const history = createBrowserHistory();
    let notifData = useSelector(state => state.notifData.data)
    notifData = notifData.filter((item) => { return item.isRead === false })

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <button className='my-4 flex justify-end px-3'>
                <FaChevronLeft size={28} onClick={() => { toggleDrawer(anchor, false) }} />
            </button>
            {/* yahase */}
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
        </Box>
    );

    return (
        <React.Fragment>
            <div className=' flex flex-1 top-0 sticky bg-white h-12 shadow-md lg:hidden ' style={{ zIndex: 1 }}>
                <div>
                    <React.Fragment key={'left'}>
                        <Drawer
                            anchor={'left'}
                            open={state['left']}
                            onClose={toggleDrawer('left', false)}

                        >
                            {list('left')}
                        </Drawer>
                    </React.Fragment>
                </div>
                <button className='visible lg:invisible ' onClick={toggleDrawer('left', true)}  ><MdMenu size={26} /> </button>
                <img className='ml-2 p-2' src={logo} alt="DAC LOGO"  />

            </div>
        </React.Fragment>
    )
}