import React, { useState, useEffect } from 'react';
import { BsPersonBoundingBox } from "react-icons/bs";
import { MdLiveTv } from "react-icons/md";
import '../App.css'
import { Divider } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import LeftNavbar from './NavComponents/LeftNavbar';
import TopNav from './NavComponents/TopNav';
import MeetingsNav from './NavComponents/MeetingsNav';
import ResponsiveTopNav from './NavComponents/ResponsiveTopNav';
import { useSelector, useDispatch } from 'react-redux'
import api from '../api/api';
import { useSnackbar } from 'notistack';
import { useHistory } from "react-router-dom";
import ResponsiveLS from './NavComponents/ResponsiveLS'

function Meetings() {
    let history = useHistory();

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const userData = useSelector(state => state.userData.data)
    const dispatch = useDispatch()

    const [meetings, setMeetings] = useState([]);
    const [page, setPage] = useState(1);
    const handlePage = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        api.get(`/users/meetings`)
            .then((result) => {
                setMeetings(result.data)
            })
            .catch((e) => console.log(e))
    }, [])
    return (
        <div className=" h-full bg-gray-100 lg:overflow-hidden ">
            <div className='2xl:w-8/12 mx-auto'>

                <div className='sticky top-0'>
                    {/*Header*/}
                    <div className=' flex flex-1 bg-white h-12 shadow-md lg:hidden '>
                        <ResponsiveTopNav />
                    </div>
                    <ResponsiveLS />
                </div>
                {/*Body*/}
                <div className='flex flex-1 h-auto '>
                    {/*Left*/}
                    <LeftNavbar />
                    {/*Center*/}
                    <div className="flex flex-col h-full w-full lg:w-2/3">
                        {/*navigator*/}
                        <TopNav />
                        <div className='bg-white lg:w-5/6 h-auto mx-auto rounded-md shadow-md my-1 p-1'>
                            <div className=''>
                                <div className='px-3' >
                                    <span className='flex' ><p className='my-auto font-semibold mr-1'>Live Now</p><MdLiveTv className='text-red-500' size={20} /></span>
                                    {
                                        meetings.map((item, index) => {
                                            console.log(item)
                                            if (item.hostedBy._id !== userData._id && item.isStarted) {
                                                return (
                                                    <>
                                                        <div key={index} className='flex my-2' >
                                                            <div className='bg-gradient-to-t from-primary to-secondary rounded-md p-4' ><BsPersonBoundingBox size={34} className='text-white' /></div>
                                                            <div className='flex flex-col justify-between ml-4 ' >
                                                                <div >
                                                                    <p className=' font-semibold text-sm'>{item.Title}</p>
                                                                    <p className=' text-xs' >Hosted by: {item.hostedBy.firstName + " " + item.hostedBy.lastName} </p>
                                                                </div>
                                                                <div>
                                                                    <button onClick={() => { history.push(`/LiveStream/${item.code}/${userData._id}/participant`); }}><p className='text-secondary font-semibold' >Join now</p></button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <Divider />
                                                    </>
                                                )
                                            }
                                            return (<></>)

                                        })
                                    }
                                </div>
                                <div className='px-3' >
                                    <span className='flex' ><p className='my-auto font-semibold mr-1'>Upcoming</p></span>
                                    {
                                        meetings.map((item, index) => {

                                            if (item.hostedBy._id !== userData._id && !(item.isStarted)) {
                                                return (
                                                    <div key={index} className='flex my-2' >
                                                        <div className='bg-gradient-to-t from-primary to-secondary rounded-md p-4' ><BsPersonBoundingBox size={34} className='text-white' /></div>
                                                        <div className='flex flex-col justify-between ml-4 ' >
                                                            <div  >
                                                                <p className=' font-semibold text-sm'>{item.Title}</p>
                                                                <p className=' text-xs' >Hosted by: {item.hostedBy.firstName + " " + item.hostedBy.lastName}  </p>
                                                            </div>
                                                            <div>
                                                                <button ><p className='text-secondary font-semibold' >{new Intl.DateTimeFormat('en-GB', {
                                                                    month: 'long',
                                                                    day: '2-digit',
                                                                    year: 'numeric',
                                                                    hour: 'numeric',
                                                                    minute: 'numeric',
                                                                    second: 'numeric',
                                                                    hour12: true
                                                                }).format(new Date(item.sessionDate))}</p></button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            else {
                                                return (<></>)
                                            }

                                        })
                                    }
                                    {/* <div className='ml-auto my-auto' >
                                            <button className='px-2 py-2 rounded-full border border-secondary ' >
                                                <p className='text-secondary font-semibold text-sm '> Mark Interested</p>
                                            </button>
                                        </div> */}

                                    <Divider />

                                </div>

                            </div>
                            <div className='justify-center flex mt-2' >
                                <Stack spacing={2}>
                                    <Pagination count={1} page={page} onChange={handlePage} />
                                </Stack>

                            </div>
                        </div>

                    </div>
                    {/*Right*/}
                    <div className="lg:block hidden w-1/3 justify-evenly sticky top-0 h-screen overflow-auto no-scrollbar pt-16 ">
                        <MeetingsNav meetings />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Meetings;
