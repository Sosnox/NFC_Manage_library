import { MdDeleteForever } from "react-icons/md";
import { useState } from "react";
import PopupEU from "./PopupEU";

function UserEdit (){

    const [openPopup, setOpenPopup] = useState(false)

    return(
        <div className="flex justify-between p-4 mb-4 card-edit">
            <div><input type="checkbox"/></div>
            <div>Name</div>
            <button onClick={() => setOpenPopup(true)} className="underline">Edit</button>
            {openPopup &&(
                <PopupEU setClosePopup={setOpenPopup}></PopupEU>
            )}
            <div className="edit-card-bin"><MdDeleteForever size={25}/></div>           
        </div>
    )
}

export default UserEdit