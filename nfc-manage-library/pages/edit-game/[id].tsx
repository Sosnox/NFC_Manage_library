

import { AiTwotoneEdit } from "react-icons/ai";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PopupEG from "../components/EditGame/PopupEG";
import PopupVertify from "../components/PopupCheck/PopupVertify";
import PopupAC from "../components/AddCard/PopupAC";
import CardEdit from "../components/CardEdit/CardEdit";
import SearchCard from "../components/SearchBar/searchcard";


export default function EditGame() {
    const [openPopupSH, setOpenPopupSH] = useState(false)
    const [openPopup, setOpenPopup] = useState(false)
    const [openPopupVerti, setOpenPopupVerti] = useState(false)
    const [openPopupEG, setOpenPopupEG] = useState(false)
    const router = useRouter()
    const { id } = router.query
    console.log(id)


    const haddlePopup = () =>{
        setOpenPopupSH(!openPopup)
    }

    if (!id) {
        return <div>Loading...</div>;
    }
    console.log(openPopupSH)
    return (
        <>
            <div>
                <div className="h-[150px] bg-gray-900 rounded-t-lg flex items-center justify-center">
                    <div className="flex justify-center space-x-10 ">
                    <button className="p-4 w-[150px] bg-white rounded-xl text-[18px] flex justify-center font-semibold hover:bg-gray-400" onClick={() => setOpenPopupEG(true)}>Edit Game</button>
                    {openPopupEG &&
                        <PopupEG id_boardgame={id} setClosePopup={setOpenPopup}  />
                    }
                    <button className="p-4 w-[150px] bg-white rounded-xl text-[18px] flex justify-center font-semibold hover:bg-gray-400"
                        onClick={() => setOpenPopupVerti(true)}>Delete Game</button>
                    {openPopupVerti && (
                        <PopupVertify setClosePopup={setOpenPopupVerti} id_boardgame={id} />
                    )}
                    </div>
                </div>

                <div className="grid grid-cols-6 justify-center items-center pl-4 pr-4 bg-gray-900 border mt-[2px] rounded-b-xl h-[50px]">
                    <div className="col-span-1 justify-self-start"><input type="checkbox" /></div>
                    <div className="col-span-2 justify-self-center"></div>
                    <button onClick={() => setOpenPopup(true)} className="p-2 pr-4 pl-4 rounded-md  bg-white col-span-2 justify-self-center hover:bg-gray-400 font-semibold ">ADD</button>

                    {openPopup && (
                        <PopupAC setClosePopup={setOpenPopup} id_boardgame={id} />
                    )}
                    <div className="p-2 pr-4 pl-4 rounded-md bg-white justify-self-end hover:bg-gray-400 font-semibold">DELETE ALL</div>
                </div>
            </div>
                <div className=" overflow-y-scroll p-1 h-[600px]">
                    <CardEdit id_boardgame={id} />
                </div>

        </>
    )
}
