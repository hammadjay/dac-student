import { MdEdit } from "react-icons/md";
import '../App.css'
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import MuiPhoneNumber from 'material-ui-phone-number';
import 'react-image-crop/dist/ReactCrop.css';
import 'react-phone-input-2/lib/style.css'
import InputMask from 'react-input-mask';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import FormControlLabel from '@mui/material/FormControlLabel';
import Fade from '@mui/material/Fade';
import TextField from '@mui/material/TextField';
import TopNav from './NavComponents/TopNav';
import SettingsNav from './NavComponents/SettingsNav';
import ResponsiveTopNav from './NavComponents/ResponsiveTopNav';
import Button from '@mui/material/Button'
import Switch from '@mui/material/Switch';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormGroup from '@mui/material/FormGroup';
import { useSelector, useDispatch } from 'react-redux'
import { updateData } from '../features/userData/userData'
import { useEffect, useState } from "react";
import api from "../api/api";
import { Alert } from "@mui/material";
import ResponsiveSN from "./NavComponents/ResponsiveSN";
const imageToBase64 = require('image-to-base64');

function EditProfile() {
    const userData = useSelector(state => state.userData.data)
    const dispatch = useDispatch()

    const [addEducation, setAddEducation] = useState(false)
    const [addExperience, setAddExperience] = useState(false)
    const [addSkill, setAddSkill] = useState(false)
    const [cropImg, setCropImg] = useState(false)
    const [editImg, setEditImg] = useState(userData.profilePhoto)
    const [email, setEmail] = useState(userData.email)
    const [phone, setPhone] = useState(userData.phone === undefined ? '+92 308-5604476' : userData.phone)
    const [facebook, setFacebook] = useState(userData.facebook)
    const [github, setGithub] = useState(userData.github)
    const [youtube, setYoutube] = useState(userData.youtube)
    const [twitter, setTwitter] = useState(userData.twitter)
    const [linkedin, setLinkedin] = useState(userData.linkedin)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)


    const emailRegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const urlRegExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/

    const updateProfile = (type, newItem) => {
        api.put(`/users/editprofile/UpdateProfile/${userData._id}`,
            {
                type: type,
                newItem: newItem
            })
            .then((result) => {
                dispatch(updateData(result.data))
                localStorage.setItem('loggedUser', JSON.stringify(result.data))

            })
            .catch((e) => {
                setError(true)
                setErrorMessage('Internal Server Error!')

            })

    }
    return (
        <div className=" h-screen bg-white " >
            <div className='2xl:w-8/12 mx-auto'>
                <div className='sticky top-0'>
                    {/*Header*/}
                    <div className=' flex flex-1 bg-white h-12 shadow-md lg:hidden '>
                        <ResponsiveTopNav />
                    </div>
                </div>

                {/*Body*/}
                <div className='flex lg:w-3/4 flex-1 flex-col h-screen mx-auto '>
                    {/*navigator*/}
                    <TopNav />
                    <div className=' h-full'>
                        <div className='flex lg:flex-row flex-col h-full shadow-2xl'>
                                <SettingsNav edit />
                            
                            <ResponsiveSN />
                            <div className=' w-full lg:w-3/4 bg-white overflow-auto py-4 px-3 no-scrollbar' style={{ height: '90vh' }} >

                                {
                                    error ?
                                        <Alert variant="filled" onClose={() => { setError(false) }} severity="error" >
                                            {errorMessage}
                                        </Alert> :
                                        <></>
                                }

                                <div className="flex justify-center">
                                    <label className=' inline-block cursor-pointer' for="img">
                                        <div className="flex justify-center ">
                                            <img alt="user" src={editImg} className='rounded-full shadow-md w-32 h-32 ' />
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

                                        }
                                        else if (event.target.files && event.target.files[0]) {
                                            console.log(event)
                                            setEditImg(URL.createObjectURL(image))
                                            // setCropImg(true)
                                        }
                                    }
                                    }
                                />

                                <div className=' w-full lg:w-5/6 mx-auto ' >
                                    <p className=' text-lg font-semibold' >Basic Info</p>
                                    <div className='flex justify-around mt-3' >
                                        <TextField

                                            label="First Name"
                                            defaultValue={userData.firstName}
                                            variant='outlined'
                                            disabled

                                        />
                                        <TextField

                                            label="Last Name"
                                            defaultValue={userData.lastName}
                                            variant='outlined'
                                            disabled
                                        />
                                    </div>
                                    <div className='flex justify-around mt-3' >
                                        <TextField

                                            label="Batch"
                                            defaultValue={userData.batch}
                                            variant='outlined'
                                            contentEditable={false}
                                            disabled
                                            style={{ width: '80px' }}
                                        />
                                        <TextField

                                            label="Department"
                                            defaultValue={userData.program}
                                            variant='outlined'

                                            disabled
                                            style={{ width: '110px' }}
                                        />
                                        <TextField

                                            label="Roll no"
                                            defaultValue={userData.registrationNumber !== undefined ? userData.registrationNumber.substr(9, 11) :'undefined'}
                                            variant='outlined'
                                            disabled
                                            style={{ width: '80px' }}
                                        />
                                    </div>
                                    <div className='flex justify-center mt-3' >
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            value={userData.gender}
                                            label='Gender'
                                            disabled
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
                                            value={email}
                                            onChange={(e) => { setEmail(e.target.value) }}
                                            type='email'

                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment>    
                                                        <IconButton
                                                            edge="end"
                                                        >
                                                            <MdEdit />
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    </div>
                                    {
                                        email !== userData.email ?
                                            <div >
                                                <Button variant='contained' color='success' style={{ marginRight: 5 }} className="mr-2" disabled={!(emailRegExp.test(email))} onClick={() => { updateProfile('email', email) }} >Update</Button>
                                                <Button variant='contained' color='error' className="ml-2" onClick={() => { setEmail(userData.email) }} >Cancel</Button>
                                            </div>
                                            :
                                            <></>
                                    }
                                    <div className="my-3">
                                        <MuiPhoneNumber label='phone' country={'pk'} value={phone} onChange={(e) => { setPhone(e) }} countryCodeEditable={false} />
                                    </div>
                                    {
                                        phone !== userData.phone ?
                                            <div >
                                                <Button variant='contained' color='success' style={{ marginRight: 5 }} onClick={() => { updateProfile('phone', phone) }} >Update</Button>
                                                <Button variant='contained' color='error' onClick={() => { setPhone(userData.phone) }} >Cancel</Button>
                                            </div>
                                            :
                                            <></>
                                    }
                                    <p className=' text-lg mt-2 font-semibold' >Education</p>
                                    {
                                        userData.education.map((item, index) => {
                                            return (
                                                <EducationCard key={index} item={item} />
                                            )
                                        })
                                    }

                                    <Button className='text-lg text-secondary' variant='outlined' onClick={() => { setAddEducation(true) }} >+ Add new</Button>

                                    <p className='text-lg mt-2 font-semibold' >Experience</p>
                                    {
                                        userData.workExperience.map((item, index) => {
                                            return (
                                                <ExperienceCard key={index} item={item} />
                                            )
                                        })
                                    }
                                    <Button className='text-lg text-secondary' variant='outlined' onClick={() => setAddExperience(true)} >+ Add new</Button>

                                    <p className='text-lg mt-2 font-semibold ' >Skills</p>
                                    {
                                        userData.skills.map((item, index) => {
                                            return (
                                                <SkillCard key={index} item={item} />
                                            )
                                        })
                                    }
                                    <Button className='text-lg text-secondary' variant='outlined' onClick={() => setAddSkill(true)} >+ Add new</Button>

                                    <p className='text-lg mt-2 font-semibold' >Social Links</p>
                                    <div className='flex justify-center mt-3' >
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            name="Facebook"
                                            label="Facebook"
                                            id="Facebook"
                                            placeholder="not set"
                                            value={facebook}
                                            onChange={(e) => { setFacebook(e.target.value) }}
                                            type='url'

                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment>
                                                        <IconButton
                                                            edge="end"
                                                        >
                                                            <MdEdit />
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    </div>
                                    {
                                        facebook !== userData.facebook ?
                                            <div >
                                                <Button variant='contained' color='success' style={{ marginRight: 5 }} className="mr-2" disabled={!(urlRegExp.test(facebook))} onClick={() => { updateProfile('facebook', facebook) }} >Update</Button>
                                                <Button variant='contained' color='error' className="ml-2" onClick={() => { setFacebook(userData.facebook) }} >Cancel</Button>
                                            </div>
                                            :
                                            <></>
                                    }
                                    <div className='flex justify-center mt-3' >
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            name="Github"
                                            label="Github"
                                            id="Github"
                                            placeholder="not set"
                                            value={github}
                                            onChange={(e) => { setGithub(e.target.value) }}
                                            type='url'

                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment>
                                                        <IconButton
                                                            edge="end"
                                                        >
                                                            <MdEdit />
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    </div>
                                    {
                                        github !== userData.github ?
                                            <div >
                                                <Button variant='contained' color='success' style={{ marginRight: 5 }} className="mr-2" disabled={!(urlRegExp.test(github))} onClick={() => { updateProfile('github', github) }} >Update</Button>
                                                <Button variant='contained' color='error' className="ml-2" onClick={() => { setGithub(userData.github) }} >Cancel</Button>
                                            </div>
                                            :
                                            <></>
                                    }
                                    <div className='flex justify-center mt-3' >
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            name="Youtube"
                                            label="Youtube"
                                            id="Youtube"
                                            placeholder="not set"
                                            value={youtube}
                                            onChange={(e) => { setYoutube(e.target.value) }}
                                            type='url'

                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment>
                                                        <IconButton
                                                            edge="end"
                                                        >
                                                            <MdEdit />
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    </div>
                                    {
                                        youtube !== userData.youtube ?
                                            <div >
                                                <Button variant='contained' color='success' style={{ marginRight: 5 }} className="mr-2" disabled={!(urlRegExp.test(youtube))} onClick={() => { updateProfile('youtube', youtube) }} >Update</Button>
                                                <Button variant='contained' color='error' className="ml-2" onClick={() => { setYoutube(userData.youtube) }} >Cancel</Button>
                                            </div>
                                            :
                                            <></>
                                    }
                                    <div className='flex justify-center mt-3' >
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            name="Linkedin"
                                            label="Linkedin"
                                            id="Linkedin"
                                            placeholder="not set"
                                            value={linkedin}
                                            onChange={(e) => { setLinkedin(e.target.value) }}
                                            type='url'

                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment>
                                                        <IconButton
                                                            edge="end"
                                                        >
                                                            <MdEdit />
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    </div>
                                    {
                                        linkedin !== userData.linkedin ?
                                            <div >
                                                <Button variant='contained' color='success' style={{ marginRight: 5 }} className="mr-2" disabled={!(urlRegExp.test(linkedin))} onClick={() => { updateProfile('linkedin', linkedin) }} >Update</Button>
                                                <Button variant='contained' color='error' className="ml-2" onClick={() => { setLinkedin(userData.linkedin) }} >Cancel</Button>
                                            </div>
                                            :
                                            <></>
                                    }
                                    <div className='flex justify-center mt-3' >
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            name="Twitter"
                                            label="Twitter"
                                            id="Twitter"
                                            placeholder="not set"
                                            value={twitter}
                                            onChange={(e) => { setTwitter(e.target.value) }}
                                            type='url'

                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment>
                                                        <IconButton
                                                            edge="end"
                                                        >
                                                            <MdEdit />
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    </div>
                                    {
                                        twitter !== userData.twitter ?
                                            <div >
                                                <Button variant='contained' color='success' style={{ marginRight: 5 }} className="mr-2" disabled={!(urlRegExp.test(twitter))} onClick={() => { updateProfile('twitter', twitter) }} >Update</Button>
                                                <Button variant='contained' color='error' className="ml-2" onClick={() => { setTwitter(userData.twitter) }} >Cancel</Button>
                                            </div>
                                            :
                                            <></>
                                    }


                                </div>
                            </div>
                            {
                                addEducation ?
                                    <AddEducation addEducation={addEducation} setEducation={setAddEducation} />
                                    :
                                    <></>
                            }
                            {
                                addExperience ?
                                    <AddExperience addExperience={addExperience} setExperience={setAddExperience} />
                                    :
                                    <></>
                            }
                            {
                                addSkill ?
                                    <AddSkill addSkill={addSkill} setSkill={setAddSkill} />
                                    :
                                    <></>
                            }
                            {/* {
                                cropImg ?
                                    <CropImage cropImg={cropImg} setCropImg={setCropImg} image={editImg} updateProfile={updateProfile} />
                                    :
                                    <></>
                            } */}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

// const CropImage = ({ cropImg, setCropImg, image, updateProfile, }) => {
//     const userData = useSelector(state => state.userData.data)
//     const dispatch = useDispatch()

//     const [error, setError] = useState(false)
//     const [errorMessage, setErrorMessage] = useState(false)

//     const [upImg, setUpImg] = useState(image);
//     const imgRef = useRef(null);
//     const previewCanvasRef = useRef(null);
//     const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 1 / 1 });
//     const [completedCrop, setCompletedCrop] = useState(null);

//     const onLoad = useCallback((img) => {
//         imgRef.current = img;
//     }, []);
//     const changePhoto = async() => {

//         const croppedImageUrl = await getCroppedImg(
//             imageRef,
//             crop,
//             'newFile.jpeg'
//           );
//         console.log(completedCrop)
//         // const fileReader = new FileReader();
//         // fileReader.readAsDataURL(crop);
//         // fileReader.onload = () => {
//         //     console.log(fileReader.result)
//         // };
//         // updateProfile('image', crop)
//         // setCropImg(false)
//     }

//     const getCroppedImg = (image, crop, fileName) => {
//         const canvas = document.createElement('canvas');
//         const pixelRatio = window.devicePixelRatio;
//         const scaleX = image.naturalWidth / image.width;
//         const scaleY = image.naturalHeight / image.height;
//         const ctx = canvas.getContext('2d');

//         canvas.width = crop.width * pixelRatio * scaleX;
//         canvas.height = crop.height * pixelRatio * scaleY;

//         ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
//         ctx.imageSmoothingQuality = 'high';

//         ctx.drawImage(
//             image,
//             crop.x * scaleX,
//             crop.y * scaleY,
//             crop.width * scaleX,
//             crop.height * scaleY,
//             0,
//             0,
//             crop.width * scaleX,
//             crop.height * scaleY
//         );

//         return new Promise((resolve, reject) => {
//             canvas.toBlob(
//                 (blob) => {
//                     if (!blob) {
//                         //reject(new Error('Canvas is empty'));
//                         console.error('Canvas is empty');
//                         return;
//                     }
//                     blob.name = fileName;
//                     window.URL.revokeObjectURL(this.fileUrl);
//                     this.fileUrl = window.URL.createObjectURL(blob);
//                     resolve(this.fileUrl);
//                 },
//                 'image/jpeg',
//                 1
//             );
//         });
//     }

//     const style = {
//         position: 'absolute',
//         top: '50%',
//         left: '50%',
//         transform: 'translate(-50%, -50%)',
//         width: '45%',
//         height: '650px',
//         maxWidth: '650px',
//         bgcolor: 'background.paper',
//         boxShadow: 24,
//         p: 4,
//         overflow: 'auto'
//     };

//     return (
//         <div>
//             <Modal
//                 aria-labelledby="transition-modal-title"
//                 aria-describedby="transition-modal-description"
//                 open={cropImg}
//                 onClose={() => { setCropImg(false) }}
//                 closeAfterTransition
//                 BackdropComponent={Backdrop}
//                 BackdropProps={{
//                     timeout: 500,
//                 }}
//             >
//                 <Fade in={cropImg}>
//                     <Box sx={style}>
//                         {
//                             error ?
//                                 <Alert variant="filled" onClose={() => { setError(false) }} severity="error" >
//                                     {errorMessage}
//                                 </Alert> :
//                                 <></>
//                         }
//                         <Typography variant='h5' > Crop and Save image </Typography>
//                         <div className="w-60 h-auto mx-auto">
//                             <ReactCrop
//                                 src={upImg}
//                                 onImageLoaded={onLoad}
//                                 crop={crop}
//                                 onChange={(c) => setCrop(c)}
//                                 onComplete={(c) => setCompletedCrop(c)}
//                             />
//                         </div>

//                         <div className="mx-auto mt-3">
//                             <Button variant='outlined' color='success' onClick={changePhoto} >Change photo</Button>
//                             <Button variant='contained' color='error' style={{ marginLeft: 2 }} onClick={() => setCropImg(false)} >Cancel</Button>
//                         </div>

//                     </Box>
//                 </Fade>
//             </Modal>
//         </div>
//     );
// }
const AddEducation = ({ addEducation, setEducation }) => {
    const userData = useSelector(state => state.userData.data)
    const dispatch = useDispatch()
    const [instituteName, setInstituteName] = useState("")
    const [educationLevel, setEducationLevel] = useState("")
    const [Major, setMajor] = useState("")
    const [startYear, setStartYear] = useState("")
    const [endYear, setEndYear] = useState("")
    const [inProgress, setInProgress] = useState(false)
    const [isAddRequest, setIsAddRequest] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)



    useEffect(() => {
        if (isAddRequest) {
            if (startYear > endYear && !inProgress) {
                setError(true)
                setErrorMessage('Start and end date should be 1950-2050 and Start date cannot be greater than end Year')
            }
            else if (yearRegEx.test(startYear) && yearRegEx.test(endYear) || inProgress) {
                api.put(`/users/editprofile/AddEducation/${userData._id}`,
                    {
                        instituteName: instituteName,
                        educationLevel: educationLevel,
                        startYear: startYear,
                        endYear: inProgress ? "" : endYear,
                        Major: Major,
                        inProgress: inProgress
                    })
                    .then((result) => {
                        dispatch(updateData(result.data))
                        localStorage.setItem('loggedUser', JSON.stringify(result.data))
                        setEducation(false)
                        setInstituteName('')
                        setEducationLevel('')
                        setMajor('')
                        setStartYear('')
                        setEndYear('')
                        setInProgress(false)
                    })
                    .catch((e) => {
                        setError(true)
                        setErrorMessage('Internal Server Error!')

                    })
            }
            else {
                setError(true)
                setErrorMessage('Start and end date should be 1950-2050 and Start date cannot be greater than end Year')
            }
            setIsAddRequest(false)
        }
    }, [isAddRequest])

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

    const yearRegEx = /^(19[5-9]\d|20[0-4]\d|2050)$/
    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={addEducation}
                onClose={() => { setEducation(false) }}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={addEducation}>
                    <Box sx={style}>
                        {
                            error ?
                                <Alert variant="filled" onClose={() => { setError(false) }} severity="error" >
                                    {errorMessage}
                                </Alert> :
                                <></>
                        }
                        <p className="text-xl font-semibold text-center">Add Education</p>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="Institue Name"
                            label="Institue Name"
                            id="Institue Name"
                            required
                            placeholder="BeaconHouse,Roots,COMSATS"
                            value={instituteName}
                            onChange={(e) => { setInstituteName(e.target.value) }}
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
                            value={educationLevel}
                            onChange={(e) => { setEducationLevel(e.target.value) }}
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
                            value={Major}
                            onChange={(e) => { setMajor(e.target.value) }}
                        />
                        <FormGroup className='my-2'>
                            <FormControlLabel control={<Switch checked={inProgress} onChange={(e) => setInProgress(e.target.checked)} />} label="In Progress" />
                        </FormGroup>
                        <div className="flex flex-1 my-1 justify-between">
                            <InputMask mask="9999" value={startYear} onChange={(e) => { setStartYear(e.target.value) }}  >
                                {() => <TextField
                                    required
                                    label="Start Year"
                                    placeholder="2000"
                                    helperText='1950-2050'
                                />}
                            </InputMask>
                            {
                                inProgress ?
                                    <></>
                                    :
                                    <InputMask mask="9999" value={endYear} onChange={(e) => { setEndYear(e.target.value) }} >
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
                            <Button disabled={isAddRequest} onClick={() => setIsAddRequest(true)} className='text-lg text-secondary ' variant='contained' >Add</Button>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
const EditEducation = ({ editEducation, setEditEducation, eID }) => {
    const userData = useSelector(state => state.userData.data)
    const dispatch = useDispatch()
    const eData = userData.education.filter((item) => { return item._id === eID })[0]
    console.log(eData)

    const [instituteName, setInstituteName] = useState(eData.instituteName)
    const [educationLevel, setEducationLevel] = useState(eData.educationLevel)
    const [Major, setMajor] = useState(eData.Major)
    const [startYear, setStartYear] = useState(eData.startYear)
    const [endYear, setEndYear] = useState(eData.endYear)
    const [inProgress, setInProgress] = useState(eData.inProgress)
    const [isEditRequest, setIsEditRequest] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)
    const isEmpty = () => {
        return instituteName == "" && educationLevel == "" && Major == "" && startYear == "" && endYear == ""
    }
    console.log(isEmpty())
    useEffect(() => {
        if (isEditRequest) {
            if (startYear > endYear && !inProgress) {
                setError(true)
                setErrorMessage('Start and end date should be 1950-2050 and Start date cannot be greater than end Year')
            }
            else if (yearRegEx.test(startYear) && yearRegEx.test(endYear)) {
                api.put(`/users/editprofile/EditEducation/${userData._id}/${eID}`,
                    {
                        instituteName: instituteName,
                        educationLevel: educationLevel,
                        startYear: startYear,
                        endYear: inProgress ? "" : endYear,
                        Major: Major,
                        inProgress: inProgress
                    })
                    .then((result) => {
                        dispatch(updateData(result.data))
                        localStorage.setItem('loggedUser', JSON.stringify(result.data))
                        setEditEducation(false)
                        setInstituteName()
                        setEducationLevel()
                        setMajor()
                        setStartYear()
                        setEndYear()
                        setInProgress()
                    })
                    .catch((e) => {
                        setError(true)
                        setErrorMessage('Internal Server Error!')

                    })
            }
            else {
                setError(true)
                setErrorMessage('Start and end date should be 1950-2050 and Start date cannot be greater than end Year')
            }
            setIsEditRequest(false)
        }
    }, [isEditRequest])

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

    const yearRegEx = /^(19[5-9]\d|20[0-4]\d|2050)$/
    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={editEducation}
                onClose={() => {
                    setEditEducation(false)
                }}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={editEducation}>
                    <Box sx={style}>
                        {
                            error ?
                                <Alert variant="filled" onClose={() => { setError(false) }} severity="error" >
                                    {errorMessage}
                                </Alert> :
                                <></>
                        }
                        <p className="text-xl font-semibold text-center">Edit Education</p>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="Institue Name"
                            label="Institue Name"
                            id="Institue Name"
                            required
                            placeholder="BeaconHouse,Roots,COMSATS"
                            value={instituteName}
                            onChange={(e) => { setInstituteName(e.target.value) }}
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
                            value={educationLevel}
                            onChange={(e) => { setEducationLevel(e.target.value) }}
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
                            value={Major}
                            onChange={(e) => { setMajor(e.target.value) }}
                        />
                        <FormGroup className='my-2'>
                            <FormControlLabel control={<Switch checked={inProgress} onChange={(e) => setInProgress(e.target.checked)} />} label="In Progress" />
                        </FormGroup>
                        <div className="flex flex-1 my-1 justify-between">
                            <InputMask mask="9999" value={startYear} onChange={(e) => { setStartYear(e.target.value) }}  >
                                {() => <TextField
                                    required
                                    label="Start Year"
                                    placeholder="2000"
                                    helperText='1950-2050'
                                />}
                            </InputMask>
                            {
                                inProgress ?
                                    <></>
                                    :
                                    <InputMask mask="9999" value={endYear} onChange={(e) => { setEndYear(e.target.value) }} >
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
                            <Button disabled={isEditRequest || isEmpty()} onClick={() => setIsEditRequest(true)} className='text-lg text-secondary ' variant='contained' >Update</Button>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
const EducationCard = ({ item }) => {
    const userData = useSelector(state => state.userData.data)
    const dispatch = useDispatch()
    const [editEducation, setEditEducation] = useState(false)
    const deleteEducation = (id) => {
        api.put(`/users/editprofile/DeleteEducation/${userData._id}/${id}`,)
            .then((result) => {
                dispatch(updateData(result.data))
                localStorage.setItem('loggedUser', JSON.stringify(result.data))
            })
            .catch((e) => {
                alert('Internal server error! Unable to delete')
            })

    }
    return (
        <>
            {
                editEducation ?
                    <EditEducation editEducation={editEducation} setEditEducation={setEditEducation} eID={item._id} />
                    :
                    <></>
            }

            <div className=' border flex bg-white p-2 rounded-lg w-full justify-between my-2 ' style={{ 'box-shadow': 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }} >
                <div className='ml-2' >
                    <p className='text-sm ml-1 my-1 font-semibold'>{item.instituteName}</p>
                    <p className='text-xs ml-1 my-1'>{item.educationLevel}</p>
                    <p className='text-xs ml-1 my-1'>{item.Major}</p>
                    <p className='text-xs ml-1 my-1'>{item.startYear}-{item.inProgress ? "present" : item.endYear}</p>
                </div>
                <div className="flex self-end" >
                    <div >
                        <Button variant='outlined' color='primary' onClick={() => { setEditEducation(true) }} >Edit</Button>
                    </div>
                    <div className="ml-1">
                        <Button variant='contained' color='error' onClick={() => { deleteEducation(item._id) }} >Delete</Button>
                    </div>

                </div>
            </div>
        </>
    )
}

const AddExperience = ({ addExperience, setExperience }) => {
    const userData = useSelector(state => state.userData.data)
    const dispatch = useDispatch()
    const [companyName, setCompanyName] = useState("")
    const [designation, setDesignation] = useState("")
    const [joinDate, setJoinDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [inProgress, setInProgress] = useState(false)
    const [isEditRequest, setIsEditRequest] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)

    console.log(joinDate)
    useEffect(() => {

        if (isEditRequest) {
            if (joinDate.split('/')[1] > endDate.split('/')[1] && !inProgress) {
                setError(true)
                setErrorMessage('Join date cannot be greater than end date')
            }
            else if (joinDate.split('/')[1] === endDate.split('/')[1] && joinDate.split('/')[0] > endDate.split('/')[0]) {
                setError(true)
                setErrorMessage('Join date cannot be greater than end date')
            }
            else if (yearMonthRegEx.test(joinDate) && yearMonthRegEx.test(endDate) || inProgress) {
                api.put(`/users/editprofile/AddExperience/${userData._id}`,
                    {
                        companyName: companyName,
                        designation: designation,
                        joinDate: joinDate,
                        endDate: inProgress ? "" : endDate,
                        inProgress: inProgress
                    })
                    .then((result) => {
                        dispatch(updateData(result.data))
                        localStorage.setItem('loggedUser', JSON.stringify(result.data))
                        setExperience(false)
                    })
                    .catch((e) => {
                        setError(true)
                        setErrorMessage('Internal Server Error!')

                    })
            }
            else {
                console.log(yearMonthRegEx.test(joinDate), yearMonthRegEx.test(endDate))
                setError(true)
                setErrorMessage('Invalid Date format')
            }
            setIsEditRequest(false)
        }
    }, [isEditRequest])

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

    const yearMonthRegEx = /^(1[0-2]|0[1-9]|\d)\/(20\d{2}|19\d{2}|0(?!0)\d|[1-9]\d)$/
    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={addExperience}
                onClose={() => { setExperience(false) }}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={addExperience}>
                    <Box sx={style}>
                        {
                            error ?
                                <Alert variant="filled" onClose={() => { setError(false) }} severity="error" >
                                    {errorMessage}
                                </Alert> :
                                <></>
                        }
                        <p className="text-xl font-semibold text-center">Add Experience</p>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="Company Name"
                            label="Company Name"
                            id="Company Name"
                            required
                            placeholder="Google,Facebook,Afiniti"
                            value={companyName}
                            onChange={(e) => { setCompanyName(e.target.value) }}
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
                            value={designation}
                            onChange={(e) => { setDesignation(e.target.value) }}
                        />
                        <FormGroup className='my-2'>
                            <FormControlLabel control={<Switch checked={inProgress} onChange={(e) => setInProgress(e.target.checked)} />} label="In Progress" />
                        </FormGroup>
                        <div className="flex flex-1 my-1 justify-between">
                            <InputMask mask="99/9999" value={joinDate} onChange={(e) => { setJoinDate(e.target.value) }}  >
                                {() => <TextField
                                    required
                                    label="Join Date"
                                    placeholder="01/2018"
                                    helperText='MM/YYYY'
                                />}
                            </InputMask>
                            {
                                inProgress ?
                                    <></>
                                    :
                                    <InputMask mask="99/9999" value={endDate} onChange={(e) => { setEndDate(e.target.value) }} >
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
                            <Button disabled={isEditRequest} onClick={() => setIsEditRequest(true)} className='text-lg text-secondary ' variant='contained' >Add</Button>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
const EditExperience = ({ EditExperience, setEditExperience, eID }) => {
    const userData = useSelector(state => state.userData.data)
    const dispatch = useDispatch()

    const eData = userData.workExperience.filter((item) => { return item._id === eID })[0]

    const [companyName, setCompanyName] = useState(eData.companyName)
    const [designation, setDesignation] = useState(eData.designation)
    const [joinDate, setJoinDate] = useState(eData.joinDate)
    const [endDate, setEndDate] = useState(eData.endDate)
    const [inProgress, setInProgress] = useState(eData.inProgress)
    const [isEditRequest, setIsEditRequest] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)

    console.log(joinDate)
    useEffect(() => {

        if (isEditRequest) {
            if (joinDate.split('/')[1] > endDate.split('/')[1] && !inProgress) {
                setError(true)
                setErrorMessage('Join date cannot be greater than end date')
            }
            else if (joinDate.split('/')[1] === endDate.split('/')[1] && joinDate.split('/')[0] > endDate.split('/')[0]) {
                setError(true)
                setErrorMessage('Join date cannot be greater than end date')
            }
            else if (yearMonthRegEx.test(joinDate) && yearMonthRegEx.test(endDate) || inProgress) {
                api.put(`/users/editprofile/EditExperience/${userData._id}/${eID}`,
                    {
                        companyName: companyName,
                        designation: designation,
                        joinDate: joinDate,
                        endDate: inProgress ? "" : endDate,
                        inProgress: inProgress
                    })
                    .then((result) => {
                        dispatch(updateData(result.data))
                        localStorage.setItem('loggedUser', JSON.stringify(result.data))
                        setEditExperience(false)
                    })
                    .catch((e) => {
                        setError(true)
                        setErrorMessage('Internal Server Error!')

                    })
            }
            else {
                console.log(yearMonthRegEx.test(joinDate), yearMonthRegEx.test(endDate))
                setError(true)
                setErrorMessage('Invalid Date format')
            }
            setIsEditRequest(false)
        }
    }, [isEditRequest])

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

    const yearMonthRegEx = /^(1[0-2]|0[1-9]|\d)\/(20\d{2}|19\d{2}|0(?!0)\d|[1-9]\d)$/

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={EditExperience}
                onClose={() => { setEditExperience(false) }}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={EditExperience}>
                    <Box sx={style}>
                        {
                            error ?
                                <Alert variant="filled" onClose={() => { setError(false) }} severity="error" >
                                    {errorMessage}
                                </Alert> :
                                <></>
                        }
                        <p className="text-xl font-semibold text-center">Edit Experience</p>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="Company Name"
                            label="Company Name"
                            id="Company Name"
                            required
                            placeholder="Google,Facebook,Afiniti"
                            value={companyName}
                            onChange={(e) => { setCompanyName(e.target.value) }}
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
                            value={designation}
                            onChange={(e) => { setDesignation(e.target.value) }}
                        />
                        <FormGroup className='my-2'>
                            <FormControlLabel control={<Switch checked={inProgress} onChange={(e) => setInProgress(e.target.checked)} />} label="In Progress" />
                        </FormGroup>
                        <div className="flex flex-1 my-1 justify-between">
                            <InputMask mask="99/9999" value={joinDate} onChange={(e) => { setJoinDate(e.target.value) }}  >
                                {() => <TextField
                                    required
                                    label="Join Date"
                                    placeholder="01/2018"
                                    helperText='MM/YYYY'
                                />}
                            </InputMask>
                            {
                                inProgress ?
                                    <></>
                                    :
                                    <InputMask mask="99/9999" value={endDate} onChange={(e) => { setEndDate(e.target.value) }} >
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
                            <Button disabled={isEditRequest} onClick={() => setIsEditRequest(true)} className='text-lg text-secondary ' variant='contained' >Update</Button>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
const ExperienceCard = ({ item }) => {
    const userData = useSelector(state => state.userData.data)
    const dispatch = useDispatch()
    const [editExperience, setEditExperience] = useState(false)

    const deleteExperience = (id) => {
        api.put(`/users/editprofile/DeleteExperience/${userData._id}/${id}`,)
            .then((result) => {
                dispatch(updateData(result.data))
                localStorage.setItem('loggedUser', JSON.stringify(result.data))
            })
            .catch((e) => {
                alert('Internal server error! Unable to delete')
            })

    }
    return (
        <>
            {
                EditExperience ?
                    <EditExperience EditExperience={editExperience} setEditExperience={setEditExperience} eID={item._id} />
                    :
                    <></>
            }

            <div className=' border flex bg-white p-2 rounded-lg w-full justify-between my-2 ' style={{ 'box-shadow': 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }}  >

                <div className='ml-2' >
                    <p className='text-sm ml-1 my-1 font-semibold'>{item.companyName}</p>
                    <p className='text-xs ml-1 my-1'>{item.designation}</p>
                    <p className='text-xs ml-1 my-1'>{item.joinDate}-{item.inProgress ? "present" : item.endDate}</p>
                </div>
                <div className="flex self-end " >
                    <div>
                        <Button variant='outlined' color='primary' onClick={() => { setEditExperience(true) }} >Edit</Button>
                    </div>
                    <div className="ml-1">
                        <Button variant='contained' color='error' onClick={() => { deleteExperience(item._id) }} >Delete</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

const AddSkill = ({ addSkill, setSkill }) => {
    const userData = useSelector(state => state.userData.data)
    const dispatch = useDispatch()
    const [skillName, setSkillName] = useState("")
    const [skillLevel, setSkillLevel] = useState("")
    const [isEditRequest, setIsEditRequest] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)

    useEffect(() => {

        if (isEditRequest) {
            if (skillName === "" || skillLevel === "") {
                setError(true)
                setErrorMessage('Please provide all of the fields')
            }
            else {
                api.put(`/users/editprofile/AddSkills/${userData._id}`,
                    {
                        skillName: skillName,
                        skillLevel: skillLevel,
                    })
                    .then((result) => {
                        dispatch(updateData(result.data))
                        localStorage.setItem('loggedUser', JSON.stringify(result.data))
                        setSkill(false)
                    })
                    .catch((e) => {
                        setError(true)
                        setErrorMessage('Internal Server Error!')

                    })
            }
            setIsEditRequest(false)
        }
    }, [isEditRequest])

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
                open={addSkill}
                onClose={() => { setSkill(false) }}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={addSkill}>
                    <Box sx={style}>
                        {
                            error ?
                                <Alert variant="filled" onClose={() => { setError(false) }} severity="error" >
                                    {errorMessage}
                                </Alert> :
                                <></>
                        }
                        <p className="text-xl font-semibold text-center">Add Skill</p>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="Skill Name"
                            label="Skill Name"
                            id="Skill Name"
                            required
                            placeholder="Java,Node.js,Python"
                            value={skillName}
                            onChange={(e) => { setSkillName(e.target.value) }}

                        />
                        <InputLabel id="demo-simple-select-label">Experience Level</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={skillLevel}
                            label="Experience Level"
                            onChange={(e) => { setSkillLevel(e.target.value) }}
                            required
                        >
                            <MenuItem value={'Beginner'}>Beginner</MenuItem>
                            <MenuItem value={'Intermediate'}>Intermediate</MenuItem>
                            <MenuItem value={'Expert'}>Expert</MenuItem>
                        </Select>

                        <div className="flex flex-1 justify-center items-center">
                            <Button disabled={isEditRequest} onClick={() => setIsEditRequest(true)} className='text-lg text-secondary ' variant='contained' >Add</Button>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
const EditSkill = ({ EditSkill, setEditSkill, eID }) => {
    const userData = useSelector(state => state.userData.data)
    const dispatch = useDispatch()
    const eData = userData.skills.filter((item) => { return item._id === eID })[0]

    const [skillName, setSkillName] = useState(eData.skillName)
    const [skillLevel, setSkillLevel] = useState(eData.skillLevel)
    const [isEditRequest, setIsEditRequest] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)

    useEffect(() => {

        if (isEditRequest) {

            if (skillName === "" || skillLevel === "") {
                setError(true)
                setErrorMessage('Please provide all of the fields')
            }
            else {

                api.put(`/users/editprofile/EditSkills/${userData._id}/${eID}`,
                    {
                        skillName: skillName,
                        skillLevel: skillLevel,
                    })
                    .then((result) => {
                        console.log('hello jee')
                        dispatch(updateData(result.data))
                        localStorage.setItem('loggedUser', JSON.stringify(result.data))
                        setEditSkill(false)
                    })
                    .catch((e) => {
                        setError(true)
                        setErrorMessage('Internal Server Error!')

                    })
            }

            setIsEditRequest(false)
        }
    }, [isEditRequest])

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
                open={EditSkill}
                onClose={() => { setEditSkill(false) }}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={EditSkill}>
                    <Box sx={style}>
                        {
                            error ?
                                <Alert variant="filled" onClose={() => { setError(false) }} severity="error" >
                                    {errorMessage}
                                </Alert> :
                                <></>
                        }
                        <p className="text-xl font-semibold text-center">Edit Skill</p>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="Skill Name"
                            label="Skill Name"
                            id="Skill Name"
                            required
                            placeholder="Java,Node.js,Python"
                            value={skillName}
                            onChange={(e) => { setSkillName(e.target.value) }}

                        />
                        <InputLabel id="demo-simple-select-label">Experience Level</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={skillLevel}
                            label="Experience Level"
                            onChange={(e) => { setSkillLevel(e.target.value) }}
                            required
                        >
                            <MenuItem value={'Beginner'}>Beginner</MenuItem>
                            <MenuItem value={'Intermediate'}>Intermediate</MenuItem>
                            <MenuItem value={'Expert'}>Expert</MenuItem>
                        </Select>

                        <div className="flex flex-1 justify-center items-center">
                            <Button disabled={isEditRequest} onClick={() => setIsEditRequest(true)} className='text-lg text-secondary ' variant='contained' >Edit</Button>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
const SkillCard = ({ item }) => {
    const userData = useSelector(state => state.userData.data)
    const dispatch = useDispatch()
    const [editSkill, setEditSkill] = useState(false)

    const deleteSkill = (id) => {
        api.put(`/users/editprofile/DeleteSkills/${userData._id}/${id}`,)
            .then((result) => {
                dispatch(updateData(result.data))
                localStorage.setItem('loggedUser', JSON.stringify(result.data))
            })
            .catch((e) => {
                alert('Internal server error! Unable to delete')
            })

    }
    return (
        <>
            {
                editSkill ?
                    <EditSkill EditSkill={editSkill} setEditSkill={setEditSkill} eID={item._id} />
                    :
                    <></>
            }
            <div className=' border flex bg-white p-2 rounded-lg w-full justify-between my-2 ' style={{ 'box-shadow': 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }}  >
                <div className='ml-2' >
                    <p className='text-sm ml-1  my-1  font-semibold'>{item.skillName}</p>
                    <p className='text-xs ml-1  my-1 '>{item.skillLevel}</p>

                </div>
                <div className="flex self-end " >
                    <div >
                        <Button variant='outlined' color='primary' onClick={() => { setEditSkill(true) }} >Edit</Button>
                    </div>
                    <div className="ml-1">
                        <Button variant='contained' color='error' onClick={() => { deleteSkill(item._id) }} >Delete</Button>
                    </div>

                </div>
            </div>
        </>
    )
}
export default EditProfile;
