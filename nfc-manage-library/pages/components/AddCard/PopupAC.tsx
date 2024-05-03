import { useState } from 'react';
import { MdDriveFileRenameOutline } from "react-icons/md";
import { BiDetail } from "react-icons/bi";
import { MdOutlineAirplay } from "react-icons/md";
import { SlPicture } from "react-icons/sl";
import { TbDeviceGamepad } from "react-icons/tb";
import { NotiFailCard, NotiPassCard } from '../PopupCheck/Notification';

interface PopupACProps {
    setClosePopup: (value: boolean) => void;
    id_boardgame: any;
}

export const PopupAC = ({ setClosePopup, id_boardgame }: PopupACProps) => {
    const [titileCard, setTitileCard] = useState<string>('');
    const [detailCard, setDetailCard] = useState<string>('');
    const [tickcard, setTickcard] = useState<string>('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>("");

    const [notification, setNotification] = useState<JSX.Element | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setSelectedFile(file);
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        } else {
            setPreviewUrl("");
        }
    };

    const handleClose = () => {
        setClosePopup(false);
    }

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("title_card", titileCard);
        formData.append("detail_card", detailCard);
        formData.append("tick_card", String(tickcard));
        formData.append("id_boardgame", id_boardgame);

        if (selectedFile !== null) {
            formData.append("file", selectedFile);
        }

        try {
            const response = await fetch("http://210.246.215.173:8000/admin/post_card/", {
                method: "POST",
                headers: {},
                body: formData,
            });

            if (response.ok) {
                console.log("Data submitted successfully!");
                setTitileCard('');
                setDetailCard('');
                setTickcard('');
                setSelectedFile(null);
                setPreviewUrl('');

                setNotification(<NotiPassCard />)
            } else {
                console.error("Submission failed!", response);
                setNotification(<NotiFailCard />)
            }
        } catch (error) {
            console.error("Error during submission:", error);
            setNotification(<NotiFailCard />)
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg w-[600px]">
                <div className='flex justify-evenly mb-6'>
                    <img src={previewUrl} alt={previewUrl} width={200} />
                </div>
                <div className='flex justify-between items-center mb-4'>
                    <MdDriveFileRenameOutline size={30} />
                    <label className="mr-2"> ชื่อการ์ด </label>
                    <input type='text' placeholder='Name' value={titileCard} className="px-4 py-2 border border-gray-300 rounded-lg w-3/4" onChange={(e) => setTitileCard(e.target.value)} />
                </div>

                <div className='flex justify-between items-center mb-4'>
                    <MdOutlineAirplay size={30} />
                    <label className="mr-2">วิธีการเล่น</label>
                    <textarea placeholder='Trick' value={tickcard} className="px-4 py-2 border border-gray-300 rounded-lg w-3/4" onChange={(e) => setTickcard(e.target.value)} />
                </div>

                <div className='flex justify-between items-center mb-4'>
                    <BiDetail size={30} />
                    <label className="mr-2">รายละเอียด </label>
                    <textarea placeholder='Detail' value={detailCard} className="px-4 py-2 border border-gray-300 rounded-lg w-3/4" onChange={(e) => setDetailCard(e.target.value)} />
                </div>


                <div className='flex justify-between items-center mt-14'>
                    <SlPicture size={30} />
                    <label className="mr-2">Picture</label>
                    <input type='file' className='w-3/4' onChange={handleFileChange} />
                </div>

                <div className="flex justify-evenly mt-16">
                    <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" onClick={handleSubmit}>Submit</button>
                    <button className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400" onClick={() => { handleClose(); window.location.reload(); }}
                    >Cancel</button>
                </div>
                {notification}
            </div>
        </div>
    )
}

export default PopupAC;
