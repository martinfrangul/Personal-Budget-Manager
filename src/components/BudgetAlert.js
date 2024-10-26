// src/components/BudgetAlert.js
import React, { useEffect } from "react";
import { useStore } from "@nanostores/react";
import { userSettingsStore } from "../stores/userSettingsStore";
import { transactionsStore } from "../stores/transactionStore";
import { Alert } from "@mui/material";
import { budgetAlertStore } from "../stores/budgetAlertStore"; // Importar el store de alertas

const BudgetAlert = () => {
  const userSettings = useStore(userSettingsStore);
  const transactions = useStore(transactionsStore);

  const totalExpense = transactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );

  const budgetExceeded = totalExpense > userSettings.totalBudgetLimit;

  useEffect(() => {
    if (budgetExceeded) {
      budgetAlertStore.set({
        isVisible: true,
        message: "Budget exceeded! Please review your expenses.",
      });
    } else {
      budgetAlertStore.set({ isVisible: false, message: "" });
    }
  }, [budgetExceeded, userSettings.totalBudgetLimit]);

  return budgetAlertStore.isVisible ? (
    <Alert severity="warning">{budgetAlertStore.message}</Alert>
  ) : null;
};

export default BudgetAlert;
