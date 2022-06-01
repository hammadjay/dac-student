import { Link } from 'react-router-dom'
import Error from '../img/PageNotFound.jpg'

export default function Error404(){
    return (
        <div className='flex flex-col justify-center items-center' >
            <Link to='/'>
            <button className='bg-primary text-white font-semibold px-4 py-2 rounded-md mt-3 ' >
                Go Home
            </button>
            </Link>
            <img src={Error} alt='Error 404' className='w-auto h-auto' />
        </div>
    )
}