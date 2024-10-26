import React, { useMemo } from 'react';
import { useStore } from '@nanostores/react';
import { transactionsStore } from '../stores/transactionStore';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

function BalanceOverTime() {
    const transactions = useStore(transactionsStore);


    const sortedTransactions = useMemo(
        () => transactions.sort((a, b) => new Date(a.date) - new Date(b.date)),
        [transactions]
    );

    const data = useMemo(() => {
        let cumulativeBalance = 0;
        return sortedTransactions.map(transaction => {
            cumulativeBalance += transaction.amount;
            return {
                date: transaction.date,
                Balance: cumulativeBalance,
            };
        });
    }, [sortedTransactions]);

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="Balance" stroke="#8884d8" />
            </LineChart>
        </ResponsiveContainer>
    );
}

export default BalanceOverTime;
