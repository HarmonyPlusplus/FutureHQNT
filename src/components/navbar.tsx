import React from 'react'
import Search from './nav/search'
import Profile from './nav/profile'
import Indicator from './nav/indicator'

const navbar = () => {
  return (
    <div className='flex items-center justify-between h-[72px] border-b border-[#BAC7D5] p-6 gap-4 max-lg:p-2 w-full'>
      <Indicator />
      <Search />
      <Profile />
    </div>
  )
}

export default navbar
