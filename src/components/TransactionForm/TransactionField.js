import React from "react";
import { TextField, Box } from "@mui/material";

const TransactionField = ({ label, value, onChange, required, id, type = "text", inputProps }) => (
  <div>
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      fullWidth
      margin="normal"
      required={required}
      name={label.toLowerCase()}
      id={id}
      type={type}
      inputProps={inputProps}
    />
    <Box component="span" id={`${id}-help`} hidden>
      {`Enter the ${label.toLowerCase()} for the transaction`}
    </Box>
  </div>
);

export default TransactionField;
