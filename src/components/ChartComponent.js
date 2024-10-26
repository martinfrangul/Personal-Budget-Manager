import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

const ChartComponent = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Income" stackId="a" fill="#82ca9d" />
                <Bar dataKey="Expense" stackId="a" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default ChartComponent;
