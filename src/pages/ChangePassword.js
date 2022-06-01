import { useEffect, useState } from 'react';
import '../App.css'
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import TextField from '@mui/material/TextField';
import TopNav from './NavComponents/TopNav';
import SettingsNav from './NavComponents/SettingsNav';
import ResponsiveTopNav from './NavComponents/ResponsiveTopNav';
import api from '../api/api'
import Alert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector, useDispatch } from 'react-redux'

import ResponsiveSN from "./NavComponents/ResponsiveSN";

function ChangePassword() {
    const userData = useSelector(state => state.userData.data)
    const {_id} = userData
    const [viewOldPassword, setViewOldPassword] = useState(true)
    const [viewNewPassword, setViewNewPassword] = useState(true)
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmNewPassword, setConfirmNewPassword] = useState("")
    const [error, setError] = useState(false)
    const [errorText, setErrorText] = useState('')
    const [success, setSuccess]  = useState(false)
    const [isRequest, setIsRequest]  = useState(false)
    
    const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

    useEffect(()=>{
         if(isRequest){
             return handleSubmit()
         }
    },[isRequest])
    const handleSubmit = () => {
        if (!passwordRegExp.test(newPassword)) {
            setError(true)
            setErrorText("The password should be minimum eight characters, at least one uppercase letter, one lowercase letter and one number")
        }
        else if (newPassword !== confirmNewPassword) {
            setError(true)
            setErrorText("Password and confirm password should be the same")
        }
        else if (oldPassword === newPassword) {
            setError(true)
            setErrorText("New password cannot be old password")
        }
        else {
            api.put('/users/changePassword',{id:_id,oldPassword:oldPassword ,newPassword:newPassword})
            .then((response)=>{
                console.log(response.data)
                if(response.data.success){
                    setSuccess(true)
                }
                else{
                    setError(true)
                    setErrorText(response.data.message)
                }
            })
            .catch((err)=>{
                console.log(err)
            })
        }
        setIsRequest(false)
        setOldPassword('')
        setNewPassword('')
        setConfirmNewPassword('')
    }

    return (
        <div className=" h-screen bg-white ">
            <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isRequest}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
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
                            <SettingsNav changePass />
                            <ResponsiveSN />
                            <div className=' w-full lg:w-3/4 bg-white overflow-auto py-4 px-3 h-auto ' style={{ minHeight: '595px' }} >
                                <div className=' w-full lg:w-5/6 mx-auto ' >

                                    <div className='flex justify-center mt-3' >
                                        <TextField
                                            error={error}

                                            required
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            name="Password"
                                            label="Enter Old Password"
                                            id="Password"
                                            type={viewOldPassword ? 'password' : 'text'}
                                            autoComplete="current-password"
                                            value={oldPassword}
                                            onChange={(event) => setOldPassword(event.target.value)}

                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment >
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            edge="end"
                                                            onClick={() => {
                                                                setViewOldPassword(!viewOldPassword)
                                                            }}
                                                        >
                                                            {
                                                                viewOldPassword ?
                                                                    <VisibilityOff /> : <Visibility />
                                                            }

                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    </div>
                                    <div className='flex justify-center mt-3' >
                                        <TextField
                                            error={error}

                                            required
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            name="New Password"
                                            label="Enter New Password"
                                            helperText='The password should be minimum eight characters, at least one uppercase letter, one lowercase letter and one number'
                                            id="New Password"
                                            type={viewNewPassword ? 'password' : 'text'}
                                            autoComplete="current-password"
                                            value={newPassword}
                                            onChange={(event) => setNewPassword(event.target.value)}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment>
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            edge="end"
                                                            onClick={() => {
                                                                setViewNewPassword(!viewNewPassword)
                                                            }}
                                                        >
                                                            {
                                                                viewNewPassword ?
                                                                    <VisibilityOff /> : <Visibility />
                                                            }
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    </div>
                                    <div className='flex justify-center mt-3' >
                                        <TextField
                                            error={error}
                                            required
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            name="Confirm Password"
                                            label="Confirm Password"
                                            id="Confirm Password"
                                            
                                            autoComplete="current-password"
                                            type={viewNewPassword ? 'password' : 'text'}
                                            value={confirmNewPassword}
                                            onChange={(event) => setConfirmNewPassword(event.target.value)}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment>
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            edge="end"
                                                            onClick={() => {
                                                                setViewNewPassword(!viewNewPassword)
                                                            }}
                                                        >
                                                            {
                                                                viewNewPassword ?
                                                                    <VisibilityOff /> : <Visibility />
                                                            }
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    </div>
                                    <div className='flex justify-center mt-5' >
                                        <button onClick={()=>setIsRequest(true)} className='py-2 px-4 bg-secondary rounded-md shadow-lg hover:text-secondary hover:bg-white hover:border-secondary border text-white mx-auto' ><p>Change Password</p></button>
                                    </div>
                                    {error ? <Alert variant="filled" onClose={() => { setError(false) }} severity="error">
                                        {errorText}
                                    </Alert> : <></>}
                                    {success ? <Alert variant="filled" onClose={() => { setSuccess(false) }} severity="success">
                                        Password has been changed successfully !
                                    </Alert> : <></>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}


export default ChangePassword;
