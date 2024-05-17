import { Calendar, CalendarDate, Card, CardBody, CardHeader, DatePicker, getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { today, getLocalTimeZone, isWeekend, DateValue } from "@internationalized/date";
import { useState, useEffect } from "react";
import dateReportDate from "../api/authen/POST/Dashboard/GET/decendReport";
import dateReportDateByDate from "../api/authen/POST/Dashboard/GET/decendReportByDate";

const columns = [
    {
        key: "date_report",
        label: "Time",
    },
    {
        key: "detail_report",
        label: "Detail",
    },
];


const TableData = () => {
    const now = today(getLocalTimeZone());
    const [value, setValue] = useState<DateValue>(now);
    const [checkDate , setCheckDate] = useState([{
        id_report: '',
        detail_report: '',
        date_report: ''
    }]);

    const [dataTable, setDataTable] = useState([{
        id_report: '',
        detail_report: '',
        date_report: ''
    }]);

    const fetchDataReport = async () => {
        try {
            const data = await dateReportDate();
            const dataTabs = await dateReportDateByDate(value);
            setDataTable(dataTabs)
            setCheckDate(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchDataReport();
    }, []);

    console.log(dataTable, 'dataTable')

    const handleDateChange = async (newValue: DateValue) => {
        const date = newValue.toDate(getLocalTimeZone());
        const isoDateString = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        setValue(newValue)
        const data = await dateReportDateByDate(isoDateString);
        setDataTable(data);
    };

    const reportDates = checkDate.map(report => report.date_report.split('T')[0]);

    const isDateUnavailable = (date: DateValue): boolean => {
        const formattedDate = `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;
        return !reportDates.includes(formattedDate);
    };

    const formatDate = (dateString: string): string => {
        return dateString.split('T')[0];
    };

    return (
        <Card className="w-full h-full">
            <CardHeader className="w-full">
                <Calendar
                    aria-label="Select date to view report"
                    className="w-full"
                    value={value}
                    onChange={handleDateChange}
                    isDateUnavailable={isDateUnavailable}
                />
            </CardHeader>
            <CardBody>
                <Table className="h-[500px] mt-19" aria-label="Data Table">
                    <TableHeader columns={columns}>
                        {column => <TableColumn key={column.key}>{column.label}</TableColumn>}
                    </TableHeader>
                    <TableBody items={dataTable}>
                        {item => (
                            <TableRow key={item.date_report}>
                                {columnKey => (
                                    <TableCell className="overflow-hidden max-h-[200px]">
                                        {columnKey === 'date_report' ? formatDate(item.date_report) : item[columnKey as keyof typeof item]}
                                    </TableCell>
                                )}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardBody>
        </Card>
    );
};
export default TableData;