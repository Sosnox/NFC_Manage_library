import { Button } from "@nextui-org/react"
import Cookies from 'js-cookie';
import Link from "next/link";


export const NavbarSuperadmin = () => {
    const handleLogout = () => {
        Cookies.remove('token');
        window.location.reload();
    }

    return (
        <div className="flex flex-col bg-gray-900 text-white p-4">
            <div className="text-2xl">NFC Manage Library Superadmin</div>
            <Link className="mx-4" href="/Visualization">Visualization</Link>
            <Link className="mx-4" href="/ManageCard">Manage Card</Link>
            <Link className="mx-4" href="/ManageBoardgame">Manage boardgame</Link>
            <Link className="mx-4" href="/ManageBoardgame">Manage Admin</Link>
            <Button onClick={handleLogout}>log out</Button>
        </div>
    )
}