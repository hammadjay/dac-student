import React, { useState, useContext, useEffect, useRef } from "react";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Phone from "../assets/phone.gif";
import Teams from "../assets/teams.mp3";
import * as classes from "./Options.module.css";
import VideoContext from "../context/VideoContext";
import Button from '@mui/material/Button';
import CallEndIcon from '@mui/icons-material/CallEnd';
import { Link } from 'react-router-dom'



const Options = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const Audio = useRef();
  const {
    call,
    callAccepted,
    setOtherUser,
    leaveCall1,
  } = useContext(VideoContext);

  useEffect(() => {
    if (isModalVisible) {
      Audio?.current?.play();
    } else Audio?.current?.pause();
  }, [isModalVisible]);

  const handleCancel = () => {
    setIsModalVisible(false);
    leaveCall1();
    window.location.reload();
  };
  useEffect(() => {
    if (call.isReceivingCall && !callAccepted) {
      setIsModalVisible(true);
      setOtherUser(call.from);
    } else setIsModalVisible(false);
  }, [call.isReceivingCall]);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div >
      {call.isReceivingCall && !callAccepted && (
        <>
          <audio src={Teams} loop ref={Audio} />
          <Modal
            open={isModalVisible}
            onClose={handleCancel}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <h1>
                  {call?.name} is calling you:{" "}
                  <img
                    src={Phone}
                    alt="phone ringing"
                    className={classes.phone}
                    style={{ display: "inline-block" }}
                  />
                </h1>
              </div>
              <div className={classes.btnDiv}>
                <Link to={`/call?action=accept`}>
                  <Button variant="outlined" color='success' onClick={() => {
                    setIsModalVisible(false);
                    Audio.current.pause();
                  }} startIcon={<CallEndIcon />}>
                    accept
                  </Button>
                </Link>
                <Button variant="outlined" color='error' onClick={() => {
                  setIsModalVisible(false);
                  Audio.current.pause();
                }} startIcon={<CallEndIcon />}>
                  Reject
                </Button>

              </div>
            </Box>
          </Modal>
        </>
      )}
    </div>
  );
};

export default Options;
