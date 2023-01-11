import React from 'react'
import Image from 'next/image'

const Feed = () => {
    return (
        <div className="flex flex-col justify-center items-center py-[80px] z-[-1] gap-4">
            <div className="card lg:card-side glass shadow-xl ">
                <figure><img src="https://placeimg.com/400/400/arch" alt="Album" className="w-[200] h-[200]" /></figure>
                <div className="card-body">
                    <h2 className="card-title">New album is released!</h2>
                    <p>Click the button to listen on Spotiwhy app.</p>
                    <div className="card-actions justify-end">
                        <button className='btn btn-secondary'>Like</button>
                        <button className="btn btn-tertiary">Unlike</button>
                        <button className="btn btn-primary">Comment</button>
                    </div>
                </div>
            </div>
            <div className="card lg:card-side bg-base-100 shadow-xl">
                <figure><img src="https://placeimg.com/400/400/arch" alt="Album" /></figure>
                <div className="card-body">
                    <h2 className="card-title">New album!</h2>
                    <p>Click the button to listen on Spotiwhy app.</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Listen</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Feed