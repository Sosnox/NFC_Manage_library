import Link from 'next/link';
import React, { useState, useEffect } from 'react';

interface CardData {
    [key: string]: string; 
}

const SearchBoardGame : React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [results, setResults] = useState<CardData>({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://210.246.215.173:8000/searchGame/`);
                if (response.ok) {
                    const data: CardData = await response.json();
                    setResults(data);
                } else {
                    console.error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className='relative'>
            <input type="text" placeholder='Search Game . . .' className="border rounded-xl w-[250px] border-black p-4 h-[50px]" onChange={handleInputChange} />
            <div className='absolute bg-white border rounded-xl mt-1    '>
                {searchTerm.length > 0 && Object.entries(results)
                    .filter(([key, value]) => value.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map(([key, value]) => (
                        <div key={key} className='bg-white border w-[250px] p-2 pr-4 pl-4 hover:bg-gray-300'>
                            <Link href={`/edit-game/${key}`} className="block p-1 text-lg hover:bg-gray text-[14px] break-all">
                                <span>{value}</span></Link>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default SearchBoardGame;
