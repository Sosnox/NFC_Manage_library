import Image from 'next/image';
import { ReactNode, useState } from 'react';
import Cookies from 'js-cookie';


import { FaUserShield } from "react-icons/fa";

import { FaKey } from "react-icons/fa";


interface UserInfo {
    id: string;
    password: string;
    first_name: string;
}

interface PopupAUProps {
    setClosePopup: (value: boolean) => void;
}
interface Props extends UserInfo, PopupAUProps{}

const endpoint = process.env.NEXT_PUBLIC_API_URL_AUTH 

export const PopupEU = ({id, password, first_name, setClosePopup} : Props) => {
    const formdata = new FormData()

    const [userInfo, setUserInfo] = useState<UserInfo>({
        id: id,
        password: "",
        first_name: first_name
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUserInfo(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSumbit = async() => {
        formdata.append("id", userInfo.id)
        formdata.append("password", userInfo.password)

        try{
        const response = await fetch(endpoint + "/superadmin/forcePass_admin", {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${Cookies.get("token")}`,
            },  
            body: formdata
        })
        if (response.ok){
            console.log("success")
            userInfo.password = ""
        }
        }catch (error){
            console.log(error)
        }

    }

    const handleClose = () => {
        setClosePopup(false)
    }


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg w-[700px]">
                <div className='text-[24px] flex justify-center items-center'>
                    ต้องการจะแก้ไข <span className='text-red-500 mr-4 ml-4'> User : { first_name }</span> ใช่หรือไม่?
                </div>
                <div className='flex justify-between items-center mt-8'>
                    <FaKey size={25}/>

                    <label className="mr-2">รหัสผ่าน</label>
                    <input 
                    value={userInfo.password}
                    name='password'
                    type='text' 
                    placeholder='Enter New Password' 
                    onChange={handleChange}
                    className="px-4 py-2 border border-gray-300 rounded-lg w-3/4" /> 
                </div>
                
                
                <div className="flex justify-evenly mt-8">
                    <button className="p-2 pl-8 pr-8 bg-blue-500 text-white rounded-lg hover:bg-blue-600" onClick={handleSumbit}>Edit</button>
                    <button className="p-2 pl-8 pr-8  text-gray-700 rounded-lg hover:text-red-400" onClick={handleClose}>Cancel</button>
                </div>
            </div>  
        </div>
    )
}

export default PopupEU;
    