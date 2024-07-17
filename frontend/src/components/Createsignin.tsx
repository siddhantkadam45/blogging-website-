import axios from "axios";
import Inputbox from "./Inputbox";
import Navigate from "./Navigate";
import { ChangeEvent, useState } from "react";
import { signininput } from "@siddhant1234/commonmodulesi";
import { useNavigate } from "react-router-dom";

const tempurl = 'https://backend.siddhantclg.workers.dev/api/v1/user'

export default function Createsignin() {
    const navigate = useNavigate();
    const [email,setemail] = useState('')
    const [password, setpassword] = useState('')
    async function handlesignin() {
        const b:signininput = {
            email:email,
            password:password
        }
        const res = await axios.post(`${tempurl}/signin`,b);
        localStorage.setItem('jwttoken',res.data.jwt)
        navigate('/blog')
    }
  return (
    <div>
        <Inputbox name='Email' typename="email" onchange={(e:ChangeEvent)=> setemail(e.currentTarget.value)}/>
        <Inputbox name='Password' typename="password" onchange={(e:ChangeEvent)=> setpassword(e.currentTarget.value)}/>
        <Navigate  name="Signin" onchange={()=> handlesignin()} />
    </div>
  )
}
