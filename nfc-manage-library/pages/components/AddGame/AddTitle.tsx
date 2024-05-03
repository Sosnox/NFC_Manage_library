import { MdAccessTime } from "react-icons/md";
import { MdGroup } from "react-icons/md";
import { PiApplePodcastsLogoBold } from "react-icons/pi";

function AddTitle () {
    return (
        <div>
            <text className="text-[20px] font-bold">Test</text>
            <div className="flex flex-col text-[15px] ">
                <text className="flex">
                    <MdAccessTime size={23} />
                    <span className="ml-2">- นาที</span>
                </text>

                <text className="flex">
                    <MdGroup size={23}/>
                    <span className="ml-2">- คน</span>
                </text>

                <text className="flex">
                    <PiApplePodcastsLogoBold size={23}/>
                    <span className="ml-2">- ปี</span>
                </text>
            </div>
        </div>
    );
}

export default AddTitle