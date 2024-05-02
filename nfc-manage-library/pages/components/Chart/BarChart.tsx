import { ResponsiveBar } from '@nivo/bar';
import { BarChartData } from './@types';

type Props = {
    data: BarChartData;
}

const BarChart = ({ data }: Props) => (
    <div className='w-full h-full'>
        {data?.title &&
            <label className='text-2xl font-bold text-Primary-light'>
                {data.title}
                <p className='text-2xl font-thin text-Primary-light'>
                    {data.label}
                </p>
            </label>
        }
        <ResponsiveBar
            data={data.datasets}
            keys={data.keys}
            indexBy={data.indexBy}
            margin={{ top: 10, right: 40, bottom: 150, left: 60 }}
            padding={0.3}
            innerPadding={0}
            groupMode="grouped"
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={{ scheme: 'reds' }}
            colorBy={data.colorBy}
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: '#38bcb2',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: '#eed312',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
            ]}
            borderColor={{
                from: 'color',
                modifiers: [['darker', 3]]
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Days of the Week',
                legendPosition: 'middle',
                legendOffset: 32
            }}
            axisLeft={null} // This line removes the left Y-axis
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
                from: 'color',
                modifiers: [['darker', 1.6]]
            }}
            theme={{
                grid: {
                    line: {
                        stroke: "transparent", // Set the stroke color to transparent to hide the grid lines
                        strokeWidth: 0 // Optional: set the stroke width to 0 to further ensure the lines are not visible
                    }
                },
                tooltip: {
                    container: {
                        background: 'white',
                        color: 'black',
                        fontSize: '13px',
                        borderRadius: '2px',
                        boxShadow: '0 3px 9px rgba(0, 0, 0, 0.5)'
                    }
                }
            }}
        />
    </div>
);

export default BarChart;
