import React, { useState } from 'react';
import { Button } from '@mui/material';
import { Download as DownloadIcon } from '@mui/icons-material';
import { profilerData } from '../utils/profilerData';
import NotificationPopup from './NotificationPopup'; 
function DownloadProfilerData() {
    const [open, setOpen] = useState(false); 
    const [message, setMessage] = useState('');

    const handleClose = () => {
        setOpen(false);
    };

    // Manejar la funcionalidad de descarga
    const handleDownload = () => {
        if (profilerData.length === 0) {
            // Si no hay datos, establecer el mensaje y abrir el popup
            setMessage("No profiler data available to download.");
            setOpen(true);
            return;
        }

        const jsonData = JSON.stringify(profilerData, null, 2); 

        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'profilerData.json');

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url); 
    };

    return (
        <>
            <Button
                variant="contained"
                color="secondary"
                startIcon={<DownloadIcon />}
                onClick={handleDownload}
            >
                Download Profiler Data
            </Button>
            <NotificationPopup open={open} message={message} onClose={handleClose} />
        </>
    );
}

export default DownloadProfilerData;
