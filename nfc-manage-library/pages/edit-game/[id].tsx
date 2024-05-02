

import { AiTwotoneEdit } from "react-icons/ai";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PopupEG from "../components/EditGame/PopupEG";
import PopupVertify from "../components/PopupCheck/PopupVertify";
import { Search_edit } from "../components/SearchBar/searchedit";
import PopupAC from "../components/AddCard/PopupAC";
import CardEdit from "../components/CardEdit/CardEdit";


export default function EditGame() {
    const [openPopup, setOpenPopup] = useState(false)
    const [openPopupVerti, setOpenPopupVerti] = useState(false)
    const [openPopupEG, setOpenPopupEG] = useState(false)
    const router = useRouter()

    const { id } = router.query
    console.log(id)


    if (!id) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div>
                <div className="h-[150px] bg-gray-900 rounded-t-lg flex items-center justify-center">
                    <div className="flex justify-center space-x-10 ">
                    <button className="p-4 w-[150px] bg-white rounded-xl text-[18px] flex justify-center font-semibold hover:bg-gray-400" onClick={() => setOpenPopupEG(true)}>Edit Game</button>
                    {openPopupEG &&
                        <PopupEG id_boardgame={id} setClosePopup={setOpenPopup} />
                    }
                    <button className="p-4 w-[150px] bg-white rounded-xl text-[18px] flex justify-center font-semibold hover:bg-gray-400"
                        onClick={() => setOpenPopupVerti(true)}>Delete Game</button>
                    {openPopupVerti && (
                        <PopupVertify setClosePopup={setOpenPopupVerti} id_boardgame={id} />
                    )}
                    </div>
                </div>

                <div className="grid grid-cols-6 justify-center items-center pl-4 pr-4 bg-[#6699FF] h-[50px]">
                    <div className="col-span-1 justify-self-start"><input type="checkbox" /></div>
                    <div className="col-span-2 justify-self-center"><Search_edit /></div>
                    <button onClick={() => setOpenPopup(true)} className="p-2 pr-4 pl-4 rounded-md  bg-white col-span-2 justify-self-center hover:bg-gray-400">ADD</button>

                    {openPopup && (
                        <PopupAC setClosePopup={setOpenPopup} id_boardgame={id} />
                    )}
                    <div className="p-2 pr-4 pl-4 rounded-md bg-white justify-self-end hover:bg-gray-400">DELETE ALL</div>

                </div>
            </div>
            <div>
                <CardEdit id_boardgame={id} />
            </div>

        </>
    )
}
