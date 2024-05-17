import React from "react";
import { useRouter } from 'next/router'

const endpoint = process.env.NEXT_PUBLIC_API_URL_AUTH 

interface PopupVertifyProps {
    setClosePopup: (value: boolean) => void;
    id_boardgame: any; 
}

export const PopupVertify: React.FC<PopupVertifyProps> = ({ setClosePopup, id_boardgame }) => {
    const router = useRouter()
    const handleDeleteCard = async () => {
        try {
            const response = await fetch(endpoint + "/admin/delete_boardgame/" + id_boardgame, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                setClosePopup(false); 
                router.push("/ManageCard")
                console.log("Card deleted successfully!");
                
            } else {
                console.error("Failed to delete card:", response.statusText);
            }
        } catch (error) {
            console.error("Error deleting card:", error);
        }
    };

    const handleClose = () => {
        setClosePopup(false);
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
            <div className="bg-white p-8 rounded-lg w-[650px]">
                <div className="flex item-center justify-center">
                    <h1 className="font-bold text-4xl mt-4">ต้องการจะลบ <span className="text-red-500">บอร์ดเกม</span> ใช่หรือไม่ ?</h1>
                </div>
                <div className="flex justify-evenly mt-16">
                    <button
                        className="px-6 py-2 bg-red-400 text-white rounded-lg hover:bg-red-500"
                        onClick={() => handleDeleteCard()} 
                    >
                        ยืนยัน
                    </button>
                    <button
                        className="px-6 py-2  text-black rounded-lg "
                        onClick={handleClose}
                    >
                        ยกเลิก
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PopupVertify;
