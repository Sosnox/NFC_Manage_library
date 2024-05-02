import React from "react";
import { useRouter } from 'next/router'

const endpoint = "http://210.246.215.173:8000/admin/delete_boardgame/";
interface PopupVertifyProps {
    setClosePopup: (value: boolean) => void;
    id_boardgame: any; // Add id_card to props
}

export const PopupVertify: React.FC<PopupVertifyProps> = ({ setClosePopup, id_boardgame }) => {
    const router = useRouter()
    const handleDeleteCard = async () => {
        try {
            const response = await fetch("http://210.246.215.173:8000/admin/delete_boardgame/" + id_boardgame, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                setClosePopup(false); // Close the popup
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
            <div className="bg-white p-8 rounded-lg w-[600px]">
                <div className="flex item-center justify-center">
                    <h1 className="font-bold text-4xl mt-4">ต้องการจะลบใช่หรือไม่ ?</h1>
                </div>
                <div className="flex justify-evenly mt-16">
                    <button
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        onClick={() => handleDeleteCard()} 
                    >
                        ยืนยัน
                    </button>
                    <button
                        className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
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
