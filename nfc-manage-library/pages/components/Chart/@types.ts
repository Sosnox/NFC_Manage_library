import { BarDatum } from '@nivo/bar';

export interface PieChartData {
    total: number;
    labels: string[];
    title?: string;
    datasets: PieChartDataset[];
}

export interface PieChartDataset {
    id: string;
    label: string;
    value: number;
}

export interface BarChartData {
    indexBy: string;
    keys: string[];
    datasets: BarChartDataset[];
    label: string;
    axis: string;
    colorBy: 'indexValue' | 'id';
    title?: string;
}

export interface BarChartDataset extends BarDatum {
    [key: string]: any;
}

export interface LineChartData {
    axisX: string;
    axisY: string;
    id: string;
    title?: string;
    data: LineChartDataset[];
    legend?: boolean;
}

export interface LineChartDataset {
    x: string;
    y: number;
}
