import { Button, Link } from "@nextui-org/react"
import Cookies from 'js-cookie';

export const Navbar = () => {
    const handleLogout = () => {
        Cookies.remove('token');
        window.location.reload();
    }

    return (
        <div className="flex flex-col bg-gray-900 text-white p-4">
            <div className="text-2xl">NFC Manage Library Admin</div>
            <Link className="mx-4" href="/">Home</Link>
            <Link className="mx-4" href="ManageCard">Manage Card</Link>
            <Link className="mx-4" href="ManageBoardgame">Manage boardgame</Link>
            <Button onClick={handleLogout}>log out</Button>
        </div>
    )
}