import { Button, Link } from "@nextui-org/react"
import Cookies from 'js-cookie';

import { BsClipboardData } from "react-icons/bs";
import { SlGameController } from "react-icons/sl";
import { IoMdAdd } from "react-icons/io";
import { FiUsers } from "react-icons/fi";

export const NavbarSuperadmin = () => {
    const handleLogout = () => {
        Cookies.remove('token');
        window.location.reload();
    }

    return (
        <div className="flex flex-col justify-between bg-gray-900 text-white p-4">
            <Link href="/">
            <div className="bg-gray-800 rounded-lg m-4 mr-8 w-[200px] p-2 pl-4 ">
                <div className="text-[20px] font-bold">NFC MANAGE LIBRARY</div>
                <div>@Superadmin</div>
            </div>
            </Link>
            <div className="mb-[200px]">
                <div className="flex flex-col space-y-5">
                <Link className="mx-4 rounded-xl hover:bg-white hover:bg-opacity-20 p-4 pt-[20px] pb-[20px] font-semibold text-white text-[18px] gap-4" href="/">
                    <BsClipboardData size={25}/>Virtualization
                </Link>

                <Link className="mx-4 rounded-xl hover:bg-white hover:bg-opacity-20 p-4 pt-[20px] pb-[20px]  font-semibold text-white text-[18px] gap-4" href="/ManageCard">
                    <SlGameController size={25}/>Manage Game
                </Link>

                <Link className="mx-4 rounded-xl hover:bg-white hover:bg-opacity-20 p-4 pt-[20px] pb-[20px]  font-semibold text-white text-[18px] gap-4" href="/ManageBoardgame">
                    <IoMdAdd size={25}/> Add Boardgame
                </Link>

                <Link className="mx-4 rounded-xl hover:bg-white hover:bg-opacity-20 p-4 pt-[20px] pb-[20px]  font-semibold text-white text-[18px] gap-4" href="/ManageAdmin">
                    <FiUsers size={25}/>Manage Admin
                </Link> 
                </div>
            </div>
            <div className="grid justify-self-center">
                <Button onClick={handleLogout}>log out</Button>
            </div>
        </div>
    )
}