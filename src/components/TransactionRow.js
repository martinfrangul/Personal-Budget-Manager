import React from 'react';
import { TableRow, TableCell, Button } from '@mui/material';

function TransactionRow({ transaction, onEdit, onDelete }) {
    return (
        <TableRow key={transaction.id}>
            <TableCell>{transaction.description}</TableCell>
            <TableCell>{transaction.amount.toFixed(2)}</TableCell>
            <TableCell>{transaction.type === 'income' ? 'Income' : 'Expense'}</TableCell>
            <TableCell>{transaction.category}</TableCell>
            <TableCell>{new Date(transaction.date).toLocaleDateString('en-US')}</TableCell>
            <TableCell>
                <Button onClick={onEdit} variant="outlined" color="primary">
                    Edit
                </Button>
                <Button onClick={onDelete} variant="outlined" color="secondary" sx={{ ml: 1, color: 'red', borderColor: 'red', '&:hover': { borderColor: 'darkred', backgroundColor: 'rgba(255, 0, 0, 0.1)' } }}>
                    Delete
                </Button>
            </TableCell>
        </TableRow>
    );
}

export default TransactionRow;
