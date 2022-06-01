import React, { useState } from 'react';
import '../../App.css'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Slider from '@mui/material/Slider';
import Select from '@mui/material/Select';
import { Button, Divider, TextField, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'
import api from '../../api/api';
import { useSnackbar } from 'notistack';



const AddJob = ({ addJob, setJob, setIsAnyChange }) => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const userData = useSelector(state => state.userData.data)
    const dispatch = useDispatch()
    const [minSalaryRange, setMinSalaryRange] = useState(0);
    const [maxSalaryRange, setMaxSalaryRange] = useState(0);
    const [experienceRequired, setExperienceRequired] = useState(0);
    const [Title, setTitle] = useState('');
    const [CompanyName, setCompanyName] = useState('');
    const [Description, setDescription] = useState('');
    const [Location, setLocation] = useState('');
    const [Skills, setSkills] = useState('');
    const [Roles, setRoles] = useState('');
    const [CareerLevel, setCareerLevel] = useState('None');
    console.log(Description)

    const addJobHandler = () => {
        if (experienceRequired.length !== 0 && Title.length !== 0 && CompanyName.length !== 0 && Description.length !== 0 && Location.length !== 0 && Skills.length !== 0 && Roles.length !== 0 && CareerLevel) {

            api.post(`/users/job/createJob/${userData._id}`,
                {
                    Title: Title,
                    Company: CompanyName,
                    City: Location,
                    SalaryRange: {
                        min: minSalaryRange,
                        max: maxSalaryRange
                    },
                    Description: Description,
                    ExperienceRequired: experienceRequired,
                    Skills: Skills,
                    careerLevel: CareerLevel,
                    roles: Roles
                })
                .then((result) => {
                    setJob(false)
                    handleSnackbar('Job added successfully', 'success')
                    // setIsAnyChange(true)

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
                open={addJob}
                onClose={() => { setJob(false) }}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={addJob}>
                    <Box sx={style}>
                        <Typography variant='h5' style={{ textAlign: 'center' }}>
                            Add job
                        </Typography>
                        <Divider style={{ marginBottom: 5 }} />
                        <div className='flex justify-center mt-3' >
                            <TextField
                                variant='outlined'
                                placeholder='JobTitle'
                                fullWidth
                                required
                                value={Title}
                                onChange={(e) => { setTitle(e.target.value) }}
                            />
                        </div>
                        <div className='flex justify-center mt-3' >
                            <TextField
                                variant='outlined'
                                placeholder='Company Name'
                                fullWidth
                                required
                                value={CompanyName}
                                onChange={(e) => { setCompanyName(e.target.value) }}
                            />
                        </div>
                        <div className='flex justify-center mt-3' >
                            <TextField
                                variant='outlined'
                                placeholder='Job Location'
                                fullWidth
                                required
                                value={Location}
                                onChange={(e) => { setLocation(e.target.value) }}
                            />
                        </div>
                        <div className='flex justify-center mt-3' >
                            <TextField
                                variant='outlined'
                                placeholder='Job Description'
                                multiline
                                fullWidth
                                required
                                rows={2}
                                value={Description}
                                onChange={(e) => { setDescription(e.target.value) }}

                            />
                        </div>

                        <div className=' mt-3' >
                            <InputLabel>Enter minimum salary</InputLabel>
                            <Slider
                                aria-label="Small steps"
                                defaultValue={10000}
                                step={5000}
                                marks
                                min={10000}
                                max={200000}
                                onChange={(event) => { setMinSalaryRange(event.target.value) }}
                                valueLabelDisplay="auto"
                            />
                        </div>
                        <div className=' mt-3' >
                            <InputLabel>Enter Maximum salary</InputLabel>
                            <Slider
                                aria-label="Small steps"
                                defaultValue={10000}
                                step={5000}
                                marks
                                min={10000}
                                max={200000}
                                onChange={(event) => { setMaxSalaryRange(event.target.value) }}
                                valueLabelDisplay="auto"
                            />
                        </div>
                        <div>
                            <FormControl variant="standard" sx={{ mt: 3, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-standard-label">Career Level</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    // value={age}
                                    // onChange={handleChange}
                                    label="Career Level"
                                    variant='outlined'
                                    autoWidth
                                    value={CareerLevel}
                                    onChange={(e) => { setCareerLevel(e.target.value) }}
                                >
                                    <MenuItem value="None">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={'Student/Intern'}>Student/Intern</MenuItem>
                                    <MenuItem value={'Entry Level'}>Entry Level</MenuItem>
                                    <MenuItem value={'Experienced Professional'}>Experienced Professional</MenuItem>
                                    <MenuItem value={'GM / CEO'}>GM / CEO</MenuItem>
                                    <MenuItem value={'Country Head'}>Country Head</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl variant="standard" sx={{ mt: 3, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-standard-label">Experience Required</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    // value={age}
                                    // onChange={handleChange}
                                    label="Experience Required"
                                    variant='outlined'
                                    fullWidth
                                    value={experienceRequired}
                                    onChange={(e) => { setExperienceRequired(e.target.value) }}
                                >
                                    <MenuItem value={0}>
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={5}>5</MenuItem>
                                    <MenuItem value={7}>7</MenuItem>
                                    <MenuItem value={10}>10</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className='flex justify-center mt-3' >
                            <TextField
                                variant='outlined'
                                placeholder='Skills'
                                fullWidth
                                required
                                value={Skills}
                                onChange={(e) => { setSkills(e.target.value) }}
                            />
                        </div>
                        <div className='flex justify-center mt-3' >
                            <TextField
                                variant='outlined'
                                placeholder='Role'
                                fullWidth
                                required
                                value={Roles}
                                onChange={(e) => { setRoles(e.target.value) }}
                            />
                        </div>
                        <div className="flex flex-1 justify-center items-center mt-3">
                            <Button onClick={() => { addJobHandler() }} className='text-lg text-secondary ' variant='contained' >Add Job</Button>

                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

export default AddJob;