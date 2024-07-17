import { useRecoilValue } from 'recoil';
import image from '../images/Screenshot 2024-04-15 070753.png';
import { blogPostFamily, blogPostIdsState } from '../atoms/creat';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Setupdiv() {
    return (
        <div className='flex justify-center'>
            <div className='w-fit h-fit    mx-56'>
                <Maincomponent />
            </div>
        </div>
    );
}
interface forid {
    ids:any
}
function Maincomponent() {
    const ids = useRecoilValue(blogPostIdsState);
    return (
        <div>
            {ids.length > 0 ? ids.map((id, index) => (
                <div key={index} className='mb-16'> 
                    <Setcomponent ids={id} /> 
                </div>
            )) : <div>loading</div>}
        </div>
    );
}

function Setcomponent({ ids }:forid) {
    const [check, setCheck] = useState(false);

    useEffect(() => {
        setCheck(true);
    }, [ids]);

    return (
        <div>
            {check ? <HomeBlogHolder ids={ids} /> : <div>loading</div>}
        </div>
    );
}

function HomeBlogHolder({ ids }:forid) {
   const navigate = useNavigate();
   const atoss = useRecoilValue(blogPostFamily(ids));
//    console.log('atoms is ', atoss)
    return (
        <div className='flex justify-between p-0 cursor-pointer	' onClick={() =>  navigate('/showpath',{state: {id:atoss.authorId}})} >
            <div className='w-9/12'>
                <MadeBy ids={ids} />
            </div>
            <div className='flex justify-center flex-col'>
                <ImageShow />
            </div>
        </div>
    );
}

function MadeBy({ ids }:forid) {
    const atoms = useRecoilValue(blogPostFamily(ids));
    return (
        <div>
            <div>
                <div className='flex gap-4 w-full'>
                    <div>
                        <img src={image} alt="Author" className='w-7 h-7 border rounded-2xl' />
                    </div>
                    <div>Siddhant</div>
                    <div>Dec. 4, 2024</div>
                </div>
            </div>
            <div>
                <div className='mt-1'>
                    <div className='font-bold text-xl'>
                        {atoms.title}
                    </div>
                    <div className='pt-1'>
                        {atoms.content}
                    </div>
                </div>
            </div>
        </div>
    );
}

function ImageShow() {
    return (
        <div>
            <img src={image} className='w-28 h-28' alt="Blog Visual" />
        </div>
    );
}
