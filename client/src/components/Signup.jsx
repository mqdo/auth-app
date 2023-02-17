import React from 'react'
import { Link } from 'react-router-dom'

import { useLoginMutation, useSignupMutation, useLoginWithGoogleQuery, useLoginWithFacebookQuery, useLoginWithGithubQuery } from '../app/services/auth'
import { MdEmail } from 'react-icons/md'
import { MdLock } from 'react-icons/md'
import { RiGoogleFill } from 'react-icons/ri'
import { MdFacebook } from 'react-icons/md'
import { AiFillGithub } from 'react-icons/ai'
// import logo from '../assets/devchallenges-light.svg'
import logo from '../assets/devchallenges.svg'

const Signup = () => {
  return (
    <div className='w-full h-screen flex flex-col items-center justify-center gap-2 text-gray-900'>
      <div className='w-full sm:hidden p-4 flex flex-col gap-6'>
        <div>
          <img src={logo} alt='logo' className='h-6 w-auto' />
        </div>
        <div className='pb-4'>
          <h2 className='text-lg font-semibold py-4'>Join thousands of learners from around the world </h2>
          <p>Master web development by making real-life projects. There are multiple paths for you to choose</p>
        </div>
        <form className='flex flex-col gap-8'>
          <div className='flex flex-col gap-4'>
            <div className='relative'>
              <input type='text' name='email' className='w-full border-2 border-gray-200 p-2 pl-10 rounded-lg' placeholder='Email' />
              <button className='absolute left-3 top-[50%] -translate-y-[50%]'>
                <MdEmail fill='#bdbdbd' size={20} />
              </button>
            </div>
            <div className='relative'>
              <input type='text' name='password' className='w-full border-2 border-gray-200 p-2 pl-10 rounded-lg' placeholder='Password' />
              <button className='absolute left-3 top-[50%] -translate-y-[50%]'>
                <MdLock fill='#bdbdbd' size={20} />
              </button>
            </div>
          </div>
          <button type='submit' className='py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold tracking-wider'>
            Start coding now
          </button>
        </form>
        <div className='pt-4 flex flex-col items-center gap-6 text-gray-400'>
          <p>or continue with these social profile</p>
          <div className='w-full flex justify-evenly'>
            <div className='w-12 h-12 grid place-items-center rounded-full border-2 border-gray-200 cursor-pointer hover:bg-gray-200'>
              <RiGoogleFill fill='#828282' size={20} />
            </div>
            <div className='w-12 h-12 grid place-items-center rounded-full border-2 border-gray-200 cursor-pointer hover:bg-gray-200'>
              <MdFacebook fill='#828282' size={20} />
            </div>
            <div className='w-12 h-12 grid place-items-center rounded-full border-2 border-gray-200 cursor-pointer hover:bg-gray-200'>
              <AiFillGithub fill='#828282' size={20} />
            </div>
          </div>
          <p>Already a member? <Link to='/login' className='text-blue-500 hover:text-blue-600'>Login</Link></p>
        </div>
      </div>
      <div className='hidden w-[500px] mx-auto border-gray-200 border-2 rounded-lg px-14 py-8 sm:flex flex-col gap-6'>
        <div>
          <img src={logo} alt='logo' className='h-6 w-auto' />
        </div>
        <div>
          <h2 className='text-lg font-semibold py-4'>Join thousands of learners from around the world </h2>
          <p>Master web development by making real-life projects. There are multiple paths for you to choose</p>
        </div>
        <form className='flex flex-col gap-6'>
          <div className='flex flex-col gap-4'>
            <div className='relative'>
              <input type='text' name='email' className='w-full border-2 border-gray-200 p-2 pl-10 rounded-lg' placeholder='Email' />
              <button className='absolute left-3 top-[50%] -translate-y-[50%]'>
                <MdEmail fill='#bdbdbd' size={20} />
              </button>
            </div>
            <div className='relative'>
              <input type='text' name='password' className='w-full border-2 border-gray-200 p-2 pl-10 rounded-lg' placeholder='Password' />
              <button className='absolute left-3 top-[50%] -translate-y-[50%]'>
                <MdLock fill='#bdbdbd' size={20} />
              </button>
            </div>
          </div>
          <button type='submit' className='py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold tracking-wider'>
            Start coding now
          </button>
        </form>
        <div className='flex flex-col items-center gap-6 text-gray-400'>
          <p>or continue with these social profile</p>
          <div className='w-full flex justify-evenly'>
            <div className='w-12 h-12 grid place-items-center rounded-full border-2 border-gray-200 cursor-pointer hover:bg-gray-200'>
              <RiGoogleFill fill='#828282' size={20} />
            </div>
            <div className='w-12 h-12 grid place-items-center rounded-full border-2 border-gray-200 cursor-pointer hover:bg-gray-200'>
              <MdFacebook fill='#828282' size={20} />
            </div>
            <div className='w-12 h-12 grid place-items-center rounded-full border-2 border-gray-200 cursor-pointer hover:bg-gray-200'>
              <AiFillGithub fill='#828282' size={20} />
            </div>
          </div>
          <p>Already a member? <Link to='/login' className='text-blue-500 hover:text-blue-600'>Login</Link></p>
        </div>
      </div>
      <div className='w-full sm:w-[500px] mx-auto flex justify-between p-4'>
        <p className='sm:hidden'>mqdo</p>
        <p className='hidden sm:block'>created by <span className='font-semibold underline'>mqdo</span></p>
        <p>devchallenges.io</p>
      </div>
    </div>
  )
}

export default Signup