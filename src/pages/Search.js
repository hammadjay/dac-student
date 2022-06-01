import { useState, useEffect } from 'react'
import '../App.css'
import 'react-multi-carousel/lib/styles.css';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import LeftNavbar from './NavComponents/LeftNavbar';
import TopNav from './NavComponents/TopNav';
import ConnectionNav from './NavComponents/ConnectionsNav';
import ResponsiveTopNav from './NavComponents/ResponsiveTopNav';
import Carousel from "react-elastic-carousel";
import { CircularProgress } from '@mui/material';
import api from '../api/api'

import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const ConnectionItem = ({ item }) => {
    return (
        <div className='mx-2 my-2 flex shadow-md justify-between rounded-md border border-gray-300'>
            <Link to={`/Profile/${item._id}`} >

                <div className='flex'>
                    <img src={item.profilePhoto} alt='user pic' className='rounded-full h-14' />
                    <div className='my-auto'>
                        <p className='text-sm font-semibold'>{item.firstName} {item.lastName}</p>
                        <p className='text-xs '>{item.userType} CS</p>
                    </div>
                </div>
                {/* <div className=' my-auto' >
                <button className='rounded-full p-2 ml-3'>
                    <MdPersonAdd size={24} className='my-auto mx-auto text-gray-600 ' />
                </button>
                <button className='rounded-full p-2 '>
                    <MdClose size={24} className='my-auto mx-auto text-gray-600 ' />
                </button>
            </div> */}
            </Link>
        </div>
    )
}

function Connections() {
    const userData = useSelector(state => state.userData.data)
    const [connectionsList, setConnectionsList] = useState([]);
    const [suggestionType, setSuggestionType] = useState('suggestion');
    const [isFetching, setisFetching] = useState(true);

    useEffect(() => {

        if (suggestionType == 'suggestion') {
            api.get(`users/recommendedConnections/${userData._id}`)
                .then((result) => {
                    console.log(result.data)
                    setConnectionsList(result.data)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
        else if (suggestionType == 'Alumni') {
            api.get(`users/topAlumni`)
                .then((result) => {
                    console.log(result.data)
                    setConnectionsList(result.data)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
        else if (suggestionType == 'Student') {
            api.get(`users/topStudent`)
                .then((result) => {
                    console.log(result.data)
                    setConnectionsList(result.data)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
        else if (suggestionType == 'Faculty') {
            api.get(`users/topFaculty`)
                .then((result) => {
                    console.log(result.data)
                    setConnectionsList(result.data)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
        setisFetching(false)
    }, [suggestionType])
    return (
        <div className=" h-full bg-gray-100 ">
            <div className='2xl:w-8/12 mx-auto'>
                <div className='sticky top-0 z-10'>
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

                        <TopNav connections />

                        <div className='bg-white w-full lg:w-5/6 h-auto mx-auto rounded-md shadow-md my-1 p-1'>

                            <p className='font-semibold text-lg my-2  w-full lg:w-9/12 mx-auto ' >Search Connections</p>
                            <div className='mt-2 mb-5  w-full lg:w-9/12 mx-auto shadow-md  px-3 py-3 bg-white '>
                                <div className='flex justify-end' >

                                </div>
                                {
                                    isFetching ?
                                        <div className='mx-auto'>
                                            <CircularProgress color='primary' variant='indeterminate' size={20} />
                                        </div>
                                        :
                                        connectionsList.length > 0 ?
                                            connectionsList.map((item, index) => {
                                                return <ConnectionItem item={item} key={index} />

                                            })
                                            :
                                            <p className='font-semibold text-center'>No Suggestions Yet</p>
                                }


                            </div>
                        </div>

                    </div>
                    {/*Right*/}
                    <div className="lg:block hidden w-1/3 justify-evenly sticky top-0 h-screen overflow-hidden no-scrollbar pt-16 ">
                        <ConnectionNav />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Connections;
