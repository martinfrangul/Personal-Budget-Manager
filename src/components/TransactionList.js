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
  TablePagination,
} from "@mui/material";
import TransactionForm from "../components/TransactionForm/TransactionForm";
import RecentTransactions from "../components/RecentTransactions";
import TransactionRow from "../components/TransactionRow";

function TransactionList() {
  const transactions = useStore(transactionsStore);

  const [filterCategory, setFilterCategory] = useState("");
  const [filterType, setFilterType] = useState("");
  const [sortField, setSortField] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const uniqueCategories = useMemo(() => {
    const categories = transactions.map((transaction) => transaction.category);
    return Array.from(new Set(categories)).filter((category) => category); // Filtramos valores vacíos o nulos
  }, [transactions]);

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
          (filterCategory === "" ||
            filterCategory === "All" ||
            transaction.category === filterCategory) &&
          (filterType === "" ||
            filterType === "All" ||
            transaction.type === filterType)
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

  const paginatedTransactions = useMemo(() => {
    const startIndex = page * rowsPerPage;
    return filteredTransactions.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredTransactions, page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ mt: 4, p: 2, bgcolor: "background.paper", borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom>
        Transaction List
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenForm(true)}
        sx={{ mb: 2 }}
      >
        Add Transaction
      </Button>

      {/* Filters */}
      <Box sx={{ display: { xs: "block", sm: "flex" }, gap: 2, my: 2 }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="filter-category-label">Category</InputLabel>
          <Select
            labelId="filter-category-label"
            id="filter-category"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            label="Category"
          >
            <MenuItem value="All">All</MenuItem>
            {uniqueCategories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="filter-type-label">Type</InputLabel>
          <Select
            labelId="filter-type-label"
            id="filter-type"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            label="Type"
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="income">Income</MenuItem>
            <MenuItem value="expense">Expense</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel id="sort-field-label">Sort By</InputLabel>
          <Select
            labelId="sort-field-label"
            id="sort-field"
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
            label="Sort by"
          >
            <MenuItem value="None">None</MenuItem>
            <MenuItem value="amount">Amount</MenuItem>
            <MenuItem value="date">Date</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Table of transactions */}
      <TableContainer component={Paper} sx={{ mb: 2 }}>
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
            {paginatedTransactions.map((transaction) => (
              <TransactionRow
                key={transaction.id}
                transaction={transaction}
                onEdit={() => handleEdit(transaction)}
                onDelete={() => deleteTransaction(transaction.id)}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <RecentTransactions />

      {/* Controles de paginación */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]} // Opciones de filas por página
        component="div"
        count={filteredTransactions.length} // Total de transacciones filtradas
        rowsPerPage={rowsPerPage} // Filas por página actual
        page={page} // Página actual
        onPageChange={handleChangePage} // Cambiar de página
        onRowsPerPageChange={handleChangeRowsPerPage} // Cambiar filas por página
      />

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
