import React from "react";
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

const Chart: React.FC = () => {
    const data = [
        { name: 'Jan', uv: 20, pv: 40 },
        { name: 'Feb', uv: 40, pv: 80 },
        { name: 'Mar', uv: 60, pv: 60 },
        { name: 'Apr', uv: 80, pv: 20 },
        { name: 'May', uv: 90, pv: 50 },
        { name: 'Jun', uv: 120, pv: 70 },
        { name: 'Jul', uv: 70, pv: 80 },
        { name: 'Aug', uv: 50, pv: 40 },
        { name: 'Sep', uv: 80, pv: 10 },
        { name: 'Oct', uv: 70, pv: 60 },
        { name: 'Nov', uv: 90, pv: 50 },
        { name: 'Dec', uv: 100, pv: 70 },
    ];

    // Map numbers to days of the week (or any other custom labels)
    const yAxisLabelFormatter = (tick: number) => {
        const dayMap = {
            20: 'Mon',
            40: 'Tue',
            60: 'Wed',
            80: 'Thu',
            90: 'Fri',
            120: 'Sat',
            140: 'Sun',
            160: 'Mon',
            180: 'Tue',
            200: 'Wed',
            220: 'Thu',
            240: 'Fri',
        };
        return dayMap[tick] || tick;
    };

    return (
        <div className="mt-6 text-sm">
            <LineChart
                width={950}
                height={300}
                data={data}
                margin={{ top: 5, right: 30, left: -10, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={yAxisLabelFormatter} />
                <Tooltip />
                <Line type="monotone" dataKey="uv" stroke="#387908" strokeWidth={2} />
                <Line type="monotone" dataKey="pv" stroke="#ff7300" strokeWidth={2} />
            </LineChart>
        </div>
    );
};

export default Chart;
