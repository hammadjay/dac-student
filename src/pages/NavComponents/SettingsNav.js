import { Link } from 'react-router-dom'
export default function ({ rs=false, edit = false, changePass = false, feedbacks = false }) {

    return (
        <div className={` w-full lg:w-1/4  bg-primary text-white overflow-auto p-6 ${rs ? '' :'hidden lg:block'} `} style={{ height: '90vh' }} >
            <p className='font-semibold text-lg mb-5' >Account Settings</p>
            <Link to='/EditProfile'>
                {
                    edit ?
                        <button className='my-1' ><p className=' font-semibold' >Edit Profile</p></button>
                        :
                        <button className='my-1' ><p className='' >Edit Profile</p></button>
                }
            </Link>
            <br />
            <Link to='/ChangePassword'>
                {
                    changePass ?
                        <button className='my-1' ><p className=' font-semibold' >Change Password</p></button>
                        :
                        <button className='my-1' ><p className='' >Change Password</p></button>
                }
            </Link>
            <br />
            {/* <button className='my-1' ><p>Blocked Users</p></button>
            <br /> */}
            <p className='font-semibold text-lg my-5' >Help & Feedback</p>
            <Link to='/faq'>
                <button className='my-1' ><p className=' ' >FAQ</p></button>
            </Link>
            <br />
            <Link to='/Feedbacks'>
                {
                    feedbacks ?
                        <button className='my-1' ><p className=' font-semibold' >Feedbacks</p></button>
                        :
                        <button className='my-1' ><p className='' >Feedbacks</p></button>
                }
            </Link>
            <br />
            <button className='my-1' ><p>Privacy Policy</p></button>
            <br />
            <button className='my-1' ><p>Terms & Conditions</p></button>
            <br />
            <button className='my-1' ><p>About us</p></button>
        </div>
    )
}