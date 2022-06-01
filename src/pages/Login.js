import { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import logo from '../img/logoMain.png'
import logosm from '../img/logoSmall.png'
import v1 from '../img/vector1.jpg'
import v2 from '../img/vector 2.jpg'
import v3 from '../img/vector3.jpeg'
import v4 from '../img/vector4.jpg'
import playstore from '../img/googleplay.png'
import appstore from '../img/appstore.svg'
import { Link } from 'react-router-dom'
import Alert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import InputMask from 'react-input-mask';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ResendOTP } from "otp-input-react";
import api from "../api/api"
import { useSelector, useDispatch } from 'react-redux'
import { updateData } from '../features/userData/userData'
import { updateNotif } from '../features/Notifications/notifications'
import { updateChats } from '../features/Chats/chats'

function Login({ handleLoginState, setIsStateReady }) {

  const userData = useSelector(state => state.userData.data)
  const dispatch = useDispatch()
  let history = useHistory();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isPendingError, setisPendingError] = useState(false)
  const [isbannedError, setisbannedError] = useState(false)
  const [isServerError, setisServerError] = useState(false)
  const [accessError, setAccessError] = useState(false)
  const [isLoginRequest, setisLoginRequest] = useState(false)

  const [forgetPasswordOpen, setForgetPasswordOpen] = useState(false)
  const handleForgetPasswordOpen = () => setForgetPasswordOpen(true);
  const handleForgetPasswordClose = () => setForgetPasswordOpen(false);

  const checkLogin = async () => {
    const response = await api.post('/users/login', {
      email: email,
      password: password
    })
    console.log(response.data)
    if (response.data.serverError) {
      setisServerError(true)
    }
    else {
      if (response.data.access) {
        if (response.data.user.userStatus === 'pending') {
          setisPendingError(true)
        }
        else if (response.data.user.userStatus === 'banned') {
          setisbannedError(true)
        }
        else {
          console.log("agy barho")
          localStorage.setItem("accessToken", response.data.accessToken)
          localStorage.setItem("loggedUser", JSON.stringify(response.data.user))
          dispatch(updateData(response.data.user))
          api.get(`/users/getNotification/${response.data.user._id}`)
          .then((result1) => {
      
            dispatch(updateNotif(result1.data))

            api.get(`/users/inbox/${response.data.user._id}`)
              .then((result2) => {
                
                dispatch(updateChats(result2.data))
                setIsStateReady(true)
                handleLoginState()
              })
              .catch((e) => {
                console.log(e)
                setIsStateReady(true)

              })
          })
          .catch((e) => {
            console.log(e)
            setIsStateReady(true)

          })
          
        }
      } else {
        setAccessError(true)
      }
    }
    setisLoginRequest(false)
    setEmail('')
    setPassword('')
  }

  useEffect(() => {
    if (isLoginRequest) {
      return checkLogin()
    }
  }, [isLoginRequest])

  const handleLogin = (event) => {
    event.preventDefault()
    var email = event.target[0].value;
    var password = event.target[1].value
    setEmail(email)
    setPassword(password)
    setisLoginRequest(true)

  }

  const LoginScreen = () => {
    return (
      <div className="flex flex-1 my-auto justify-center ">
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoginRequest}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <div className=' w-full'>
          <div className=" w-1/2 mx-auto ">
            {accessError ? <Alert variant="filled" onClose={() => { setAccessError(false) }} severity="error">
              Please Check your Email/Password!
            </Alert> : <></>}
            {isPendingError ? <Alert variant="filled" onClose={() => { setisPendingError(false) }} severity="error">
              Access rejected! Your application is yet to be reviewed by Admin
            </Alert> : <></>}
            {isbannedError ? <Alert variant="filled" onClose={() => { setisPendingError(false) }} severity="error">
              Access rejected! You are banned, contact admin for further information
            </Alert> : <></>}
            {isServerError ? <Alert variant="filled" onClose={() => { setisServerError(false) }} severity="error">
              Server Error! Unable to login
            </Alert> : <></>}
            <p className='my-5 text-center text-3xl font-semibold'> Login</p>
            <form onSubmit={handleLogin}>
              <input type='email' name='email' className="border-2 my-10 h-auto w-full bg-transparent border-3 border-white focus:outline-none border-t-0 border-l-0 border-r-0 block" placeholder="Enter Email" />
              <input type="password" name='password' className="border-2 mt-10 my-3 h-auto w-full bg-transparent border-3 border-white focus:outline-none  border-t-0 border-l-0 border-r-0 block" placeholder="Enter Password" />

              <div className='flex justify-between'>
                <div className='flex-wrap' >
                  {/* <p className='text-sm inline-block'>Keep me logged in</p>
                <input type='checkbox' className='mx-2' /> */}
                </div>


              </div>
              <div className='flex flex-col justify-center items-center my-8'>
                {/* <Link to='/DigitalWall'  > */}
                <button type='submit' className='bg-white text-black font-semibold py-1 px-6 rounded hover:bg-gray-300'>Login</button>
                {/* </Link> */}
                {/* <Link to='/Signup'>
                  <button className="my-3 mx-auto">Not registered Alumni yet ?</button>
                </Link> */}
              </div>
            </form>
            <button onClick={handleForgetPasswordOpen}>
              <a className="text-sm font-bold">Forgot password?</a>
            </button>
          </div>
          <hr className="w-2/3 mx-auto" />
          <div className=' flex justify-evenly'>
            <a href="#"  >
              <img src={playstore} alt="get it from playstore" />
            </a>
            <a href="#" className="mt-2" >
              <img src={appstore} alt="get it from playstore" />
            </a>
          </div>
          <div className="flex justify-evenly text-gray-300 text-sm mt-10">
            <a href="#">Terms & Conditions</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Contact Us</a>
            <a href="#">About Us</a>
          </div>
        </div>
      </div>
    )
  }

  const ForgetPassword = () => {
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '55%',
      height: '70%',
      maxWidth: '650px',
      bgcolor: 'background.paper',
      boxShadow: 24,
      p: 4,
      overflow: 'auto'
    };

    const [user, setUser] = useState({})
    const [regNo, setRegNo] = useState("")
    const [otp, setOtp] = useState("")
    const [step, setStep] = useState('1')
    const [regSubmit, setregSubmit] = useState(false)
    const [generateOtp, setgenerateOtp] = useState(false)
    const [verifyOtp, setVerifyOtp] = useState(false)
    const [ChangePasswordSubmit, setChangePasswordSubmit] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [recoveryOption, setRecoveryOption] = useState('email')
    const [otpID, setOtpID] = useState('')
    const [newPassword, setNewPassword] = useState("")
    const [confirmNewPassword, setConfirmNewPassword] = useState("")
    const [viewNewPassword, setViewNewPassword] = useState(true)
    const [success, setSuccess] = useState(false)



    const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

    useEffect(() => {
      if (regSubmit) {
        onRegSubmit()
      }
      if (generateOtp) {
        ongenerateOtp()
      }
      if (verifyOtp) {
        onVerifyOtp()
      }
      if (ChangePasswordSubmit) {
        onChangePasswordSubmit()
      }
    }, [regSubmit, generateOtp, verifyOtp, ChangePasswordSubmit])

    const onChangePasswordSubmit = () => {
      if (passwordRegExp.test(newPassword)) {
        setError(true)
        setErrorMessage("The password should be minimum eight characters, at least one uppercase letter, one lowercase letter and one number")
      }
      else if (newPassword !== confirmNewPassword) {
        setError(true)
        setErrorMessage("Password and confirm password should be the same")
      }
      else {
        api.put('/users/forgetPassword/newPassword', { id: user.id, newPassword: newPassword })
          .then((response) => {
            console.log(response.data)
            if (response.data.success) {
              setSuccess(true)
              setStep('5')
            }
            else {
              setError(true)
              setErrorMessage("Oops an error encountered")
            }
          })
          .catch((err) => {
            console.log(err)
          })
      }
      setChangePasswordSubmit(false)
    }
    const onVerifyOtp = () => {
      api.post('/users/forgetPassword/verifyOtp', { OtpID: otpID, otp: otp })
        .then((response) => {
          if (response.data.verified) {
            setStep('4')
          }
          else {
            setError(true)
            setErrorMessage(response.data.message)
          }
          setVerifyOtp(false)
        })
        .catch((e) => console.log(e))
    }
    const ongenerateOtp = () => {
      console.log(recoveryOption)
      api.post('/users/forgetPassword/generateOtp', { method: recoveryOption, userId: user._id, email: user.email, phone: user.contact })
        .then((response) => {
          console.log(response.data)
          if (response.data.success) {
            setOtpID(response.data.otpID)
            setStep('3')
          }
          else {
            setError(true)
            setErrorMessage("Oops! an unexpected error occurred")
          }
          setgenerateOtp(false)

        })
        .catch((e) => console.log(e))
      setgenerateOtp(false)
    }
    const onRegSubmit = () => {
      if (regNo.length === 12) {
        api.post('/users/forgetPassword/findAccount', { regNo: regNo })
          .then((response) => {
            console.log(response.data)
            if (!response.data.status) {
              setError(true)
              setErrorMessage(response.data.message)
            }
            else {
              setUser(response.data)
              setStep('2')
            }
          })
          .catch((e) => console.log(e))
      }
      else {
        setError(true)
        setErrorMessage('Please provide complete Registration number')
      }
      setregSubmit(false)
    }


    return (
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={forgetPasswordOpen}
          onClose={handleForgetPasswordClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={forgetPasswordOpen}>
            <Box sx={style}>
              {(() => {
                switch (step) {
                  case '1':
                    return (
                      <>
                        <Typography variant="h5" component="h2">
                          Forgot password ?
                        </Typography>
                        <Typography sx={{ mt: 2, mb: 2 }}>
                          Enter your registration number to find account
                        </Typography>

                        <InputMask mask="aa99-aaa-999" value={regNo} onChange={(e) => setRegNo(e.target.value.toUpperCase())} >
                          {() => <TextField
                            required
                            label="Registration number"
                            placeholder="FA00-BCS-000"
                            fullWidth
                          />}
                        </InputMask>
                        <div className='flex flex-1 w-full h-auto justify-end mt-2 '>

                          <Button variant="outlined" disabled={regSubmit} onClick={() => setregSubmit(true)} >
                            Submit
                            {
                              regSubmit ?
                                <CircularProgress color='primary' variant='indeterminate' size={15} />
                                : <></>
                            }
                          </Button>
                        </div>
                      </>
                    )

                  case '2':
                    return (
                      <>
                        <Typography variant="h5" component="h2">
                          Forgot password ?
                        </Typography>
                        <Typography sx={{ mt: 2, mb: 2 }}>
                          Hello {user.name} ! Choose your recovery method
                        </Typography>
                        <FormControl>
                          <FormLabel >Recovery methods:</FormLabel>
                          <RadioGroup
                            name="controlled-radio-buttons-group"
                            value={recoveryOption}
                            onChange={(e) => setRecoveryOption(e.target.value)}
                          >
                            <FormControlLabel value="email" control={<Radio />} label={`send me an OTP on my email :${user.email}`} />
                            <FormControlLabel value="phone" control={<Radio />} label={`send me an OTP on my phone ending with ${user.contact.substr(user.contact.length - 2, user.contact.length)}`} />
                          </RadioGroup>
                        </FormControl>
                        <div className='flex flex-1 w-full h-auto justify-end mt-2 '>

                          <Button variant="outlined" disabled={generateOtp} onClick={() => setgenerateOtp(true)} >
                            Submit
                            {
                              generateOtp ?
                                <CircularProgress color='primary' variant='indeterminate' size={15} />
                                : <></>
                            }
                          </Button>
                        </div>
                      </>
                    )
                  case '3':
                    return (
                      <>
                        <Typography variant="h5" component="h2">
                          Forgot password ?
                        </Typography>
                        <Typography sx={{ mt: 2, mb: 2 }}>
                          Please check your {recoveryOption} for OTP code
                        </Typography>
                        <div className='my-2'>
                          <InputMask mask="9999" value={otp} onChange={(e) => setOtp(e.target.value)} >
                            {() => <TextField
                              required
                              label="Enter 4 digit code"
                              placeholder="XXXX"
                            />}
                          </InputMask>
                          <ResendOTP onResendClick={() => setgenerateOtp(true)} />
                        </div>
                        <Button variant="outlined" disabled={verifyOtp} onClick={() => setVerifyOtp(true)} >
                          Submit
                          {
                            verifyOtp ?
                              <CircularProgress color='primary' variant='indeterminate' size={15} />
                              : <></>
                          }
                        </Button>

                      </>
                    )
                  case '4':
                    return (
                      <>
                        <Typography variant="h5" component="h2">
                          Forgot password ?
                        </Typography>
                        <Typography sx={{ mt: 2, mb: 2 }}>
                          Enter your new password
                        </Typography>
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
                        <Button variant="outlined" disabled={ChangePasswordSubmit} onClick={() => setChangePasswordSubmit(true)} >
                          Submit
                          {
                            ChangePasswordSubmit ?
                              <CircularProgress color='primary' variant='indeterminate' size={15} />
                              : <></>
                          }
                        </Button>
                      </>
                    )
                  case '5':

                    return (
                      <>
                        <Typography variant="h5" component="h2">
                          Password changed successfully
                        </Typography>
                        <Typography sx={{ mt: 2, mb: 2 }}>
                          Use your new password to login
                        </Typography>
                      </>
                    )
                }
              })()
              }

              {
                error ?
                  <Alert variant="filled" onClose={() => { setError(false) }} severity="error" >
                    {errorMessage}
                  </Alert>
                  :
                  <></>
              }
              {
                success ? <Alert variant="filled" onClose={() => { setSuccess(false) }} severity="success">
                  Password has been changed successfully !
                </Alert> : <></>
              }
            </Box>
          </Fade>
        </Modal>
      </div>
    );
  }
  return (
    <div className="grid sm:grid-cols-2 ">

      {/*right side*/}
      <div className='bg-secondary text-white min-h-screen h-auto bg-gradient-to-b from-primary to-secondary md:order-2 flex justify-center'>
        <ForgetPassword />
        <LoginScreen />
      </div>
      {/*left side*/}
      <div className='bg-white text-primary  h-screen md:order-1 flex flex-col justify-between my-auto'>
        <div className='m-5 '>
          <img src={logo} alt='DAC logo' className='mx-auto h-auto' />
        </div>
        <div className='grid grid-rows-2'>
          <div className='grid grid-cols-2' >
            <div className=' flex flex-col-reverse'>
              <p className='text-xl text-primary text-center'>Connects <strong> Alumni, Students & Faculty</strong></p>
              <img src={v3} width='200' height='80' alt='DAC logo' className='mx-auto' />
            </div>
            <div className=' flex flex-col-reverse'>
              <p className='text-xl text-primary text-center'><strong>Help</strong> each other to create a <strong>Successful future </strong></p>
              <img src={v2} width='200' height='80' alt='DAC logo' className='mx-auto' />
            </div>
          </div>
          <div className='grid grid-cols-2' >
            <div className=' flex flex-col-reverse'>
              <p className='text-xl text-primary text-center'>Share <strong>experiences</strong>, find <strong>jobs</strong> & socialize with your <strong>fellows</strong> </p>
              <img src={v4} width='200' height='80' alt='DAC logo' className='mx-auto' />
            </div>
            <div className=' flex flex-col-reverse'>
              <p className='text-xl text-primary text-center'>Join <strong>webinars</strong> to learn and grow</p>
              <img src={v1} width='200' height='80' alt='DAC logo' className='mx-auto' />
            </div>
          </div>
        </div>
        <div className='my-5 self-center'>
          <p className='text-sm mx-auto'> Copyright 2021 &copy;  <span><img src={logosm} className='inline h-auto'></img> </span></p>
        </div>

      </div>
    </div>
  );
}

export default Login;
