import { useState } from 'react';
import { MdPhotoLibrary, MdVideoLibrary, MdFileUpload, MdClose } from "react-icons/md";
import '../../App.css'
import { Button, Divider, Modal } from '@mui/material';
import Box from '@mui/material/Box';
import api from '../../api/api'
import { pdfjs } from 'react-pdf';
// import PDFViewer from 'pdf-viewer-reactjs'
import { useSelector } from 'react-redux'
import { useSnackbar } from 'notistack';


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Createpost = ({ setRefreshFeed, setPosts, isGroupPost = false, groupId = null}) => {
    const userData = useSelector(state => state.userData.data)
    const [uploadFiles, setUploadFiles] = useState([])
    const [postText, setPostText] = useState('')
    const [open, setOpen] = useState(false);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();


    const handleSnackbar = (message, variant) => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar(message, { variant });
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        minWidth: '300px',
        width: 'auto',
        height: 'auto',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 1
    };

    const uploadPost = () => {

        const formData = new FormData();
        
        for (const key of Object.keys(uploadFiles)) {
            formData.append('files', uploadFiles[key])
        }
        formData.append('userId', userData._id);
        formData.append('desc', postText);
        formData.append('groupId',groupId );
        
        if(isGroupPost){
            api.post('/users/createGroupPost', formData)
            .then((result) => {
                handleClose()
                setUploadFiles([])
                setPostText('')
                setPosts([])
                setRefreshFeed(true)
                handleSnackbar('Posted successfully', 'success')

            })
            .catch((err) => {
                console.log(err)
                handleSnackbar('Oops An error encountered', 'error')

            })
        }
        else{
            api.post('/users/posts', formData)
            .then((result) => {
                handleClose()
                setUploadFiles([])
                setPostText('')
                setPosts([])
                setRefreshFeed(true)
                handleSnackbar('Posted successfully', 'success')

            })
            .catch((err) => {
                console.log(err)
                handleSnackbar('Oops An error encountered', 'error')

            })
        }
        
    }
    return (
        <>

            <div onClick={handleOpen} className='w-full md:w-9/12 rounded-lg shadow-md bg-white mx-auto border border-gray-300 my-2' >
                <div className='flex justify-center'>
                    <img src={userData.profilePhoto} alt='user image' className="rounded-full h-10 m-3" />
                    <button className='rounded-full my-auto text-left bg-gray-300 h-full w-4/5 p-2 '><p className='text-gray-500'>Tell us whats new...</p> </button>
                </div>
                <hr className='w-4/5 mx-auto m-3' />
                <div className='flex justify-evenly m-3'>
                    <button className="flex">
                        <MdPhotoLibrary className='text-primary' size={20} />
                        <p className='my-auto ml-2 text-sm'>Photo</p>
                    </button>
                    <button className="flex ">
                        <MdVideoLibrary className=' text-red-600' size={20} />
                        <p className='my-auto ml-2 text-sm'>Video</p>
                    </button>
                    <button className=" hidden md:flex ">
                        <MdFileUpload className='text-green-500 ' size={20} />
                        <p className='my-auto ml-2  text-sm'>Document</p>
                    </button>
                </div>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className=' w-4/12 rounded-lg'>
                    <div className='flex w-full justify-center items-center'>
                        <span className='text-center font-bold py-3' >Create Post</span>
                        <button className='absolute right-0'><MdClose size={32} onClick={handleClose} className='mx-5 my-2 ml-auto' /></button>
                    </div>
                    <Divider />
                    <button className='flex mr-10 px-5 my-1'>
                        <div className='my-auto mx-2'>
                            <img src={userData.profilePhoto} alt='user image' className="rounded-full " width={50} height={50} />
                        </div>
                        <div className="my-auto">
                            <p className='text-black text-sm font-semibold'>{userData?.firstName} {userData?.lastName}</p>
                            {/* <span className='text-black text-xs text-left bg-gray-400 p-1 rounded-md'>Public</span> */}
                        </div>

                    </button>
                    <div className='px-3'>
                        <textarea type='text' value={postText} onChange={(e) => { setPostText(e.target.value) }} rows='5' className=' resize-none focus:outline-none w-full  ' placeholder='Share whats on your mind . . . ' />
                    </div>
                    <input className='focus:outline-none' type='file' multiple onChange={(event) => {
                        const image = event.target.files[0];

                        if (!image) {
                            console.log('image is required');
                            return false;
                        }
                        if (!image.name.match(/\.(jpg|jpeg|png|pdf|mp4)$/)) {
                            console.log('select valid files');

                        }
                        else if (event.target.files && event.target.files[0]) {
                            // const files = []
                            // for (let i = 0; i < event.target.files.length; i++) {
                            //     files.push(event.target.files[i])
                            //     // formData.append(`files[${i}]`,uploadFiles[i] )
                            // }
                            setUploadFiles(event.target.files)
                            // setCropImg(true)
                        }
                    }
                    } />
                    <p className='text-xs text-gray-600'>You can choose upto 10 files (png,jpg,pdf,mp4)</p>
                    <Button variant='outlined' color='primary' style={{ marginRight: 5 }} disabled={postText.replaceAll(/\s/g, '').length === 0} onClick={() => { uploadPost() }}>
                        Upload
                    </Button>
                </Box>
            </Modal>
        </>
    )
}

export default Createpost;