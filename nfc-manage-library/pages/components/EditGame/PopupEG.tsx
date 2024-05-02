import Image from 'next/image';
import logo from '@/styles/pictures/Logo.png';
import { ReactNode } from 'react';
import { useState, useEffect } from 'react';

import { NotiFailCard, NotiPassCard } from '../PopupCheck/Notification';





import { BiDetail } from "react-icons/bi";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { TbDeviceGamepad } from "react-icons/tb";
import { IoCalendarNumber } from "react-icons/io5";
import { MdOutlineTimer } from "react-icons/md";
import { FaLink } from "react-icons/fa";


interface InputPopup {
    setClosePopup: (value: boolean) => void;
    id_boardgame: any;

}

export const PopupEG = ({ id_boardgame, setClosePopup }: InputPopup) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>("");
    const [notification, setNotification] = useState<JSX.Element | null>(null);
    const [titleGame, setTitleGame] = useState<string>("");
    const [detailGame, setDetailGame] = useState<string>("");
    const [pathYoutube, setPathYoutube] = useState<string>("");
    const [playerRecommendStart, setPlayerRecommendStart] = useState<number>(0);
    const [playerRecommendEnd, setPlayerRecommendEnd] = useState<number>(0);
    const [recommend, setRecommend] = useState<boolean>(false);
    const [ageRecommend, setAgeRecommend] = useState<number>(0);
    const [timePlaying, setTimePlaying] = useState<number>(0);
    const [typeGame, setTypeGame] = useState<string>("");
    const [countScanBoardgame, setCountScanBoardgame] = useState<number>(0);
    const [pathImage, setPathImage] = useState<string>("");

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch('http://210.246.215.173:8000/get_boardgame_by_id_boardgame/?id_boardgame=' + id_boardgame);
            const data = await response.json();
            console.log(data);
            const postData = data[0];
            setTitleGame(postData.title_game);
            setDetailGame(postData.detail_game);
            setPathYoutube(postData.path_youtube);
            setPlayerRecommendStart(postData.player_recommend_start);
            setPlayerRecommendEnd(postData.player_recommend_end);
            setRecommend(false);
            setAgeRecommend(postData.age_recommend);
            setTimePlaying(postData.time_playing);
            setTypeGame(postData.type_game);
            setCountScanBoardgame(postData.count_scan_boardgame);
            setPathImage(postData.path_image_boardgame)
        };

        fetchPost();
    }, []);

    const handleClose = () => {
        setClosePopup(false);
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
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
        formData.append("title_game", titleGame);
        formData.append("detail_game", detailGame);
        formData.append("path_youtube", pathYoutube);
        formData.append("player_recommend_start", String(playerRecommendStart));
        formData.append("player_recommend_end", String(playerRecommendEnd));
        formData.append("recommend", String(recommend));
        formData.append("age_recommend", String(ageRecommend));
        formData.append("time_playing", String(timePlaying));
        formData.append("type_game", typeGame);
        formData.append("count_scan_boardgame", String(countScanBoardgame));

        if (selectedFile !== null) {
            formData.append("file", selectedFile);
        }

        try {
            const response = await fetch("http://210.246.215.173:8000/admin/update_boardgame/" + id_boardgame
            , {
                method: "PATCH", 
                body: formData,
            });

            if (response.ok) {
                console.log("Data submitted successfully!");
                setSelectedFile(null);
                setNotification(<NotiPassCard/>);
            } else {
                console.error("Submission failed!", response);
                setNotification(<NotiFailCard/>);
            }
        } catch (error) {
            console.error("Error during submission:", error);
            setNotification(<NotiFailCard />);
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg w-[800px] h-screen">
                <div className='flex items-center justify-center pb-4'>
                    <img src={previewUrl || "http://210.246.215.173:8000/uploaded_images/" + pathImage} alt={titleGame} width={200} />
                </div>
                <div className='flex justify-between items-center mb-4'>
                    <MdDriveFileRenameOutline size={30} />
                    <label className="mr-2"> ชื่อเกม </label>
                    <input
                        value={titleGame}
                        type='text'
                        placeholder='Name'
                        className="px-4 py-2 border border-gray-300 rounded-lg w-3/4"
                        onChange={(e) => setTitleGame(e.target.value)}
                    />
                </div>

                <div className='flex justify-center ml-[50px]'>
                    <div className='flex flex-col  mb-4'>
                        <label className="mr-2">จำนวนผู้เล่นตั้งแต่</label>
                        <input
                            value={playerRecommendStart}
                            type='text'
                            placeholder='Name'
                            className="px-4 py-2 border border-gray-300 rounded-lg w-3/4"
                            onChange={(e) => setPlayerRecommendStart(parseInt(e.target.value))}
                        />
                    </div>
                    
                    <div className='flex flex-col'>
                        <label className="mr-2">ถึง</label>
                        <input
                            value={playerRecommendEnd}
                            type='text'
                            placeholder='Name'
                            className="px-4 py-2 border border-gray-300 rounded-lg w-3/4"
                            onChange={(e) => setPlayerRecommendEnd(parseInt(e.target.value))}
                        />
                    </div>
                </div>
                <div className='flex justify-between items-center mb-4'>
                    <IoCalendarNumber size={30} />
                    <label className="mr-2">อายุ</label>
                    <input
                        value={ageRecommend}
                        type='text'
                        placeholder='Name'
                        className="px-4 py-2 border border-gray-300 rounded-lg w-3/4"
                        onChange={(e) => setAgeRecommend(parseInt(e.target.value))}
                    />
                </div>
                <div className='flex justify-between items-center mb-4'>
                    < MdOutlineTimer size={30} />
                    <label className="mr-2">เวลาที่ใช้เล่นเกม</label>
                    <input
                        value={timePlaying}
                        type='text'
                        placeholder='Name'
                        className="px-4 py-2 border border-gray-300 rounded-lg w-3/4"
                        onChange={(e) => setTimePlaying(parseInt(e.target.value))}
                    />
                </div>
                <div className='flex justify-between items-center mb-4'>
                    <TbDeviceGamepad size={30} />
                    <label className="mr-2">ประเภทเกม</label>
                    <input
                        value={typeGame}
                        type='text'
                        placeholder='Name'
                        className="px-4 py-2 border border-gray-300 rounded-lg w-3/4"
                        onChange={(e) => setTypeGame(e.target.value)}
                    />
                </div>
                <div className='flex justify-between items-center mb-4'>
                    <FaLink size={30} />
                    <label className="mr-2">ลิงค์</label>
                    <input
                        value={pathYoutube}
                        placeholder='Detail'
                        className="px-4 py-2 border border-gray-300 rounded-lg w-3/4"
                        onChange={(e) => setPathYoutube(e.target.value)}
                    />
                </div>
                <div className='flex justify-between items-center mb-4'>
                    <BiDetail size={30} />
                    <label className="mr-2">เนื้อหา</label>
                    <textarea
                        value={detailGame}
                        placeholder='Trick'
                        className="px-4 py-2 border border-gray-300 rounded-lg w-3/4 "
                        onChange={(e) => setDetailGame(e.target.value)}
                    />
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <div className='flex  mb-4'>
                        <label className="mr-2">เกมแนะนำ</label>
                        <input
                            type="checkbox"
                            checked={recommend}
                            onChange={(e) => setRecommend(e.target.checked)}
                            className="px-4 py-2 border border-gray-300 rounded-lg "
                        />
                    </div>
                    <div className='ml-24'>
                        <input
                            type='file'
                            onChange={handleFileChange}
                        />
                    </div>
                </div>
                <div className="flex justify-evenly mt-16">
                    <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" onClick={handleEdit}>Save</button>
                    <button className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400" onClick={() => { handleClose(); window.location.reload() }}>Cancel</button>
                </div>
            </div>
            {notification}
        </div>
    )
}

export default PopupEG