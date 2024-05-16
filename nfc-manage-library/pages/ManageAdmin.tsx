import { useEffect, useState } from 'react';
import PopupAU from "./components/AddUser/PopupAU";
import Cookies from 'js-cookie';
import PopupEU from './components/EditUser/PopupEU';

interface UserInfo {
    username: string;
    password: string;
    first_name: string;
    last_name: string;
    role: string;
}   

export const ManageAdmin = () => {
    const [openAU, setOpenAU] = useState(false);
    const [openEU, setOpenEU] = useState(false);
    const [users, setUsers] =  useState<UserInfo[]>([
        {
            username: "Test1",
            password: "Test1",
            first_name: "Test1",
            last_name: "Test1",
            role: "admin"
        },
        {
            username: "Test2",
            password: "Test2",
            first_name: "Test2",
            last_name: "Test2",
            role: "admin"
        },
        {
            username: "Test3",
            password: "Test3",
            first_name: "Test3",
            last_name: "Test3",
            role: "admin"
        }
    ]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("http://210.246.215.173:8000/superadmin/get_user_admin", {
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
    }, [users]);



    return (
        <>
            <div>
                <div className="h-[150px] bg-gray-900 rounded-t-lg flex items-center justify-center">
                    <div className="flex justify-center space-x-10 ">
                        <button className="p-4 w-[150px] bg-white rounded-xl text-[18px] flex justify-center font-semibold hover:bg-gray-400">Edit Profile</button>
                    </div>
                </div>

                <div className="grid grid-cols-6 justify-center items-center pl-4 pr-4 bg-gray-900 border mt-[2px] rounded-b-xl h-[50px]">
                    <div className="col-span-1 justify-self-start"></div>
                    <div className="col-span-2 justify-self-center">
                        <input type='text'/>
                    </div>
                    <div className="col-span-1 justify-self-center"></div>

                    <button  className="p-2 pr-4 pl-4 rounded-md  bg-white col-span-1 justify-self-center hover:bg-gray-400" onClick={() => setOpenAU(true)}>ADD</button>
                    {openAU && <PopupAU setClosePopup={setOpenAU}/>}
                    <button  className="p-2 pr-4 pl-4 rounded-md  bg-white justify-self-end hover:bg-gray-400">DELETE ALL</button>
                </div>
            </div>
            <div>   
                {users.map((user, index) => (
                    <div key={index} className="grid grid-cols-6 pl-4 pr-4 mt-4 w-full bg-white p-4 rounded-lg justify-center shadow-xl">
                        <div className='col-span-1 justify-self-start'>{user.username}</div>
                        <div className='col-span-2 justify-self-center'>{user.role}</div>
                        <div className='col-span-1 justify-self-end'>

                            <button className=' underline hover:text-red-500' onClick={() => setOpenEU(true)}>
                                Edit    
                            </button>
                            {openEU && <PopupEU 
                            setClosePopup={setOpenEU} 
                            username={user.username} 
                            password={user.password}
                            first_name={user.first_name} 
                            last_name={user.last_name}
                            role={user.role}
                            />}

                        </div>
                        <div className='col-span-2 justify-self-end'>Delete</div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default ManageAdmin;
