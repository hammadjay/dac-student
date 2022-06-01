import { useState, useEffect } from 'react'
import '../App.css'
// import userIcon from '../img/OtherUser.png'
import LeftNavbar from './NavComponents/LeftNavbar';
import TopNav from './NavComponents/TopNav';
import ResponsiveTopNav from './NavComponents/ResponsiveTopNav';
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment';
import { Link } from 'react-router-dom'
import api from '../api/api'
import { updateNotif } from '../features/Notifications/notifications'

const NotifItem = ({ item }) => {

    const markOpen = async (id) => {
        await api.put(`/users/markOpen/${id}`)
    }
    const getLink = () => {
        switch (item.Notiftype) {
            case 'group':
                return `/groupsInfo/${item.referenceId}`
            case 'user':
                return `/profile/${item.referenceId}`
            case 'job':
                return `/MyJobs`
            default:
                return ''
        }
    }
    let path = getLink()
    return (
        <Link to={path} onClick={() => { markOpen(item._id) }}>
            <div className={`px-1 w-11/12 mt-2 py-2 my-1 mx-auto border rounded-md shadow-md  ${item.isOpened ? 'bg-gray-200' : 'bg-white'}`}>
                <div className=' flex flex-1'>
                    {/* <div>
                    <img src={userIcon} alt='userImg' className='h-8 rounded-full flex-grow' />
                </div> */}
                    <div>
                        <p className='ml-2 font-semibold my-auto break-words' >{item.message}</p>
                    </div>
                    {/* <div className='self-baseline ml-auto'>
                    <p className='text-xs'>5.23 pm</p>
                </div> */}
                </div>
                <p className='ml-5'>{moment(item?.createdAt).fromNow()}</p>
            </div>
        </Link>
    )
}

function Notifications() {

    let notifData = useSelector(state => state.notifData.data)
    const userData = useSelector(state => state.userData.data)
    const dispatch = useDispatch()
    const [isRefresh, setIsRefresh] = useState(false)

    useEffect(() => {
        api.put(`/users/readNotification/${userData._id}`)
            .then(() => {
                setIsRefresh(true)
            })
            .catch((err) => { console.log(err) })
    }, [])

    useEffect(() => {
        if (isRefresh) {

            api.get(`/users/getNotification/${userData._id}`)
                .then((result) => {
                    console.log(result.data)
                    dispatch(updateNotif(result.data))
                    setIsRefresh(false)
                })
                .catch((e) => console.log(e))
        }
    }, [isRefresh])

    const markAllOpen = () => {
        api.put(`/users/markAllOpened/${userData._id}`)
            .then(() => {
                setIsRefresh(true)
            })
            .catch((err) => { console.log(err) })
    }
    return (
        <div className=" h-auto bg-gray-100 ">
            <div className='2xl:w-8/12 mx-auto'>
                <div className='sticky top-0'>
                    {/*Header*/}
                    <div className=' flex flex-1 bg-white h-12 shadow-md lg:hidden '>
                        <ResponsiveTopNav />
                    </div>
                </div>
                {/*Body*/}
                <div className='flex flex-1 h-auto '>
                    {/*Left*/}
                    <LeftNavbar />
                    {/*Center*/}
                    <div className="flex flex-col h-full w-full lg:w-2/3">
                        {/*navigator*/}
                        <TopNav notifications />

                        <div className=' bg-gray-50 shadow-md w-9/12 mx-auto rounded-sm py-3'>

                            <div className='flex flex-1 justify-between px-3'>
                                <p className='text-lg font-semibold'>Notifications</p>

                                <button className=' font-semibold text-primary ' onClick={() => { markAllOpen() }}>Mark all read</button>
                            </div>
                            {notifData.length === 0 ?
                                <p className='text-center'>No Notifications</p>
                                :
                                <></>
                            }
                            {
                                notifData.map((item, index) => {
                                    return <NotifItem key={index} item={item} />
                                })
                            }
                        </div>

                    </div>
                    {/*Right*/}
                    <div className="lg:block hidden w-1/3 justify-evenly sticky top-0 h-auto overflow-auto no-scrollbar">

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Notifications;
