
import { Card, CardBody, CardHeader, DatePicker, getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import DashCircle from "./api/authen/POST/Dashboard/GET/dashCircle";
import { useEffect, useState } from "react";
import BarChartPage from "./components/Chart/showBarchart";
import BarChartCardPage from "./components/Chart/showBarchartCard";
import CountCardScan from "./api/authen/POST/Dashboard/GET/CountCardScan";
import DoughnutChart from "./components/Chart/DoughnutChart";



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

    return (
        <div className="flex flex-col w-full">
            <label className="text-2xl">Visualization</label>
            <div className="grid grid-cols-4 grid-rows-5 gap-6 m-6">
                <div className="col-span-3 row-span-2 border-2">
                    <div className="h-[500px] mb-10">
                        <BarChartPage data={dataGraph} />
                    </div>
                </div>

                <div className="row-span-2 col-start-4 row-start-1 border-2">
                    <Card>
                        <CardHeader>
                            <p>Card Title</p>
                            <DatePicker
                                label={"Birth date"}
                                className="max-w-[284px]"
                                labelPlacement="outside"
                            />
                        </CardHeader>
                        <CardBody>
                            <Table aria-label="Example table with dynamic content">
                                <TableHeader columns={columns}>
                                    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                                </TableHeader>
                                <TableBody items={rows}>
                                    {(item) => (
                                        <TableRow key={item.detail_report}>
                                            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardBody>
                    </Card>
                </div>

                <div className="col-span-3 row-span-2 col-start-1 row-start-3 border-2">
                    <div className="h-[500px]">
                        <BarChartCardPage data={countScanCard} />
                    </div>
                </div>

                <div className="row-span-2 col-start-4 row-start-3 border-2">
                    <div className="h-[500px]">
                        <DoughnutChart data={dataGraph} />
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Visualization;