import React from 'react'

const Search = () => {
  return (
    <div className=''>
      <input 
        placeholder='Search for anything here.......'
        type="text"
        className='w-full max-w-[343px] lg:w-[500px] h-11 px-4 border border-[#5d6266] focus:border-[#5d6266] rounded outline-none'
      />
    </div>
  )
}

export default Search
