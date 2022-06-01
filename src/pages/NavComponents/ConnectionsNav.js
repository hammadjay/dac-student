import { MdPerson, MdMap } from "react-icons/md";

import { Link } from 'react-router-dom'


export default function ConnectionNav({ connection = false, locator = false }) {
    return (
        <>
            <div className="flex my-3">
                <Link to='/Connections'>
                    <button className="flex ">
                        <div className='bg-primary p-2 rounded-full'>
                            <MdPerson className='text-white bg-transparent' size={20} />
                        </div>
                        {
                            connection ?
                                <p className='my-auto text-sm ml-2 font-bold'>Connections</p>
                                :
                                <p className='my-auto text-sm ml-2 font-normal'>Connections</p>

                        }
                    </button>
                </Link>
            </div>
            {/* <div className="flex my-3">
                <Link to='AlumniLocator'>
                    <button className="flex ">
                        <div className='bg-primary p-2 rounded-full'>
                            <MdMap className='text-white bg-transparent' size={20} />
                        </div>
                        {
                            locator ?
                                <p className='my-auto text-sm ml-2 font-bold'>Alumni Locator</p>
                                :
                                <p className='my-auto text-sm ml-2 font-normal'>Alumni Locator</p>
                        }
                    </button>
                </Link>
            </div> */}
        </>
    );
}