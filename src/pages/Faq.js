import React, { useState, useEffect } from 'react';
import '../App.css'
import LeftNavbar from './NavComponents/LeftNavbar';
import TopNav from './NavComponents/TopNav';
import ResponsiveTopNav from './NavComponents/ResponsiveTopNav';
import { useSelector, useDispatch } from 'react-redux'
import api from '../api/api';
import { CircularProgress } from '@mui/material';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useSnackbar } from 'notistack';

function Faq() {

    const userData = useSelector(state => state.userData.data)
    const [faq, setFaq] = useState();
    const [question, setQuestion] = useState("");
    const [refresh, setRefresh] = useState(true);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const handleSnackbar = (message, variant) => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar(message, { variant });
    };
    const askQuestionHandler = () => {
        api.patch(`/users/faqs/userAskQuestion/${faq._id}`, {
            question
        })
            .then(() => {
                setQuestion("");
                setRefresh(true);
            })
            .catch((e) => { handleSnackbar('Oops An error encountered', 'error') })
    };
    useEffect(() => {
        if (refresh) {
            api.get(`/users/faqs/${userData._id}`)
                .then((result) => {

                    if (!result.data) {
                        api.post(`/users/faqs/`, {
                            questionBy: userData._id,
                            question: 'start of the question'
                        }).then((result) => {
                            setFaq(result.data)
                            setRefresh(false)
                        })
                            .catch((e) => { handleSnackbar('Oops An error encountered', 'error') })
                    }
                    else {
                        setFaq(result.data)
                        setRefresh(false)
                    }

                })
                .catch((e) => { handleSnackbar('Oops An error encountered', 'error') })
        }
    }, [refresh]);


    return (
        <div className=" h-full bg-gray-100 ">
            <div className='2xl:w-8/12 mx-auto'>

                <div className='sticky top-0'>
                    {/*Header*/}
                    <div className=' flex flex-1 bg-white h-12 shadow-md lg:hidden '>
                        <ResponsiveTopNav />
                    </div>
                </div>
                {/*Body*/}
                <div className='flex flex-1 h-auto '>
                    {/*Left*/}
                    <LeftNavbar />


                    {/*Center*/}
                    <div className="flex flex-col h-full w-full lg:w-2/3">
                        {/*navigator*/}
                        <TopNav />
                        <div className='bg-white lg:w-5/6 h-auto mx-auto rounded-md shadow-md my-1 p-3'>
                            {
                                refresh ?
                                    <div className='mx-auto'>
                                        <CircularProgress color='primary' variant='indeterminate' size={20} />
                                    </div>
                                    :

                                    <>
                                        <p className='font-semibold my-3' >Ask Admin anything.</p>

                                        <h2>FAQs</h2>
                                        {faq &&
                                            faq.questionsAnswers.map((item) => {
                                                for (let i = 0; i < faq.questionsAnswers.length - 1; i++) {
                                                    if (faq.userQuestions[i] === item) {
                                                        return (
                                                            <div>
                                                                <span style={{ fontWeight: "bold" }}>
                                                                    {faq.questionBy.firstName +
                                                                        " " +
                                                                        faq.questionBy.lastName}
                                                                    :
                                                                </span>{" "}
                                                                {item}
                                                            </div>
                                                        );
                                                    }
                                                }
                                                return (
                                                    <div>
                                                        <span style={{ fontWeight: "bold" }}>Admin:</span> {item}
                                                    </div>
                                                );
                                            })}
                                        {faq && (
                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    marginTop: "1rem",
                                                }}
                                            >
                                                <TextField
                                                    id="outlined-multiline-flexible"
                                                    label="Question"
                                                    multiline
                                                    maxRows={4}
                                                    value={question}
                                                    onChange={(event) => {
                                                        setQuestion(event.target.value);
                                                    }}
                                                />
                                                <Button
                                                    variant="contained"
                                                    color="success"
                                                    onClick={askQuestionHandler}
                                                    style={{ marginLeft: "2rem" }}
                                                    disabled={question === ""}
                                                >
                                                    Submit
                                                </Button>{" "}
                                            </div>
                                        )}

                                    </>
                            }


                        </div>

                    </div>
                    {/*Right*/}
                    <div className="lg:block hidden w-1/3 justify-evenly sticky top-0 h-screen overflow-hidden no-scrollbar pt-16 ">

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Faq;
