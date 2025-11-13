'use client'
import { usePathname } from 'next/navigation'
import { sidebarList } from '../sidebarcontent/sidebarlist'
import {useVisibility} from '@/components/Content/context'

const Indicator = () => {
  const pathname = usePathname()
  const { isOpen, toggleOpen } = useVisibility();

  // Find which sublink matches the current path
  const activeSubLink = sidebarList
    .flatMap(item => item.sublinks || [])
    .find(sub => sub.path === pathname)

  return (
    <>
    <div className='w-full max-w-60 lg:w-50 max-lg:hidden '>
      <h1 className="text-sm font-semibold ">
        {activeSubLink ? activeSubLink.title : ''}
      </h1>
    </div>
    <div>
      <button onClick={toggleOpen} className='lg:hidden'>
        <h1 className='text-2xl font-bold'>☰</h1>
      </button>
    </div>
    </>
  )
}

export default Indicator
