    import Image from 'next/image';
    import logo from '@/styles/pictures/Logo.png';
    import { ReactNode } from 'react';
    import { useState } from 'react';

    import { NotiFailCard, NotiPassCard } from '../PopupCheck/Notification';

    import { MdDriveFileRenameOutline } from "react-icons/md";
    import { BiDetail } from "react-icons/bi";
    import { MdOutlineAirplay } from "react-icons/md";
    import { SlPicture } from "react-icons/sl";
    import { TbDeviceGamepad } from "react-icons/tb";

    interface PopupAUProps {
        setClosePopup: (value: boolean) => void;
        title_card: any;
        detail_card: any;
        tick_card: any;
        id_boardgame:any;
        path_image_card: any;
        id_card: any;

    }
    export const PopupEC = ( { setClosePopup, title_card, detail_card, tick_card, path_image_card, id_boardgame, id_card} : PopupAUProps ) => {

        const handleClose = () => {
            setClosePopup(false);
        }

        const [titleCard, setTitileCard] = useState<string>(title_card);
        const [detailCard, setDetailCard] = useState<string>(detail_card);
        const [tickCard, setTickcard] = useState<string>(tick_card);

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
    
        const handleEdit = async () => {
            const formData = new FormData();
            formData.append("title_card", titleCard);
            formData.append("detail_card", detailCard);
            formData.append("tick_card", tickCard);
            
            if (selectedFile !== null) {
                formData.append("file", selectedFile);
              }
          
            try {
                const response = await fetch("http://210.246.215.173:8000/admin/update_card/" + id_card , {
                    method: "PATCH",
                    headers: {},
                    body: formData,
                });
            
                if (response.ok) {
                    console.log("Data submitted successfully!");
                    setSelectedFile(null);
                    setNotification(<NotiPassCard/>)
    
                } else {
                    console.error("Submission failed!", response);
                    setNotification(<NotiFailCard/>)
                }
            } catch (error) {
                console.error("Error during submission:", error);
                setNotification(<NotiFailCard/>)

            }   
        }


        return (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-8 rounded-lg w-[600px]">

                    <div className='flex items-center justify-center pb-4'>
                        <img src={previewUrl || "http://210.246.215.173:8000/uploaded_images/"+path_image_card} alt={title_card} width={200} />
                    </div>

                    <div className='flex justify-between items-center mb-4'>
                        <MdDriveFileRenameOutline size={30}/>
                        <label className="mr-2"> ชื่อการ์ด </label>
                        <input  
                        value={titleCard}
                        type='text' 
                        placeholder='Name' 
                        className="px-4 py-2 border border-gray-300 rounded-lg w-3/4"
                        onChange={(e) => setTitileCard(e.target.value)}
                         />
                    </div>

                    <div className='flex justify-between items-center mb-4'>
                        <MdOutlineAirplay size={30}/>
                        <label className="mr-2">วิธีการเล่น</label>
                        <textarea  
                        value={tickCard} 
                        placeholder='Trick' 
                        className="px-4 py-2 border border-gray-300 rounded-lg w-3/4"
                        onChange={(e) => setTickcard(e.target.value)}/>
                    </div>
                    
                    <div className='flex justify-between items-center mb-4'>
                        <BiDetail size={30}/>
                        <label className="mr-2">รายละเอียด </label>
                        <textarea   
                        value={detailCard} 
                        placeholder='Detail' 
                        className="px-4 py-2 border border-gray-300 rounded-lg w-3/4" 
                        onChange={(e) => setDetailCard(e.target.value)}/>
                    </div>

               
                    <div className='flex justify-between items-center mt-14'>
                        
                        <SlPicture size={30}/>
                        <label className="mr-2">Picture</label>
                        <input 
                        type='file' 
                        className='w-3/4'
                        onChange={handleFileChange}
                        ></input>
                    </div>
                    
                    <div className="flex justify-evenly mt-16">
                        <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" onClick={handleEdit}>Save</button>
                        <button className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"  onClick={handleClose}>Cancel</button>
                    </div>
                </div>
                {notification}
            </div>
        )
    }

    export default PopupEC;
