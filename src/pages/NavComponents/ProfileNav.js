import { MdGroup, MdVideoLibrary,MdList, MdPhoto} from "react-icons/md";

import { Link } from 'react-router-dom'

export default function ProfileNav({ timeline = false, connection = false, photo = false, video = false ,timelineHandler, connectionsHandler, photosHandler, videosHandler }) {

    return (
        <div className=' h-16 bg-white w-64 lg:w-96 shadow-md border mx-auto flex px-4 items-center justify-around -mt-5 mb-10'>
            <div>
                <button onClick={timelineHandler} >

                    {
                        timeline ?
                            <>
                                <MdList size={32} className='text-secondary mx-auto' />
                                <p className='text-xs text-secondary font-semibold mb-1'>Timeline</p>
                                <hr className=' border-secondary border-2 rounded-lg ' />
                            </>
                            :
                            <>
                                <MdList size={32} className='text-gray-600 mx-auto' />
                                <p className='text-xs text-gray-600 font-semibold mb-1'>Timeline</p>
                            </>
                    }
                </button>
            </div>
            <div>
                <button onClick={connectionsHandler} >
                    
                    {
                        connection ?
                            <>
                                <MdGroup size={32} className='mx-auto  text-secondary ' />
                                <p className='text-xs  text-secondary font-semibold mb-1'>Connections</p>
                                <hr className=' border-secondary border-2 rounded-lg ' />
                            </>
                            :
                            <>
                                <MdGroup size={32} className='mx-auto  text-gray-600 ' />
                                <p className='text-xs  text-gray-600 font-semibold mb-1'>Connections</p>
                            </>
                    }
                </button>
            </div>
            {/* <div>
                <button onClick={photosHandler} >

                    {
                        photo ?
                            <>
                                <MdPhoto size={32} className='= mx-auto text-secondary' />
                                <p className='text-xs text-secondary  font-semibold mb-1'>Photos</p>
                                <hr className=' border-secondary border-2 rounded-lg ' />
                            </>
                            :
                            <>
                                <MdPhoto size={32} className='= mx-auto text-gray-600' />
                                <p className='text-xs text-gray-600  font-semibold mb-1'>Photos</p>
                            </>
                    }
                </button>
            </div>
            <div>
                <button  onClick={videosHandler} >
                    
                    {
                        video ?
                        <>
                        <MdVideoLibrary size={32} className=' mx-auto text-secondary' />
                        <p className='text-xs  text-secondary font-semibold mb-1'>Videos</p>
                            <hr className=' border-secondary border-2 rounded-lg ' />
                        </>
                            :
                            <>
                            <MdVideoLibrary size={32} className=' mx-auto text-gray-600' />
                    <p className='text-xs  text-gray-600 font-semibold mb-1'>Videos</p></>
                    }
                </button>
            </div> */}
        </div>
    )
}