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



const EditJob = ({ setIsAnyChange, item, editJob, setJob }) => {
    const userData = useSelector(state => state.userData.data)
    const dispatch = useDispatch()
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [minSalaryRange, setMinSalaryRange] = useState(item.SalaryRange?.min === undefined ? 0 : item.SalaryRange?.min);
    const [maxSalaryRange, setMaxSalaryRange] = useState(item.SalaryRange?.max === undefined ? 0 : item.SalaryRange?.max);
    const [experienceRequired, setExperienceRequired] = useState(item.ExperienceRequired);
    const [Title, setTitle] = useState(item.Title);
    const [CompanyName, setCompanyName] = useState(item.Company);
    const [Description, setDescription] = useState(item.Description);
    const [Location, setLocation] = useState(item.City);
    const [Skills, setSkills] = useState(item.Skills);
    const [Roles, setRoles] = useState(item.roles);
    const [CareerLevel, setCareerLevel] = useState(item.careerLevel);
    console.log(Description)

    const editJobHandler = () => {
        if (experienceRequired.length !== 0 && Title.length !== 0 && CompanyName.length !== 0 && Description.length !== 0 && Location.length !== 0 && Skills.length !== 0 && Roles.length !== 0 && CareerLevel) {

            api.put(`/users/job/editJob/${item._id}`,
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
                    setIsAnyChange(true)
                    enqueueSnackbar("Changes successful", { variant: 'success' });

                })
                .catch((e) => enqueueSnackbar("Oops An Error occurred", { variant: 'error' }))
        }
        else {
            enqueueSnackbar('Please provide all fields!', { variant: 'error' })
        }
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
                open={editJob}
                onClose={() => { setJob(false) }}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={editJob}>
                    <Box sx={style}>
                        <Typography variant='h5' style={{ textAlign: 'center' }}>
                            Edit job
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
                                defaultValue={minSalaryRange}
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
                                defaultValue={maxSalaryRange}
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
                                    <MenuItem value="">
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
                            <Button onClick={() => { editJobHandler() }} color='success' className='text-lg text-secondary ' variant='contained' >Edit Job</Button>

                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

export default EditJob;