import React from 'react';
import { useStore } from '@nanostores/react';
import { transactionsStore } from '../stores/transactionStore';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

function AnalysisGraph() {
    const transactions = useStore(transactionsStore);

    const categories = [...new Set(transactions.map(transaction => transaction.category))];
    const data = categories.map(category => {
        const categoryTransactions = transactions.filter(transaction => transaction.category === category);
    
        const income = categoryTransactions
            .filter(transaction => transaction.type === 'income')
            .reduce((total, transaction) => total + transaction.amount, 0);
    
        const expense = categoryTransactions
            .filter(transaction => transaction.type === 'expense')
            .reduce((total, transaction) => total + transaction.amount, 0);
    
        return { category, Income: income, Expense: expense };
    });

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
}

export default AnalysisGraph;
