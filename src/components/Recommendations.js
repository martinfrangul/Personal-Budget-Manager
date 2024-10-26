import React from "react";
import { useStore } from "@nanostores/react";
import { transactionsStore, loadingStore, errorStore } from "../stores/transactionStore";
import { CircularProgress, Typography, Box } from "@mui/material";
import RecommendationCard from "./RecommendationCard";

function Recommendations() {
  const transactions = useStore(transactionsStore);
  const loading = useStore(loadingStore);
  const error = useStore(errorStore);

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
      <RecommendationCard message={message} />
    </Box>
  );
}

export default Recommendations;
