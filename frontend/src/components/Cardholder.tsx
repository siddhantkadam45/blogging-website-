
interface obj {
    card:React.ComponentType<any>; 
}
export default function Cardholder({ card:CardComponent }:obj) { 
    return (
        <div className='h-full w-screen border bg-[#FFFFFF] flex flex-col justify-center '>
            <div className="items-center flex justify-center py-20">
                <div className="bg-[#ffffff] border items-center   px-5 lg:w-80 w-72	 rounded-md">
                    <CardComponent />
                </div>
            </div>
        </div>
    );
}