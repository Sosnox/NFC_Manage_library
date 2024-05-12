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

    const [user, setUser] =  useState<UserInfo | null>(null); // แก้ไขให้เป็น UserInfo | null

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`https://210.246.215.173:8000/superadmin/get_user_admin/`, {
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
    }, [token]);

    console.log(user);

    return (
        <>
            {user && (
                <div>
                    <div>Username: {user.username}</div>
                    <div>First Name: {user.first_name}</div>
                    <div>Last Name: {user.last_name}</div>
                    <div>Role: {user.role}</div>
                </div>
            )}
        </>
    );
}

export default EditUser; // แก้ไขให้ไม่ใช้วงเล็บ
