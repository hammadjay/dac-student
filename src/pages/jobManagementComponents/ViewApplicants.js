import React, { useState, useEffect } from 'react';
import '../../App.css'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { useSelector, useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack';
import { Typography } from '@mui/material';
import { Divider } from '@mui/material';
import api from '../../api/api';
import { SERVER_UPLOAD_BASE_URL } from '../../features/functions/baseURL';



const ViewApplicants = ({ viewApplicants, setApplicants, jid }) => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const userData = useSelector(state => state.userData.data)
    const dispatch = useDispatch()
    const [allApplicants, setAllApplicants] = useState([])

    useEffect(() => {
        api.get(`/users/job/getApplicants/${jid}`)
            .then((result) => {
                console.log(result.data)
                setAllApplicants(result.data)
            })
            .catch((e) => {
                console.log(e)
            })
    }, [])

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
                open={viewApplicants}
                onClose={() => { setApplicants(false) }}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={viewApplicants}>
                    <Box sx={style}>
                        <Typography variant='h5' style={{ textAlign: 'center' }}>
                            View Applicants
                        </Typography>
                        <Divider style={{ marginBottom: 5 }} />
                        <div className="flex flex-col">
                            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Name
                                                    </th>

                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Role
                                                    </th>
                                                    <th scope="col" className="relative px-6 py-3">
                                                        <span className="sr-only">Download</span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {allApplicants.map((applicant) => {
                                                    if (applicant.applicantID !== null) {
                                                        return (
                                                            <tr key={applicant.applicantID.email}>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <a href={`/profile/${applicant.applicantID._id}`} className="flex items-center">
                                                                        <div className="flex-shrink-0 h-10 w-10">
                                                                            <img className="h-10 w-10 rounded-full" src={applicant.applicantID.profilePhoto} alt="" />
                                                                        </div>
                                                                        <div className="ml-4">
                                                                            <div className="text-sm font-medium text-gray-900">{applicant.applicantID.firstName + " " + applicant.applicantID.lastName}</div>
                                                                            <div className="text-sm text-gray-500">{applicant.applicantID.email}</div>
                                                                        </div>
                                                                    </a>
                                                                </td>

                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{applicant.applicantID.userType}</td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                                    <a href={`${SERVER_UPLOAD_BASE_URL}${applicant.applicantCV}`} download className="text-indigo-600 hover:text-indigo-900">
                                                                        Download CV
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                        )
                                                    }
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

export default ViewApplicants;