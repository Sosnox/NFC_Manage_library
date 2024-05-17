
import { Card, CardBody, CardHeader, DatePicker, getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import DashCircle from "./api/authen/POST/Dashboard/GET/dashCircle";
import { useEffect, useState } from "react";
import BarChartPage from "./components/Chart/showBarchart";
import BarChartCardPage from "./components/Chart/showBarchartCard";
import CountCardScan from "./api/authen/POST/Dashboard/GET/CountCardScan";
import DoughnutChart from "./components/Chart/DoughnutChart";
import { TableData } from "./components/tableDashboard";
import CircleReport from "./api/authen/POST/Dashboard/GET/CircleReport";



const Visualization = () => {
    const [dataGraph, setDataGraph] = useState();
    const [countScanCard, setCountScanCard] = useState();
    const [dataDounut, setDataDounut] = useState();

    const FetchData = async () => {
        try {

            const data = await DashCircle();
            const countScanCard = await CountCardScan();
            const dataDou = await CircleReport();
            setDataDounut(dataDou);
            setCountScanCard(countScanCard);
            setDataGraph(data);

        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        FetchData();
    }, [])

    return (
        <div className="h-screen">
        <div className="flex flex-col overflow-y-scroll h-[600px] ">
            <label className="text-[48px] font-semibold">Visualization</label>
            <div className="grid grid-cols-4 grid-rows-5 gap-6 ">
                <div className="col-span-3 row-span-2 ">
                    <div className="h-[500px] mb-10">
                        <BarChartPage data={dataGraph} />
                    </div>
                </div>

                <div className="row-span-2 col-start-4 row-start-1 mt-12">
                    <TableData />
                </div>

                <div className="col-span-3 row-span-2 col-start-1 row-start-3 ">
                    <div className="h-[500px]">
                        <BarChartCardPage data={countScanCard} />
                    </div>
                </div>

                <div className="row-span-2 col-start-4 row-start-3">
                    <div className="h-[500px]">
                        <DoughnutChart data={dataDounut} />
                    </div>
                </div>
            </div>

        </div>
        </div>
    )
}
export default Visualization;