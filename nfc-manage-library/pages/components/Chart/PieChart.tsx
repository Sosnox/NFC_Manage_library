import React from 'react';
import { ResponsivePie } from '@nivo/pie';

import { PieChartData } from './@types';

type Props = {
    data: PieChartData;
}

const PieChart = ({ data }: Props) => (
    <>
        {data?.title && <label className='text-2xl font-bold text-primary-light'>{data.title}</label>}
        <div style={{ position: 'relative', height: '400px' }}>
            <ResponsivePie
                data={data.datasets}
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                innerRadius={0.6}
                padAngle={0.7}
                cornerRadius={3}
                activeOuterRadiusOffset={8}
                colors={{ scheme: 'nivo' }}
                borderColor={{ from: 'color', modifiers: [['darker', 0.6]] }}
                enableArcLinkLabels={false}
                arcLabelsSkipAngle={10}
                arcLinkLabelsTextColor="#333333"
                arcLabelsTextColor={{
                    from: 'color',
                    modifiers: [['darker', 2]]
                }}
                defs={[
                    {
                        id: 'dots',
                        type: 'patternDots',
                        background: 'inherit',
                        color: 'rgba(255, 255, 255, 0.3)',
                        size: 4,
                        padding: 1,
                        stagger: true
                    },
                    {
                        id: 'lines',
                        type: 'patternLines',
                        background: 'inherit',
                        color: 'rgba(255, 255, 255, 0.3)',
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10
                    }
                ]}
                theme={{
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
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                fontSize: '22px',
                fontWeight: 'bold'
            }}>
                Total<br/>{data.total}
            </div>
        </div>
    </>
);

export default PieChart;
