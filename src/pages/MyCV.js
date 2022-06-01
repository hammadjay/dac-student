import { useState, useEffect } from 'react';
import { MdEdit, MdDelete, MdFileDownload } from "react-icons/md";
import '../App.css'
import CvThumbnail from '../img/CvThumbnail.jpg'
import { Divider } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Visibility } from '@mui/icons-material';
import LeftNavbar from './NavComponents/LeftNavbar';
import TopNav from './NavComponents/TopNav';
import JobNav from './NavComponents/JobsNav';
import ResponsiveTopNav from './NavComponents/ResponsiveTopNav';
import api from '../api/api';
import { useSelector, useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack';
import template1 from '../img/Template1.jpg'
import { CircularProgress } from '@mui/material';
import { saveAs } from 'file-saver';
import EditCv from './cvBuilderComponents/EditCv';
import ResponsiveJM from './NavComponents/ResponsiveJM'


const MyCVItem = ({ item, deleteCv }) => {
    const [isDownloading, setIsDownloading] = useState(false)
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const userData = useSelector(state => state.userData.data)
    const [createCv, setcreateCv] = useState(false)

    useEffect(() => {
        if (isDownloading) {
            downloadPDF(item)
        }
    }, [isDownloading])
    
    const handleSnackbar = (message, variant) => {
        enqueueSnackbar(message, { variant });
    };
    const downloadPDF = (data) => {
        console.log(data)
        api.post(`/users/create-pdf/${userData._id}`, data)
            .then(() => {
                api.get(`/users/fetch-pdf/${userData._id}`, { responseType: 'arraybuffer' })
                    .then(res => {
                        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
                        saveAs(pdfBlob, `${data.firstName}'s Resume.pdf`);
                        handleSnackbar('CV Created Successfully', 'success')
                        setIsDownloading(false)
                    })
                    .catch(err => {
                        handleSnackbar('An error occurred', 'error')
                        setIsDownloading(false)
                    });
            })
            .catch(err => {
                handleSnackbar('An error occurred', 'error')
                setIsDownloading(false)
            });
    };
    return (
        <div>
            {
                createCv ?
                    <EditCv createCv={createCv} setcreateCv={setcreateCv}  prevData={item} />
                    :
                    <></>
            }
            <div className=' px-4 py-1 justify-between ' >
                <div className='flex my-2' >
                    <img src={item.templateId === "1" ? template1 : CvThumbnail} alt='cv thumbnail' className='border-2 h-32 w-auto ' />
                    <div className='mx-2'>
                        <a className='font-semibold text-primary' >{item.headline}</a>
                    </div>
                </div>
                <Divider />
                <div className='flex justify-around w-2/5 mx-auto my-2 ' >
                    {/* <button className=' mx-1'>  <Visibility size={24} className='my-auto text-gray-500' /></button> */}
                    <button className=' mx-1' onClick={() =>{setcreateCv(true)}}>  <MdEdit size={24} className='my-auto text-gray-500' /></button>
                    <button className=' mx-1' onClick={() => { deleteCv(item._id) }}>  <MdDelete size={24} className='my-auto text-gray-500 ' /></button>
                    {isDownloading ?
                        <CircularProgress color='primary' variant='indeterminate' size={20} />

                        :
                        <button className=' mx-1' onClick={() => {
                            setIsDownloading(true)

                        }}>  <MdFileDownload size={24} className='my-auto text-gray-500 ' /></button>
                    }
                </div>

            </div>
            <Divider />
        </div>
    )
}
function MyCv() {
    const userData = useSelector(state => state.userData.data)
    const [cvData, setCvData] = useState([])
    const [refresh, setResfresh] = useState(true)
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    useEffect(() => {
        if (refresh) {
            api.get(`/users/myCV/${userData._id}`)
                .then((result) => {
                    setCvData(result.data)
                    setResfresh(false)
                })
                .catch(() => { handleSnackbar('Oops An error encountered', 'error') })
        }
    }, [refresh])

    const [page, setPage] = useState(1);
    const handlePage = (event, value) => {
        setPage(value);
    };
    const handleSnackbar = (message, variant) => {
        enqueueSnackbar(message, { variant });
    };

    const deleteCv = (id) => {
        api.put(`/users/deleteCV/${id}`)
            .then((result) => {
                setResfresh(true)
                handleSnackbar('Successfully deleted', 'success')
            })
            .catch(() => { handleSnackbar('Oops An error encountered', 'error') })
    };

    return (
        <div className=" h-full bg-gray-100 lg:overflow-hidden ">
            <div className='2xl:w-8/12 mx-auto'>

                <div className='sticky top-0'>
                    {/*Header*/}
                    <div className=' flex flex-1 bg-white h-12 shadow-md lg:hidden '>
                        <ResponsiveTopNav />
                    </div>
                    <ResponsiveJM mycv/>
                </div>
                {/*Body*/}
                <div className='flex flex-1 h-auto '>
                    {/*Left*/}
                    <LeftNavbar />


                    {/*Center*/}
                    <div className="flex flex-col h-full w-full lg:w-2/3">
                        {/*navigator*/}
                        <TopNav />
                        <div className='bg-white lg:w-5/6 h-auto mx-auto rounded-md shadow-md my-1 p-1'>
                            <p className=' pl-2 font-semibold text-lg'>My CVs</p>

                            <div className='mx-auto'>
                                {
                                    refresh ?
                                        <div className='mx-auto'>
                                            <CircularProgress color='primary' variant='indeterminate' size={20} />
                                        </div>
                                        :
                                        cvData.length === 0 ?
                                            <p>No Cvs found</p>
                                            :
                                            <></>
                                }
                                {
                                    cvData.map((item, index) => {
                                        return (<MyCVItem key={index} item={item} deleteCv={deleteCv} />)
                                    })
                                }


                            </div>
                            <div className='justify-center flex mt-2' >
                                <Stack spacing={2}>
                                    <Pagination count={1} page={page} onChange={handlePage} />
                                </Stack>

                            </div>
                        </div>

                    </div>
                    {/*Right*/}
                    <div className="lg:block hidden w-1/3 justify-evenly sticky top-0 h-screen overflow-auto no-scrollbar pt-16 ">
                        <JobNav mycv />

                    </div>
                </div>
            </div>

        </div>

    );
}

export default MyCv;
