import Cookies from "js-cookie";


interface userInfo {
    id_user : any;
    first_name : string
}

interface PopupProps {
    setClosePopup: (value: boolean) => void;
}

interface Props extends userInfo, PopupProps {}


const endpoint = process.env.NEXT_PUBLIC_API_URL_AUTH 

export const DelUser = ({id_user, first_name, setClosePopup}: Props) => {

    const handleDeleteUser = async() => {
        try {
        const response = await fetch(endpoint + `/superadmin/delete_admin/${id_user}`,{
            method : "DELETE",
            headers: {
                "Authorization": `Bearer ${Cookies.get("token")}`,
            }
        })
        if (response.ok){
            console.log("Success")
        }
        }catch(error) {
            console.log("Error : ", error)
        }
    }

    const handleClose = () =>{
        setClosePopup(false)
    }

    return(
        <div className=" fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="h-[150px] w-[500px] bg-white rounded-lg flex flex-col justify-center">
                <div className="flex items-center justify-center text-[24px]">
                    ต้องการจะลบ <span className="text-red-500 ml-4 mr-4"> User : {first_name}</span> ใช่หรือไม่?
                </div>
                <div className="flex items-center justify-evenly mt-8 ">
                    <button className="p-[10px] pr-4 pl-4 rounded-lg bg-red-400 hover:bg-red-500 font-semibold text-white" onClick={handleDeleteUser}>Delete</button>
                    <button className="hover:text-red-500 p-[10px] pr-4 pl-4" onClick={handleClose}>Cancle</button>
                </div>
            </div>
        </div>
            
    )
}

export default DelUser