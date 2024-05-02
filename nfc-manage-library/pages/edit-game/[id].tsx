

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
        <div className="h-screen ">
            <div>
                <div className="flex flex-col space-y-4 items-center justify-center h-[200px] bg-white">
                    <button className="pr-16 pl-16 p-4 border border-black rounded-xl text-[18px] flex font-semibold hover:bg-[#FFFACD]" onClick={() => setOpenPopupEG(true)}>Edit Game</button>
                    {openPopupEG && 
                     <PopupEG id_boardgame={id} setClosePopup={setOpenPopup}/>
                    }
                    <button className="pr-16 pl-16 p-4 border border-black rounded-xl hover:bg-[#FA8072] hover:text-white text-[18px] text-black font-semibold" 
                    onClick={() => setOpenPopupVerti(true)}>Delete Game</button>
                    {openPopupVerti && (
                        <PopupVertify setClosePopup={setOpenPopupVerti} id_boardgame={id} />
                    )}
                </div>

                <div className="grid grid-cols-6 justify-center items-center pl-4 pr-4 bg-[#6699FF] h-[50px]">
                    <div className="col-span-1 justify-self-start"><input type="checkbox"/></div>
                    <div className="col-span-2 justify-self-center"><Search_edit /></div>
                    <button onClick={() => setOpenPopup(true)} className="button-edit-nav col-span-2 justify-self-center hover:bg-[#a3e9a4]">Add</button>

                    {openPopup && (
                        <PopupAC setClosePopup={setOpenPopup} id_boardgame={id} />
                    )}
                    <div className="button-edit-nav justify-self-end hover:bg-[#FA8072]">Delete All</div>

                </div>
            </div>

            <div className="cardgame-container">
                <div className=" h-screen">
                    <CardEdit id_boardgame={id} />
                </div>
            </div>
        </div>
    )
}
