import { useState, useEffect, useRef } from 'react'
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DigitalWall from "./pages/DigitalWall";
import Connections from "./pages/Connections";
import Notifications from "./pages/Notifications";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import ChangePassword from "./pages/ChangePassword";
import Feedbacks from "./pages/Feedbacks";
import JobManagement from "./pages/JobManagement";
import SavedJobs from "./pages/SavedJobs"
import AppliedJobs from "./pages/AppliedJobs"
import MyJobs from "./pages/MyJobs"
import MyCV from "./pages/MyCV"
import Meetings from "./pages/Meetings";
import MyMeetings from "./pages/MyMeetings";
import Noticeboard from "./pages/Noticeboard";
import Error404 from "./pages/Error404";
import GroupsInfo from "./pages/GroupsInfo"
import Groups from "./pages/Groups";
import LiveStream from './pages/LiveStream';
import Faq from './pages/Faq';
import Video from './Video/Video'

import api from './api/api'
import CircularProgress from '@mui/material/CircularProgress';
import { Switch, Route, useHistory, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { updateData } from './features/userData/userData'
import { updateNotif } from './features/Notifications/notifications'
import { updateChats } from './features/Chats/chats'
import socket from './socket/socket';
import Options from './options/Options'
import { useSnackbar } from 'notistack';
import VideoState from './context/VideoState';

function App() {

  const userData = useSelector(state => state.userData.data)
  const dispatch = useDispatch()

  let history = useHistory();
  const [verify, setVerify] = useState(false)
  const [isStateReady, setIsStateReady] = useState(false)


  const handleLoginState = () => {
    setVerify(true)
  }

  const token = localStorage.getItem('accessToken')

  const verifyJWT = async () => {
    return await api.post('/users/verifyJWT', { token: token })
  }

  useEffect(() => {
    console.log('henlo')
    dispatch(updateData(JSON.parse(localStorage.getItem('loggedUser'))))

    if (token && verifyJWT()) {
      const { _id } = JSON.parse(localStorage.getItem('loggedUser'))
      api.get(`/users/viewuser/${_id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      }).then((result) => {
        dispatch(updateData(result.data))
        localStorage.setItem('loggedUser', JSON.stringify(result.data))
        api.get(`/users/getNotification/${result.data._id}`)
          .then((result1) => {
            // console.log(result.data)
            dispatch(updateNotif(result1.data))

            api.get(`/users/inbox/${result.data._id}`)
              .then((result2) => {
                console.log(result.data)
                dispatch(updateChats(result2.data))
                setIsStateReady(true)
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
      })
    }
  }, [])

  if (!token) {
    return (
      <Switch>
        <Route exact path="/">
          <Login handleLoginState={handleLoginState} setIsStateReady={setIsStateReady} />
        </Route>
        <Route path="/Signup">
          <Signup />
        </Route>
        <Route path="*">
          <Redirect to='/' />
        </Route>
      </Switch>
    );
  }
  else {

    if (!verifyJWT()) {
      return (
        <Switch>
          <Route exact path="/">
            <Login handleLoginState={handleLoginState} />
          </Route>
          <Route path="/Signup">
            <Signup />
          </Route>
          <Route path="*">
            <Redirect to='/' />
          </Route>
        </Switch>
      );
    }
    else if (isStateReady) {
      return <LoggedIn />
    }
    else {
      return (
        <div className=" flex flex-1 h-screen w-full justify-center items-center ">
          <CircularProgress color="primary" />
        </div>
      )
    }
  }
}

const LoggedIn = () => {
  const userData = useSelector(state => state.userData.data)
  const dispatch = useDispatch()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  // const [notifSound] = useState(new Audio('./assets/NotifSound.mp3'));

  const handleSnackbar = (message, variant) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message, { variant });
  };
  useEffect(() => {
    socket.connect()
    socket.emit('joinUser', { uid: userData._id })

    socket.on('updateNotification', () => {
      console.log('bhai sahab')
      api.get(`/users/getNotification/${userData._id}`)
        .then((result) => {
          console.log(result.data)
          dispatch(updateNotif(result.data))
          // notifSound.play()
          handleSnackbar('You have new notifications !', 'info')

        })
        .catch((e) => console.log(e))

      api.get(`/users/viewuser/${userData._id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      }).then((result) => {
        dispatch(updateData(result.data))
      })
        .catch((e) => console.log(e))

    })

    socket.on('updateChats', ({ senderId }) => {
      socket.emit('chatPingBack', { senderId: senderId })
      console.log('hewwo')
      api.get(`/users/inbox/${userData._id}`)
        .then((result2) => {
          console.log(result2.data)
          dispatch(updateChats(result2.data))

        })
        .catch((e) => {
          console.log(e)
        })
      api.get(`/users/viewuser/${userData._id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      }).then((result) => {
        dispatch(updateData(result.data))
      })
        .catch((e) => console.log(e))
    })
    socket.on('chatPingUser', () => {
      console.log('hewwo ping back')
      api.get(`/users/inbox/${userData._id}`)
        .then((result2) => {
          console.log(result2.data)
          dispatch(updateChats(result2.data))

        })
        .catch((e) => {
          console.log(e)
        })
      api.get(`/users/viewuser/${userData._id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      }).then((result) => {
        dispatch(updateData(result.data))
      })
        .catch((e) => console.log(e))
    })
  }, [])

  return (
    <VideoState>
      <Switch>
        <Route path="/" exact>
          <DigitalWall />
        </Route>
        <Route path="/Connections">
          <Connections />
        </Route>
        <Route path="/Notifications">
          <Notifications />
        </Route>
        <Route path="/Profile/:id">
          <Profile />
        </Route>
        <Route path="/Chat">
          <Chat />
        </Route>
        <Route path="/EditProfile">
          <EditProfile />
        </Route>
        <Route path="/ChangePassword">
          <ChangePassword />
        </Route>
        <Route path="/Feedbacks">
          <Feedbacks />
        </Route>
        <Route path="/JobManagement">
          <JobManagement />
        </Route>
        <Route path="/SavedJobs">
          <SavedJobs />
        </Route>
        <Route path="/AppliedJobs">
          <AppliedJobs />
        </Route>
        <Route path="/MyJobs">
          <MyJobs />
        </Route>
        <Route path="/MyCV">
          <MyCV />
        </Route>
        <Route path="/Meetings">
          <Meetings />
        </Route>
        <Route path="/MyMeetings">
          <MyMeetings />
        </Route>
        <Route path="/LiveStream/:meetingID/:uID/:type">
          <LiveStream />
        </Route>
        <Route path="/Noticeboard">
          <Noticeboard />
        </Route>
        <Route path="/Groups">
          <Groups />
        </Route>
        <Route path="/GroupsInfo/:gid">
          <GroupsInfo />
        </Route>
        <Route path="/Call">
          <Video />
        </Route>
        <Route path="/faq">
          <Faq />
        </Route>
        <Route path="*">
          <Error404 />
        </Route>
      </Switch>
      <Options />
    </VideoState>
  );
}

export default App;
