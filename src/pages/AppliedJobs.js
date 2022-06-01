import React,{useState,useEffect} from 'react';
import '../App.css'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import LeftNavbar from './NavComponents/LeftNavbar';
import TopNav from './NavComponents/TopNav';
import JobNav from './NavComponents/JobsNav';
import ResponsiveTopNav from './NavComponents/ResponsiveTopNav';
import JobItem from './jobManagementComponents/JobItem';
import { useSelector, useDispatch } from 'react-redux'
import api from '../api/api';
import ResponsiveJM from './NavComponents/ResponsiveJM'

function AppliedJobs() {
    const userData = useSelector(state => state.userData.data)
    const dispatch = useDispatch()

    const [jobs, setJobs] = useState([])
    const [page, setPage] = React.useState(1);
    console.log(jobs)
    const handlePage = (event, value) => {
        setPage(value);
    };
    useEffect(() => {
        api.get(`/users/job/appliedJobs/${userData._id}`)
            .then((result) => {
                setJobs(result.data)
                console.log(result.data)
            })
            .catch((e) => { console.log(e) })
    }, [])

    return (
        <div className=" h-full bg-gray-100 lg:overflow-hidden ">
            <div className='2xl:w-8/12 mx-auto'>

                <div className='sticky top-0'>
                    {/*Header*/}
                    <div className=' flex flex-1 bg-white h-12 shadow-md lg:hidden '>
                        <ResponsiveTopNav />
                    </div>
                    <ResponsiveJM applied />
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
                            <p className=' pl-2 font-semibold text-lg'>Applied Jobs</p>
                            <div>
                                {
                                    jobs.length === 0 ?
                                        <div>
                                            <p className=' font-semibold text-lg text-center my-5'>No applied jobs available</p>

                                        </div>
                                        :
                                        <></>
                                }
                                {
                                    jobs.map((item, index) => {
                                        return (
                                            <JobItem key={index} item={item.jobID} isMyJob={false} />
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
                    <div className="lg:block hidden w-1/3 justify-evenly sticky top-0 h-screen overflow-auto no-scrollbar pt-16">
                        <JobNav applied />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AppliedJobs;
