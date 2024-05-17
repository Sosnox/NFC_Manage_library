import { user } from "@nextui-org/react";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

interface UserInfo {
    username: string;
    password: string;
    first_name: string;
    last_name: string;
    role: string;
}   

export function EditUser() {
    const token = Cookies.get("token");
    console.log(token);
    const [users, setUser] =  useState<UserInfo[]>([
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
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://210.246.215.173:8000/superadmin/get_user_admin`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUser();
    }, [users]);

    console.log(users)
    console.log(123)

    return (
        <>
            {users.map((user, index) => {
                <div key={index} className="flex bg-black w-full h-[200px]">
                    <div>{user.username}</div>
                    <div>{user.role}</div>
                </div>
            })}
        </>
    );
}

export default EditUser;
