import React, { useState, useEffect } from 'react'
import '../../App.css'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Button, CircularProgress, Divider, Input, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'
import api from '../../api/api';
import { HiOfficeBuilding } from 'react-icons/hi';
import { LocationCity, Money } from '@mui/icons-material';
import { BiGlobe } from 'react-icons/bi';
import { useSnackbar } from 'notistack';
import socket from '../../socket/socket'

const ApplyJob = ({ applyJob, setApplyJob, jid, uid, setViewJob, PostedBy, title }) => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const userData = useSelector(state => state.userData.data)
    const [selectedFile, setSelectedFile] = useState();
    const [isSelected, setIsSelected] = useState(false);

    const handleApply = () => {
        const formData = new FormData();
        formData.append('file', selectedFile);
        api.post(`/users/job/applyjob/${uid}/${jid}`, formData)
            .then((result) => {
                setApplyJob(false)
                setViewJob(false)
                enqueueSnackbar("Applied successfully!", { variant: 'success' });

                api.post('/users/createNotification', {
                    receiverId: PostedBy,
                    message: `${userData.firstName} ${userData.lastName} Applied on your job : ${title}`,
                    referenceId: jid,
                    Notiftype: 'job'
                })
            })
            .then(() => {
                socket.emit('sendNotificationUpdate', { uid: PostedBy })
            }).catch((err) => { console.log(err) })

            .catch((e) => {
                console.log(e)
                enqueueSnackbar("Ooops! an error occurred !", { variant: 'error' });

            })
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '45%',
        height: '30%',
        maxWidth: '650px',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        overflow: 'auto'
    };

    return (

        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={applyJob}
            onClose={() => { setApplyJob(false) }}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={applyJob}>
                <Box sx={style}>

                    <Typography variant='h5' style={{ textAlign: 'center' }}>
                        Upload CV
                    </Typography>
                    <Divider style={{ marginBottom: 5 }} />
                    <p className='text-lg'>Choose file to upload</p>
                    <input type="file"
                        onChange={(event) => {
                            const file = event.target.files[0];

                            if (!file) {
                                console.log('doc or pdf is required');
                                return false;
                            }
                            if (!file.name.match(/\.(pdf|doc|docx)$/)) {
                                console.log('select valid file.');

                            }
                            else if (event.target.files && event.target.files[0]) {
                                setSelectedFile(event.target.files[0]);
                                setIsSelected(true);
                            }
                        }
                        }
                    />
                    <Button variant='contained' color='success' disabled={!isSelected} onClick={handleApply} >Upload & Apply</Button>
                </Box>
            </Fade>
        </Modal>

    );
}
export default function ViewJob({ item, viewJob, setViewJob }) {

    const userData = useSelector(state => state.userData.data)
    const dispatch = useDispatch()
    const [isApplied, setApplied] = useState(true)
    const [applyJob, setApplyJob] = useState(false)
    useEffect(() => {
        api.get(`users/job/getApplicants/${item._id}`).
            then((reponse) => {
                const applied = reponse.data.filter((item) => { return item.applicantID._id === userData._id })
                if (applied.length !== 0) {
                    setApplied(true)
                }
                else {
                    setApplied(false)
                }
            })
            .catch((e) => { console.log(e) })
    }, [isApplied])


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
                open={viewJob}
                onClose={() => { setViewJob(false) }}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={viewJob}>
                    <Box sx={style}>
                        {
                            applyJob ?
                                <ApplyJob applyJob={applyJob} setApplyJob={setApplyJob} uid={userData._id} jid={item._id} setViewJob={setViewJob} PostedBy={item.PostedBy._id} title={item.Title} />
                                :
                                <></>
                        }

                        <Typography variant='h5' style={{ textAlign: 'center' }}>
                            {item.Title}
                        </Typography>
                        <Divider style={{ marginBottom: 5 }} />
                        <div className='flex justify-between' >
                            <div className='flex flex-1'>
                                <img src={item.PostedBy.profilePhoto} alt='user image' className="rounded-full h-12 m-3" />
                                <div className="my-auto">
                                    <a href='#' className='text-sm font-semibold'>{item.PostedBy.firstName} {item.PostedBy.lastName}<span className='ml-3 text-xs text-gray-600'>{item.dateJobCreated} {item.timeJobCreated}</span></a>
                                    <p className='text-xs text-gray-600' >{item.PostedBy.userType + " " + item.PostedBy.program} Department</p>
                                </div>
                            </div>
                            <div className='flex items-center' >
                                {
                                    item.PostedBy._id === userData._id ?
                                        <></>
                                        :
                                        isApplied ?
                                            <>
                                                <Button variant='contained' disabled color='success' style={{ marginRight: 5 }}>
                                                    Applied
                                                </Button>
                                                {/* <Button variant='contained' color='secondary'>
                                                    Save
                                                </Button> */}
                                            </>
                                            :
                                            <>

                                                <Button variant='outlined' color='primary' style={{ marginRight: 5 }} onClick={() => { setApplyJob(true) }}>
                                                    Apply
                                                </Button>
                                                {/* <Button variant='contained' color='secondary'>
                                                    Save
                                                </Button> */}
                                            </>



                                }


                            </div>
                        </div>
                        <div>
                            <p className='text-lg font-semibold'>Job Details</p>
                            <p className=''><HiOfficeBuilding className=' inline-block' size={20} /> {item.Company}</p>
                            <p className=''><BiGlobe className=' inline-block' size={20} /> {item.City}</p>
                            <p className=''><Money className=' inline-block' size={20} /> {item.SalaryRange?.min}-{item.SalaryRange?.max}</p>
                            <p className=''><p className=' inline-block font-semibold'>Experience Required :</p>{item.ExperienceRequired}+ years</p>
                            <p className=''><p className=' inline-block font-semibold'>Skills :</p>{item.Skills}</p>
                            <p className=''><p className=' inline-block font-semibold'>Career Level :</p>{item.careerLevel}</p>
                            <p className=''><p className=' inline-block font-semibold'>Roles :</p>{item.roles}</p>
                        </div>
                        <div>
                            <p className='text-lg font-semibold'>Description</p>
                            <p className=''>{item.Description}</p>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}