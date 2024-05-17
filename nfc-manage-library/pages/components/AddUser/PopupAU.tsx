import Image from 'next/image';
import { FaUserShield } from "react-icons/fa";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import { RiShieldKeyholeFill } from "react-icons/ri";
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';


interface PopupAUProps {
    setClosePopup: (value: boolean) => void;
}

interface UserInfo {
    username: string;
    password: string;
    first_name: string;
    last_name: string;
    role: string;
}

const endpoint = process.env.NEXT_PUBLIC_API_URL_AUTH

export const PopupAU = ({ setClosePopup }: PopupAUProps) => {
    const formData = new FormData()

    const [userInfo, setUserInfo] = useState<UserInfo>({
        username: '',
        password: '',
        first_name: '',
        last_name: '',
        role: 'admin'
    })


    const handleSumbit = async () => {

        Object.entries(userInfo).forEach(([key, value]) => {
            formData.append(key, value);
        });

        try {
            const response = await fetch(endpoint + "/superadmin/post_user_admin/", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${Cookies.get("token")}`,
                },
                body: formData

            })
            if (response.ok) {
                console.log("Post Susccess")
                userInfo.username = ""
                userInfo.password = ""
                userInfo.first_name = ""
                userInfo.last_name = "admin"
            }
            else {
                throw new Error("error")
            }
        }
        catch (error) {
            console.error('error: ', error);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUserInfo(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleClose = () => {
        setClosePopup(false);
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-black">
            <div className="bg-white p-8 rounded-lg w-[700px]">

                <div className='flex items-center justify-center pb-4'>
                </div>
                <div className='flex justify-between items-center mb-4'>
                    <MdDriveFileRenameOutline size={25} />
                    <label className="mr-2">ชื่อ </label>
                    <input
                        name="first_name"
                        value={userInfo.first_name}
                        type='text'
                        placeholder='fristname'
                        className="px-4 py-2 border border-gray-300 rounded-lg w-3/4"

                        onChange={handleChange}
                    />

                </div>

                <div className='flex justify-between items-center mb-4'>
                    <MdDriveFileRenameOutline size={25} />
                    <label className="mr-2">ชื่อนามสกุล </label>
                    <input
                        name="last_name"
                        value={userInfo.last_name}
                        type='text'
                        placeholder='lastname'
                        className="px-4 py-2 border border-gray-300 rounded-lg w-3/4"

                        onChange={handleChange}
                    />

                </div>

                <div className='flex justify-between items-center mb-4'>
                    <FaUserShield size={25} />
                    <label className="mr-2">ไอดี</label>

                    <input
                        name="username"
                        value={userInfo.username}
                        type='text'
                        placeholder='ID'
                        className="px-4 py-2 border border-gray-300 rounded-lg w-3/4"
                        onChange={handleChange}
                    />
                </div>

                <div className='flex justify-between items-center mb-4'>
                    <FaKey size={25} />
                    <label className="mr-2">รหัสผ่าน</label>
                    <input
                        name="password"
                        value={userInfo.password}
                        type='text'
                        placeholder='password'
                        className="px-4 py-2 border border-gray-300 rounded-lg w-3/4"
                        onChange={handleChange}
                    />
                </div>

                <div className='flex justify-between items-center mb-4 '>
                    <RiShieldKeyholeFill size={25} />
                    <label className="mr-2">การอนุญาต</label>
                    <select name="role" value={userInfo.role} className="px-4 py-2 border border-gray-300 rounded-lg w-3/4 " onChange={handleChange}>
                        <option value="admin">Admin</option>
                        <option value="super_admin">Super Admin</option>
                    </select>
                </div>

                <div className="flex justify-evenly mt-16">
                    <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" onClick={handleSumbit}>Submit</button>
                    <button className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400" onClick={handleClose}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default PopupAU;
