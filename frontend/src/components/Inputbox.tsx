
type obj ={
    name:string,
    typename:string,
    onchange:Function
}
export default function Inputbox({ name, typename, onchange }:obj) {
    // console.log(onchange)
    return (
        <div className='  mt-0 lg:mt-0 h-fit '>
            <div><h2 className='w-full py-2 text-bold'>{name}</h2></div>
            <div>
                <input type={typename} onChange={onchange}
                    placeholder={`Enter the ${name}`}
                    className='border text-[#848b96] p-1 text-left rounded-md w-full' />
            </div>
        </div>
    )
}