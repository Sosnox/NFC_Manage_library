

import { AiTwotoneEdit } from "react-icons/ai";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Search_edit } from "./components/SearchBar/searchedit";

export const ManageAdmin = () => {
    const router = useRouter()

    return (
        <>
            <div>
                <div className="h-[150px] bg-gray-900 rounded-t-lg flex items-center justify-center">
                    <div className="flex justify-center space-x-10 ">
                    <button className="p-4 w-[150px] bg-white rounded-xl text-[18px] flex justify-center font-semibold hover:bg-gray-400">Edit Profile</button>
                    </div>
                </div>

                <div className="grid grid-cols-6 justify-center items-center pl-4 pr-4 bg-gray-900 border mt-[2px] rounded-b-xl h-[50px]">
                    <div className="col-span-1 justify-self-start"><input type="checkbox" /></div>
                    <div className="col-span-2 justify-self-center"><Search_edit /></div>
                    <button  className="p-2 pr-4 pl-4 rounded-md  bg-white col-span-2 justify-self-center hover:bg-gray-400">ADD</button>
                    <button  className="p-2 pr-4 pl-4 rounded-md  bg-white  justify-self-end hover:bg-gray-400">DELETE ALL</button>
                </div>
            </div>
            <div>
            </div>
        
        </>
    )
}

export default ManageAdmin