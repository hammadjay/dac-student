import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logo from '../img/logoMain.png'
import PersonalInfo from './signupComponents/personalInfo';
import AcademicInfo from './signupComponents/Academicinfo';

import api from '../api/api';

const theme = createTheme();

export default function Signup() {

  const steps = ['Personal Information', 'Academic & Account Information'];

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <PersonalInfo firstname={firstName} lastname={lastName} cnic={cnic} gender={gender} contact={contact} address={address} country={country} state={state} city={city} date={date} handlefirstName={handlefirstName} handlelastName={handlelastName} handleCnic={handleCnic} handleGender={handleGender} handleCity={handleCity} handleCountry={handleCountry} handleState={handleState} handleAddress={handleAddress} handleContact={handleContact} handleDate={handleDate} />;
      case 1:
        return <AcademicInfo batch={batch} degree={degree} rollno={rollno} passOutYear={passOutYear} email={email} password={password} confirmPassword={confirmPassword} handleBatch={handleBatch} handleDegree={handleDegree} handleRollno={handleRollno} handlePassOutYear={handlePassOutYear} handleEmail={handleEmail} handlePassword={handlePassword} handleConfirmPassword={handleConfirmPassword} />;
      default:
        throw new Error('Unknown step');
    }
  }

  const [activeStep, setActiveStep] = React.useState(0);
  const [address, setAddress] = React.useState('');
  const [firstName, setfirstName] = React.useState('');
  const [lastName, setlastName] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [cnic, setCnic] = React.useState('');
  const [state, setState] = React.useState('');
  const [city, setCity] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [contact, setContact] = React.useState('');
  const [date, setDate] = React.useState('');
  const [batch, setBatch] = React.useState('');
  const [degree, setDegree] = React.useState('');
  const [rollno, setRollno] = React.useState('');
  const [passOutYear, setPassOutYear] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [Submiterror, setSubmiterror] = React.useState(false);
  const [errorText, setErrorText] = React.useState("");
 
  
  console.log(contact)
  const isPersonalEmpty = () => {
    var cnicCheck = cnic.replace('_', '');
    if (address === '' || firstName === '' || lastName === '' || country === '' || cnicCheck.length < 15 || state === '' || city === '' || contact.length < 5 || state === '' || date === '') {
      return true
    }
    return false
  }

  const handleConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };
  const handleBatch = (event) => {
    setBatch(event.target.value);
  };
  const handleDegree = (event) => {
    setDegree(event.target.value);
  };
  const handleRollno = (event) => {
    if (event.target.value.length <= 3)
      setRollno(event.target.value);
  };
  const handlePassOutYear = (event) => {
    setPassOutYear(event.target.value);
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleDate = (event) => {
    setDate(event.target.value);
  };
  const handleContact = (value) => {
    setContact(value);
  };
  const handleAddress = (event) => {
    setAddress(event.target.value);
  };
  const handlefirstName = (event) => {

    setfirstName(event.target.value.replace(" ", ""));
  };

  const handlelastName = (event) => {
    setlastName(event.target.value.replace(" ", ""));
  };
  const handleCountry = (event) => {
    setCountry(event.target.value);
  };
  const handleCnic = (event) => {
    setCnic(event.target.value);
  };
  const handleState = (event) => {
    setState(event.target.value);
  };
  const handleCity = (event) => {
    setCity(event.target.value);
  };
  const handleGender = (event) => {
    setGender(event.target.value);
  };
  const handleNext = async () => {
    if (activeStep === 1) {
      if (password === confirmPassword) {
        const data = {
          registrationNumber: batch + "-" + degree + "-" + rollno,
          firstName: firstName,
          lastName: lastName,
          cnic: cnic,
          email: email,
          phone: contact,
          password: password,
          dateOfBirth: date,
          gender: gender,
          batch: batch,
          program: degree,
          graduationYear: passOutYear,
          address: address,
          country: country,
          state: state,
          city: city
        }
        try {
          const response = await api.post('/users/signup', data)
          console.log(response.data)
          setActiveStep(activeStep + 1);
        } catch (e) {
          console.log(e.response)
          // setErrorText(e.response)
          setSubmiterror(true)

        }
      }
    }
    else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <img src={logo} alt='DAC logo' className='mx-auto h-auto' />
      </AppBar>
      <div className='bg-secondary text-white min-h-screen h-auto bg-gradient-to-b from-primary to-secondary md:order-2 flex justify-center'>
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }} >
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Typography component="h1" variant="h4" align="center">
              Sign up
            </Typography>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    Your Application has been submitted
                  </Typography>
                  <Typography variant="subtitle1">
                    You will be mailed shortly after admin will review your request
                  </Typography>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {getStepContent(activeStep)}
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                        Back
                      </Button>
                    )}

                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 3, ml: 1 }}
                      disabled={activeStep === 0 ? isPersonalEmpty() : false}
                    >
                      {activeStep === steps.length - 1 ? 'Submit Application' : 'Next'}
                    </Button>
                    
                  </Box>
                  <div className='mt-3'>
                  { Submiterror ? <Alert variant="filled" onClose={() => {setSubmiterror(false)}} severity="error">
                      Server Error: There is a trouble signing up !
                    </Alert>:< ></>}
                    </div>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
        </Container>
      </div>
    </ThemeProvider>
  );
}