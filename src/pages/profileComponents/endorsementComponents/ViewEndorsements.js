import React, { useState } from 'react';
import '../../../App.css'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Button, Divider, TextField, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'
import api from '../../../api/api';
import { useSnackbar } from 'notistack';



const ViewEndorsemets = ({ viewEndorse, setViewEndorse, Skill }) => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const userData = useSelector(state => state.userData.data)
    const dispatch = useDispatch()


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '45%',
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
                open={viewEndorse}
                onClose={() => { setViewEndorse(false) }}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={viewEndorse}>
                    <Box sx={style}>
                        <Typography variant='h5' style={{ textAlign: 'center' }}>
                            All Endorsements
                        </Typography>
                        <Divider style={{ marginBottom: 5 }} />
                        {
                            Skill.endorsements.map((item) => {

                                return (
                                    <div className='flex flex-1 rounded-md shadow-sm '>
                                        <img src={item.endorserID.profilePhoto} alt='user image' className="rounded-full h-12 w-12 m-3" />
                                        <div className="my-auto">
                                            <a href='#' className='text-sm font-semibold'>{item.endorserID.firstName} {item.endorserID.lastName}</a>
                                            <p className='text-xs text-gray-600' >{item.endorserID.userType + " " + item.endorserID.program} Department</p>
                                            <p className=' text-gray-700 italic'>&ldquo; {item.comments} &rdquo;</p>
                                        </div>
                                    </div>
                                )

                            })
                        }

                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

export default ViewEndorsemets;