import Image from 'next/image';
import logo from '@/styles/pictures/Logo.png';

import { FaUserShield } from "react-icons/fa";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import { RiShieldKeyholeFill } from "react-icons/ri";
// className="text-[18px] border rounded-xl font-semibold text-white  pr-[80px] pl-[80px] p-4 text-white-500 hover:bg-white hover:bg-opacity-40

interface PopupAUProps {
    setClosePopup: (value: boolean) => void;
}
export const PopupAU = ( { setClosePopup }: PopupAUProps) => {

    const handleClose = () => {
        setClosePopup(false);
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg w-[700px]">
                
                <div className='flex items-center justify-center pb-4'>
                    <Image src={logo} alt="logo" width={150} />
                </div>
                <div className='flex justify-between items-center mb-4'>
                    <MdDriveFileRenameOutline size={25}/>
                    <label className="mr-2">ชื่อบัญชี </label>
                    <input type='text' placeholder='username' className="px-4 py-2 border border-gray-300 rounded-lg w-3/4" />
                </div>

                <div className='flex justify-between items-center mb-4'>
                    <FaUserShield size={25}/>
                    <label className="mr-2">ไอดี</label>
                    <input type='text' placeholder='ID' className="px-4 py-2 border border-gray-300 rounded-lg w-3/4" />
                </div>
                
                <div className='flex justify-between items-center mb-4'>
                    <FaKey size={25}/>
                    <label className="mr-2">รหัสผ่าน</label>
                    <input type='text' placeholder='password' className="px-4 py-2 border border-gray-300 rounded-lg w-3/4" /> 
                </div>
                
                <div className='flex justify-between items-center mb-4 '>
                    <RiShieldKeyholeFill size={25}/>
                    <label className="mr-2">การอนุญาต</label>
                    <select className="px-4 py-2 border border-gray-300 rounded-lg w-3/4 ">

                        <option value="admin">Admin</option>
                        <option value="superadmin">Super Admin</option>

                    </select>
                </div>
                
                <div className="flex justify-evenly mt-16">
                    <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Submit</button>
                    <button className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400" onClick={handleClose}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default PopupAU;
