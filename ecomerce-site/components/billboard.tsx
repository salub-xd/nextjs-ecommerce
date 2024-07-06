import { Billboard } from '@/types'
import React from 'react'
interface BillboardProps {
    data: Billboard;
}
const Billboard: React.FC<BillboardProps> = ({
    data
}) => {
    return (
        <div className='p-4 sm:px-6 lg:px-8 rounded-xl overflow-hidden '>
            <div
                className='rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover'
                style={{ backgroundImage: `url(${data?.imageUrl})` }}
            >
                <div className='h-full w-full flex flex-col justify-center items-center text-center gap-x-8'>
                    <div className='font-bold text-white text-3xl sm:text-5xl lg:text-7xl'>
                        {data?.label}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Billboard
