import React from 'react'
import Image from 'next/image'

const Hero = () => {
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content w-[80vw] flex-col">
                
                <div className="flex flex-col justify-center items-center text-center lg:text-left">
                <div className="pb-3">
                    <Image src="/icon-above-font.svg" alt="E-Connect Logo" width={150} height={150} className="bg-cover rounded-full" />
                </div>
                    <h1 className="text-4xl font-bold">Login now!</h1>
                </div>
                <div className="card flex-shrink-0 w-[80vw] max-w-md shadow-2xl bg-base-100">
                    <div className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="text" placeholder="password" className="input input-bordered" />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                        <div className="form-control mt-6">
                            <label className="label">
                                <span className="label-text-alt">Don't have an account? <a href="/signup" className="link link-hover">Sign up</a></span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero

    // < div className = "flex flex-col items-center justify-center h-screen" >
          
    //       <div className="text-center">
    //         <h1 className="text-4xl font-bold text-light-yellow">{title}</h1>
    //       </div>
    //       <div className="form-control flex flex-column">
    //         <label className="label text-center justify-center mt-3">
    //           <span className="label-text text-light-secondary text-xl">Sign Up now!</span>
    //         </label>
    //         <label className="input-group">
    //           <span className='text-white'>Email</span>
    //           <input type="text" placeholder="you@groupomania.com" className="input input-bordered text-cyan-400" />
    //           <button className="btn btn-primary">Submit!</button>
    //         </label>
    //         <label className="label text-center justify-center mt-3">
    //           <span className="label-text text-white">Already with us? Just <a href="#" className="no-underline text-light-secondary">Login</a>!</span>
    //         </label>
    //       </div>
    //   </div >