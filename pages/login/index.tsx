import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { getSignedInUserId, signIn } from '../../services/auth_service'
import { ServiceResponse } from '../../services/service_response'
import { useRouter } from 'next/router'

function Login() {

    const [loading, setLoading] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error_msg, setErrMsg] = useState<string>('')
    const router = useRouter()

    const mounted = useRef(false);
    useEffect(() => {
        mounted.current = true;
        
        //if we are already signed in
        if(getSignedInUserId() != undefined)
        router.push('/')

        return () => {
            mounted.current = false;
        };
    }, []);


    const handleLogin = async (email: string) => {
        try {
            if (loading || email.trim().length < 1 || password.trim().length < 1) return;
            setLoading(true)
            setErrMsg('')
            const result : ServiceResponse = await signIn(email.trim(), password.trim());
            if(result.isSuccessful){
                router.push('/'); //return home
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
        <form className="font-mono flex flex-col justify-center max-w-md border-2 border-zinc-300 px-4 py-8">

            <h1 className="text-green-700">Welcome Back  | Login</h1>
            <p className=" text-black mt-4">Enter your email</p>
            <input
                className="rounded-xl my-2 focus:border-green-500"
                type="email"
                placeholder="Your email"
                value={email}
                autoComplete='current-email'
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className="rounded-xl my-2 focus:border-green-500"
                type="password"
                placeholder="Your password"
                value={password}
                autoComplete='current-password'
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                onClick={(e) => {
                    e.preventDefault()
                    handleLogin(email)
                }}
                className="rounded-full bg-green-600 text-white uppercase h-10 hover:bg-green-500"
                disabled={loading}
            >
                <span>{loading ? 'Loading ...' : 'Sign In'}</span>
            </button>

            {error_msg ? <div className='my-2 text-red-800'>
                {error_msg}
            </div> : <></>}

            <div className="my-2 flex justify-end">
            <Link href={'/register'}><span className='font-mono font-bold hover:cursor-pointer hover:text-green-700 underline'>New? Register Here</span></Link>
            </div>
            
        </form>
    )
}

export default Login

