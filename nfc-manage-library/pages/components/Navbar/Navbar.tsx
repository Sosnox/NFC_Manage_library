import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';

import Logo from "@/styles/pictures/Logo.png"

import { BiMenu } from "react-icons/bi";
import { BsClipboardData } from "react-icons/bs";
import { SlGameController } from "react-icons/sl";
import { IoMdAdd } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { BiMenuAltRight } from "react-icons/bi";
import { MdNavigateNext } from "react-icons/md";
import { FiUsers } from "react-icons/fi";



function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };
    
    return (
        <nav>
            <div className="flex flex-col sidebar">
                <div className='flex items-center mb-24 '>
                    <Image src={Logo} alt='logo' width={200}></Image>
                </div>
            
                
                <div className='menu'>
                    <div className='menu-link'>
                        <ul>
                            <Link href={'/@superadmin'}><li> <BsClipboardData size={30} className='icon-nav'/> <span className='text'>Visualization</span></li></Link>
                            <Link href={'/@superadmin/games'}><li> <SlGameController size={30} className='icon-nav'/> <span className='text'>Games</span></li></Link>
                            <Link href={'/@superadmin/add-game'}> <li><IoMdAdd size={30} className='icon-nav'/> <span className='text'>AddGame</span> </li></Link>
                            <Link href={'/@superadmin/administration'}> <li><FiUsers size={30} className='icon-nav'/> <span className='text'>Administration</span> </li></Link>   
                        </ul>
                    
                    </div>

                    <div className='menu-content mt-24'>
                        
                        <ul>
                            <li><IoIosLogOut size={30} className='icon-nav'/> <span className='text'>Logout</span> </li> 
                        </ul>
                    </div>
                </div>
                <div className=' underline flex justify-center mt-[100px] hover:text-red-600'>
                        <Link href={"/@superadmin/dev-dlst"}>
                            <button>ติดต่อ</button>
                        </Link>
                    </div>

            </div>

        
        </nav>
    )
}

export default Navbar;