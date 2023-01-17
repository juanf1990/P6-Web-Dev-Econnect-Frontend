"use client";
import React from 'react'
import Image from 'next/image'
import { useState } from 'react'
const url = "http://localhost:8081/api/users/signup";


const Signup = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    let handleSubmit = async (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      try {
        let res = await fetch(url , {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName: userName,
            email: email,
            password: password,
          }),
        });
        let resJson = await res.json();
        console.log(resJson);
        if (res.status === 201) {
        setUserName("");
        setEmail("");
        setPassword("");    
          alert("Thanks for Signing up");
        } else {
            alert("User/Email already exists");
        }
      } catch (err) {
        console.log(err);
      }
    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content w-[80vw] flex-col">

                <div className="flex flex-col justify-center items-center text-center lg:text-left">
                    <div className="pb-3">
                        <Image src="/icon-above-font.svg" alt="E-Connect Logo" width={150} height={150} className="bg-cover rounded-full" />
                    </div>
                    <h1 className="text-4xl font-bold">Sign up now!</h1>
                </div>
                <form onSubmit={handleSubmit} className="card flex-shrink-0 w-[80vw] max-w-md shadow-2xl bg-base-100">
                    <div className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                            type="text"
                            name="username"
                            onChange={(e) => { setUserName(e.target.value);}}
                            value= {userName}
                            placeholder="Name"
                            className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                            type="email"
                            name="email"
                            onChange={(e) => { setEmail(e.target.value);}}
                            value= {email}
                            placeholder="youremail@groupomania.com"
                            className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                            type="password"
                            name="password"
                            onChange={(e) => { setPassword(e.target.value);}}
                            value={password}
                            placeholder="********"
                            className="input input-bordered" />
                        </div>
                        <div className="form-control mt-6">
                            <button 
                            type="submit"
                            className="btn btn-primary">Submit!</button>
                        </div>
                        <div className="form-control mt-6">
                            <label className="label">
                                <span className="label-text-alt">Already with us? <a href="/" className="link link-hover">Login now!</a></span>
                            </label>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup