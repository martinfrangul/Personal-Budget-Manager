import React from 'react';
import { useStore } from '@nanostores/react';
import { transactionsStore } from '../stores/transactionStore';
import { Paper, Typography } from '@mui/material';

function Statistics() {
    const transactions = useStore(transactionsStore);

    const expenses = transactions.filter(transaction => transaction.type === 'expense');

    const totalExpense = expenses.reduce((total, transaction) => total + transaction.amount, 0);

    const uniqueDates = [...new Set(expenses.map(transaction => transaction.date))];
    const averageDailyExpense = totalExpense / uniqueDates.length || 0;
    

    const categoryExpenses = expenses.reduce((acc, transaction) => {
        acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
        return acc;
    }, {});
    let maxCategory = Object.keys(categoryExpenses).reduce((maxCat, cat) => 
        categoryExpenses[cat] > (categoryExpenses[maxCat] || 0) ? cat : maxCat, 
        null
    );
    

    return (
        <Paper sx={{ padding: 2, mt: 2 }}>
            <Typography variant="h6">Key Statistics</Typography>
            <Typography>
                Average Daily Expense: {averageDailyExpense.toFixed(2)} €
            </Typography>
            <Typography>
                Highest Spending Category:{' '}
                {maxCategory
                    ? `${maxCategory} (${categoryExpenses[maxCategory].toFixed(2)} €)`
                    : 'No data available'}
            </Typography>
        </Paper>
    );
}

export default Statistics;
