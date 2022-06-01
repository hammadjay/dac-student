import React from 'react';
import {  MdPinDrop, MdMoreHoriz, } from "react-icons/md";

import { BiUpvote, BiDownvote, BiComment,  BiShareAlt, } from "react-icons/bi";
import '../../App.css'
import user from '../../img/user.jpg'
import postPic from '../../img/post.jpg'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Modal from '@mui/material/Modal';




function srcset(image, size, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${size * cols}&h=${size * rows
            }&fit=crop&auto=format&dpr=2 2x`,
    };
}


const Post = () => {
    return (
        <div className=' w-full md:w-1/3 rounded-lg shadow-md bg-white mx-auto border border-gray-300 my-2' >
            <div className='flex'>
                <div className='flex flex-1'>
                    <img src={user} alt='user image' className="rounded-full h-12 m-3" />
                    <div className="my-auto">
                        <a href='#' className='text-sm font-semibold'>Hammad Jamil <span className='ml-3 text-xs text-gray-600'>2.59pm</span></a>
                        <p className='text-xs text-gray-600' >Student CS Department</p>
                        <MdPinDrop className='text-green-500 ' size={12} />
                    </div>
                </div>
                <div className='m-2 p-1'>
                    <button>
                        <MdMoreHoriz size={18} />
                    </button>
                </div>
            </div>
            <div className=' w-11/12 text-sm  mx-auto mb-2' >
                <p>One of the perks of owning a desktop gaming PC is that when a certain part gets outdated, you can easily replace it. You don't have to buy an entirely new machine (take that, laptops!). <span><button className='text-gray-500'>Read more </button></span> </p>
            </div>
            <div>
                <img src={postPic} alt='post Image here' className='w-full h-auto' />
            </div>
            <div className='flex justify-between px-16 my-2'>
                <p className='text-sm text-gray-600'>69 upvotes</p>
                <p className='text-sm text-gray-600'> 69 comments&bull;69 shares </p>
            </div>
            <hr className='w-4/5 mx-auto m-3 border-gray-400 ' />
            <div className='flex  my-1 justify-around'>
                <div className='flex'>
                    <button>
                        <BiUpvote size={24} className=' text-gray-600' />
                    </button>
                    <button>
                        <BiDownvote size={24} className=' text-gray-600' />
                    </button>
                </div>
                <button className='flex items-center'>
                    <BiComment size={20} className=" text-gray-600 my-auto" />
                    <p className='px-1 text-sm'>Comment</p>

                </button>
                <button className='flex items-center'>
                    <BiShareAlt size={20} className='text-gray-600 my-auto' />
                    <p className='px-1  text-sm'>Share</p>
                </button>
            </div>
            <hr className='w-4/5 mx-auto m-3 border-gray-400 ' />
            <div>
                <div className='flex justify-end px-4  text-sm'>
                    <select id="sortComments" className=''>
                        <option value="Recent">Recent</option>
                        <option value="Oldest">Oldest</option>
                        <option value="Most Upvoted">Most Upvoted</option>
                    </select>
                </div>
                <div>
                    <Comment />
                    <Comment />
                    <Comment />
                </div>
            </div>
        </div>
    )
}

const Comment = () => {
    return (
        <div className='flex justify-center my-2 '>
            <img src={user} className="rounded-full h-10 mr-3 my-1" />

            <div className='w-9/12'>
                <div className='  rounded-xl h-auto bg-gray-300 p-2' >
                    <a href='#' className='text-sm font-semibold'>Hammad Jamil <span className='ml-3 text-xs text-gray-600'>2.59pm</span></a>
                    <p className='text-xs text-gray-600' >Student CS Department</p>
                    <p className='text-sm py-1'>Good PC MashaAllah,lagy raho aise he . humy b pc dilao </p>
                </div>
                <div className='flex mx-3 my-1'>
                    <BiUpvote size={18} className=' text-gray-600' />
                    <BiDownvote size={18} className=' text-gray-600' />
                    <p className='text-xs'>Reply</p>
                </div>
            </div>
        </div>
    )
}

function Videos({user}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const itemData = [
        {
            img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
            title: 'Breakfast',
            rows: 2,
            cols: 2,
        },
        {
            img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
            title: 'Burger',
        },
        {
            img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
            title: 'Camera',
        },
        {
            img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
            title: 'Coffee',
            cols: 2,
        },
        {
            img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
            title: 'Hats',
            cols: 2,
        },
        {
            img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
            title: 'Honey',
            author: '@arwinneil',
            rows: 2,
            cols: 2,
        },
        {
            img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
            title: 'Basketball',
        },
        {
            img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
            title: 'Fern',
        },
        {
            img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
            title: 'Mushrooms',
            rows: 2,
            cols: 2,
        },
        {
            img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
            title: 'Tomato basil',
        },
        {
            img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
            title: 'Sea star',
        },
        {
            img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
            title: 'Bike',
            cols: 2,
        },
    ];
    return (
        <div className='flex lg:flex-row flex-col-reverse h-auto'>
            <div className=' w-full lg:w-11/12 h-full border-2 rounded-md shadow-md mx-auto bg-white py-3 ' >
                <div className='mb-5 p-2 w-full mx-auto roundedx-md'>
                    <p className='font-semibold text-lg text-center mb-2' >All Videos</p>
                    <ImageList
                        sx={{ width: '100%', height: '100vh' }}
                        variant="quilted"
                        cols={4}
                        rowHeight={121}

                    >
                        {itemData.map((item) => (
                            <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1} onClick={handleOpen}>

                                <img
                                    {...srcset(item.img, 121, item.rows, item.cols)}
                                    alt={item.title}
                                    loading="lazy"
                                />


                            </ImageListItem>
                        ))}
                    </ImageList>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        style={{ overflow: 'auto' }}
                    >
                        <Post />
                    </Modal>
                </div>
            </div>
        </div>
    );
}

export default Videos;
