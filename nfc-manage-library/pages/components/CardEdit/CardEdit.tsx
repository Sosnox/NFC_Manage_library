import { MdDeleteForever } from "react-icons/md";
import { useState, useEffect } from "react";
import PopupEC from "./PopupEC";

interface AddGameCard {
    id_boardgame: any;
    id_total_boardgame: any;
    count_scan_card: any;
    path_image_card: any;
    tick_card: any;
    detail_card: any;
    title_card: any;
    id_card: any;
    openPopup: any;
}
const endpoint = process.env.NEXT_PUBLIC_API_URL_AUTH 

function CardEdit({ id_boardgame, search }: {id_boardgame : any, search : string}) {
    const [posts, setPosts] = useState<AddGameCard[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    
    const [openPopups, setOpenPopups] = useState<{ [key: number]: boolean }>({});

    useEffect(() => {
        setSearchTerm(search);
    }, [search]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(endpoint + '/get_all_card_by_id_boardgame/?id_boardgame=' + id_boardgame);
            const data = await response.json();

            if (searchTerm === '') {
                setPosts(data);
            } else {
                const filteredPosts = data.filter((post: { title_card: string; }) => {
                    return post.title_card.toLowerCase().includes(searchTerm.toLowerCase());
                });
                setPosts(filteredPosts);
            }
        };
        fetchPosts();
    }, [posts, searchTerm]);

    const handleOpenPopup = (index: number) => {
        setOpenPopups(prevState => ({
            ...prevState,
            [index]: true
        }));
    };

    const handleClosePopup = (index: number) => {
        setOpenPopups(prevState => ({
            ...prevState,
            [index]: false
        }));
    };

    const handleDeleteCard = async (id_card: any) => {
        try {
            const response = await fetch(endpoint + `/admin/delete_card/${id_card}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                setPosts(prevPosts => prevPosts.filter(post => post.id_card !== id_card));
                console.log("Card deleted successfully!");
            } else {
                console.error("Failed to delete card:", response.statusText);
            }
        } catch (error) {
            console.error("Error deleting card:", error);
        }
    };

    return (
        <>
            {posts.length > 0 ? (
                posts.map((post, index) => (
                    <div key={index} className="grid grid-cols-6 justify-self-start border shadow-black shadow-md rounded-xl pt-4 pb-4  mt-2 bg-white hover:bg-opacity-50">
                        
                        <div className="ml-[15px]"><input type="checkbox" /></div>
                        <div className=" col-span-2 justify-self-center">
                            <span className="text-[18px]">
                                {post.title_card}
                            </span>
                        </div>
                        <button onClick={() => handleOpenPopup(index)} className="col-span-2 justify-self-center bg-yellow-400 font-semibold text-white rounded-md pr-2 pl-2 hover:bg-gray-600 hover:text-black">Edit</button>
                        {openPopups[index] && (
                            <PopupEC
                                title_card={post.title_card}
                                tick_card={post.tick_card}
                                detail_card={post.detail_card}
                                path_image_card={post.path_image_card}
                                id_boardgame={post.id_boardgame}
                                id_card={post.id_card}
                                setClosePopup={() => handleClosePopup(index)}
                            />
                        )}
                        <div className="edit-card-bin justify-self-end mr-8 hover:text-red-600" onClick={() => handleDeleteCard(post.id_card)}><MdDeleteForever size={25} /></div>
                    </div>
                ))
            ) : (
                <p>No Card</p>
            )}
        </>
    );
}

export default CardEdit;
