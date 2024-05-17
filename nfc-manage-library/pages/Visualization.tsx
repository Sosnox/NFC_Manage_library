
import { Card, CardBody, CardHeader, DatePicker, getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import DashCircle from "./api/authen/POST/Dashboard/GET/dashCircle";
import { useEffect, useState } from "react";
import BarChartPage from "./components/Chart/showBarchart";
import BarChartCardPage from "./components/Chart/showBarchartCard";
import CountCardScan from "./api/authen/POST/Dashboard/GET/CountCardScan";
import DoughnutChart from "./components/Chart/DoughnutChart";
import CircleReport from "./api/authen/POST/Dashboard/GET/CircleReport";
import TableData from "./components/tableDashboard";



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
        <div className="w-full h-full">
            <label className="text-[48px] font-semibold">Visualization</label>
            <div className="w-full h-[93%]">
                <div className="grid grid-cols-3 grid-rows-4 gap-4 w-full h-full">
                    <Card className="col-span-2 row-span-2">
                        <BarChartPage data={dataGraph} />
                    </Card>
                    <Card className="row-span-1 col-start-3">
                        <DoughnutChart data={dataDounut} />
                    </Card>
                    <Card className="col-span-2 row-span-2 row-start-3">
                        <BarChartCardPage data={countScanCard} />
                    </Card>
                    <div className="row-span-3 col-start-3 row-start-2">
                        <TableData />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Visualization;