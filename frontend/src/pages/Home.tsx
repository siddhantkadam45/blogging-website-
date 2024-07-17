// import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Defaultpage() {
    const navigate = useNavigate();
    return (
        <div className='flex flex-col gap-10'>
            <div className='flex justify-center  mt-24' >
                <button onClick={() => navigate('/signup')} className='w-24 bg-slate-300 border p-2 mr-10 rounded-full'>Sign up</button>
                <button onClick={() => navigate('/signin')} className='w-24 bg-slate-300 border p-2 ml-10 rounded-full'>signin</button>
            </div>
            <div className='font-bold flex justify-center text-3xl'>
                Welcome to bloggin website, Please signup or signin to continue  ..
            </div>
        </div>
    )
}
