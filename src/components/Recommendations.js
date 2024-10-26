import React, { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { transactionsStore } from '../stores/transactionStore';
import { CircularProgress, Typography, Box, Card, CardContent } from '@mui/material';

function Recommendations() {
    const transactions = useStore(transactionsStore); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            // setError('Failed to load transactions');
            setLoading(false);
        }, 1000);
    }, []);

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    const expenses = transactions.filter(transaction => transaction.type === 'expense');

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const lastMonth = new Date(currentYear, currentMonth - 1, 1);

    const expensesThisMonth = expenses.filter(transaction => {
        const date = new Date(transaction.date);
        return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    }).reduce((total, transaction) => total + transaction.amount, 0);

    const expensesLastMonth = expenses.filter(transaction => {
        const date = new Date(transaction.date);
        return date.getMonth() === lastMonth.getMonth() && date.getFullYear() === lastMonth.getFullYear();
    }).reduce((total, transaction) => total + transaction.amount, 0);


    let message = '';

    if (expensesLastMonth === 0) {
        message = '¡Sigue registrando tus gastos para mejorar tu gestión financiera!';
    } else if (expensesThisMonth > expensesLastMonth) {
        const increasePercentage = ((expensesThisMonth - expensesLastMonth) / expensesLastMonth) * 100;
        message = `Tus gastos han aumentado en ${increasePercentage.toFixed(2)}%. ¡Considera revisar tus gastos!`;
    } else if (expensesThisMonth < expensesLastMonth) {
        const decreasePercentage = ((expensesLastMonth - expensesThisMonth) / expensesLastMonth) * 100;
        message = `¡Genial! Tus gastos han disminuido en ${decreasePercentage.toFixed(2)}%. ¡Sigue así!`;
    } else {
        message = 'Tus gastos se han mantenido constantes. ¡Revisa tus hábitos de consumo!';
    }

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h5">Recommendations</Typography>
            <Card sx={{ mt: 2, p: 2 }}>
                <CardContent>
                    <Typography variant="body1">{message}</Typography>
                </CardContent>
            </Card>
        </Box>
    );
}

export default Recommendations;
