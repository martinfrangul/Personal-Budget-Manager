import React, { useCallback } from 'react';
import { Button } from '@mui/material';
import { Download as DownloadIcon } from '@mui/icons-material';
import PropTypes from 'prop-types';

const ExportButton = React.memo(function ExportButton({ data,  filename = 'data.csv', headers, label = 'Export CSV' }) {
    const convertArrayOfObjectsToCSV = (data, headers) => {
        if (!data || data.length === 0) return null;

        // Crear la fila de encabezados y las filas de datos en CSV
        const headerRow = headers.join(',');
        const dataRows = data.map(row =>
            headers.map(fieldName => JSON.stringify(row[fieldName] || '')).join(',')
        );
        return [headerRow, ...dataRows].join('\n');
    };

    const handleExport = useCallback(() => {
        const csv = convertArrayOfObjectsToCSV(data, headers);

        if (!csv) return;
        
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', filename || 'data.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }, [data, filename, headers]);

    return (
        <Button
            variant="contained"
            color="primary"
            startIcon={<DownloadIcon />}
            onClick={handleExport}
            disabled={!data || data.length === 0}
        >
            {label || 'Export CSV'}
        </Button>
    );
});

// Define types of props for better verification and documentation
ExportButton.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    filename: PropTypes.string,
    headers: PropTypes.arrayOf(PropTypes.string).isRequired,
    label: PropTypes.string,
};

export default ExportButton;
