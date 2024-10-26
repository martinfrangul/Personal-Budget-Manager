import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import { allCategories } from "../../constants/categories";

const TransactionCategorySelect = ({ value, onChange, required }) => (
  <FormControl fullWidth margin="normal" required={required}>
    <InputLabel id="category-label">Category</InputLabel>
    <Select
      labelId="category-label"
      value={value}
      onChange={onChange}
      label="Category"
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
);

export default TransactionCategorySelect;
