import React, { useState, useEffect } from "react";
import { useStore } from "@nanostores/react";
import { transactionsStore } from "../stores/transactionStore";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
  Box,
} from "@mui/material";
import { categoryKeywords } from "../constants/categoryKeywords";
import { allCategories } from "../constants/categories";

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

    if (transactionToEdit) {
      transactionsStore.set(
        transactions.map((t) =>
          t.id === transactionToEdit.id ? transaction : t
        )
      );
    } else {
      transactionsStore.set([...transactions, transaction]);
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
              <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                margin="normal"
                required
                name="description"
                id="description"
                inputProps={{ "aria-describedby": "description-help" }}
              />
              <Box component="span" id="description-help" hidden>
                Brief description of the transaction
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Amount (€)"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                fullWidth
                margin="normal"
                required
                inputProps={{
                  min: 0,
                  step: "0.01",
                  "aria-describedby": "amount-help",
                }}
                name="amount"
                id="amount"
              />
              <Box component="span" id="amount-help" hidden>
                Enter the transaction amount in euros
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal" required>
                <InputLabel id="type-label">Type</InputLabel>
                <Select
                  labelId="type-label"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  label="Type"
                  name="type"
                  inputProps={{ "aria-describedby": "type-help" }}
                  id="type"
                >
                  <MenuItem value="income">Income</MenuItem>
                  <MenuItem value="expense">Expense</MenuItem>
                </Select>
                <Box component="span" id="type-help" hidden>
                  Select the type of transaction (income or expense)
                </Box>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal" required>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  label="Category"
                  name="category"
                  inputProps={{ "aria-describedby": "category-help" }}
                  id="category"
                >
                  {allCategories.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                  <MenuItem value="Other Expenses">Other Expenses</MenuItem>
                </Select>
                <Box component="span" id="category-help" hidden>
                  Select a category for the transaction
                </Box>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                fullWidth
                margin="normal"
                required
                name="date"
                id="date"
                inputProps={{ "aria-describedby": "date-help" }}
              />
              <Box component="span" id="date-help" hidden>
                Select the date of the transaction
              </Box>
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
