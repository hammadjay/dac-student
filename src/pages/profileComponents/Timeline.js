import { useState, useEffect } from 'react';
import { AiFillFacebook, AiOutlineTwitter, AiFillLinkedin, AiFillYoutube, AiFillGithub } from "react-icons/ai";
import { BsPersonFill } from "react-icons/bs";
import { MdEmail, MdContactPhone, MdCake } from "react-icons/md";
import { IoBriefcase } from "react-icons/io5";
import { GiSkills } from "react-icons/gi";
import { FaBuilding, FaSchool, FaUserGraduate, } from "react-icons/fa";
import { BiInfoCircle, BiWorld, BiMapPin } from "react-icons/bi";
import { CircularProgress } from '@mui/material';
import '../../App.css'
import { Divider } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux'
import EndorseSkill from "./endorsementComponents/EndorseSkill";
import api from '../../api/api';
import { useSnackbar } from 'notistack';
import ViewEndorsemets from './endorsementComponents/ViewEndorsements';
import Post from '../digitalWallComponents/Posts'
import Createpost from '../digitalWallComponents/Createpost'

const UserInfoCard = ({ user }) => {
    const dob = user.dateOfBirth
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let dateOfBirth = ''
    if (dob) {
        dateOfBirth = dob.split('T')[0].split('-')[2] + '-' + months[parseInt(dob.split('T')[0].split('-')[1]) - 1] + '-' + dob.split('T')[0].split('-')[0]
    }
    
    return (
        <div className='w-full  flex flex-col rounded-lg shadow-md bg-white mx-auto border border-gray-300 my-2 px-4 py-2' >
            <div className='flex'>
                <BiInfoCircle size={22} className='text-primary' />
                <span className='font-semibold ml-4' >User Info</span>
            </div>
            <div className='my-3' >

                <div className='flex my-1'>
                    <BsPersonFill size={18} className='text-gray-500' />
                    <span className='text-sm ml-1' >{user.firstName + " " + user.lastName}</span>
                </div>

                <div className='flex my-1'>
                    <MdEmail size={18} className='text-gray-500' />
                    <span className='text-sm ml-1' > {user.email}</span>
                </div>

                <div className='flex my-1'>
                    <MdContactPhone size={18} className='text-gray-500' />
                    <span className='text-sm ml-1' > {user.phone}</span>
                </div>

                <div className='flex my-1'>
                    <MdCake size={18} className='text-gray-500' />
                    <span className='text-sm ml-1' >{dateOfBirth}</span>
                </div>

                <div className='flex my-1'>
                    <BiWorld size={18} className='text-gray-500' />
                    <span className='text-sm ml-1' > {user.country}</span>
                </div>

                <div className='flex my-1'>
                    <BiMapPin size={18} className='text-gray-500' />
                    <span className='text-sm ml-1' > {user.city + ',' + user.state}</span>
                </div>
            </div>
            <hr />

            <div className='my-3'>
                <p className='font-semibold text-sm my-1'>User Type:<span className=' font-normal'>{user.userType}</span> </p>
                <p className='font-semibold text-sm my-1'>Registration No:<span className=' font-normal'>{user.registrationNumber}</span> </p>
                <p className='font-semibold text-sm my-1'>Department:<span className=' font-normal'>{user.program}</span> </p>
            </div>
            <hr />
            <div className='my-3'>
                <p className='font-semibold text-sm'>Social Links</p>
                <div className='flex justify-around my-1' >
                    <a href={user.facebook !== undefined || user.facebook !== '' ? user.facebook : ''} target="_blank">
                        <AiFillFacebook size={38} color={user.facebook === undefined || user.facebook === '' ? '#808080' : '#395185'} />

                    </a>
                    <a href={user.twitter !== undefined || user.twitter !== '' ? user.twitter : ''} target="_blank">
                        <AiOutlineTwitter size={38} color={user.twitter === undefined || user.twitter === '' ? '#808080' : '#1DA1F2'} />

                    </a>
                    <a href={user.linkedin !== undefined || user.linkedin !== '' ? user.linkedin : ''} target="_blank">
                        <AiFillLinkedin size={38} color={user.linkedin === undefined || user.linkedin === '' ? '#808080' : '#0e76a8'} />

                    </a>

                    <a href={user.youtube !== undefined || user.youtube !== '' ? user.youtube : ''} target="_blank">
                        <AiFillYoutube size={38} color={user.youtube === undefined || user.youtube === '' ? '#808080' : '#FF0000'} />

                    </a>
                    <a href={user.github !== undefined || user.github !== '' ? user.github : ''} target="_blank">
                        <AiFillGithub size={38} color={user.github === undefined || user.github === '' ? '#808080' : '#000000'} />

                    </a>

                </div>
            </div>
        </div>
    )
}
const EducationandWorkCard = ({ education, work }) => {
    return (
        <div className='w-full  flex flex-col rounded-lg shadow-md bg-white mx-auto border border-gray-300 my-2 px-4 py-2' >
            <div className='flex'>
                <FaUserGraduate size={22} className='text-secondary' />
                <span className='font-semibold ml-4' >Education</span>
            </div>
            <div className='my-3' >
                {
                    education.length === 0 ?
                        <div className='flex my-1'>
                            <p className='text-sm ml-1 font-bold'>No Education Details</p>
                        </div>
                        :
                        education.map((item, index) => {
                            return (
                                <>
                                    <div key={index} className='flex my-1' >
                                        <FaSchool size={30} className='text-gray-500 my-auto' />
                                        <div className='ml-2' >
                                            <p className='text-xs ml-1 font-bold'>{item.instituteName}</p>
                                            <p className='text-xs ml-1 '>{item.educationLevel}</p>
                                            <p className='text-xs ml-1 '>{item.Major}</p>
                                            <p className='text-xs ml-1 '>{item.startYear}-{item.inProgress ? "present" : item.endYear}</p>
                                        </div>
                                    </div>
                                    <Divider />
                                </>
                            )
                        })
                }
            </div>
            <div className='flex mt-3'>
                <IoBriefcase size={22} className='text-secondary' />
                <span className='font-semibold ml-4' >Work Experience</span>
            </div>
            <div className='my-3' >
                {
                    work.length === 0 ?
                        <div className='flex my-1'>
                            <p className='text-sm ml-1 font-bold'>No Work Experience</p>
                        </div>
                        :
                        work.map((item, index) => {
                            return (
                                <>
                                    <div key={index} className='flex my-1'>
                                        <FaBuilding size={30} className='text-gray-500 my-auto' />
                                        <div className='ml-2' >
                                            <p className='text-xs ml-1 font-bold'>{item.companyName}</p>
                                            <p className='text-xs ml-1 '>{item.designation}</p>
                                            <p className='text-xs ml-1 '>{item.joinDate}-{item.inProgress ? "present" : item.endDate}</p>
                                        </div>
                                    </div>
                                    <Divider />
                                </>
                            )
                        })
                }
            </div>
        </div >
    )
}
const SkillsCard = ({ skills, userID, setcurrentProfile }) => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const userData = useSelector(state => state.userData.data)
    const dispatch = useDispatch()
    const [Endorse, setEndorse] = useState(false)
    const [viewEndorse, setViewEndorse] = useState(false)
    const [SkillID, setSkillID] = useState('')
    const [Skill, setSkill] = useState(null)


    const unEndorseSkill = (endorsementID, skillID) => {
        api.put(`users/endorsements/remove/${userID}/${skillID}/${endorsementID}`)
            .then((result) => {
                setcurrentProfile(result.data)
                console.log(result.data)
                handleSnackbar("Unendorsed Skill Successfully", 'success')
            })
            .catch((e) => { handleSnackbar("Oops ! an error occurred", 'error') })
    }

    const handleSnackbar = (message, variant) => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar(message, { variant });
    };
    console.log(skills)
    return (
        <div className='w-full  flex flex-col rounded-lg shadow-md bg-white mx-auto border border-gray-300 my-2 px-4 py-2' >
            <div className='flex'>
                <GiSkills size={22} className='text-secondary' />
                <span className='font-semibold ml-4' >Skills</span>
            </div>
            <div className='my-3' >
                {
                    skills.length === 0 ?
                        <div className='flex my-1'>
                            <p className='text-sm ml-1 font-bold'>No Skills Available</p>
                        </div>
                        :
                        skills.map((item, index) => {
                            var isEndorsed = item.endorsements.filter((e) => {
                                console.log(e)
                                return e.endorserID._id === userData._id;
                            })
                            return (
                                <>
                                    <div key={item._id} className='ml-4 my-2' >
                                        <p className='text-sm ml-1 font-bold'>{item.skillName} <span className='font-normal text-sm ml-1'> &bull;<button className="text-blue-600" onClick={() => {
                                            setViewEndorse(true)
                                            setSkill(item)
                                        }}> {item.endorsements.length} endorsements </button> </span> </p>
                                        <p className='text-xs ml-1 '>{item.skillLevel}</p>

                                        {
                                            userID === userData._id ?
                                                <>
                                                </>
                                                :
                                                isEndorsed.length > 0 ?
                                                    <button className='ml-1' onClick={() => {
                                                        unEndorseSkill(isEndorsed[0]._id, item._id)
                                                    }}><p className='text-sm font-semibold text-red-500'  >Unendorse Skill</p></button>
                                                    :
                                                    <button className='ml-1' onClick={() => {
                                                        setEndorse(true)
                                                        setSkillID(item._id)
                                                    }}><p className='text-sm font-semibold text-secondary'  >Endorse Skill</p></button>
                                        }
                                    </div>
                                    <hr />
                                </>
                            )
                        })
                }
            </div>
            {
                Endorse ?
                    <EndorseSkill Endorse={Endorse}
                        setEndorse={setEndorse}
                        UserID={userID}
                        SkillID={SkillID}
                        setcurrentProfile={setcurrentProfile} />
                    :
                    <></>
            }
            {
                viewEndorse ?
                    <ViewEndorsemets viewEndorse={viewEndorse} setViewEndorse={setViewEndorse} Skill={Skill} />
                    :
                    <></>
            }
        </div>
    )
}

export default function Timeline({ user, setcurrentProfile }) {

    const userData = useSelector(state => state.userData.data)
    const [posts, setPosts] = useState([]);
    const [refreshFeed, setRefreshFeed] = useState(true)
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    useEffect(() => {
        if (refreshFeed) {
            api.get(`/users/posts/${user._id}`)
                .then((result) => {
                    console.log(result.data)
                    setPosts(result.data.posts)
                    setRefreshFeed(false)
                })
                .catch((err) => {
                    handleSnackbar('Oops An error encountered', 'error')

                })
        }
    }, [refreshFeed])

    const handleSnackbar = (message, variant) => {
        enqueueSnackbar(message, { variant });
    };

    return (
        <>
            <div className='flex lg:flex-row flex-col h-auto'>
                <div className=' ml-1 w-full lg:w-2/6 h-full '>
                    <UserInfoCard user={user} />
                    <EducationandWorkCard education={user.education} work={user.workExperience} />
                    <SkillsCard skills={user.skills} userID={user._id} setcurrentProfile={setcurrentProfile} />
                </div>
                <div className=' w-full lg:w-4/6  h-full' >
                    {
                        user._id === userData._id ?
                            <Createpost setRefreshFeed={setRefreshFeed} setPosts={setPosts} />
                            :
                            <></>
                    }
                    {
                        refreshFeed ?
                            <div className='mx-auto'>
                                <CircularProgress color='primary' variant='indeterminate' size={20} />
                            </div>
                            :
                            posts.length === 0 ?
                                <p className='text-center'>No posts found.</p>
                                : <></>
                    }
                    {
                        posts.map((post, index) => {
                            return <Post key={index} setPosts={setPosts} setRefreshFeed={setRefreshFeed} index={index} post={post} />
                        })
                    }
                </div>
            </div>
        </>
    )
}