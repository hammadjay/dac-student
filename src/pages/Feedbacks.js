import '../App.css'
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import api from '../api/api'
import TopNav from './NavComponents/TopNav';
import SettingsNav from './NavComponents/SettingsNav';
import ResponsiveTopNav from './NavComponents/ResponsiveTopNav';
import { useSnackbar } from 'notistack';

import ResponsiveSN from "./NavComponents/ResponsiveSN";
const addAppFeedback = async (data, setappSubmitDisable, handleSnackbar) => {

    try {
        let a = await api.post("/users/appFeedback", data);

        setappSubmitDisable(true)
        handleSnackbar('Feedback Submitted', 'success')
        return a
    } catch (exception) {
        handleSnackbar('Oops An error encountered', 'error')

        return {
            error: true,
            exception,
        };
    }
};


const addCvFeedback = async (data, setcvSubmitDisable, handleSnackbar) => {

    try {
        let a = await api.post("/users/cvFeedback", data);
        setcvSubmitDisable(true)
        handleSnackbar('Feedback Submitted', 'success')
        return a

    } catch (exception) {
        handleSnackbar('Oops An error encountered', 'error')

        return {
            error: true,
            exception,
        };
    }
};


function Feedbacks() {
    const [cvSubmitDisable, setcvSubmitDisable] = React.useState(false);
    const [appSubmitDisable, setappSubmitDisable] = React.useState(false);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();


    const handleSnackbar = (message, variant) => {
        enqueueSnackbar(message, { variant });
    };
    // App Feedback Section starts here
    const [appFeedbackValue, setAppFeedbackValue] = React.useState("");
    const [appRating, setAppRating] = React.useState(0);
    const appFeedbackDetails = {};
    const handleAppFeedback = (event) => {
        appFeedbackDetails.appFeedbackDescription = appFeedbackValue;
        appFeedbackDetails.appFeedbackRating = appRating;
        addAppFeedback(appFeedbackDetails, setappSubmitDisable, handleSnackbar);
    };
    // App Feedback Section ends here
    // Cv Feedback Section starts here
    const [cvFeedbackValue, setCvFeedbackValue] = React.useState("");
    const [cvRating, setCvRating] = React.useState(0);
    const cvFeedbackDetails = {};
    const handleCvFeedback = (event) => {
        cvFeedbackDetails.cvFeedbackDescription = cvFeedbackValue;
        cvFeedbackDetails.cvFeedbackRating = cvRating;
        addCvFeedback(cvFeedbackDetails, setcvSubmitDisable, handleSnackbar);
    };
    return (
        <div className=" h-screen bg-white ">
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
                            <SettingsNav feedbacks />
                            <ResponsiveSN />
                            <div className=' w-full lg:w-3/4 bg-white overflow-auto py-4 px-3 h-auto ' style={{ minHeight: '595px' }} >
                                <div className=' w-full lg:w-5/6 mx-auto ' >
                                    <p className='font-semibold text-lg mb-2' >Feedbacks</p>
                                    <h2>App Feedback and Rating</h2>
                                    {/* App Feedback Section Starts here */}
                                    <Box
                                        component="form"
                                        sx={{
                                            "& .MuiTextField-root": { m: 1, width: "25ch" },
                                        }}
                                        noValidate
                                        autoComplete="off"
                                        style={{
                                            display: "flex",
                                            // justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <div>
                                            <TextField
                                                id="outlined-multiline-flexible"
                                                label="App Feedback"
                                                multiline
                                                maxRows={4}
                                                value={appFeedbackValue}
                                                onChange={(event) => {
                                                    setAppFeedbackValue(event.target.value);
                                                }}
                                            />
                                        </div>
                                        <Rating
                                            name="simple-controlled"
                                            value={appRating}
                                            onChange={(event, newValue) => {
                                                setAppRating(newValue);
                                            }}
                                        />
                                        <Button variant="contained" disabled={appSubmitDisable} color="success" onClick={handleAppFeedback}>
                                            Submit
                                        </Button>
                                    </Box>
                                    {/* App Feedback Section ends here */}
                                    <h2>Cv Feedback and Rating</h2>
                                    {/* Cv Feedback Section Starts here */}
                                    <Box
                                        component="form"
                                        sx={{
                                            "& .MuiTextField-root": { m: 1, width: "25ch" },
                                        }}
                                        noValidate
                                        autoComplete="off"
                                        style={{
                                            display: "flex",
                                            // justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <div>
                                            <TextField
                                                id="outlined-multiline-flexible"
                                                label="Cv Feedback"
                                                multiline
                                                maxRows={4}
                                                value={cvFeedbackValue}
                                                onChange={(event) => {
                                                    setCvFeedbackValue(event.target.value);
                                                }}
                                            />
                                        </div>
                                        <Rating
                                            name="simple-controlled"
                                            value={cvRating}
                                            onChange={(event, newValue) => {
                                                setCvRating(newValue);
                                            }}
                                        />
                                        <Button variant="contained" color="success" disabled={cvSubmitDisable} onClick={handleCvFeedback}>
                                            Submit
                                        </Button>
                                    </Box>
                                    {/* Cv Feedback Section ends here */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Feedbacks;
