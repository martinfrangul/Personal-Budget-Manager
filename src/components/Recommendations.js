import React, { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { transactionsStore } from "../stores/transactionStore";
import {
  CircularProgress,
  Typography,
  Box,
  Card,
  CardContent,
} from "@mui/material";

function Recommendations() {
  const transactions = useStore(transactionsStore);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Simulando una llamada a la API o carga de datos
        await new Promise((resolve, reject) => {
          // Simulación de un fallo aleatorio
          setTimeout(() => {
            const failed = Math.random() < 0.3; // 30% de probabilidad de error
            if (failed) {
              reject(new Error("Failed to load transactions"));
            } else {
              resolve();
            }
          }, 1000);
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  const expenses = transactions.filter(
    (transaction) => transaction.type === "expense"
  );

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const lastMonth = new Date(currentYear, currentMonth - 1, 1);

  const expensesThisMonth = expenses
    .filter((transaction) => {
      const date = new Date(transaction.date);
      return (
        date.getMonth() === currentMonth && date.getFullYear() === currentYear
      );
    })
    .reduce((total, transaction) => total + transaction.amount, 0);

  const expensesLastMonth = expenses
    .filter((transaction) => {
      const date = new Date(transaction.date);
      return (
        date.getMonth() === lastMonth.getMonth() &&
        date.getFullYear() === lastMonth.getFullYear()
      );
    })
    .reduce((total, transaction) => total + transaction.amount, 0);

  let message = "";

  if (expensesLastMonth === 0) {
    message =
      "Keep tracking your expenses to improve your financial management!";
  } else if (expensesThisMonth > expensesLastMonth) {
    const increasePercentage =
      ((expensesThisMonth - expensesLastMonth) / expensesLastMonth) * 100;
    message = `Your expenses have increased by ${increasePercentage.toFixed(
      2
    )}%. Consider reviewing your expenses!`;
  } else if (expensesThisMonth < expensesLastMonth) {
    const decreasePercentage =
      ((expensesLastMonth - expensesThisMonth) / expensesLastMonth) * 100;
    message = `Great! Your expenses have decreased by ${decreasePercentage.toFixed(
      2
    )}%. Keep it up!`;
  } else {
    message =
      "Your expenses have remained constant. Review your consumption habits!";
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
