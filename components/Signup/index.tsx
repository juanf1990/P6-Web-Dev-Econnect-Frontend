import React from 'react'
import Image from 'next/image'

const Signup = () => {
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content w-[80vw] flex-col">

                <div className="flex flex-col justify-center items-center text-center lg:text-left">
                    <div className="pb-3">
                        <Image src="/icon-above-font.svg" alt="E-Connect Logo" width={150} height={150} className="bg-cover rounded-full" />
                    </div>
                    <h1 className="text-4xl font-bold">Sign up now!</h1>
                </div>
                <div className="card flex-shrink-0 w-[80vw] max-w-md shadow-2xl bg-base-100">
                    <div className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" placeholder="Name" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="youremail@groupomania.com" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="********" className="input input-bordered" />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Submit!</button>
                        </div>
                        <div className="form-control mt-6">
                            <label className="label">
                                <span className="label-text-alt">Already with us? <a href="/" className="link link-hover">Login now!</a></span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup