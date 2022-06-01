import { useHistory } from 'react-router-dom';

import { AiOutlineSearch } from "react-icons/ai";
import { MdBlock, MdCheck } from "react-icons/md";
import { CgUserRemove, CgClose } from "react-icons/cg";
import '../../App.css'
import api from "../../api/api";
import { useSelector, useDispatch } from 'react-redux'
import { updateData } from '../../features/userData/userData'



const ConnectionItem = ({ details, isPending = false }) => {
    const userData = useSelector(state => state.userData.data)
    const dispatch = useDispatch()
    let history = useHistory();
    const { _id } = JSON.parse(localStorage.getItem('loggedUser'))
    var department = details.program.substr(1, details.program.length - 1)

    const acceptRequestHandler = () => {
        api.post(`/users/acceptRequest/${details._id}/receiver/${_id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then((response) => {
            console.log('response', response.data)
            dispatch(updateData(response.data.receiver))
            localStorage.setItem('loggedUser', JSON.stringify(response.data.receiver))

        }).catch((err) => {
            console.log('response', err)

        })
    }
    return (
        <div className='mx-2 my-2 p-2 flex shadow-md justify-between rounded-md border border-gray-300'>

            <button className='flex' onClick={() => {
                history.push('/profile/' + details._id)
                window.location.reload()
            }} >
                <img src={details.profilePhoto} alt='user pic' className='rounded-full h-14 w-14' />
                <div className='my-auto ml-2'>
                    <p className='text-sm font-semibold'>{details.firstName + ' ' + details.lastName}</p>
                    <p className='text-xs '>{details.userType + ' ' + department}</p>
                </div>
            </button>
            {/* {
                isPending ?
                    <div className=' my-auto' >
                        <button className='rounded-full p-2 ml-3 mx-2' onClick={() => { }}>
                            <MdCheck size={24} className='my-auto mx-auto text-gray-600 ' />
                        </button>
                        <button className='rounded-full p-2 '>
                            <CgClose size={24} className='my-auto mx-auto text-gray-600 ' />
                        </button>
                    </div>
                    :
                    <div className=' my-auto' >
                        <button className='rounded-full p-2 ml-3 mx-2'>
                            <CgUserRemove size={24} className='my-auto mx-auto text-gray-600 ' />
                        </button>
                        <button className='rounded-full p-2 '>
                            <MdBlock size={24} className='my-auto mx-auto text-gray-600 ' />
                        </button>
                    </div>
            } */}
        </div>
    )
}

export default function Connections({ user }) {

    var activeUser = JSON.parse(localStorage.getItem('loggedUser'))
    console.log('henlo', user.pendingRequest)
    return (
        <div className='flex lg:flex-row flex-col-reverse h-auto'>
            <div className=' w-full lg:w-4/6 h-full border-2 rounded-md shadow-md mx-auto bg-white py-3 ' >
                <div className='mb-2 flex w-11/12 mx-auto'>
                    <form className="my-auto w-full rounded-md bg-gray-300 flex">
                        <input className="  focus:outline-none rounded-md  bg-gray-300 h-full w-full p-2  placeholder-gray-500" placeholder="Search Connections..." />
                        <button> <AiOutlineSearch onClick={() => { alert('search hogya') }} size={32} className=" text-gray-500 my-auto mr-3" /></button>
                    </form>
                </div>
                {
                    user.pendingRequest.length !== 0 && activeUser._id === user._id ?
                        <div className='mb-5 p-2 w-11/12  mx-auto roundedx-md'>
                            <p className='font-semibold' >Pending requests</p>
                            {
                                user.pendingRequest.map((item) => {
                                    console.log('item', item);
                                    return <ConnectionItem details={item} isPending />
                                })
                            }
                        </div> :
                        <></>
                }


                <div className='mb-5 p-2 w-11/12  mx-auto roundedx-md'>
                    <p className='font-semibold' >All connections</p>
                    {
                        user.connections.length === 0 ?
                            <p className=' text-center' >No connections yet</p>
                            :
                            <></>
                    }
                    {
                        user.connections.map((item) => {
                            return <ConnectionItem details={item} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}