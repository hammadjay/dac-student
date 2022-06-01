import { useState, useEffect } from 'react';
import { MdPersonAdd, MdClose } from "react-icons/md";
import '../App.css'
import userIcon from '../img/OtherUser.png'
import LeftNavbar from './NavComponents/LeftNavbar';
import TopNav from './NavComponents/TopNav';
import ResponsiveTopNav from './NavComponents/ResponsiveTopNav';
import { CircularProgress } from '@mui/material';
import api from '../api/api'
import { useSelector } from 'react-redux'
import { useSnackbar } from 'notistack';
import Post from './digitalWallComponents/Posts'
import Polls from './digitalWallComponents/Polls'
import Createpost from './digitalWallComponents/Createpost'
import { Link } from 'react-router-dom';
import { SERVER_UPLOAD_BASE_URL } from '../features/functions/baseURL';

const SuggestedConnections = () => {
    const userData = useSelector(state => state.userData.data)
    const [connections, setConnection] = useState([])
    const [isRefresh, setIsRefresh] = useState(true)
    useEffect(() => {
        if (isRefresh) {
            api.get(`/users/suggestConnection/${userData._id}`)
                .then((result) => {
                    setConnection(result.data)
                    setIsRefresh(false)
                })
                .catch((e) => { console.log(e) })
        }
    }, [isRefresh])

    return (
        <div className='w-full md:w-11/12 flex flex-col rounded-lg shadow-md bg-white mx-auto border border-gray-300 my-2' >
            <p className='font-semibold text-center my-2'>People you may know</p>

            {
                isRefresh ?
                    <div className='mx-auto'>
                        <CircularProgress color='primary' variant='indeterminate' size={20} />
                    </div>
                    :
                    connections.length === 0 ?
                        <p className='text-center'>No Recommendations</p>
                        :
                        <></>
            }
            {
                connections.map((item, index) => {
                    return (

                        <Link to={`/Profile/${item._id}`} >
                            <div key={index} className='mx-2 my-2 flex shadow-md justify-around rounded-md'>
                                <div className='flex'>
                                    <img src={item.profilePhoto} alt='user pic' className='rounded-full h-14' />
                                    <div className='my-auto'>
                                        <p className='text-sm font-semibold'>{item.firstName} {item.lastName}</p>
                                        <p className='text-xs '>{item.userType} {item.program} Department</p>
                                    </div>
                                </div>
                            </div>
                        </Link>

                    )
                })
            }

            <Link to='/connections' className='mx-auto'>
                <button className='rounded-md bg-purple-200 mx-auto py-1 px-2 m-2 '>
                    <p className='text-sm text-secondary font-semibold '>See more</p>
                </button>
            </Link>
        </div>
    )
}
const PeopleYouMayKnow = () => {
    return (
        <div className='w-full md:w-11/12 flex flex-col rounded-lg shadow-md bg-white mx-auto border border-gray-300 my-2' >
            <p className='font-semibold text-center my-2'>People you may know</p>

            <div className='mx-2 my-2 flex shadow-md justify-around rounded-md'>
                <div className='flex'>
                    <img src={userIcon} alt='user pic' className='rounded-full h-14' />
                    <div className='my-auto'>
                        <p className='text-sm font-semibold'>Ahsan Amin Khan</p>
                        <p className='text-xs '>Student CS</p>
                    </div>
                </div>
                <div className='' >
                    <button className='rounded-full p-2 ml-3'>
                        <MdPersonAdd size={24} className='my-auto mx-auto text-gray-600 ' />
                    </button>
                    <button className='rounded-full p-2 '>
                        <MdClose size={24} className='my-auto mx-auto text-gray-600 ' />
                    </button>
                </div>
            </div>
            <div className='mx-2 my-2 flex shadow-md justify-around rounded-md'>
                <div className='flex'>
                    <img src={userIcon} alt='user pic' className='rounded-full h-14' />
                    <div className='my-auto'>
                        <p className='text-sm font-semibold'>Ahsan Amin Khan</p>
                        <p className='text-xs '>Student CS</p>
                    </div>
                </div>
                <div className='' >
                    <button className='rounded-full p-2 ml-3'>
                        <MdPersonAdd size={24} className='my-auto mx-auto text-gray-600 ' />
                    </button>
                    <button className='rounded-full p-2 '>
                        <MdClose size={24} className='my-auto mx-auto text-gray-600 ' />
                    </button>
                </div>
            </div>
            <div className='mx-2 my-2 flex shadow-md justify-around rounded-md'>
                <div className='flex'>
                    <img src={userIcon} alt='user pic' className='rounded-full h-14' />
                    <div className='my-auto'>
                        <p className='text-sm font-semibold'>Ahsan Amin Khan</p>
                        <p className='text-xs '>Student CS</p>
                    </div>
                </div>
                <div className='' >
                    <button className='rounded-full p-2 ml-3'>
                        <MdPersonAdd size={24} className='my-auto mx-auto text-gray-600 ' />
                    </button>
                    <button className='rounded-full p-2 '>
                        <MdClose size={24} className='my-auto mx-auto text-gray-600 ' />
                    </button>
                </div>
            </div>

            <button className='rounded-md bg-purple-200 mx-auto py-1 px-2 m-2 '>
                <p className='text-sm text-secondary font-semibold '>See more</p>
            </button>
        </div>
    )
}

function DigitalWall() {
    const userData = useSelector(state => state.userData.data)
    const [posts, setPosts] = useState([]);
    const [feedType, setFeedType] = useState('most recent');
    const [refreshFeed, setRefreshFeed] = useState(true)
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    console.log(posts)

    useEffect(() => {
        if (refreshFeed) {
            api.get(`/users/posts/feed/${userData._id}`)
                .then((result) => {
                    console.log(result.data)
                    setPosts(result.data.posts)
                    setRefreshFeed(false)
                })
                .catch((err) => {
                    handleSnackbar('Oops An error encountered', 'error')

                })
        }
    }, [refreshFeed])
    const handleSnackbar = (message, variant) => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar(message, { variant });
    };
    useEffect(() => {
        let temp
        if (feedType === 'most recent') {
            temp = posts
            temp.sort((a, b) => { return new Date(b.createdAt) - new Date(a.createdAt) })
            setPosts([...[], ...temp])
            console.log('jee')
        }
        else if (feedType === 'oldest') {
            temp = posts
            temp.sort((a, b) => { return new Date(a.createdAt) - new Date(b.createdAt) })
            setPosts([...[], ...temp])
            console.log('jee')
        }
        else if (feedType === 'top') {
            temp = posts
            temp.sort((a, b) => { return (b.likes.length + b.comments.length) - (a.likes.length + a.comments.length) })
            setPosts([...[], ...temp])
            console.log(temp)
        }
    }, [feedType,refreshFeed])
    const handleChangeFeed = (e) => {
        setFeedType(e.target.value);

    }
    return (
        <div className=" h-full bg-gray-100 ">
            <div className=' 2xl:w-2/3  mx-auto'>
                <div className='sticky top-0'>
                    {/*Header*/}
                    <ResponsiveTopNav />
                </div>

                {/*Body*/}
                <div className='flex flex-1 h-auto '>
                    {/*Left*/}

                    <LeftNavbar />

                    {/*Center*/}
                    <div className="flex flex-col  h-full w-full lg:w-2/3">
                        {/*navigator*/}
                        <TopNav digitalWall />
                        <Createpost setRefreshFeed={setRefreshFeed} setPosts={setPosts} />
                        <Polls/>

                        {
                            refreshFeed ?
                                <div className='mx-auto'>
                                    <CircularProgress color='primary' variant='indeterminate' size={20} />
                                </div>
                                :
                                posts.length === 0 ?
                                    <p className='text-center'>No posts found.</p>
                                    : <div className=" flex flex-row-reverse w-full md:w-9/12 mx-auto ">
                                        <label>
                                            View:
                                            <select value={feedType} onChange={handleChangeFeed}>
                                                <option value="most recent">most recent</option>
                                                <option value="top">top</option>
                                                <option value="oldest">oldest</option>
                                            </select>
                                        </label>
                                    </div>
                        }
                        {
                            posts.map((post, index) => {
                                return <Post key={post._id} setPosts={setPosts} setRefreshFeed={setRefreshFeed} index={index} post={post} />
                            })
                        }

                    </div>
                    {/*Right*/}
                    <div className="lg:block hidden w-1/3 justify-evenly sticky top-0 h-screen overflow-auto no-scrollbar">
                        <SuggestedConnections />
                        {/* <PeopleYouMayKnow />
                        <PeopleYouMayKnow /> */}

                    </div>
                </div>
            </div>
        </div >
    );
}

export default DigitalWall;
