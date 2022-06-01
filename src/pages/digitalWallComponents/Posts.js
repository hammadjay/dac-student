import { useState, useEffect } from 'react';
import { BiComment, BiShareAlt } from "react-icons/bi";
import '../../App.css'
import Send from '@mui/icons-material/Send';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';
import api from '../../api/api'
import { SERVER_UPLOAD_BASE_URL } from '../../features/functions/baseURL';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { Document, Page, pdfjs } from 'react-pdf';
// import PDFViewer from 'pdf-viewer-reactjs'
import { useSelector } from 'react-redux'
import Carousel from "react-elastic-carousel";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
const ITEM_HEIGHT = 48;

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


const Post = ({ post, index, setRefreshFeed, setPosts }) => {
    let history = useHistory();

    const userData = useSelector(state => state.userData.data)
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [postCurrent, setPostCurrent] = useState(post)
    const [isLiked, setisLiked] = useState(post.likes.includes(userData._id))
    const [openComment, setOpenComment] = useState(false)
    const [comment, setComment] = useState('')
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [anchorEl, setAnchorEl] = useState(null);
    const [sortComments, setSortComments] = useState('recent')

    useEffect(() => {
        let temp
        if (sortComments === 'recent') {
            temp = postCurrent.comments
            temp.sort((a, b) => { return new Date(b.date) - new Date(a.date) })
            setPostCurrent({ ...postCurrent, comments: temp })
            console.log('jee')
        }
        else if (sortComments === 'oldest') {
            temp = postCurrent.comments
            temp.sort((a, b) => { return new Date(a.date) - new Date(b.date) })
            setPostCurrent({ ...postCurrent, comments: temp })
            console.log('jee')
        }
    }, [sortComments])

    const open = Boolean(anchorEl);
    const handleSnackbar = (message, variant) => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar(message, { variant });
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }
    const likeUnlikePost = () => {
        api.put(`/users/posts/${postCurrent._id}/like`, {
            userId: userData._id
        })
            .then(res => {
                setPostCurrent(res.data)
                setisLiked(res.data.likes.includes(userData._id))
            })
            .catch(err => console.log(err))
    }
    const commentPost = (comment) => {
        api.put(`/users/posts/${postCurrent._id}/comment`, {
            userId: userData._id,
            text: comment
        })
            .then(res => {
                setPostCurrent(res.data)
                setisLiked(res.data.likes.includes(userData._id))
            })
            .catch(err => console.log(err))
    }
    const deletePost = (id) => {
        api.delete(`/users/posts/${id}`, { userId: userData._id })
            .then(() => {
                setRefreshFeed(true)
                setPosts([])
                handleSnackbar('Post deleted Successfully', 'success')
            })
            .catch((err) => {
                handleSnackbar('An error occurred !', 'error')

            })
    }
    return (
        <div key={index} className=' w-full md:w-9/12 rounded-lg shadow-md bg-white mx-auto border border-gray-300 my-2' >
            {
                postCurrent.isGroupPost ?
                    <>
                        <div className='ml-4 my-1'>
                            <p className='text-sm text-gray-500'>Posted in
                                <span className='text-sm text-gray-600 font-semibold cursor-pointer'
                                    onClick={() => {
                                        history.push('/GroupsInfo/' + postCurrent.groupId._id)
                                    }}> {postCurrent.groupId.title}</span>
                            </p>
                        </div>
                        <hr />
                    </>
                    :
                    <></>
            }
            <div className='flex'>
                <div className='flex flex-1 cursor-pointer' onClick={() => {
                    history.push('/profile/' + postCurrent.userId._id)
                    // window.location.reload()
                }}>
                    <img src={postCurrent?.userId?.profilePhoto} alt='user image' className="rounded-full h-12 m-3" />

                    <div className="my-auto">
                        <p className='text-sm font-semibold'>{postCurrent?.userId?.firstName} {postCurrent?.userId?.lastName}<span className='ml-3 text-xs text-gray-600'>{moment(postCurrent?.createdAt).fromNow()} - {moment(postCurrent?.createdAt).format('MMMM Do YYYY, h:mm a')}</span></p>
                        <p className='text-xs text-gray-600' >{postCurrent?.userId?.userType} {postCurrent?.userId?.program} Department</p>
                        {/* <MdPinDrop className='text-green-500 ' size={12} /> */}
                    </div>
                </div>
                <div className='m-2 p-1'>
                    <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={open ? 'long-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        id="long-menu"
                        MenuListProps={{
                            'aria-labelledby': 'long-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                            style: {
                                maxHeight: ITEM_HEIGHT * 4.5,
                                width: '20ch',
                            },
                        }}
                    >
                        {postCurrent.userId?._id === userData._id ?
                            <div>
                                <MenuItem onClick={() => {
                                    deletePost(postCurrent._id)
                                    handleClose()
                                }}>
                                    Delete
                                </MenuItem>
                                <MenuItem onClick={() => {
                                    handleClose()
                                }}>
                                    Turn Off Comments
                                </MenuItem>
                            </div>
                            :
                            <MenuItem onClick={() => {
                                handleClose()
                            }}>
                                Report Post
                            </MenuItem>
                        }

                    </Menu>
                </div>
            </div>
            <div className=' w-11/12 whitespace-pre-line mx-auto mb-2 ' >
                {postCurrent?.desc}
            </div>
            <div className='w-full h-auto'>
                <Carousel
                    itemsToShow={1}
                    easing="cubic-bezier(1,.15,.55,1.54)"
                    tiltEasing="cubic-bezier(0.110, 1, 1.000, 0.210)"
                    transitionMs={300}
                    pagination={false}
                >

                    {
                        postCurrent.files.map((file, index) => {
                            const split = file.split('.')
                            const filetype = split[split.length - 1]
                            if (filetype == 'jpg' || filetype == 'jpeg' || filetype == 'png') {
                                return (
                                    <Zoom key={index}>
                                        <img src={`${SERVER_UPLOAD_BASE_URL}${file}`} alt='post Image here' className='w-full h-auto' />
                                    </Zoom>
                                )
                            }
                            else if (filetype == 'mp4') {
                                return (
                                    <video key={index} src={`${SERVER_UPLOAD_BASE_URL}${file}`} type="video/mp4" alt='video here' className='w-full h-auto' controls />
                                )
                            }
                            else if (filetype == 'pdf') {

                                return (

                                    <div className='w-full border '>
                                        <Zoom key={index}>
                                            <Document key={index} width={400} size="A4" file={`${SERVER_UPLOAD_BASE_URL}${file}`} onLoadSuccess={onDocumentLoadSuccess}>
                                                <Page width={400} pageNumber={pageNumber} />
                                            </Document>
                                        </Zoom>
                                        <p className='text-center'>page {pageNumber} of {numPages}</p>
                                        <div className='w-full justify-center flex'>
                                            <Button className='text-lg text-secondary' variant='outlined' disabled={pageNumber <= 1} onClick={() => { setPageNumber(pageNumber - 1) }}>
                                                previous
                                            </Button>
                                            <Button className='text-lg text-secondary' variant='outlined' disabled={pageNumber >= numPages} onClick={() => { setPageNumber(pageNumber + 1) }}>
                                                Next
                                            </Button>
                                        </div>
                                    </div>

                                )
                            }
                            else {
                                return (
                                    <p>Not supported file type</p>
                                )
                            }

                        })
                    }
                </Carousel>
            </div>
            <div className='flex justify-between px-16 my-2'>
                <p className='text-sm text-gray-600'>{postCurrent?.likes.length} Likes</p>
                <p className='text-sm text-gray-600'> {postCurrent?.comments.length} comments &bull; {postCurrent?.shared.length} shares </p>
            </div>
            <hr className='w-4/5 mx-auto m-3 border-gray-400 ' />
            <div className='flex  my-1 justify-around'>
                <div className='flex'>
                    {
                        isLiked ?
                            <IconButton onClick={() => { likeUnlikePost() }}>
                                <ThumbUpIcon color='primary' />
                                <p className='px-1 text-sm font-semibold'>Liked</p>
                            </IconButton>
                            :
                            <IconButton onClick={() => { likeUnlikePost() }}>
                                <ThumbUpOffAltIcon color='primary' />
                                <p className='px-1 text-sm '>Like</p>
                            </IconButton>

                    }
                </div>
                <button className='flex items-center' onClick={() => setOpenComment(!openComment)} >
                    <BiComment size={20} className=" text-gray-600 my-auto" />
                    <p className='px-1 text-sm'>Comment</p>

                </button>
                {/* <button className='flex items-center'>
                    <BiShareAlt size={20} className='text-gray-600 my-auto' />
                    <p className='px-1 text-sm'>Share</p>
                </button> */}
            </div>
            <hr className='w-4/5 mx-auto m-3 border-gray-400 ' />
            {
                openComment ?
                    <div>
                        <div className='flex justify-end px-4  text-sm'>
                            <select value={sortComments} onChange={(e) => { setSortComments(e.target.value) }}>
                                <option value="recent">Recent</option>
                                <option value="oldest">Oldest</option>
                            </select>
                        </div>

                        <div>
                            {
                                postCurrent.comments.length === 0 ?
                                    <p className=' text-center text-sm'>No Comments yet</p>
                                    :
                                    <></>
                            }
                            {
                                postCurrent.comments.map((item, index) => {
                                    if (item.userId !== null)
                                        return (
                                            <Comment key={item._id} item={item} />
                                        )
                                })
                            }

                            <div className='px-3'>
                                <FormControl fullWidth sx={{ m: 1 }} variant="standard" >
                                    <InputLabel htmlFor="Comment">Type your Comment</InputLabel>
                                    <Input
                                        id="Comment"
                                        type={'text'}
                                        onChange={(e) => { setComment(e.target.value) }}
                                        onKeyUp={(e) => {
                                            if (e.code === "Enter") {
                                                if (!(comment == null || comment.replaceAll(" ", '').length === 0)) {
                                                    commentPost(comment)
                                                    setComment('')
                                                }
                                            }
                                        }}
                                        value={comment}
                                        autoComplete='off'
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => {
                                                        commentPost(comment)
                                                        setComment('')
                                                    }}
                                                    disabled={comment == null || comment.replaceAll(" ", '').length === 0}
                                                >
                                                    <Send color={comment == null || comment.replaceAll(" ", '').length === 0 ? '' : 'primary'} />
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </div>
                        </div>
                    </div>
                    :
                    <></>
            }

        </div>
    )
}
const Comment = ({ item }) => {
    return (

        <div className='flex justify-center my-2 '>
            <img src={item.userId.profilePhoto} className="rounded-full h-10 w-10 mr-3 my-1" />

            <div className='w-9/12'>
                <div className='  rounded-xl h-auto bg-gray-300 p-2' >
                    <a href='#' className='text-sm font-semibold'>{item?.userId?.firstName} {item?.userId?.lastName}<span className='ml-3 text-xs text-gray-600'>{new Intl.DateTimeFormat('en-GB', {
                        month: 'long',
                        day: '2-digit',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric',
                        hour12: true
                    }).format(new Date(item?.date))}</span></a>
                    <p className='text-xs text-gray-600' >{item?.userId?.userType} {item?.userId?.program} Department</p>
                    <p className='text-sm py-1'>{item.text}</p>
                </div>

            </div>
        </div>

    )

}


export default Post