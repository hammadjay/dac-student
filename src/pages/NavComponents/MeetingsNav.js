import { Link } from 'react-router-dom'
import { BsPersonBoundingBox } from "react-icons/bs";
import { RiSignalTowerLine } from "react-icons/ri";
import { useState } from 'react';
import CreateMeeting from '../liveStreamComponents/CreateMeeting';

export default function MeetingsNav({ mjm = false, meetings = false, myMeetings = false }) {

    const [addMeeting, setMeeting] = useState(false)
    return (

        <>
            {
                mjm ?
                    <></>
                    :
                    <>
                        {/* {
                            addMeeting ?
                                <CreateMeeting addMeeting={addMeeting} setMeeting={setMeeting} />
                                :
                                <></>
                        }
                        <button className='w-11/12 py-1 mx-auto bg-primary rounded-md shadow-md text-white my-1 ' onClick={() => { setMeeting(true) }}><p>Create new Meeting</p></button> */}
                    </>
            }

            <Link to='/Meetings'>
                <div className="flex ml-3 my-3">
                    <button className="flex ">
                        <div className='bg-primary p-2 rounded-full'>
                            <RiSignalTowerLine className='text-white bg-transparent' size={20} />
                        </div>
                        {
                            meetings ?
                                <p className='my-auto text-sm ml-2 font-bold'>Meetings</p>
                                :
                                <p className='my-auto text-sm ml-2 font-normal'>Meetings</p>

                        }
                    </button>
                </div>
            </Link>
            {/* <Link to='/MyMeetings'>
                <div className="flex ml-3 my-3">
                    <button className="flex ">
                        <div className='bg-primary p-2 rounded-full'>
                            <BsPersonBoundingBox className='text-white bg-transparent' size={20} />
                        </div>
                        {
                            myMeetings ?
                                <p className='my-auto text-sm ml-2 font-bold'>My Meetings</p>
                                :
                                <p className='my-auto text-sm ml-2 font-normal'>My Meetings</p>

                        }
                    </button>
                </div>
            </Link> */}
        </>
    )
}