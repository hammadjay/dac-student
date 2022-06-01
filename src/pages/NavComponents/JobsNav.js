import { AiOutlineFileDone, AiFillFileText } from "react-icons/ai";
import { MdSearch, MdBookmark } from "react-icons/md";
import { IoBriefcaseOutline } from "react-icons/io5";
import { useState } from 'react'
import { Link } from 'react-router-dom'
import AddJob from "../jobManagementComponents/AddJob";
import CreateCv from "../cvBuilderComponents/CreateCv";



export default function JobNav({ rjm = false ,search = false, applied = false, saved = false, myjobs = false, mycv = false, isAnyChange, setIsAnyChange }) {
    const [addJob, setAddJob] = useState(false)
    const [createCv, setcreateCv] = useState(false)

    return (
        <>
            {
                rjm ?
                    <></>
                    :
                    <>
                        {/* <button className='w-11/12 py-1 mx-auto bg-primary rounded-md shadow-md text-white my-1 ' onClick={() => { setAddJob(true) }} ><p>Create new Job</p></button> */}
                        <button className='w-11/12 py-1 mx-auto bg-secondary rounded-md shadow-md text-white my-1 ' onClick={() => { setcreateCv(true) }} ><p>CV Builder</p></button>
                        {/* {
                            addJob ?
                                <AddJob addJob={addJob} setJob={setAddJob} isAnyChange={isAnyChange} setIsAnyChange={setIsAnyChange} />
                                :
                                <></>
                        } */}
                        {
                            createCv ?
                                <CreateCv createCv={createCv} setcreateCv={setcreateCv} isAnyChange={isAnyChange} setIsAnyChange={setIsAnyChange} />
                                :
                                <></>
                        }
                    </>
            }

            <Link to='/JobManagement'>
                <div className="flex ml-3 my-3">
                    <button className="flex ">

                        <div className='bg-primary p-2 rounded-full'>
                            <MdSearch className='text-white bg-transparent' size={20} />
                        </div>
                        {
                            search ?
                                <p className='my-auto text-sm ml-2 font-bold'>Search jobs</p>
                                :
                                <p className='my-auto text-sm ml-2 font-normal'>Search jobs</p>
                        }
                    </button>
                </div>
            </Link>

            <Link to='/SavedJobs'>
                <div className="flex ml-3 my-3">
                    <button className="flex ">
                        <div className='bg-primary p-2 rounded-full'>
                            <MdBookmark className='text-white bg-transparent' size={20} />
                        </div>
                        {
                            saved ?
                                <p className='my-auto text-sm ml-2 font-bold'>Saved jobs</p>
                                :
                                <p className='my-auto text-sm ml-2 font-normal'>Saved jobs</p>
                        }
                    </button>
                </div>
            </Link>

            <Link to='/AppliedJobs'>
                <div className="flex ml-3 my-3">
                    <button className="flex ">
                        <div className='bg-primary p-2 rounded-full'>
                            <AiOutlineFileDone className='text-white bg-transparent' size={20} />
                        </div>
                        {
                            applied ?
                                <p className='my-auto text-sm ml-2 font-bold'>Applied jobs</p>
                                :
                                <p className='my-auto text-sm ml-2 font-normal'>Applied jobs</p>
                        }

                    </button>
                </div>
            </Link>

            {/* <Link to='/MyJobs'>
                <div className="flex ml-3 my-3">
                    <button className="flex ">
                        <div className='bg-primary p-2 rounded-full'>
                            <IoBriefcaseOutline className='text-white bg-transparent' size={20} />
                        </div>
                        {
                            myjobs ?
                                <p className='my-auto text-sm ml-2 font-bold'>My jobs</p>
                                :
                                <p className='my-auto text-sm ml-2 font-normal'>My jobs</p>
                        }

                    </button>
                </div>
            </Link> */}

            <Link to='/MyCV'>
                <div className="flex ml-3 my-3">
                    <button className="flex ">
                        <div className='bg-primary p-2 rounded-full'>
                            <AiFillFileText className='text-white bg-transparent' size={20} />
                        </div>
                        {
                            mycv ?
                                <p className='my-auto text-sm ml-2 font-bold'>My CVs</p>
                                :
                                <p className='my-auto text-sm ml-2 font-normal'>My CVs</p>
                        }

                    </button>
                </div>
            </Link>

        </>
    )
}