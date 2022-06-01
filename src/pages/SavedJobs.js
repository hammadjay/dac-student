import React, { useState } from 'react';
import { BsFillBriefcaseFill } from "react-icons/bs";
import { MdHome, MdGroup, MdNotifications } from "react-icons/md";
import { IoChatboxEllipsesSharp } from "react-icons/io5";
import '../App.css'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import LeftNavbar from './NavComponents/LeftNavbar';
import JobNav from './NavComponents/JobsNav';
import ResponsiveTopNav from './NavComponents/ResponsiveTopNav';
import { useSelector, useDispatch } from 'react-redux'
import JobItem from './jobManagementComponents/JobItem';
import TopNav from './NavComponents/TopNav';
import ResponsiveJM from './NavComponents/ResponsiveJM'

function JobManagement() {
    const userData = useSelector(state => state.userData.data)
    const dispatch = useDispatch()
    const [age, setAge] = React.useState('');
    const [isAnyChange, setIsAnyChange] = useState(true)

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const [page, setPage] = React.useState(1);
    const handlePage = (event, value) => {
        setPage(value);
    };

    return (
        <div className=" h-full bg-gray-100 lg:overflow-hidden ">
            <div className='2xl:w-8/12 mx-auto'>

                <div className='sticky top-0'>
                    {/*Header*/}
                    <div className=' flex flex-1 bg-white h-12 shadow-md lg:hidden '>
                        <ResponsiveTopNav />
                    </div>
                    <ResponsiveJM  saved  />

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
                            <p className=' pl-2 font-semibold text-lg'>Saved Jobs</p>
                            {
                                userData.savedJob.length === 0 ?
                                    <div>
                                        <p className=' font-semibold text-lg text-center my-5'>No jobs available</p>

                                    </div>
                                    :
                                    <></>
                            }
                            {
                                userData.savedJob.map((item, index) => {
                                    if (item !== null) {
                                        return (
                                            <JobItem key={index} item={item} isMyJob={false} isAnyChange={isAnyChange} setIsAnyChange={setIsAnyChange} />
                                        )

                                    }
                                })
                            }
                            <div className='justify-center flex mt-2' >
                                <Stack spacing={2}>
                                    <Pagination count={1} page={page} onChange={handlePage} />
                                </Stack>

                            </div>
                        </div>

                    </div>
                    {/*Right*/}
                    <div className="lg:block hidden w-1/3 justify-evenly sticky top-0 h-screen overflow-auto no-scrollbar pt-16">
                        <JobNav saved />

                    </div>
                </div>
            </div>
        </div>
    );
}

export default JobManagement;
