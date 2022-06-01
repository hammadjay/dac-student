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
import SettingsNav from './SettingsNav'

export default function ResponsiveSN({isAnyChange, setIsAnyChange }) {

    const userData = useSelector(state => state.userData.data)
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

            <button className='my-4 flex justify-end px-3 '>
                <FaChevronLeft size={28} onClick={() => { toggleDrawer(anchor, false) }} />
            </button>
            {/* yahase */}
            <SettingsNav rs />
        </Box>
    );

    return (
        <div className='lg:hidden'>
            <div className=' flex flex-1 bg-white h-12 shadow-md flex-row-reverse lg:hidden' style={{ zIndex: 2 }}>
                <div>
                    <React.Fragment key={'right'}>
                        <Drawer
                            anchor={'right'}
                            open={state['right']}
                            onClose={toggleDrawer('right', false)}

                        >
                            {list('right')}
                        </Drawer>
                    </React.Fragment>
                </div>
                <div>
                    <button className='' onClick={toggleDrawer('right', true)}  ><MdMenu size={26} /> </button>
                </div>

            </div>
        </div>
    )
}