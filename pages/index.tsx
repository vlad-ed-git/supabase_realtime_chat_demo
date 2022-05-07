import { Session } from '@supabase/supabase-js'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { SignOut } from '../services/auth_service'
import supabase from '../services/supabase_config'
import PublicChat from './public_chat'

const Home: NextPage = () => {
  
  const [session, setSession] = useState<Session | null>(null)

  async function LogOut() {
    const result = await SignOut();
    if(result.isSuccessful)setSession(null);
  }

  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    setSession(supabase.auth.session())
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => {
        mounted.current = false;
    };
  }, [])

  return (
    <div className='flex w-full flex-col p-2'>


        <header className='flex flex-row justify-between'>
          {session ? 
            <>
            <a className='font-mono' href='#'>Chat Demo</a>
            <a className='hover:cursor-pointer focus:cursor-pointer underline px-2' onClick={LogOut}>Log Out</a>
            </>
            :
              <>
                 <Link href={'/login'}>
              <span className='font-mono font-bold hover:cursor-pointer hover:text-green-700 underline'>Login</span>
            </Link> 
            <Link href={'/register'}>
              <span className='font-mono font-bold hover:cursor-pointer hover:text-green-700 underline'>Register</span>
            </Link>
              </>
          }
        </header>


      <main className="max-w-5xl">
        {session && (
          <PublicChat />
        )}

      </main>
    </div>
  )
}

export default Home
