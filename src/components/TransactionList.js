import React, { useState, useMemo, useCallback } from "react";
import { useStore } from "@nanostores/react";
import {
  transactionsStore,
  deleteTransaction as storeDeleteTransaction,
} from "../stores/transactionStore";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Typography,
} from "@mui/material";
import TransactionForm from "../components/TransactionForm/TransactionForm";

function TransactionList() {
  const transactions = useStore(transactionsStore);

  const [filterCategory, setFilterCategory] = useState("");
  const [filterType, setFilterType] = useState("");
  const [sortField, setSortField] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const deleteTransaction = useCallback((id) => {
    storeDeleteTransaction(id);
  }, []);

  const handleEdit = useCallback((transaction) => {
    setTransactionToEdit(transaction);
    setOpenForm(true);
  }, []);

  const handleCloseForm = () => {
    setTransactionToEdit(null);
    setOpenForm(false);
  };

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter(
        (transaction) =>
          (filterCategory ? transaction.category === filterCategory : true) &&
          (filterType ? transaction.type === filterType : true)
      )
      .sort((a, b) => {
        if (sortField === "amount") {
          return a.amount - b.amount;
        } else if (sortField === "date") {
          return new Date(a.date) - new Date(b.date);
        }
        return 0;
      });
  }, [transactions, filterCategory, filterType, sortField]);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Transaction List
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenForm(true)}
      >
        Add Transaction
      </Button>

      {/* Filters */}
      <Box sx={{ display: "flex", gap: 2, my: 2 }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="filter-category-label">Category</InputLabel>
          <Select
            labelId="filter-category-label"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {/* Agregar otras categorías dinámicamente */}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="filter-type-label">Type</InputLabel>
          <Select
            labelId="filter-type-label"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="income">Income</MenuItem>
            <MenuItem value="expense">Expense</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel id="sort-field-label">Sort By</InputLabel>
          <Select
            labelId="sort-field-label"
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="amount">Amount</MenuItem>
            <MenuItem value="date">Date</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Table of transactions */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>Amount (€)</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>{transaction.amount.toFixed(2)}</TableCell>
                <TableCell>{transaction.type}</TableCell>
                <TableCell>{transaction.category}</TableCell>
                <TableCell>
                  {new Date(transaction.date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleEdit(transaction)}
                      className="hover:bg-red-400 transition-colors duration-200" 
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => deleteTransaction(transaction.id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Form Modal */}
      {openForm && (
        <TransactionForm
          transactionToEdit={transactionToEdit}
          onClose={handleCloseForm}
        />
      )}
    </Box>
  );
}

export default TransactionList;
