import { use, useEffect, useState } from 'react';
import PopupAU from "./components/AddUser/PopupAU";
import Cookies from 'js-cookie';
import PopupEU from './components/EditUser/PopupEU';
import DelUser from './components/PopupCheck/CheckDeleteUser';

interface UserInfo {
    id_user: string;
    username: string;
    password: string;
    first_name: string;
    last_name: string;
    role: string;
}   

const endpoint = process.env.NEXT_PUBLIC_API_URL_AUTH;

export const ManageAdmin = () => {
    const [openAU, setOpenAU] = useState(false);
    const [openEU, setOpenEU] = useState<{ [key: number]: boolean }>({});
    const [openDU, setOpenDU] = useState<{ [key: number]: boolean }>({});
    const [users, setUsers] =  useState<UserInfo[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(endpoint + "/superadmin/get_user_admin/", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${Cookies.get("token")}`,
                        "Content-Type": "application/json"
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUsers();
    }, []);

    const handleEditUser = (index: number) => {
        const updatedOpenEU = { ...openEU, [index]: true };
        setOpenEU(updatedOpenEU);
    };

    const handleDeleteUser = (index: number) => {
        const updatedOpenDU = { ...openDU, [index]: true };
        setOpenDU(updatedOpenDU);
    };

    return (
        <>
            <div>
                <div className="h-[150px] bg-gray-900 rounded-t-lg flex items-center justify-center">
                    <div className="flex justify-center space-x-10">
                        <button className="p-4 w-[300px] text-white rounded-xl text-[28px] flex justify-center font-semibold ">@Super Admin</button>
                    </div>
                </div>

                <div className="grid grid-cols-8 justify-center items-center pl-4 pr-4 bg-gray-900 border mt-[2px] rounded-b-xl h-[50px] text-white font-semibold">
                    <div className="col-span-1 justify-self-start">
                        ID
                    </div>
                    <div className="col-span-1 justify-self-start">
                        FirstName
                    </div>
                    <div className="col-span-1 justify-self-start">
                        LastName
                    </div>
                    <div className="col-span-2 justify-self-center">
                        Role
                    </div>
                    <button className="p-2 pr-4 pl-4 rounded-md bg-white col-span-2 justify-self-center hover:bg-gray-400 text-black" onClick={() => setOpenAU(true)}>ADD</button>
                    {openAU && <PopupAU setClosePopup={setOpenAU}/>}
                    <button className="p-2 pr-4 pl-4 rounded-md bg-white justify-self-end hover:bg-gray-400 text-black">DELETE ALL</button>
                </div>
            </div>
            <div>   
                {users.map((user, index) => (
                    <div key={index} className="grid grid-cols-8 pl-4 pr-4 mt-4 w-full bg-white p-4 rounded-lg justify-center shadow-xl">
                        <div className='col-span-1 justify-self-start underline'>{user.username}</div>
                        <div className='col-span-1 justify-self-start'>{user.first_name}</div>
                        <div className='col-span-1 justify-self-start'>{user.last_name}</div>
                        <div className='col-span-2 justify-self-center bg-gray-600 font-semibold text-white rounded-md pr-2 pl-2'>{user.role}</div>
                        <div className='col-span-1 justify-self-end'>
                            <button className='underline hover:bg-yellow-200 hover:rounded-lg pr-4 pl-4' onClick={() => handleEditUser(index)}>Edit</button>
                            {openEU[index] && <PopupEU 
                                setClosePopup={(value) => setOpenEU({ ...openEU, [index]: value })}
                                first_name = {user.first_name}
                                password= {user.password}
                                id={user.id_user} 
                            />}
                        </div>
                        <button className='col-span-2 justify-self-end hover:bg-red-200 hover:rounded-lg pr-4 pl-4 underline' onClick={() => handleDeleteUser(index)}>Delete</button>
                        {openDU[index] && <DelUser
                            first_name={user.first_name}
                            id_user={user.id_user} 
                            setClosePopup={(value) => setOpenDU({ ...openDU, [index]: value })}
                        />}      
                    </div>
                ))}
            </div>
        </>
    );
};

export default ManageAdmin;
