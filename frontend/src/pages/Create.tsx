// import { Images } from 'lucide-react'
import { useState } from 'react'
import image from '../images/medium.png'
import axios from 'axios';
import AlertCustomStyles from '../components/Alert'
export default function Create() {
    return (
        <div>
            <Showtitlebar />
            <C />
        </div>
    )
}

function Showtitlebar() {
    return (
        <div className="flex justify-between px-10">
            <div className="flex gap-2 items-center">
                <div><img src={image} alt="" className='w-16 h-10 rounded-3xl' /></div>
                <div className=' text-xl text-center'>drafts in sid </div>
                <div>saved</div>
            </div>
            <div className="flex gap-4 items-center">
                <div><button className='bg-green-400  border rounded-md px-1'>Publish</button></div>
                <div><button className='flex text-center ju items-center py-1 mb-2 '>...</button></div>
                <div><button>N</button></div>
                <div><button className=' w-7  border rounded-full '>S</button></div>
            </div>
        </div>
    )
}
const API_URL = 'https://backend.siddhantclg.workers.dev/api/v1/book';
type CustomChangeEvent = React.ChangeEvent<HTMLInputElement>;
function C() {
    const [content, setcontent] = useState<string>('');
    const [title, settitle] = useState<string>('');
    
    const [foralert ,setalert ] = useState(false)
    async function makerequest(): Promise<void> {
        const body = {
            title,
            content
        }
        const token = `Bearer ${localStorage.getItem('jwttoken')}`;
        const res = await axios.post(`${API_URL}/createblogfor`, body, {
            headers: {
                Authorization: token,
            },
        });
        console.log(' ', res.data.message)
        setalert(true)
    }
    return (
        <div className='flex justify-center '>
            <div className=' flex  gap-4 w-7/12'>
                <div className='flex justify-center flex-col pl-3  text-3xl'>
                    <button onClick={makerequest}>+</button>
                </div>
                <div className='w-full '>
                    <div><input type="text" placeholder='Title' className='w-full h-14 text-3xl font-md' onChange={(e: CustomChangeEvent) => {
                        const inputTarget = e.target as HTMLInputElement;
                        settitle(inputTarget.value)
                    }} /></div>
                    <div><input type="text" placeholder='Tell your story ..' className='w-full h-8' onChange={(e: CustomChangeEvent) => {
                         const inputTarget = e.target as HTMLInputElement;
                        setcontent(inputTarget.value)
                    }} /></div>
                </div>
            </div>
            <div>
                {foralert ? <AlertCustomStyles message = 'successfully created '/>: <div></div>}
            </div>
        </div>
    )
}
