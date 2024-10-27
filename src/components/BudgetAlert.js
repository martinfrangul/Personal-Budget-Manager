import React, { useState, useEffect } from "react";
import { useStore } from "@nanostores/react";
import { userSettingsStore } from "../stores/userSettingsStore";
import { transactionsStore } from "../stores/transactionStore";
import { budgetAlertStore } from "../stores/budgetAlertStore";
import NotificationPopup from "./NotificationPopup"; // Importa NotificationPopup

const BudgetAlert = () => {
  const userSettings = useStore(userSettingsStore);
  const transactions = useStore(transactionsStore);

  const totalExpense = transactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );

  const budgetExceeded = totalExpense > userSettings.totalBudgetLimit;

  // Estado local para controlar la visibilidad del popup
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  useEffect(() => {
    if (budgetExceeded) {
      budgetAlertStore.set({
        isVisible: true,
        message: "Budget exceeded! Please review your expenses.",
      });
      setPopupMessage("Budget exceeded! Please review your expenses."); // Establece el mensaje del popup
      setPopupOpen(true); // Abre el popup
    } else {
      budgetAlertStore.set({ isVisible: false, message: "" });
      setPopupOpen(false); // Cierra el popup si ya no se excede el presupuesto
    }
  }, [budgetExceeded, userSettings.totalBudgetLimit]);

  // Función para cerrar el popup
  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  return (
    <NotificationPopup
      open={popupOpen}
      message={popupMessage}
      onClose={handleClosePopup}
    />
  );
};

export default BudgetAlert;
