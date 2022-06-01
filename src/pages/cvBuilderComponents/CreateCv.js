import { useState, useEffect } from 'react';
import '../../App.css'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { MdEdit } from "react-icons/md";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import InputMask from 'react-input-mask';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import FormGroup from '@mui/material/FormGroup';
import { saveAs } from 'file-saver';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Slider from '@mui/material/Slider';
import Select from '@mui/material/Select';
import { Button, Divider, TextField, Typography } from '@mui/material';
import Radio from '@mui/material/Radio';
import { useSelector, useDispatch } from 'react-redux'
import api from '../../api/api';
import { useSnackbar } from 'notistack';
import template1 from '../../img/Template1.jpg'
import { CircularProgress } from '@mui/material';


const CreateCv = ({ createCv, setcreateCv, setIsAnyChange }) => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const userData = useSelector(state => state.userData.data)
    const dispatch = useDispatch()
    const [step, setStep] = useState("1")
    const [isWaiting, setIsWaiting] = useState(false)
    const [cvData, setCvData] = useState({
        templateId: '',
        userId: userData._id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        headline: '',
        bio: '',
        contact: userData.phone,
        email: userData.email,
        twitter: userData.twitter,
        github: userData.github,
        linkedin: userData.linkedin,
        facebook: userData.facebook,
        youtube: userData.youtube,
        experience: userData.workExperience,
        skills: userData.skills,
        education: userData.education
    })
    const [addEducation, setAddEducation] = useState({
        instituteName: '',
        educationLevel: '',
        startYear: '',
        endYear: '',
        Major: '',
        inProgress: false
    })
    const [addSkill, setAddSkill] = useState({
        skillName: '',
        skillLevel: '',
    })
    const [addExperience, setAddExperience] = useState({
        companyName: '',
        designation: '',
        joinDate: '',
        endDate: '',
        inProgress: false
    })
    const createAndDownloadPDF = () => {
        api.post(`/users/createCV/${userData._id}`, cvData)
            .then((result) => {
                api.post(`/users/create-pdf/${userData._id}`, cvData)
                    .then(() => {
                        api.get(`/users/fetch-pdf/${userData._id}`, { responseType: 'arraybuffer' })
                            .then(res => {
                                const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
                                saveAs(pdfBlob, `${cvData.firstName}'s Resume.pdf`);
                                handleSnackbar('CV Created Successfully', 'success')
                                setcreateCv(false)
                            })
                            .catch(err => {
                                handleSnackbar('An error occurred', 'error')
                            });
                    })
                    .catch(err => {
                        handleSnackbar('An error occurred', 'error')
                    });

            }).catch((err) => { handleSnackbar('An error occurred', 'error') })
    };
    

    useEffect(() => {
        if (isWaiting) {
            createAndDownloadPDF()
        }
    }, [isWaiting])

    const handleSnackbar = (message, variant) => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar(message, { variant });
    };
    const deleteEducation = (item) => {
        const NewEducation = cvData.education.filter((edu) => { return JSON.stringify(edu) !== JSON.stringify(item) })

        setCvData({ ...cvData, education: NewEducation })

    }
    const deleteSkill = (item) => {
        const NewSkill = cvData.skills.filter((edu) => { return JSON.stringify(edu) !== JSON.stringify(item) })

        setCvData({ ...cvData, skills: NewSkill })

    }
    const deleteExperience = (item) => {
        const NewExperience = cvData.experience.filter((edu) => { return JSON.stringify(edu) !== JSON.stringify(item) })

        setCvData({ ...cvData, experience: NewExperience })

    }

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
                open={createCv}
                onClose={() => { setcreateCv(false) }}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={createCv}>
                    <Box sx={style}>
                        {
                            (() => {
                                switch (step) {
                                    case '1':
                                        return (
                                            <>
                                                <Typography variant='h5' style={{ textAlign: 'center' }}>
                                                    Create CV
                                                </Typography>
                                                <Divider style={{ marginBottom: 5 }} />
                                                <Typography variant='overline' >
                                                    Basic Info
                                                </Typography>
                                                <div className='flex justify-center' >
                                                    <TextField
                                                        variant="outlined"
                                                        margin="normal"
                                                        fullWidth
                                                        name="FirstName"
                                                        label="First Name"
                                                        id="FirstName"
                                                        placeholder="not set"
                                                        value={cvData.firstName}
                                                        required
                                                        onChange={(e) => { setCvData({ ...cvData, firstName: e.target.value }) }}

                                                    />
                                                </div>
                                                <div className='flex justify-center mt-3' >
                                                    <TextField
                                                        variant="outlined"
                                                        margin="normal"
                                                        fullWidth
                                                        name="LastName"
                                                        label="Last Name"
                                                        id="LastName"
                                                        placeholder="not set"
                                                        value={cvData.lastName}
                                                        required
                                                        onChange={(e) => { setCvData({ ...cvData, lastName: e.target.value }) }}


                                                    />
                                                </div>
                                                <div className='flex justify-center mt-3' >
                                                    <TextField
                                                        variant="outlined"
                                                        margin="normal"
                                                        fullWidth
                                                        name="Contact"
                                                        label="Contact"
                                                        id="Contact"
                                                        placeholder="not set"
                                                        value={cvData.contact}
                                                        required
                                                        onChange={(e) => { setCvData({ ...cvData, contact: e.target.value }) }}
                                                        type='tel'
                                                    />
                                                </div>
                                                <div className='flex justify-center mt-3' >
                                                    <TextField
                                                        variant="outlined"
                                                        margin="normal"
                                                        fullWidth
                                                        name="Email"
                                                        label="Email"
                                                        id="Email"
                                                        placeholder="not set"
                                                        value={cvData.email}
                                                        onChange={(e) => { setCvData({ ...cvData, email: e.target.value }) }}
                                                        type='url'
                                                    />
                                                </div>
                                                <div className='flex justify-center mt-3' >
                                                    <TextField
                                                        variant="outlined"
                                                        margin="normal"
                                                        fullWidth
                                                        name="Headline"
                                                        label="Headline"
                                                        id="Headline"
                                                        placeholder="Example: Software Enginner or MERN Developer"
                                                        value={cvData.headline}
                                                        onChange={(e) => { setCvData({ ...cvData, headline: e.target.value }) }}
                                                        type='url'
                                                    />
                                                </div>
                                                <div className='flex justify-center mt-3' >
                                                    <TextField
                                                        variant="outlined"
                                                        margin="normal"
                                                        fullWidth
                                                        name="Bio"
                                                        label="Bio"
                                                        id="Bio"
                                                        multiline
                                                        placeholder="Tell us about yourself"
                                                        value={cvData.bio}
                                                        onChange={(e) => { setCvData({ ...cvData, bio: e.target.value }) }}
                                                        type='url'
                                                    />
                                                </div>

                                                <Typography variant='overline' >
                                                    Education
                                                </Typography>
                                                {
                                                    cvData.education.length === 0 ? <p class='text-center'>No education yet</p> : <></>
                                                }
                                                {
                                                    cvData.education.map((cv, i) => {
                                                        return (
                                                            <EducationCard key={i} item={cv} deleteEducation={deleteEducation} />
                                                        )
                                                    })
                                                }
                                                <TextField
                                                    variant="outlined"
                                                    margin="normal"
                                                    fullWidth
                                                    name="Institue Name"
                                                    label="Institue Name"
                                                    id="Institue Name"
                                                    required
                                                    placeholder="BeaconHouse,Roots,COMSATS"
                                                    value={addEducation.instituteName}
                                                    onChange={(e) => { setAddEducation({ ...addEducation, instituteName: e.target.value }) }}
                                                />
                                                <TextField
                                                    variant="outlined"
                                                    margin="normal"
                                                    fullWidth
                                                    name="Education Level"
                                                    label="Education Level"
                                                    id="Education Level"
                                                    required
                                                    placeholder="Bachelors,Matric,intermediate"
                                                    value={addEducation.educationLevel}
                                                    onChange={(e) => { setAddEducation({ ...addEducation, educationLevel: e.target.value }) }}
                                                />
                                                <TextField
                                                    variant="outlined"
                                                    margin="normal"
                                                    fullWidth
                                                    name="Major"
                                                    label="Major"
                                                    id="Major"
                                                    required
                                                    placeholder="Computer Science,Biology,Electrical Engineering "
                                                    value={addEducation.Major}
                                                    onChange={(e) => { setAddEducation({ ...addEducation, Major: e.target.value }) }}
                                                />
                                                <FormGroup className='my-2'>
                                                    <FormControlLabel control={<Switch checked={addEducation.inProgress} onChange={(e) => setAddEducation({ ...addEducation, inProgress: e.target.checked })} />} label="In Progress" />
                                                </FormGroup>
                                                <div className="flex flex-1 my-1 justify-between">
                                                    <InputMask mask="9999" value={addEducation.startYear} onChange={(e) => { setAddEducation({ ...addEducation, startYear: e.target.value }) }}  >
                                                        {() => <TextField
                                                            required
                                                            label="Start Year"
                                                            placeholder="2000"
                                                            helperText='1950-2050'
                                                        />}
                                                    </InputMask>
                                                    {
                                                        addEducation.inProgress ?
                                                            <></>
                                                            :
                                                            <InputMask mask="9999" value={addEducation.endYear} onChange={(e) => { setAddEducation({ ...addEducation, endYear: e.target.value }) }} >
                                                                {() => <TextField
                                                                    required
                                                                    label="End Year"
                                                                    placeholder="2000"
                                                                    helperText='1950-2050'

                                                                />}
                                                            </InputMask>
                                                    }
                                                </div>
                                                <div className="flex flex-1 justify-center items-center">
                                                    <Button onClick={() => {
                                                        setCvData({ ...cvData, education: [...cvData.education, addEducation] })
                                                        setAddEducation({
                                                            instituteName: '',
                                                            educationLevel: '',
                                                            startYear: '',
                                                            endYear: '',
                                                            Major: '',
                                                            inProgress: false
                                                        })
                                                    }} className='text-lg text-secondary ' variant='contained' >Add Education</Button>
                                                </div>
                                                <Typography variant='overline' >
                                                    Skills
                                                </Typography>
                                                {
                                                    cvData.skills.length === 0 ? <p class='text-center'>No Skills yet</p> : <></>
                                                }
                                                {
                                                    cvData.skills.map((cv, i) => {
                                                        return (
                                                            <SkillCard key={i} item={cv} deleteSkill={deleteSkill} />
                                                        )
                                                    })
                                                }
                                                <TextField
                                                    variant="outlined"
                                                    margin="normal"
                                                    fullWidth
                                                    name="Skill Name"
                                                    label="Skill Name"
                                                    id="Skill Name"
                                                    required
                                                    placeholder="Java,Node.js,Python"
                                                    value={addSkill.skillName}
                                                    onChange={(e) => { setAddSkill({ ...addSkill, skillName: e.target.value }) }}

                                                />
                                                <InputLabel id="demo-simple-select-label">Experience Level</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={addSkill.skillLevel}
                                                    label="Experience Level"
                                                    onChange={(e) => { setAddSkill({ ...addSkill, skillLevel: e.target.value }) }}
                                                    required
                                                >
                                                    <MenuItem value={'Beginner'}>Beginner</MenuItem>
                                                    <MenuItem value={'Intermediate'}>Intermediate</MenuItem>
                                                    <MenuItem value={'Expert'}>Expert</MenuItem>
                                                </Select>

                                                <div className="flex flex-1 justify-center items-center">
                                                    <Button onClick={() => {
                                                        setCvData({ ...cvData, skills: [...cvData.skills, addSkill] })
                                                        setAddSkill({
                                                            skillName: '',
                                                            skillLevel: '',
                                                        })
                                                    }} className='text-lg text-secondary ' variant='contained' >Add Skill</Button>
                                                </div>
                                                <Typography variant='overline' >
                                                    Work Experience
                                                </Typography>
                                                {
                                                    cvData.experience.length === 0 ? <p class='text-center'>No Experience yet</p> : <></>
                                                }
                                                {
                                                    cvData.experience.map((cv, i) => {
                                                        return (
                                                            <ExperienceCard key={i} item={cv} deleteExperience={deleteExperience} />
                                                        )
                                                    })
                                                }
                                                <TextField
                                                    variant="outlined"
                                                    margin="normal"
                                                    fullWidth
                                                    name="Company Name"
                                                    label="Company Name"
                                                    id="Company Name"
                                                    required
                                                    placeholder="Google,Facebook,Afiniti"
                                                    value={addExperience.companyName}
                                                    onChange={(e) => { setAddExperience({ ...addExperience, companyName: e.target.value }) }}
                                                />
                                                <TextField
                                                    variant="outlined"
                                                    margin="normal"
                                                    fullWidth
                                                    name="Designation"
                                                    label="Designation"
                                                    id="Designation"
                                                    required
                                                    placeholder="Project Manager,Developer,Teacher"
                                                    value={addExperience.designation}
                                                    onChange={(e) => { setAddExperience({ ...addExperience, designation: e.target.value }) }}
                                                />
                                                <FormGroup className='my-2'>
                                                    <FormControlLabel control={<Switch checked={addExperience.inProgress} onChange={(e) => setAddExperience({ ...addExperience, inProgress: e.target.checked })} />} label="In Progress" />
                                                </FormGroup>
                                                <div className="flex flex-1 my-1 justify-between">
                                                    <InputMask mask="99/9999" value={addExperience.joinDate} onChange={(e) => { setAddExperience({ ...addExperience, joinDate: e.target.value }) }}  >
                                                        {() => <TextField
                                                            required
                                                            label="Join Date"
                                                            placeholder="01/2018"
                                                            helperText='MM/YYYY'
                                                        />}
                                                    </InputMask>
                                                    {
                                                        addExperience.inProgress ?
                                                            <></>
                                                            :
                                                            <InputMask mask="99/9999" value={addExperience.endDate} onChange={(e) => { setAddExperience({ ...addExperience, endDate: e.target.value }) }} >
                                                                {() => <TextField
                                                                    required
                                                                    label="End Date"
                                                                    placeholder="02/2019"
                                                                    helperText='MM/YYYY'

                                                                />}
                                                            </InputMask>
                                                    }
                                                </div>
                                                <div className="flex flex-1 justify-center items-center">
                                                    <Button onClick={() => {
                                                        setCvData({ ...cvData, experience: [...cvData.experience, addExperience] })
                                                        setAddExperience({
                                                            companyName: '',
                                                            designation: '',
                                                            joinDate: '',
                                                            endDate: '',
                                                            inProgress: false
                                                        })
                                                    }} className='text-lg text-secondary ' variant='contained' >Add Experience</Button>
                                                </div>
                                                <Typography variant='overline' >
                                                    Social Links
                                                </Typography>
                                                <div className='flex justify-center' >
                                                    <TextField
                                                        variant="outlined"
                                                        margin="normal"
                                                        fullWidth
                                                        name="Github"
                                                        label="Github"
                                                        id="Github"
                                                        placeholder="not set"
                                                        value={cvData.github}
                                                        onChange={(e) => { setCvData({ ...cvData, contact: e.target.value }) }}
                                                        type='url'
                                                    />
                                                </div>
                                                <div className='flex justify-center mt-3' >
                                                    <TextField
                                                        variant="outlined"
                                                        margin="normal"
                                                        fullWidth
                                                        name="Linkedin"
                                                        label="Linkedin"
                                                        id="Linkedin"
                                                        placeholder="not set"
                                                        value={cvData.linkedin}
                                                        onChange={(e) => { setCvData({ ...cvData, contact: e.target.value }) }}
                                                        type='url'


                                                    />
                                                </div>
                                                <div className='flex justify-center mt-3' >
                                                    <TextField
                                                        variant="outlined"
                                                        margin="normal"
                                                        fullWidth
                                                        name="Twitter"
                                                        label="Twitter"
                                                        id="Twitter"
                                                        placeholder="not set"
                                                        value={cvData.twitter}
                                                        onChange={(e) => { setCvData({ ...cvData, twitter: e.target.value }) }}
                                                        type='url'
                                                    />
                                                </div>
                                                <div className='flex justify-center mt-3' >
                                                    <TextField
                                                        variant="outlined"
                                                        margin="normal"
                                                        fullWidth
                                                        name="Facebook"
                                                        label="Facebook"
                                                        id="Facebook"
                                                        placeholder="not set"
                                                        value={cvData.facebook}
                                                        onChange={(e) => { setCvData({ ...cvData, facebook: e.target.value }) }}
                                                        type='url'
                                                    />
                                                </div>
                                                <div className='flex justify-center mt-3' >
                                                    <TextField
                                                        variant="outlined"
                                                        margin="normal"
                                                        fullWidth
                                                        name="Youtube"
                                                        label="Youtube"
                                                        id="Youtube"
                                                        placeholder="not set"
                                                        value={cvData.youtube}
                                                        onChange={(e) => { setCvData({ ...cvData, youtube: e.target.value }) }}
                                                        type='url'
                                                    />
                                                </div>
                                            </>
                                        )
                                    case '2':
                                        return (
                                            <>
                                                <Typography variant='h5' style={{ textAlign: 'center' }}>
                                                    Select Template
                                                </Typography>
                                                <Divider style={{ marginBottom: 5 }} />

                                                <div className='flex flex-1 justify-center items-center'>
                                                    <div className='flex flex-1 flex-col justify-center' >
                                                        <div>
                                                            <img src={template1} className=' h-64 w-auto border-2 mx-auto border-gray-500' />
                                                        </div>
                                                        <Radio
                                                            checked={cvData.templateId === '1'}
                                                            onChange={() => { setCvData({ ...cvData, templateId: "1" }) }}
                                                            value="1"
                                                            name="radio-buttons"
                                                        />
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    default:
                                        return <></>
                                }
                            })()
                        }
                        {
                            (() => {
                                switch (step) {
                                    case "1":
                                        return (
                                            <div className="flex flex-1 justify-center items-center mt-3">
                                                <Button onClick={() => { setStep("2") }} className='text-lg text-secondary ' variant='contained' >Next</Button>

                                            </div>
                                        )
                                    case "2":
                                        return (
                                            <div className="flex flex-1 justify-center items-center mt-3">
                                                <Button onClick={() => { setStep("1") }} disabled={isWaiting} className='text-lg text-secondary mr-3 ' variant='contained' >Back</Button>
                                                <Button onClick={() => {
                                                    setIsWaiting(true)
                                                }} disabled={cvData.templateId.length === 0 || isWaiting} className='text-lg text-secondary ' variant='contained' >
                                                    Create CV
                                                    {
                                                        isWaiting ?
                                                            <div className='mx-auto'>
                                                                <CircularProgress color='primary' variant='indeterminate' size={20} />
                                                            </div>
                                                            :
                                                            <></>
                                                    }
                                                </Button>

                                            </div>
                                        )

                                    default:
                                        setStep("1")
                                }
                            })()
                        }

                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

const EducationCard = ({ item, deleteEducation }) => {
    // const [editEducation, setEditEducation] = useState(false)
    // const deleteEducation = (id) => {

    // }
    return (
        <>
            {/* {
                editEducation ?
                    <EditEducation editEducation={editEducation} setEditEducation={setEditEducation} eID={item._id} />
                    :
                    <></>
            } */}

            <div className=' border flex bg-white p-2 rounded-lg w-full justify-between my-2 ' style={{ 'box-shadow': 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }} >
                <div className='ml-2' >
                    <p className='text-sm ml-1 my-1 font-semibold'>{item.instituteName}</p>
                    <p className='text-xs ml-1 my-1'>{item.educationLevel}</p>
                    <p className='text-xs ml-1 my-1'>{item.Major}</p>
                    <p className='text-xs ml-1 my-1'>{item.startYear}-{item.inProgress ? "present" : item.endYear}</p>
                </div>
                <div className="flex self-end" >
                    {/* <div >
                        <Button variant='outlined' color='primary' onClick={() => {}} >Edit</Button>
                    </div> */}
                    <div className="ml-1">
                        <Button variant='contained' color='error' onClick={() => { deleteEducation(item) }} >Delete</Button>
                    </div>

                </div>
            </div>
        </>
    )
}
const SkillCard = ({ item, deleteSkill }) => {

    return (
        <>

            <div className=' border flex bg-white p-2 rounded-lg w-full justify-between my-2 ' style={{ 'box-shadow': 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }}  >
                <div className='ml-2' >
                    <p className='text-sm ml-1  my-1  font-semibold'>{item.skillName}</p>
                    <p className='text-xs ml-1  my-1 '>{item.skillLevel}</p>

                </div>
                <div className="flex self-end " >

                    <div className="ml-1">
                        <Button variant='contained' color='error' onClick={() => { deleteSkill(item) }} >Delete</Button>
                    </div>

                </div>
            </div>
        </>
    )
}
const ExperienceCard = ({ item, deleteExperience }) => {

    return (
        <>

            <div className=' border flex bg-white p-2 rounded-lg w-full justify-between my-2 ' style={{ 'box-shadow': 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }}  >

                <div className='ml-2' >
                    <p className='text-sm ml-1 my-1 font-semibold'>{item.companyName}</p>
                    <p className='text-xs ml-1 my-1'>{item.designation}</p>
                    <p className='text-xs ml-1 my-1'>{item.joinDate}-{item.inProgress ? "present" : item.endDate}</p>
                </div>
                <div className="flex self-end " >

                    <div className="ml-1">
                        <Button variant='contained' color='error' onClick={() => { deleteExperience(item) }} >Delete</Button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CreateCv;