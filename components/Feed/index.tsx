import React from 'react'
import Image from 'next/image'

const Feed = () => {
    return (
        <div className="flex flex-col justify-center items-center py-[80px] z-[-1] gap-4">
            <div className="card flex lg:card-side glass shadow-xl ">
                <figure><img src="https://placeimg.com/400/400/arch" alt="Album" className="w-[200] h-[200]" /></figure>
                <div className="card-body">
                    <h2 className="card-title">New album is released!</h2>
                    <p>Click the button to listen on Spotiwhy app.</p>
                    <div className="flex justify-end">
                        <span className="badge badge-primary readBy">Read</span>
                    </div>
                </div>
            </div>
            <div className="card flex lg:card-side glass shadow-xl ">
                <figure><img src="https://placeimg.com/400/400/arch" alt="Album" className="w-[200] h-[200]" /></figure>
                <div className="card-body">
                    <h2 className="card-title">New album is released!</h2>
                    <p>Click the button to listen on Spotiwhy app.</p>
                    <div className="flex justify-end">
                        <span className="badge badge-primary readBy">Read</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Feed