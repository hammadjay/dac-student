import React, { useState, useEffect } from 'react';
import { BsPersonBoundingBox } from "react-icons/bs";
import { MdLiveTv, MdDelete } from "react-icons/md";
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


function MyMeetings() {
    let history = useHistory();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const userData = useSelector(state => state.userData.data)
    const dispatch = useDispatch()

    const [meetings, setMeetings] = useState([]);
    const [refresh, setRefresh] = useState(true);

    const [page, setPage] = React.useState(1);
    const handlePage = (event, value) => {
        setPage(value);
    };
    useEffect(() => {
        if(refresh){
            api.get(`/users/meetings/${userData._id}`)
                .then((result) => {
                    setMeetings(result.data)
                    setRefresh(false)
                })
                .catch((e) => console.log(e))
        }
    }, [refresh])

    const handleSnackbar = (message, variant) => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar(message, { variant });
    };
    const startMeeting = (id,meetingCode) => {
        api.put(`/users/meetings/start/${id}`)
            .then((result) => {
                if (result.data.success) {
                    window.location.replace(`/LiveStream/${meetingCode}/${userData._id}/host`);
                    
                }
            })
            .catch((e) => { handleSnackbar('Unable to Start Meeting !', 'error') })
    }
    const deleteMeeting = (id) => {
        api.delete(`/users/meetings/delete/${id}`)
            .then((result) => {
                setRefresh(true)
                handleSnackbar('Meeting deleted successfully', 'success')
            })
            .catch((e) => { handleSnackbar('Oops! an error occurred', 'error') })
    }
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
                                    <span className='flex' ><p className='my-auto font-semibold mr-1'>My Meetings</p><MdLiveTv className='text-red-500' size={20} /></span>
                                    {
                                        meetings.map((item, index) => {

                                            var diff = new Date(item.sessionDate) - new Date()
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
                                                                {
                                                                    diff < 0 ?
                                                                        <button onClick={() => { startMeeting(item._id , item.code) }}><p className='text-secondary font-semibold' >Go live</p></button>
                                                                        :
                                                                        <button ><p className='text-secondary font-semibold' >{new Intl.DateTimeFormat('en-GB', {
                                                                            month: 'long',
                                                                            day: '2-digit',
                                                                            year: 'numeric',
                                                                            hour: 'numeric',
                                                                            minute: 'numeric',
                                                                            second: 'numeric',
                                                                            hour12: true
                                                                        }).format(new Date(item.sessionDate))}</p></button>

                                                                }
                                                            </div>
                                                        </div>
                                                        <div className='ml-auto my-auto' >
                                                            <button className='' >
                                                                <MdDelete className='text-gray-500' size={26} onClick={() => { deleteMeeting(item._id) }} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <Divider />
                                                </>
                                            )
                                        })
                                    }



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
                    <div className="lg:block hidden w-1/3 justify-evenly sticky top-0 h-screen overflow-hidden no-scrollbar pt-16 ">
                        <MeetingsNav myMeetings />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyMeetings
