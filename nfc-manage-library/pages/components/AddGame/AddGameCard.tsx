import Link from 'next/link';
import { useState, useEffect } from 'react';
import BoardGameImage from './BoardGameImage';
import { MdAccessTime } from "react-icons/md";
import { MdGroup } from "react-icons/md";
import { PiApplePodcastsLogoBold } from "react-icons/pi";

interface AddGameCard{
    id_boardgame: any;
    title_game: any;
    detail_game: any;
    recommend: any;
    type_game: any;
    count_scan_boardgame: any;
    time_playing: any;
    age_recommend: any;
    player_recommend_end: any;
    player_recommend_start: any;
    path_youtube: any;
    path_image_boardgame: any;
}

function AddGameCard() {
    const [posts, setPosts] = useState<AddGameCard[]>([]);
    const [check, setCheck] = useState(false)

    const fetchPosts = async () => {
        try {
            const response = await fetch('http://210.246.215.173:8000/get_all_boardgame/');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setPosts(data);
            setCheck(true)

        } catch (error) {
            console.error('Error fetching data:', error);
            setPosts([]);
        }
    };


    useEffect(() => {
        fetchPosts();
    }, [posts]);

    console.log(posts)

    return (
        <div className='grid grid-cols-5 gap-12 mb-14 '>

            {posts.length > 0 ? (
                posts.map((post, index) => (
                    <div className='rounded-2xl game-menu pt-4 pb-4 '>
                        <Link href={`./edit-game/${post.id_boardgame}`} passHref>
                            <div className='flex items-center justify-center'>
                                <BoardGameImage imageURL={"http://210.246.215.173:8000/uploaded_images/" + post.path_image_boardgame} />

                            </div>
                            <div className='flex flex-col items-center justify-center max-w-[220px] break-all'>
                                <div className='flex'>
                                    <text className="text-[20px] font-bold mb-4 mr-2 ml-2 ">{post.title_game}</text>
                                </div>
                                <div className="flex flex-col text-[15px] ">
                                    <text className="flex">
                                        <MdAccessTime size={23} />
                                        <span className="ml-2">{post.time_playing} นาที</span>
                                    </text>

                                    <text className="flex">
                                        <MdGroup size={23} />
                                        <span className="ml-2">{post.player_recommend_start} - {post.player_recommend_end} คน</span>
                                    </text>

                                    <text className="flex">
                                        <PiApplePodcastsLogoBold size={23} />
                                        <span className="ml-2">{post.age_recommend}+ ปี</span>
                                    </text>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))
            ) : (
                <p>No Bordgame</p>
            )}

            
        </div>
    );
}

export default AddGameCard;
