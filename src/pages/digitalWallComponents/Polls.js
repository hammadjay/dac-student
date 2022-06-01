import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import api from '../../api/api'
import { useSelector } from 'react-redux'
import { useSnackbar } from 'notistack';

const Polls = () => {
    const userData = useSelector(state => state.userData.data)
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const [polls, setPolls] = useState([]);
    const [refresh, setRefresh] = useState(true)
    console.log(polls)
    useEffect(() => {
        api.get(`/users/polls/${userData._id}`)
            .then((result) => {
                setPolls(result.data)
                setRefresh(false)
            })
            .catch(err => console.log(err))
    }, [refresh])
    const [pollOptionSelected, setPollOptionSelected] = useState();

    const handlePollOption = (pollId) => {
        api.patch(`/users/poll-option/${pollId}`, {
            optionSelected: pollOptionSelected,
            userId: userData._id
        })
            .then(() => {
                handleSnackbar('Thanks for submitting !', 'success')
                setRefresh(true)
            })
            .catch(err => {
                handleSnackbar('Oops ! an error occurred', 'error')

            })
    };

    const handleSnackbar = (message, variant) => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar(message, { variant });
    };
    const handleRadioOption = (event) => {
        setPollOptionSelected(event.target.value);
    };

    return (
        <>
            {
                polls.length > 0 ?
                    <>
                        <FormControl>
                            {polls &&
                                polls.map((poll) => (
                                    <div key={poll._id} className=' w-full md:w-9/12 px-3 py-2 rounded-lg shadow-md bg-white mx-auto border border-gray-300 my-2'>
                                        
                                        <h1 className='font-semibold text-sm'>Please give answer to the following poll</h1>
                                        <h1 className='font-bold text-sm text-gray-600'>Title</h1>
                                        <h1>{poll.pollTitle}</h1>
                                        <h2 className='font-bold text-sm text-gray-600'>Description</h2>
                                        <h2>{poll.pollDescription}</h2>
                                        <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            defaultValue="male"
                                            name="radio-buttons-group"
                                            onChange={handleRadioOption}
                                        >
                                            {poll.pollOptions[0] != null ? (
                                                <FormControlLabel
                                                    value="1"
                                                    control={<Radio />}
                                                    label={poll.pollOptions[0]}
                                                />
                                            ) : null}
                                            {poll.pollOptions[1] != null ? (
                                                <FormControlLabel
                                                    value="2"
                                                    control={<Radio />}
                                                    label={poll.pollOptions[1]}
                                                />
                                            ) : null}
                                            {poll.pollOptions[2] != null ? (
                                                <FormControlLabel
                                                    value="3"
                                                    control={<Radio />}
                                                    label={poll.pollOptions[2]}
                                                />
                                            ) : null}
                                            {poll.pollOptions[3] != null ? (
                                                <FormControlLabel
                                                    value="4"
                                                    control={<Radio />}
                                                    label={poll.pollOptions[3]}
                                                />
                                            ) : null}
                                        </RadioGroup>
                                        <Button
                                            variant="contained"
                                            color="success"
                                            onClick={() => handlePollOption(poll._id)}
                                        >
                                            Submit
                                        </Button>
                                    </div>
                                ))}
                        </FormControl>
                    </>
                    : <></>

            }

        </>
    )

}

export default Polls
