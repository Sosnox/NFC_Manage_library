import { Card, CardBody, CardHeader, DatePicker, getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { DateValue, parseDate, getLocalTimeZone } from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";
import { useState, useEffect } from "react";
import dateReportDate from "../api/authen/POST/Dashboard/GET/decendReport";

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
        key: "date_report",
        label: "Time",
    },
    {
        key: "detail_report",
        label: "Detail",
    },
];

export const TableData = () => {
    const [value, setValue] = useState<DateValue>();

    const handleDateChange = async (newValue: DateValue) => {
        const date = newValue.toDate(getLocalTimeZone());
        const isoDateString = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}T${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;

        console.log(isoDateString, 'Formatted ISO Date String');
        await dateReportDate(isoDateString);
        setValue(newValue);
    };

    return (
        <Card>
            <CardHeader>
                <DatePicker
                    className="max-w-[284px]"
                    label="Date (controlled)"
                    value={value}
                    onChange={handleDateChange}
                />
            </CardHeader>
            <CardBody>
                <Table aria-label="Example table with dynamic content">
                    <TableHeader columns={columns}>
                        {column => <TableColumn key={column.key}>{column.label}</TableColumn>}
                    </TableHeader>
                    <TableBody items={rows}>
                        {item => (
                            <TableRow key={item.date_report}>
                                {columnKey => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardBody>
        </Card>
    );
};