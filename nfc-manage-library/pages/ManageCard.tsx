import AddGameCard from "./components/AddGame/AddGameCard";
import { Search_games } from "./components/SearchBar/searchgames";

const ManageCard = () => {
    return (
        <>
            <div className="flex flex-col items-center ">
                <div className="mt-24 mb-24">
                    <Search_games />
                </div>
                <AddGameCard />
            </div>
        </>
    );
}
export default ManageCard;