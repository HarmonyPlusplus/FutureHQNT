'use client';
import { useState } from 'react';
import { sidebarList } from '../components/sidebarcontent/sidebarlist';
import Header from './head/head';
import Image from 'next/image';
import Link from 'next/link';
import Modal from '@/components/modal/modal';
import NewPost from '@/components/addPost/newPost';
import { usePathname } from 'next/navigation';
import { useVisibility } from "./Content/context";

const Sidebar = () => {
  const [openIds, setOpenIds] = useState<number[]>([]);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { isOpen, toggleClose } = useVisibility();

  const toggle = (id: number) => {
    if (openIds.includes(id)) {
      setOpenIds(openIds.filter(openId => openId !== id));
    } else {
      setOpenIds([...openIds, id]);
    }
  };

  return (
    <>

      <div className={`max-lg:fixed top-0 left-0 h-screen bg-white border-r border-[#BAC7D5] w-full max-w-[300px] xl:w-[300px] lg:w-[219px] max-lg:z-50 transform transition-transform duration-300 lg:static ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 `}>
        <Header toggleClose={toggleClose} />

        <ul className='overflow-y-scroll h-full max-h-[650px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
          {sidebarList.map((item) => (
            <li key={item.id}>
              <div
                onClick={() => toggle(item.id)}
                className="flex items-center gap-2 p-2 cursor-pointer"
              >
                {item.icon && <Image src={item.icon} alt={item.name} width={20} height={20} />}
                <h1 className={item.id === 4 ? "text-black" : "text-[#BA5D00]"}>
                  {item.name}
                </h1>
                <span className="flex items-center ml-auto">
                  {item.arrow && (
                    <Image
                      src={item.arrow}
                      alt="arrow"
                      width={10}
                      height={10}
                      className={`transition-transform duration-300 select-none ${openIds.includes(item.id) ? 'rotate-180' : ''}`}
                    />
                  )}
                </span>
              </div>

              {openIds.includes(item.id) && item.sublinks && (
                <div className="px-2">
                  <ul>
                    {item.sublinks.map((subs) => (
                      <li key={subs.id}>
                        <Link
                          href={subs.path}
                          className={`p-2 flex items-center gap-2 cursor-pointer rounded-md ${pathname === subs.path ? ' bg-[#00A58E] text-white' : 'hover:bg-[#9eb3b0] hover:text-white text-[#BA5D00]'}`}
                        >
                          {subs.image && (
                            <Image src={subs.image} alt={subs.title} width={20} height={20} />
                          )}
                          {subs.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}


          <li>
            <div
              onClick={() => {setOpen(true);toggleClose();}}
              className="flex items-center gap-2 p-2 cursor-pointer text-[#BA5D00] font-semibold hover:bg-[#00A58E] hover:text-white rounded-md transition"
            >
              <span>+ New Post</span>
            </div>
          </li>
        </ul>
      </div>


      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <NewPost onClose={() => setOpen(false)} />
      </Modal>
    </>
  );
};

export default Sidebar;
