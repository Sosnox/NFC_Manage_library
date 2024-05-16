
import { Card, CardBody, CardHeader, DatePicker, getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import DashCircle from "./api/authen/POST/Dashboard/GET/dashCircle";
import { useEffect, useState } from "react";
import BarChartPage from "./components/Chart/showBarchart";
import BarChartCardPage from "./components/Chart/showBarchartCard";
import CountCardScan from "./api/authen/POST/Dashboard/GET/CountCardScan";
import DoughnutChart from "./components/Chart/DoughnutChart";
import { TableData } from "./components/tableDashboard";



const Visualization = () => {
    const [dataGraph, setDataGraph] = useState();
    const [countScanCard, setCountScanCard] = useState();

    const FetchData = async () => {
        try {
            const data = await DashCircle();
            const countScanCard = await CountCardScan();
            setCountScanCard(countScanCard);
            setDataGraph(data);
            console.log(data, 'dataGraph')
            // const data = await DashBar();
            // const data = await DashPie();

        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        FetchData();
    }, [])
    
    const rows = [
        {
            detail_report: "ไม่มีต้าชนะใจเราเสมอ",
            date_report: "2024-05-02T19:26:16"
        },
        {
            detail_report: "ไม่มีต้าชนะใจเราเสมอ",
            date_report: "2024-05-02T19:26:16"
        },
        {
            detail_report: "ไม่มีต้าชนะใจเราเสมอ",
            date_report: "2024-05-02T19:26:16"
        },
        {
            detail_report: "ไม่มีต้าชนะใจเราเสมอ",
            date_report: "2024-05-02T19:26:16"
        },
      ];
      
      const columns = [
        {
          key: "detail_report",
          label: "Time",
        },
        {
          key: "date_report",
          label: "Detail",
        },
      ];

    //   const date = new Date();
    //   const handleDateChange = (date: Date) => {
    //     console.log(date);
    //   }

    return (
        <div className="flex flex-col w-full overflow-y-scroll h-[800px]">
            <label className="text-[48px] font-semibold">Visualization</label>
            <div className="grid grid-cols-4 grid-rows-5 gap-6 m-6">
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
                        <DoughnutChart data={dataGraph} />
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Visualization;