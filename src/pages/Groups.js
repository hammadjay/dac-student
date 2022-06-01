import { useEffect, useState } from 'react'
import { AiOutlineSearch } from "react-icons/ai";
import { MdEdit, MdDelete } from "react-icons/md";
import { IoExitOutline } from "react-icons/io5";
import '../App.css'
import LeftNavbar from './NavComponents/LeftNavbar';
import TopNav from './NavComponents/TopNav';
import { Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import ResponsiveTopNav from './NavComponents/ResponsiveTopNav';
import { CircularProgress } from '@mui/material';
import api from '../api/api'
import { useSelector } from 'react-redux'
import { useSnackbar } from 'notistack';
import Post from './digitalWallComponents/Posts'
import { SERVER_UPLOAD_BASE_URL } from '../features/functions/baseURL';
import CreateGroup from './groupComponents/CreateGroup';
import socket from '../socket/socket';

const GroupsItem = ({ item }) => {

    return (

        <Link to={`/GroupsInfo/${item._id}`}>
            <div className='flex my-1' >
                <img src={`${SERVER_UPLOAD_BASE_URL}/${item.image}`} alt='XYZ group' className='rounded-full h-10 w-10' />
                <p className='inline-block font-semibold my-auto mx-3 flex-wrap'>{item.title}</p>

            </div>
            <Divider />
        </Link>

    )
}
const MyGroups = () => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const handleSnackbar = (message, variant) => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar(message, { variant });
    };
    const [myGroup, setmyGroup] = useState([]);
    const [refresh, setRefresh] = useState(true)
    const userData = useSelector(state => state.userData.data)
    useEffect(() => {
        if (refresh) {
            api.get(`users/myGroups/${userData._id}`)
                .then((result) => {
                    console.log(result.data)
                    setmyGroup(result.data)
                    setRefresh(false)
                })
                .catch((err) => {
                    handleSnackbar('Oops An error encountered', 'error')

                })
        }
    }, [refresh])

    useEffect(() => {
        socket.emit('check')

    }, [])
    return (
        <div className='w-11/12 flex flex-col rounded-lg shadow-md bg-white border border-gray-300 my-2 px-4 py-2' >
            <p className='font-semibold'>My Groups</p>
            {
                refresh ?
                    <div className='mx-auto'>
                        <CircularProgress color='primary' variant='indeterminate' size={20} />
                    </div>
                    :
                    myGroup.length > 0 ?
                        <></>
                        :
                        <p className='text-center'>No Groups to show</p>
            }
            {

                myGroup.map((item, index) => {

                    return <GroupsItem key={index} item={item} />
                })

            }

            {/* <button className='mx-auto font-semibold text-primary' >See more</button> */}
        </div>
    )
}
const JoinedGroups = () => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const handleSnackbar = (message, variant) => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar(message, { variant });
    };
    const [myGroup, setmyGroup] = useState([]);
    const [refresh, setRefresh] = useState(true)
    const userData = useSelector(state => state.userData.data)
    useEffect(() => {
        if (refresh) {
            api.get(`users/joinedGroups/${userData._id}`)
                .then((result) => {
                    console.log(result.data)
                    setmyGroup(result.data)
                    setRefresh(false)
                })
                .catch((err) => {
                    handleSnackbar('Oops An error encountered', 'error')

                })
        }
    }, [refresh])
    return (
        <div className='w-11/12 flex flex-col rounded-lg shadow-md bg-white border border-gray-300 my-2 px-4 py-2' >
            <p className='font-semibold'>Joined Groups</p>
            {
                refresh ?
                    <div className='mx-auto'>
                        <CircularProgress color='primary' variant='indeterminate' size={20} />
                    </div>
                    :
                    myGroup.length > 0 ?
                        <></>
                        :
                        <p className='text-center'>No Groups to show</p>
            }
            {

                myGroup.map((item, index) => {

                    return <GroupsItem key={index} item={item} />
                })

            }

            {/* <button className='mx-auto font-semibold text-primary' >See more</button> */}
        </div>
    )
}
const SuggestedGroup = () => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const handleSnackbar = (message, variant) => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar(message, { variant });
    };
    const [myGroup, setmyGroup] = useState([]);
    const [refresh, setRefresh] = useState(true)
    const userData = useSelector(state => state.userData.data)
    useEffect(() => {
        if (refresh) {
            api.get(`users/suggestedGroup/${userData._id}`)
                .then((result) => {
                    console.log(result.data)
                    setmyGroup(result.data)
                    setRefresh(false)
                })
                .catch((err) => {
                    handleSnackbar('Oops An error encountered', 'error')

                })
        }
    }, [refresh])
    return (
        <div className='w-11/12 flex flex-col rounded-lg shadow-md bg-white border border-gray-300 my-2 px-4 py-2' >
            <p className='font-semibold'>Suggested Groups</p>
            {
                refresh ?
                    <div className='mx-auto'>
                        <CircularProgress color='primary' variant='indeterminate' size={20} />
                    </div>
                    :
                    myGroup.length > 0 ?
                        <></>
                        :
                        <p className='text-center'>No Groups to show</p>
            }
            {

                myGroup.map((item, index) => {

                    return <GroupsItem key={index} item={item} />
                })

            }

            {/* <button className='mx-auto font-semibold text-primary' >See more</button> */}
        </div>
    )
}

function Groups() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [posts, setPosts] = useState([]);
    const [refreshFeed, setRefreshFeed] = useState(true)
    const [createGroup, setCreateGroup] = useState(false)
    const [searchGroup, setSearchGroup] = useState('')
    const [isSearching, setisSearching] = useState(false)
    const [searchGroupResults, setSearchGroupResults] = useState([])

    const userData = useSelector(state => state.userData.data)
    useEffect(() => {
        if (refreshFeed) {
            api.get(`users/groupFeed/${userData._id}`)
                .then((result) => {
                    console.log(result.data)
                    setPosts(result.data.post)
                    setRefreshFeed(false)
                })
                .catch((err) => {
                    handleSnackbar('Oops An error encountered', 'error')

                })
        }
    }, [refreshFeed])
    useEffect(() => {
        if (isSearching) {
            api.get(`users/searchGroup/${searchGroup}`)
                .then((result) => {
                    console.log(result.data)
                    setSearchGroupResults(result.data)
                    setisSearching(false)
                })
                .catch((err) => {
                    handleSnackbar('Oops An error encountered', 'error')

                })
        }
    }, [searchGroup])

    const handleSnackbar = (message, variant) => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar(message, { variant });
    };
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
                            createGroup ?
                                <CreateGroup createGroup={createGroup} setCreateGroup={setCreateGroup} setRefreshFeed={setRefreshFeed} />
                                :
                                <></>
                        }
                        <p className='font-semibold text-lg w-8/12 md:ml-20' >Recent Posts in groups</p>
                        {
                            refreshFeed ?
                                <div className='mx-auto'>
                                    <CircularProgress color='primary' variant='indeterminate' size={20} />
                                </div>
                                :
                                posts.length === 0 ?
                                    <p className='text-center'>No group posts found.</p>
                                    : <></>
                        }
                        {
                            posts.map((post, index) => {
                                return <Post key={index} setPosts={setPosts} setRefreshFeed={setRefreshFeed} index={index} post={post} />
                            })
                        }
                        {/* <Post />
                        <Post />
                        <Post /> */}
                    </div>
                    {/*Right*/}
                    <div className="lg:block hidden w-1/3 justify-evenly sticky top-0 h-screen overflow-auto no-scrollbar pt-16 ">
                        <div className="my-auto w-11/12 rounded-md bg-gray-300 flex">
                            <input className=" focus:outline-none rounded-md  bg-gray-300 h-full w-full p-2  placeholder-gray-500" placeholder="Search groups..."
                                onChange={(e) => {
                                    setSearchGroup(e.target.value)
                                    setisSearching(true)
                                }} />
                            <button> <AiOutlineSearch size={32} className=" text-gray-500 my-auto" /></button>
                        </div>
                        {/* <button className='w-11/12 py-1 mx-auto bg-primary rounded-md shadow-md text-white my-1 ' onClick={() => setCreateGroup(true)}><p>Create new Group</p></button> */}
                        {
                            searchGroup.length > 0 ?
                                isSearching ?
                                    <div className='mx-auto'>
                                        <CircularProgress color='primary' variant='indeterminate' size={20} />
                                    </div>
                                    :
                                    searchGroupResults.length > 0 ?
                                        searchGroupResults.map((group) => { return <GroupsItem key={group._id} item={group} /> })
                                        :
                                        <p>No results found</p>
                                :
                                <>
                                    {/* <MyGroups /> */}
                                    <JoinedGroups />
                                    <SuggestedGroup />
                                </>

                        }


                    </div>
                </div>
            </div>
        </div>
    );
}

export default Groups;
