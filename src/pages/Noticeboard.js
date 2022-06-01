import React, { useState, useEffect } from 'react';
import '../App.css'
import LeftNavbar from './NavComponents/LeftNavbar';
import TopNav from './NavComponents/TopNav';
import ResponsiveTopNav from './NavComponents/ResponsiveTopNav';
import { useSelector, useDispatch } from 'react-redux'
import { updateData } from '../features/userData/userData'
import api from '../api/api';
import ReactReadMoreReadLess from "react-read-more-read-less";


const NewsItem = ({ item }) => {
    return (
        <div className=' border shadow-md p-2 my-1 overflow-clip' >
            <p className='font-semibold ' >{item.noticeTitle}</p>
            <p className='text-sm mt-2 font-semibold' >Date:{item.dateNoticeCreated} {item.timeNoticeCreated}</p>
            <p className='text-sm mt-2 font-semibold' >Type:{item.noticeType}</p>
            <ReactReadMoreReadLess
                charLimit={200}
                readMoreText={"Read more ▼"}
                readLessText={"Read less ▲"}

            >
                {item.noticeDescription}
            </ReactReadMoreReadLess>
            <img src={item.noticeImage} />
        </div>
    );
}

function Noticeboard() {

    const userData = useSelector(state => state.userData.data)
    const [notices, setNotices] = useState([])
    const [feedType, setFeedType] = useState('');

    useEffect(() => {
        if(feedType === ''){
            api.get(`/users/noticeboard`)
            .then((result) => {
                setNotices(result.data)
                console.log(result.data)
            })
            .catch((e) => console.log(e))
        }else{
            api.get(`/users/noticeboard?noticeType=${feedType}`)
            .then((result) => {
                setNotices(result.data)
                console.log(result.data)
            })
            .catch((e) => console.log(e))
        }
        
    }, [feedType])

    return (
        <div className=" h-full bg-gray-100 ">
            <div className='2xl:w-8/12 mx-auto'>

                <div className='sticky top-0'>
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
                        <TopNav />
                        <div className='bg-white lg:w-5/6 h-auto mx-auto rounded-md shadow-md my-1 p-3'>
                            <p className='font-semibold my-3' >Noticeboard</p>
                            <div className=" flex flex-row-reverse w-full md:w-9/12 mx-auto ">
                                <label>
                                    View:
                                    <select value={feedType} onChange={(e) => { setFeedType(e.target.value) }}>
                                        <option value="">All</option>
                                        <option value="News">news</option>
                                        <option value="Event">event</option>
                                        <option value="Spotlight">spotlight</option>
                                    </select>
                                </label>
                            </div>
                            {
                                
                                    notices.map((item) => {
                                        return (
                                            <NewsItem key={item._id} item={item} />
                                        )

                                    })
                                    
                            }
                            {/* <div className='flex my-2'>
                                <button className='mx-auto text-sm  text-secondary font-bold text-center' >See more</button>
                            </div> */}
                            {/* <p className='font-semibold my-3' >Upcoming Events</p>
                            <EventsItem />
                            <EventsItem />
                            <div className='flex my-2'>
                                <button className='mx-auto text-sm  text-secondary font-bold text-center' >See more</button>
                            </div> */}
                        </div>

                    </div>
                    {/*Right*/}
                    <div className="lg:block hidden w-1/3 justify-evenly sticky top-0 h-screen overflow-hidden no-scrollbar pt-16 ">

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Noticeboard;
