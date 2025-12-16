"use client"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

const data = [
    { month: "Jan", total: 20 },
    { month: "Feb", total: 14 },
    { month: "Mar", total: 32 },
    { month: "Apr", total: 22 },
    { month: "May", total: 27 },
    { month: "Jun", total: 30 },
    { month: "Jul", total: 25 },
    { month: "Aug", total: 28 },
    { month: "Sep", total: 26 },
    { month: "Oct", total: 29 },
    { month: "Nov", total: 31 },
    { month: "Dec", total: 33 },
];

export function Overview () {
    return (
        <ResponsiveContainer width='100%' height={350}>
            <BarChart data={data}>
                <XAxis
                    dataKey={'month'}
                    stroke='#888888'
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                direction='ltr'
                stroke='#888888'
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
                />
                <Bar
                dataKey={'total'}
                fill={'#4c51bf'}
                radius={[4, 4, 0, 0]}
                className='fill-primary'
                />
            </BarChart>
        </ResponsiveContainer>
    )
}