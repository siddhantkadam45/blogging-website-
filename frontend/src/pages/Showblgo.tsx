import { useLocation } from "react-router-dom"
import { useRecoilValue } from "recoil";
import { blogPostFamily } from "../atoms/creat";
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = 'https://backend.siddhantclg.workers.dev/api/v1/book';

export default function Showblgo() {
    const location = useLocation();
    const data  = location.state;
    const [dateto, setdate] = useState<string>('');
    const [title,settitle] = useState<string>('');
    const [description , setdescription] = useState<string>('');
    const [nameof , setname ] = useState('');
    const [abouthim, setabouthim] = useState('');

    const atomsdata = useRecoilValue(blogPostFamily(data.id));
   
    useEffect(()=>{
        async function makerequest() {
            const token = `Bearer ${localStorage.getItem('jwttoken')}`
            const url = `${API_URL}/${data.id}`
            console.log(url)
            const res = await axios.get(url,{headers:{
                Authorization: token
            }})
            const dataa:any = res.data.post;

            settitle(dataa.title);
            setdescription(dataa.content)

            const date = new Date();
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            let currentDate = `${day}-${month}-${year}`;
            console.log(currentDate);
            setdate(currentDate)
            setname('siddhant')
            setabouthim('passionate web devloper ')
        }
        makerequest();
    })
    function capitalizeFirstLetter(str:string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    
    return (
        <div>
            <div className="flex justify-center mx-24 mt-36">
                <div className="flex  gap-10">
                    <div className="flex flex-col w-9/12 gap-2">
                        <div className="font-semibold text-7xl py-10 bg-slate-100">{capitalizeFirstLetter(title)}</div>
                        <div className="my-5"> posted on {dateto}</div>
                        <div className="text-lg">{description}</div>
                    </div>
                    <div className="flex flex-col gap-5">
                        <div className="text-xl mt-5">Author</div>
                        <div className="flex gap-4 ">
                            <div className="bg-slate-200 flex flex-col w-7 h-7 border rounded-full mt-4 ml-2"> </div>
                            <div>
                                <div className="text-2xl font-semibold">{nameof} </div>
                                <div className="text-lg">{abouthim}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
