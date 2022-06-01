import React, { useState } from 'react';
import { MdEdit } from "react-icons/md";
import '../../App.css'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Button, Divider, TextField, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'
import api from '../../api/api';
import { useSnackbar } from 'notistack';

const CreateGroup = ({ createGroup, setCreateGroup, setRefreshFeed }) => {

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const userData = useSelector(state => state.userData.data)
    const dispatch = useDispatch()
    const [title, setTitle] = useState("")
    const [bio, setBio] = useState("")
    const [picture, setPicture] = useState(null)

    const createGroupHandler = () => {
        if (title.length !== 0 && picture !== null && bio.length !== 0) {
            const formData = new FormData();
            formData.append('file', picture);
            formData.append('creatorId', userData._id);
            formData.append('title', title);
            formData.append('bio', bio);
            api.post(`/users/createGroup`, formData)
                .then((result) => {
                    setCreateGroup(false)
                    setRefreshFeed(true)
                })
                .catch((error) => { handleSnackbar('Oops an error occurred!', 'error') })
        }
        else {
            handleSnackbar('Please provide all fields!', 'error')
        }

    }
    const handleSnackbar = (message, variant) => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar(message, { variant });
    };
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'auto',
        height: '70%',
        maxWidth: '650px',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        overflow: 'auto'
    };

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={createGroup}
                onClose={() => { setCreateGroup(false) }}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={createGroup}>
                    <Box sx={style}>
                        <Typography variant='h5' style={{ textAlign: 'center' }}>
                            Create Group
                        </Typography>
                        <Divider style={{ marginBottom: 5 }} />


                        <div className="flex justify-center">
                            <label className=' inline-block cursor-pointer' for="img">
                                <div className="flex justify-center ">
                                    <img alt="user" src={picture !== null ? URL.createObjectURL(picture) : "https://static.vecteezy.com/system/resources/previews/000/662/702/original/vector-man-face-cartoon.jpg"} className='rounded-full shadow-md w-32 h-32 ' />
                                    <MdEdit className='-ml-7 bg-gray-700 text-white rounded-full p-1' size={24} />
                                </div>
                            </label>
                        </div>

                        <input className=" hidden" type="file" id="img" name="img" accept="image/*"
                            onChange={(event) => {
                                const image = event.target.files[0];

                                if (!image) {
                                    console.log('image is required');
                                    return false;
                                }
                                if (!image.name.match(/\.(jpg|jpeg|png)$/)) {
                                    console.log('select valid image.');
                                    handleSnackbar('Select a valid image !', 'error')

                                }
                                else if (event.target.files && event.target.files[0]) {
                                    console.log(event)
                                    setPicture(event.target.files[0])
                                    // setCropImg(true)
                                }
                            }
                            }
                        />
                        <div className='flex justify-center mt-3' >
                            <TextField
                                variant='outlined'
                                placeholder='Group Title'
                                fullWidth
                                required
                                value={title}
                                onChange={(e) => { setTitle(e.target.value) }}
                            />
                        </div>
                        <div className='flex justify-center mt-3' >
                            <TextField
                                variant='outlined'
                                placeholder='Bio'
                                fullWidth
                                required
                                multiline
                                maxRows={10}
                                value={bio}
                                onChange={(e) => { setBio(e.target.value) }}
                            />
                        </div>


                        <div className="flex flex-1 justify-center items-center mt-3">
                            <Button onClick={() => { createGroupHandler() }} className='text-lg text-secondary ' variant='contained' >Create Group</Button>

                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

export default CreateGroup;