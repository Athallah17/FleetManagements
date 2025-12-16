"use client"
import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip } from "recharts";


const data = [
    {
        Type : "SUV",
        Usage: 45,
        Model: "Toyota",
    },
    {
        Type : "Sedan",
        Usage: 30,
        Model: "Honda",
    },
    {
        Type : "Truck",
        Usage: 25,
        Model: "Ford",
    },
    {
        Type : "Coupe",
        Usage: 20,
        Model: "Chevrolet",
    },
    {
        Type : "Convertible",
        Usage: 15,
        Model: "BMW",
    },
];


const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];

export function MostUsed() {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    data={data}
                    dataKey="Usage"
                    nameKey="Type"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Legend />
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    );
}