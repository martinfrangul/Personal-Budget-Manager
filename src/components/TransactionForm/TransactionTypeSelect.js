import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";

const TransactionTypeSelect = ({ value, onChange, required }) => (
  <FormControl fullWidth margin="normal" required={required}>
    <InputLabel id="type-label">Type</InputLabel>
    <Select
      labelId="type-label"
      value={value}
      onChange={onChange}
      label="Type"
      id="type"
    >
      <MenuItem value="income">Income</MenuItem>
      <MenuItem value="expense">Expense</MenuItem>
    </Select>
    <Box component="span" id="type-help" hidden>
      Select the type of transaction (income or expense)
    </Box>
  </FormControl>
);

export default TransactionTypeSelect;
