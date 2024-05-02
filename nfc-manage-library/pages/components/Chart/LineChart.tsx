import { ResponsiveLine } from '@nivo/line'

import { LineChartData } from './@types'

type Props = {
    data: LineChartData[]
}

const LineChart = ({ data }: Props) => (
    <>
        {data[0]?.title && <label className='text-2xl font-bold text-Primary-light'>{data[0].title}</label>}
        <ResponsiveLine
            data={data}
            margin={{ top: 20, right: data[0]?.legend ? 110 : 40, bottom: 100, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{
                type: 'linear',
                min: 0,
                max: 'auto',
                stacked: false,
                reverse: false
            }}
            curve="cardinal"
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: -30,
                legendOffset: 32,
                legendPosition: 'middle',
                truncateTickAt: 0
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: data[0]?.axisY,
                legendOffset: -40,
                legendPosition: 'middle',
                truncateTickAt: 0
            }}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            enablePointLabel={true}
            pointLabel="y"
            pointLabelYOffset={-12}
            enableArea={true}
            areaOpacity={0.05}
            enableTouchCrosshair={true}
            useMesh={true}
            legends={data[0]?.legend ? [
                {
                    anchor: 'right',
                    direction: 'column',
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemBackground: 'rgba(0, 0, 0, .03)',
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ] : []}
        /></>

)

export default LineChart