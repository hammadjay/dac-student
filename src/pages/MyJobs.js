import React, { useState, useEffect } from 'react';
import '../App.css'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import LeftNavbar from './NavComponents/LeftNavbar';
import TopNav from './NavComponents/TopNav';
import JobNav from './NavComponents/JobsNav';
import ResponsiveTopNav from './NavComponents/ResponsiveTopNav';
import api from '../api/api';
import { useSelector, useDispatch } from 'react-redux'
import JobItem from './jobManagementComponents/JobItem';
import ResponsiveJM from './NavComponents/ResponsiveJM'

function MyJobs() {
    const userData = useSelector(state => state.userData.data)
    const dispatch = useDispatch()
    const [age, setAge] = useState('');
    const [isAnyChange, setIsAnyChange] = useState(true)
    const [jobs, setJobs] = useState([])

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const [page, setPage] = React.useState(1);
    const handlePage = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        if (isAnyChange) {

            api.get(`/users/job/myJobs/${userData._id}`)
                .then((result) => {
                    setJobs(result.data.result)
                    console.log(result.data.result)
                })
                .catch((e) => console.log(e))

            setIsAnyChange(false)
        }
    }, [isAnyChange])


    return (
        <div className=" h-full bg-gray-100 lg:overflow-hidden ">
            <div className='2xl:w-8/12 mx-auto'>

                <div className='sticky top-0'>
                    {/*Header*/}
                    <div className=' flex flex-1 bg-white h-12 shadow-md lg:hidden '>
                        <ResponsiveTopNav />
                    </div>
                    <ResponsiveJM myjobs />
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
                            <p className=' pl-2 font-semibold text-lg'>My Jobs</p>
                            <div>
                                {
                                    jobs.length === 0 ?
                                        <div>
                                            <p className=' font-semibold text-lg text-center my-5'>No jobs available</p>

                                        </div>
                                        :
                                        <></>
                                }
                                {
                                    jobs.map((item, index) => {
                                        return (
                                            <JobItem key={index} item={item} isAnyChange={isAnyChange} setIsAnyChange={setIsAnyChange} />
                                        )
                                    })
                                }
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
                        <JobNav myjobs />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyJobs;
