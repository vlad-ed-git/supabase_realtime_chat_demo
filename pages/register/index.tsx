import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { getSignedInUserId, signUp } from '../../services/auth_service'

function Register() {

    const [loading, setLoading] = useState<boolean>(false)
    const [isUsernameTaken, setIsUsernameTaken] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error_msg, setErrMsg] = useState<string>('')

    const router = useRouter();

    const mounted = useRef(false);
    useEffect(() => {
        mounted.current = true;

        //if user already signed in
        if(getSignedInUserId() != undefined)
        router.push('/')

        return () => {
            mounted.current = false;
        };
    }, []);


    const handleSignUp = async () => {
        try {
            if (loading || email.trim().length < 1 || username.trim().length < 1 || password.trim().length < 1) return;
            setLoading(true)
            setErrMsg('')
            const result = await signUp(email.trim(), password.trim(), username.trim());
            if (result.isSuccessful) {
                router.push('/')
            }else{
                setErrMsg(result.messageIfFailed);
            }
        } catch (error) {
            console.log(error);
            setErrMsg('Something went wrong!');
        } finally {
            if(mounted)
            setLoading(false)
        }
    }


    return (
        <form className="font-mono flex flex-col justify-center max-w-md border-2 border-zinc-300 px-4 py-8" autoComplete="off">

            <h1 className="text-green-700">Welcome | Register Now</h1>
            <p className=" text-black mt-4">Enter your email</p>
            <input
                className="rounded-xl my-2 focus:border-green-500"
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

<input
                className="rounded-xl mt-2 mb-1 focus:border-green-500"
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <p className='text-red-800 mb-1'>{isUsernameTaken ? 'this username is taken!' : '' }</p>

            <input
                className="rounded-xl my-2 focus:border-green-500"
                type="password"
                placeholder="Your password"
                value={password}
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                onClick={(e) => {
                    e.preventDefault()
                    handleSignUp()
                }}
                className="rounded-full bg-green-600 text-white uppercase h-10 hover:bg-green-500"
                disabled={loading}
            >
                <span>{loading ? 'Loading ...' : 'Register'}</span>
            </button>

            {error_msg ? <div className='my-2 text-red-800'>
                {error_msg}
            </div> : <></>}

            <div className="my-2 flex justify-end">
            <Link href={'/login'}><span className='font-mono font-bold hover:cursor-pointer hover:text-green-700 underline'>Not New? Login Here</span></Link>
            </div>
            
        </form>
    )
}

export default Register

