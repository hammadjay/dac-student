import React, { useState } from 'react';
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { FaBuilding } from "react-icons/fa";
import '../../App.css'
import { Button, Divider } from '@mui/material';
import ViewJob from './ViewJob';
import api from '../../api/api';
import EditJob from './EditJob';
import { useSelector, useDispatch } from 'react-redux'
import { updateData } from '../../features/userData/userData'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IoCaretDown } from 'react-icons/io5';
import { useSnackbar } from 'notistack';
import ViewApplicants from './ViewApplicants';


const JobItem = ({ item, isAnyChange, setIsAnyChange }) => {
    const userData = useSelector(state => state.userData.data)
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const dispatch = useDispatch()
    const [viewJob, setViewJob] = useState(false)
    const [editjob, setEdit] = useState(false)
    const [viewApplicants, setApplicants] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDeleteJob = (id) => {
        api.delete(`/users/job/deleteJob/${id}`)
            .then(() => {
                setIsAnyChange(true)
                enqueueSnackbar("Changes successful", { variant: 'success' });
            })
            .catch((e) => {
                console.log(e)
                enqueueSnackbar("Oops An Error occurred", { variant: 'error' })
            })
    }
    const handleSaveJob = (id) => {
        api.post(`/users/job/saveJob/${userData._id}/${id}`)
            .then((response) => {
                localStorage.setItem("loggedUser", JSON.stringify(response.data))
                dispatch(updateData(response.data))
                setIsAnyChange(true)
                enqueueSnackbar("Changes successful", { variant: 'success' });
            })
            .catch((e) => {
                console.log(e)
                enqueueSnackbar("Oops An Error occurred", { variant: 'error' })
            })
    }
    const handleUnSaveJob = (id) => {
        api.post(`/users/job/unsaveJob/${userData._id}/${id}`)
            .then((response) => {
                localStorage.setItem("loggedUser", JSON.stringify(response.data))
                dispatch(updateData(response.data))
                setIsAnyChange(true)
                enqueueSnackbar("Changes successful", { variant: 'success' });
            })
            .catch((e) => {
                console.log(e)
                enqueueSnackbar("Oops An Error occurred", { variant: 'error' })
            })
    }

    const isSaved = () => {
        return userData.savedJob.length > 0 && userData.savedJob.filter((job) => { return job._id === item._id }).length !== 0
    }

    return (
        <div>
            {
                viewJob
                    ?
                    <ViewJob item={item} viewJob={viewJob} setViewJob={setViewJob} />
                    :
                    <></>
            }
            {
                item?.PostedBy?._id === userData?._id && editjob ?
                    <EditJob setIsAnyChange={setIsAnyChange} item={item} editJob={editjob} setJob={setEdit} />
                    :
                    <></>
            }
            {
                viewApplicants ?
                <ViewApplicants jid={item._id} viewApplicants={viewApplicants} setApplicants={setApplicants}  />
                :
                <></>
            }
            <div className='flex  px-4 py-1 justify-between ' >
                <div className='flex' >
                    <FaBuilding size={32} className='my-auto' />
                    <div className='mx-2'>
                        <Button variant='text' color='primary' style={{ margin: 0, padding: 0, fontWeight: 'bold' }} onClick={() => { setViewJob(true) }}>{item.Title}</Button>
                        <p className='text-sm ' >{item.Company}</p>
                        <p className='text-xs' >{item.City}</p>
                        <p className='text-xs font-semibold'>{item.dateJobCreated} {item.timeJobCreated}</p>
                    </div>
                </div>
                <div className='item-center my-auto' >
                    {
                        item.PostedBy._id === userData._id ?
                            <>
                                <Button
                                    id="basic-button"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                    color='primary'
                                    variant='contained'
                                >
                                    Actions <IoCaretDown />
                                </Button>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <MenuItem onClick={()=>{
                                        handleClose()
                                        setApplicants(true)
                                    }}>View Applicants</MenuItem>
                                    <MenuItem onClick={() => {
                                        setEdit(true)
                                        handleClose()
                                    }}>Edit</MenuItem>
                                    <MenuItem onClick={() => {
                                        handleDeleteJob(item._id)
                                        handleClose()
                                    }}>Delete</MenuItem>
                                </Menu>
                                {/* <Button onClick={() => { setEdit(true) }}>Edit</Button> */}
                                {/* <Button color='error' onClick={() => { handleDeleteJob(item._id) }}>Delete</Button> */}
                            </>
                            :
                            isSaved() ?

                                <button onClick={() => { handleUnSaveJob(item._id) }}><BsBookmarkFill size={24} className='my-auto' /></button>
                                :
                                <button onClick={() => { handleSaveJob(item._id) }}><BsBookmark size={24} className='my-auto' /></button>

                    }
                </div>

            </div>
            <Divider />
        </div>
    )
}


export default JobItem;