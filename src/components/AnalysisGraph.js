import React, { Suspense, lazy } from 'react';
import { useStore } from '@nanostores/react';
import { transactionsStore } from '../stores/transactionStore';

// Carga diferida del componente del gráfico
const ChartComponent = lazy(() => import('./ChartComponent'));

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
        <Suspense fallback={<div>Loading chart...</div>}>
            <ChartComponent data={data} />
        </Suspense>
    );
}

export default AnalysisGraph;
