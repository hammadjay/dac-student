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



const EndorseSkill = ({ Endorse, setEndorse, UserID, SkillID, setcurrentProfile }) => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const userData = useSelector(state => state.userData.data)
    const dispatch = useDispatch()
    const [comment, setComment] = useState('')
    const addEndorsementHandler = () => {
        api.put(`users/endorsements/add/${UserID}/${SkillID}`,
            {
                endorserID: userData._id,
                comments: comment
            }
        )
            .then((result) => {
                setcurrentProfile(result.data)
                handleSnackbar("Endorsed Skill Successfully", 'success')
                setEndorse(false)
                console.log(result.data)
            })
            .catch((e) => { handleSnackbar("Oops ! an error occurred", 'error') })
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
        width: '45%',
        height: 'auto',
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
                open={Endorse}
                onClose={() => { setEndorse(false) }}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={Endorse}>
                    <Box sx={style}>
                        <Typography variant='h5' style={{ textAlign: 'center' }}>
                            Endorse Skill
                        </Typography>
                        <Divider style={{ marginBottom: 5 }} />
                        <div className='flex justify-center mt-3' >
                            <TextField
                                variant='outlined'
                                placeholder='Share Your experience/Reason (Optional)'
                                fullWidth
                                required
                                value={comment}
                                onChange={(e) => { setComment(e.target.value) }}
                            />
                        </div>

                        <div className="flex flex-1 justify-center items-center mt-3">
                            <Button onClick={() => { addEndorsementHandler() }} className='text-lg text-secondary ' variant='contained' >Endorse</Button>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

export default EndorseSkill;