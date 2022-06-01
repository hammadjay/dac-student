import { useEffect, useState } from 'react'
import '../App.css'
import user from '../img/user.jpg'
import LeftNavbar from './NavComponents/LeftNavbar';
import TopNav from './NavComponents/TopNav';
import ResponsiveTopNav from './NavComponents/ResponsiveTopNav';
import { Redirect, useParams, useHistory, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import api from '../api/api';
import { CircularProgress } from '@mui/material';
import Error404 from './Error404';
import { SERVER_UPLOAD_BASE_URL } from '../features/functions/baseURL';
import { useSnackbar } from 'notistack';
import Post from './digitalWallComponents/Posts'
import Createpost from './digitalWallComponents/Createpost'
import EditGroup from './groupComponents/EditGroup';
import socket from '../socket/socket';


const GroupBio = ({ bio }) => {

    return (
        <div className='w-11/12 flex flex-col rounded-lg shadow-md bg-white border border-gray-300 my-2 px-4 py-2' >
            <p className='font-semibold'>Bio</p>
            <p className='text-sm whitespace-pre-line'>{bio}</p>
        </div>
    )
}
const GroupMembersItem = ({ item }) => {
    return (
        <>

            <div className='flex my-1'>
                <Link className='flex' to={`/Profile/${item._id}`}>
                    <img src={item.profilePhoto} alt='XYZ member' className='h-10 w-10 rounded-full' />
                    <div>
                        <p className='flex-wrap ml-3 my-auto font-semibold'>{item.firstName} {item.lastName}</p>
                        <p className='flex-wrap ml-3 my-auto text-sm'>{item.userType} {item.program} Department</p>
                    </div>
                </Link>

            </div>
            <hr />

        </>
    )
}

const GroupMembers = ({ members, admin }) => {

    return (
        <div className='w-11/12 flex flex-col rounded-lg shadow-md bg-white border border-gray-300 my-2 px-4 py-2' >
            <p className='font-semibold'>Admin </p>
            <GroupMembersItem item={admin} />
            <p className='font-semibold mt-3'>Group Members <span className=' font-light'>&bull; {members.length} members</span> </p>
            {
                members.length === 0 ?
                    <p>No members</p>
                    :
                    <></>
            }
            {
                members.map((item, index) => {
                    return <GroupMembersItem key={index} item={item} />
                })
            }
            <button className='mx-auto font-semibold text-primary' >See more</button>
        </div>
    )
}

function Groups() {
    const userData = useSelector(state => state.userData.data)
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [posts, setPosts] = useState([]);
    const [refreshFeed, setRefreshFeed] = useState(true)
    const [refreshGroup, setRefreshGroup] = useState(true)
    const [editGroup, setEditGroup] = useState(false)
    const { gid } = useParams()
    const history = useHistory()
    const [group, setGroup] = useState(undefined)
    const [isMember, setIsMember] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    console.log(group)
    useEffect(() => {
        if (refreshGroup) {
            if (gid !== undefined ) {
                api.get(`/users/groups/${gid}`)
                    .then(response => {
                        if (response.data._id === undefined) {
                            setGroup(null)
                        }
                        else {
                            setGroup(response.data)
                            setRefreshGroup(false)
                            setIsMember(response.data.members.filter(e => e._id === userData._id).length > 0)
                            setIsAdmin(response.data.creatorId._id === userData._id)
                        }
                    })
                    .catch(err => {
                        setGroup(null)
                        console.log(err)
                    })
            }
        }
    }, [refreshGroup])

    useEffect(() => {
        if (refreshFeed && group !== undefined && group !== null) {
            api.get(`users/groupPosts/${group._id}`)
                .then((result) => {
                    console.log(result.data)
                    setPosts(result.data.posts)
                    setRefreshFeed(false)
                })
                .catch((err) => {
                    handleSnackbar('Oops An error encountered', 'error')

                })
        }
    }, [refreshFeed, group])

    const leaveGroup = () => {
        api.put(`/users/leaveGroup/${userData._id}/${group._id}`)
            .then(response => {
                setRefreshGroup(true)
                handleSnackbar('Group Left', 'success')
            })
            .catch(err => handleSnackbar('Oops An error encountered', 'error'))
    }
    const joinGroup = () => {
        api.put(`/users/joinGroup/${userData._id}/${group._id}`)
            .then(response => {
                setRefreshGroup(true)
                handleSnackbar('Group Joined', 'success')

                api.post('/users/createNotification', {
                    receiverId: group.creatorId._id,
                    message: `${userData.firstName} ${userData.lastName} Joined Your Group: ${group.title}`,
                    referenceId: group._id,
                    Notiftype: 'group'
                })
                    .then(() => {
                        socket.emit('sendNotificationUpdate', { uid: group.creatorId._id })
                    }).catch((err) => { console.log(err) })
                    
            })
            .catch(err => handleSnackbar('Oops An error encountered', 'error'))
    }
    const handleSnackbar = (message, variant) => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar(message, { variant });
    };
    const deleteGroup = () => {
        api.put(`/users/deleteGroup/${group._id}`)
            .then(() => {
                setRefreshGroup(true)
                handleSnackbar('successfully deleted', "success")
            })
    }

    if (gid === undefined || group === null || group?.isDeleted) {
        return (<Error404 />)
    }

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
                <div className='flex flex-1 h-auto '>
                    {/*Left*/}

                    <LeftNavbar />

                    {/*Center*/}
                    <div className="flex flex-col  h-full w-full lg:w-2/3">
                        {/*navigator*/}
                        <TopNav />
                        {
                            editGroup ?
                                <EditGroup editGroup={editGroup} setEditGroup={setEditGroup} setRefreshGroup={setRefreshGroup} item={group} />
                                :
                                <></>
                        }
                        {
                            group === undefined || group === null ?
                                <div className='mx-auto'>
                                    <CircularProgress color='primary' variant='indeterminate' size={20} />
                                </div>
                                :
                                <div className='bg-white h-auto w-10/12 mx-auto border shadow-md '>
                                    <div className=' h-24 bg-gray-400' >

                                    </div>
                                    <div className="flex">
                                        <img src={`${SERVER_UPLOAD_BASE_URL}/${group.image}`} alt='XYZ group' className='rounded-full h-28 w-28 ml-4 -mt-10 ' />
                                        <p className='my-auto font-semibold ml-3 flex-wrap'>{group.title}</p>
                                        <span className='my-auto  ml-1 '>&bull; {group.members.length} members</span>
                                    </div>
                                    {
                                        isAdmin ?
                                            <div className='flex my-2'>
                                                <button className=' px-2 py-1 bg-secondary text-white shadow-md rounded-md ml-auto mr-3' onClick={() => { setEditGroup(true) }} >Edit Group</button>
                                                <button className=' px-2 py-1 bg-white text-red-600 border-2 border-red-600 shadow-md rounded-md mr-3' onClick={() => { deleteGroup() }} >Delete Group</button>

                                            </div>
                                            :
                                            isMember
                                                ?
                                                <div className='flex my-2'>
                                                    <button className=' px-2 py-1 bg-red-600 text-white shadow-md rounded-md ml-auto mr-3' onClick={() => { leaveGroup() }}>Leave Group</button>
                                                </div>
                                                :
                                                <div className='flex my-2'>
                                                    <button className=' px-2 py-1 bg-secondary text-white shadow-md rounded-md ml-auto mr-3' onClick={() => { joinGroup() }} >Join Group</button>
                                                </div>
                                    }

                                </div>
                        }

                        {
                            group === undefined || group === null ?
                                <div className='mx-auto'>
                                    <CircularProgress color='primary' variant='indeterminate' size={20} />
                                </div>
                                :
                                (isAdmin || isMember) ?
                                    <Createpost setRefreshFeed={setRefreshFeed} setPosts={setPosts} isGroupPost={true} groupId={group._id} />
                                    :
                                    <></>
                        }
                        {
                            (isAdmin || isMember) ?
                                refreshFeed ?
                                    <div className='mx-auto'>
                                        <CircularProgress color='primary' variant='indeterminate' size={20} />
                                    </div>
                                    :
                                    posts.length === 0 ?
                                        <p className='text-center'>No group posts found.</p>
                                        : <></>
                                : <></>
                        }
                        {
                            (isAdmin || isMember) && posts.map((post, index) => {
                                return <Post key={index} setPosts={setPosts} setRefreshFeed={setRefreshFeed} index={index} post={post} />
                            })
                        }
                        {
                            !isAdmin && !isMember && !refreshGroup ?
                                <div className=' mt-5 h-auto py-5 w-8/12 mx-auto shadow-md rounded-md bg-white'>
                                    <p className='text-lg my-auto font-semibold text-center'>You're not a group member</p>
                                    <p className='text-normal my-auto font-mono text-center'>Join the group to see posts</p>
                                </div> :
                                <></>
                        }
                    </div>
                    {/*Right*/}
                    <div className="lg:block hidden w-1/3 justify-evenly sticky top-0 h-screen overflow-auto no-scrollbar pt-16 ">
                        {
                            group === undefined || group === null ?
                                <div className='mx-auto'>
                                    <CircularProgress color='primary' variant='indeterminate' size={20} />
                                </div>
                                :
                                <GroupBio bio={group.bio} />
                        }
                        {
                            group === undefined || group === null ?
                                <div className='mx-auto'>
                                    <CircularProgress color='primary' variant='indeterminate' size={20} />
                                </div>
                                :
                                <GroupMembers members={group.members} admin={group.creatorId} />
                        }


                    </div>
                </div>
            </div>
        </div>
    );
}

export default Groups;
