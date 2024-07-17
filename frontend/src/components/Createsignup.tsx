import Showtitle from "./Showtitle";
import Inputbox from './Inputbox';
import Navigate from "./Navigate";
import Cardholder from "./Cardholder";
import { ChangeEvent, useState } from "react";
import { signupinput } from '@siddhant1234/commonmodulesi'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { globalid } from "../atoms/creat";


export default function Createsignup() {

    return (
        <div>
            <div className="flex flex-row justify-between">
                <Cardholder card={Leftdiv} />
                <Rightdiv />
            </div>
        </div>
    )
}
const tempurl = 'https://backend.siddhantclg.workers.dev/api/v1/user'
function Leftdiv() {
    const [username, setusername] = useState('');
    const navigate = useNavigate();
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const setglid = useSetRecoilState(globalid);
    async function handlechange() {
        const url = '/signup'
        const f = `${tempurl}${url}`
        const b: signupinput = {
            email: email,
            name: username,
            password: password
        }
        const res = await axios.post(f, b);
        console.log(res.data.jwt);
        localStorage.setItem('jwttoken', res.data.jwt)
        
        navigate('/blog')
    }
    return (
        <div className="w-full">
            <Showtitle title="Create an account" description="Already have an account ?" />
            <Inputbox name='Username' typename='text' onchange={(e: ChangeEvent) => setusername(e.currentTarget.value)} />
            <Inputbox name="Email" typename="email" onchange={(p: ChangeEvent) => setemail(p.currentTarget.value)} />
            <Inputbox name='Password' typename='password' onchange={(e: ChangeEvent) => setpassword(e.currentTarget.value)} />
            <Navigate name='Signup' onchange={() => handlechange()} />
        </div>
    )
}

function Rightdiv() {

    return (
        <div className=" bg-[#F3F4F6] h-screen w-full flex flex-col justify-center p-6">
            <div className="bg-[#F3F4F6] max-w-2xl	p-3 ">
                <p className="font-bold text-lg text-left">
                    "The customer service I received was exceptional. The support team went above and beyond to address my concerns."
                </p>
                <p className="font-bold mt-1">
                    Jules Winnfield
                </p>
                <p className="mt-0">   CEO, Acme Inc </p>
            </div>
        </div>
    )
}

