import React, { useState, useEffect } from "react";
import { useStore } from "@nanostores/react";
import { transactionsStore, addTransaction } from "../../stores/transactionStore";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Box,
} from "@mui/material";
import TransactionField from "./TransactionField";
import TransactionTypeSelect from "./TransactionTypeSelect";
import TransactionCategorySelect from "./TransactionCategorySelect";
import { categoryKeywords } from "../../constants/categoryKeywords";

function TransactionForm({ transactionToEdit, onClose }) {
  const transactions = useStore(transactionsStore);

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const assignCategory = (desc) => {
    for (const keyword in categoryKeywords) {
      if (desc.toLowerCase().includes(keyword.toLowerCase())) {
        return categoryKeywords[keyword];
      }
    }
    return "Other Expenses";
  };

  useEffect(() => {
    if (transactionToEdit) {
      setDescription(transactionToEdit.description);
      setAmount(transactionToEdit.amount);
      setType(transactionToEdit.type);
      setCategory(transactionToEdit.category);
      setDate(transactionToEdit.date);
    } else {
      setCategory(assignCategory(description));
    }
  }, [transactionToEdit, description]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description || !amount || !type || !category || !date) {
      alert("Please fill in all fields.");
      return;
    }

    const transaction = {
      id: transactionToEdit ? transactionToEdit.id : Date.now(),
      description,
      amount: parseFloat(amount),
      type,
      category,
      date,
    };

    console.log("Submitting transaction:", transaction);

    if (transactionToEdit) {
      transactionsStore.set(
        transactions.map((t) =>
          t.id === transactionToEdit.id ? transaction : t
        )
      );
    } else {
      addTransaction(transaction);
    }

    onClose();
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
      aria-labelledby="transaction-dialog-title"
      aria-describedby="transaction-dialog-description"
    >
      <DialogTitle id="transaction-dialog-title">
        {transactionToEdit ? "Edit Transaction" : "Add Transaction"}
      </DialogTitle>
      <form onSubmit={handleSubmit} aria-labelledby="transaction-form">
        <DialogContent id="transaction-dialog-description">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TransactionField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                id="description"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TransactionField
                label="Amount (€)"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                id="amount"
                inputProps={{
                  min: 0,
                  step: "0.01",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TransactionTypeSelect
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TransactionCategorySelect
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TransactionField
                label="Date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                id="date"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              p: 2,
            }}
          >
            <Button
              onClick={onClose}
              color="secondary"
              aria-label="Cancel and close form"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              aria-label={
                transactionToEdit ? "Update transaction" : "Add transaction"
              }
              data-testid="add-transaction-button"
            >
              {transactionToEdit ? "Update" : "Add"}
            </Button>
          </Box>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default TransactionForm;
