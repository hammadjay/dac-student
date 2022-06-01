import React, { useState } from 'react';
import '../../App.css'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
import { Button, Divider, TextField, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'
import api from '../../api/api';
import { useSnackbar } from 'notistack';

const CreateMeeting = ({ addMeeting, setMeeting }) => {

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const userData = useSelector(state => state.userData.data)
    const dispatch = useDispatch()
    const [title, setTitle] = useState("")
    const [time, setTime] = useState(new Date())


    const addMeetingHandler = () => {
        if (title.length !== 0 && time.length !== 0) {

            api.post(`/users/meetings/create`,
                {
                    Title: title,
                    hostedBy: userData._id,
                    sessionDate: time
                })
                .then((result) => {
                    setMeeting(false)
                    handleSnackbar('Meeting added successfully', 'success')
                    // setIsAnyChange(true)
                    window.location.reload()
                })
                .catch((e) => {
                    console.log(e)
                    handleSnackbar('Oops! an error occurred', 'error')
                })
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
                open={addMeeting}
                onClose={() => { setMeeting(false) }}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={addMeeting}>
                    <Box sx={style}>
                        <Typography variant='h5' style={{ textAlign: 'center' }}>
                            Add Meeting
                        </Typography>
                        <Divider style={{ marginBottom: 5 }} />

                        <div className='flex justify-center mt-3' >
                            <TextField
                                variant='outlined'
                                placeholder='Meeting Title'
                                fullWidth
                                required
                                value={title}
                                onChange={(e) => { setTitle(e.target.value) }}
                            />
                        </div>
                        <Typography variant='h6' style={{ textAlign: 'center' }}>
                            Pick date and time
                        </Typography>
                        <Flatpickr
                            data-enable-time
                            value={time}
                            onChange={(date) => {
                                setTime(date)
                            }}
                        />
                        <div className="flex flex-1 justify-center items-center mt-3">
                            <Button onClick={() => { addMeetingHandler() }} className='text-lg text-secondary ' variant='contained' >Add Meeting</Button>

                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

export default CreateMeeting;