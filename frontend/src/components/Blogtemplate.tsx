import { useEffect, useState } from 'react';
import Setupdiv from './Blogholderf';
import axios from 'axios';
import Blog from '../atoms/Blog';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { idnumber } from '../atoms/creat';

export default function BlogTemplate() {
	return (
		<div>
			<RecoilRoot>
				<HoldComponent />
				<Setupdiv />
			</RecoilRoot>
		</div>
	);
}

const API_URL = 'https://backend.siddhantclg.workers.dev/api/v1/book';

export interface BlogData {
	id: any;
	title: string;
	content: string;
	published: boolean;
	authorId: string;
}

function HoldComponent() {
	const [responseArray, setResponseArray] = useState<BlogData[]>([]);
	const [isRequestComplete, setRequestComplete] = useState(false);

	useEffect(() => {
		async function fetchData() {
			try {
				const token = `Bearer ${localStorage.getItem('jwttoken')}`;
				const res = await axios.get(`${API_URL}/bulk`, {
					headers: {
						Authorization: token,
					},
				});
				setResponseArray(res.data.data);
				setRequestComplete(true);
			} catch (e) {
				console.error('Error fetching data:', e);
			}
		}
		fetchData();
	}, []);

	return (
		<div className='flex justify-center ml-72 mr-72'>
			<div className='flex flex-col justify-center'>
				<TitleHoldingFor />
				<div className='mb-10'>
					{isRequestComplete ? <Blog arrayToStore={responseArray} /> : <Loading />}
				</div>
			</div>
		</div>
	);
}

function TitleHoldingFor() {
	const navigate = useNavigate();
	
	return (
		<div className='flex'>
			<div className='flex gap-3 text-center p-1 mb-10'>
				<div className='rounded-full border text-2xl bg-blue-600 w-10 h-10 text-center mx-5 cursor-pointer'>+</div>
				<div className='underline'>For you</div>
				<div>Following</div>
			</div>
			<div>
				<button className='ml-56 text-xl bg-green-300 border px-2 rounded-full py-1' onClick={() => navigate('/create')}>Profile</button>
			</div>
		</div>

	);
}

function Loading() {
	return <h1>Still waiting...</h1>;
}
