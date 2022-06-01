import React, { useState, useEffect } from 'react';
import { AiOutlineSearch } from "react-icons/ai";
import '../App.css'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import LeftNavbar from './NavComponents/LeftNavbar';
import TopNav from './NavComponents/TopNav';
import JobNav from './NavComponents/JobsNav';
import ResponsiveTopNav from './NavComponents/ResponsiveTopNav';
import { useSelector, useDispatch } from 'react-redux'
import api from '../api/api';
import JobItem from './jobManagementComponents/JobItem';
import ResponsiveJM from './NavComponents/ResponsiveJM'


function JobManagement() {
    const userData = useSelector(state => state.userData.data)
    const dispatch = useDispatch()

    const [age, setAge] = useState('');
    const [page, setPage] = useState(1);
    const [jobs, setJobs] = useState([])
    const [filteredJob, setFilteredJob] = useState([])
    const [search, setSearch] = useState({
        title: '',
        city: '',
        careerLevel: ''
    })
    const [isAnyChange, setIsAnyChange] = useState(true)

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const handlePage = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        if (isAnyChange) {
            api.get('/users/job/viewJob')
                .then((result) => {
                    setJobs(result.data.result)
                    console.log(result.data.result)
                    setIsAnyChange(false)
                })
                .catch((e) => { console.log(e) })
        }
    }, [isAnyChange])

    const filterSearch = (value) => {
        let temp = jobs
        setFilteredJob([...temp.filter((item) => { return item.Title.toLowerCase().includes(value.toLowerCase()) })])
    }
    return (
        <div className=" h-full bg-gray-100 lg:overflow-hidden ">

            <div className='2xl:w-8/12 mx-auto'>
                <div className='sticky top-0'>
                    {/*Header*/}
                    <div className=' flex flex-1 bg-white h-12 shadow-md lg:hidden '>
                        <ResponsiveTopNav />

                    </div>
                    <ResponsiveJM  search isAnyChange={isAnyChange} setIsAnyChange={setIsAnyChange} />

                </div>
                {/*Body*/}
                

                <div className='flex flex-1 h-auto '>
                    {/*Left*/}
                    <LeftNavbar />
                    {/*Center*/}
                    <div className="flex flex-col h-full w-full lg:w-2/3">
                        {/*navigator*/}

                        <TopNav job />

                        <div className='bg-white lg:w-5/6 h-auto mx-auto rounded-md shadow-md my-1 p-1'>
                            <p className=' pl-2 font-semibold text-lg'>Search Jobs</p>
                            <div className='my-3 flex w-11/12 mx-auto'>
                                <form className="my-auto w-full rounded-full bg-gray-200 flex" onSubmit={(e) => { e.preventDefault() }}>
                                    <input className="  focus:outline-none rounded-full  bg-gray-200 h-full w-full p-2  placeholder-gray-500" placeholder="Search Title here..." onChange={(e) => {
                                        setSearch({ ...search, title: e.target.value })
                                        filterSearch(e.target.value)
                                    }} />
                                    <button> <AiOutlineSearch size={32} className=" text-gray-500 my-auto mr-3" /></button>
                                </form>
                            </div>
                            {/* <p className='text-sm font-semibold ' >Filters</p>
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-standard-label">Job Field</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={age}
                                    onChange={handleChange}
                                    label="Job Field"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={'Business'}>Business</MenuItem>
                                    <MenuItem value={'Software'}>Software</MenuItem>
                                    <MenuItem value={'Engineering'}>Engineering</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-standard-label">Job Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={age}
                                    onChange={handleChange}
                                    label="Age"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={'Part'}>Part Time</MenuItem>
                                    <MenuItem value={'Full'}>Full Time</MenuItem>
                                    <MenuItem value={'Remote'}>Remote</MenuItem>
                                    <MenuItem value={'Internship'}>Internship</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-standard-label">Location</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={age}
                                    onChange={handleChange}
                                    label="Age"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Rawalpindi</MenuItem>
                                    <MenuItem value={20}>Islamabad</MenuItem>
                                    <MenuItem value={30}>Lahore</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-standard-label">Country</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={age}
                                    onChange={handleChange}
                                    label="Age"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Pakistan</MenuItem>
                                </Select>
                            </FormControl> */}
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
                                    search.title.length === 0 && search.city.length === 0 && search.careerLevel.length === 0 && search.title.length === 0 ?
                                        jobs.map((item, index) => {
                                            return (
                                                <JobItem key={item._id} item={item} isAnyChange={isAnyChange} setIsAnyChange={setIsAnyChange} />
                                            )
                                        })
                                        :
                                        filteredJob.map((item, index) => {
                                            return (
                                                <JobItem key={item._id} item={item} isAnyChange={isAnyChange} setIsAnyChange={setIsAnyChange} />
                                            )
                                        })
                                }
                            </div>
                            <div className='justify-center flex my-3' >
                                <Stack spacing={2}>
                                    <Pagination count={10} page={page} onChange={handlePage} />
                                </Stack>

                            </div>
                        </div>
                    </div>
                    {/*Right*/}
                    <div className="lg:block hidden w-1/3 justify-evenly sticky top-0 h-screen overflow-auto no-scrollbar pt-16">
                        <JobNav search isAnyChange={isAnyChange} setIsAnyChange={setIsAnyChange} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default JobManagement;
