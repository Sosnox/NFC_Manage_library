import { BarChartData, PieChartData } from "./components/Chart/@types";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import dynamic from "next/dynamic";

const PieChart = dynamic(() => import('./components/Chart/PieChart'), { ssr: false })
const BarChart = dynamic(() => import('./components/Chart/BarChart'), { ssr: false })

const Visualization = () => {

    const barChartData: BarChartData = {
        indexBy: "day",
        keys: ["lastWeek", "last6Days"],
        datasets: [
            { day: "Sun", lastWeek: 10, last6Days: 5 },
            { day: "Mon", lastWeek: 7, last6Days: 3 },
            { day: "Tue", lastWeek: 8, last6Days: 2 },
            { day: "Wed", lastWeek: 15, last6Days: 12 },
            { day: "Thu", lastWeek: 20, last6Days: 10 },
            { day: "Fri", lastWeek: 25, last6Days: 20 },
            { day: "Sat", lastWeek: 18, last6Days: 15 }
        ],
        label: "Number of Scans where NFC Board Game is Played",
        axis: "Number of Scans",
        colorBy: "id",
        title: "Count of Scan NFC Board Game"
    };


    const pieChartData: PieChartData = {
        total: 865,
        labels: ["Werewolf", "TNT Run", "SkyWar"],
        title: "Game Play Distribution",
        datasets: [
            { id: "werewolf", label: "Werewolf", value: 345 },
            { id: "tnt-run", label: "TNT Run", value: 290 },
            { id: "skywar", label: "SkyWar", value: 230 }
        ]
    };

    return (
        <div className="flex flex-col w-full">
            <label className="text-2xl">Visualization</label>
            <div className="grid grid-cols-4 grid-rows-5 gap-6 m-6">
                <div className="col-span-3 row-span-2 border-2">
                    <div className="h-[500px] mb-10">
                        <BarChart data={barChartData} />
                    </div>
                </div>

                <div className="row-span-2 col-start-4 row-start-1 border-2">
                    <Card>
                        <CardHeader>
                            <p>Card Title</p>
                        </CardHeader>
                        <CardBody>
                            <p>Card Body</p>
                        </CardBody>
                    </Card>
                </div>

                <div className="col-span-3 row-span-2 col-start-1 row-start-3 border-2">
                    <div className="h-[500px]">
                        <BarChart data={barChartData} />
                    </div>
                </div>

                <div className="row-span-2 col-start-4 row-start-3 border-2">
                    <div className="h-[500px]">
                        <PieChart data={pieChartData} />
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Visualization;