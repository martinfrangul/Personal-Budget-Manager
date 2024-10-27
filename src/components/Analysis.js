import React, { useState } from "react";
import { useStore } from "@nanostores/react";
import { transactionsStore } from "../stores/transactionStore";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import ExportButton from "./ExportButton";

function Analysis() {
  const transactions = useStore(transactionsStore);

  const [timeFrame, setTimeFrame] = useState("monthly");
  const [reportType, setReportType] = useState("trend");

  const formatTimePeriod = (date, timeFrame) => {
    const d = new Date(date);
    if (timeFrame === 'monthly') return `${d.getFullYear()}-${d.getMonth() + 1}`; // Ejemplo: "2023-1" para enero 2023
    if (timeFrame === 'weekly') return `Week ${getWeekNumber(d)}, ${d.getFullYear()}`; // Ejemplo: "Week 3, 2023"
    if (timeFrame === 'daily') return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`; // Ejemplo: "2023-1-15"
    if (timeFrame === 'yearly') return `${d.getFullYear()}`;
    return '';
};

const getWeekNumber = (date) => {
    const start = new Date(date.getFullYear(), 0, 1);
    return Math.ceil(((date - start) / 86400000 + start.getDay() + 1) / 7);
};

const trendData = transactions.reduce((acc, tx) => {
    const periodKey = formatTimePeriod(tx.date, timeFrame);
    const entry = acc.find(item => item.key === periodKey);

    if (entry) {
        if (tx.type === 'income') {
            entry.income += tx.amount;
        } else if (tx.type === 'expense') {
            entry.expense += tx.amount;
        }
    } else {
        acc.push({
            key: periodKey,
            income: tx.type === 'income' ? tx.amount : 0,
            expense: tx.type === 'expense' ? tx.amount : 0,
        });
    }
    return acc;
}, []);

const budgetData = transactions.reduce((acc, tx) => {
    const periodKey = formatTimePeriod(tx.date, timeFrame);
    const entry = acc.find(item => item.key === periodKey);
    
    const budgetForPeriod = 800;

    if (entry) {
        if (tx.type === 'expense') {
            entry.actual += tx.amount;
        }
    } else {
        acc.push({
            key: periodKey,
            budget: budgetForPeriod,
            actual: tx.type === 'expense' ? tx.amount : 0,
        });
    }
    return acc;
}, []);

  const handleTimeFrameChange = (e) => setTimeFrame(e.target.value);
  const handleReportTypeChange = (e) => setReportType(e.target.value);

  return (
    <Box sx={{ mt: 4, p: { xs: 2, md: 4 }, bgcolor: "background.default" }}>
      <Typography variant="h4" gutterBottom color="primary">
        Advanced Analysis
      </Typography>

      {transactions.length === 0 && (
        <Typography variant="h6" color="text.secondary">
          No transactions available.
        </Typography>
      )}

      {/* Controles */}
      <Grid container spacing={2} alignItems="center" sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel id="timeframe-select-label">Time Frame</InputLabel>
            <Select
              labelId="timeframe-select-label"
              id="timeframe-select"
              value={timeFrame}
              onChange={handleTimeFrameChange}
              label="Time Frame"
            >
              <MenuItem value="daily">Daily</MenuItem>
              <MenuItem value="weekly">Weekly</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
              <MenuItem value="yearly">Yearly</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel id="report-type-select-label">Report Type</InputLabel>
            <Select
              labelId="report-type-select-label"
              id="report-type-select"
              value={reportType}
              onChange={handleReportTypeChange}
              label="Report type"

            >
              <MenuItem value="trend">Trend Analysis</MenuItem>
              <MenuItem value="budget">Budget vs. Actual</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Exportar Reporte */}
        <Grid item xs={12} sm={6} md={4}>
          <ExportButton
            data={reportType === "trend" ? trendData : budgetData}
            filename={`analysis-${reportType}.csv`}
            headers={
              reportType === "trend"
                ? ["key", "income", "expense"]
                : ["key", "budget", "actual"]
            }
          />
        </Grid>
      </Grid>

      {/* Gráfico de Análisis de Tendencias */}
      {reportType === "trend" && (
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom color="text.secondary">
                Income and Expenses Trend
              </Typography>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={trendData}>
                  <XAxis dataKey="key" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="income"
                    stroke="#28B463"
                    name="Income"
                  />
                  <Line
                    type="monotone"
                    dataKey="expense"
                    stroke="#E74C3C"
                    name="Expenses"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* Gráfico de Presupuesto vs. Gasto Real */}
      {reportType === "budget" && (
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom color="text.secondary">
                Budget vs Actual Expenses
              </Typography>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={budgetData}>
                  <XAxis dataKey="key" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="budget" fill="#3498DB" name="Budget" />
                  <Bar dataKey="actual" fill="#E74C3C" name="Actual Expenses" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* Secciones Adicionales */}
      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom color="text.secondary">
              Savings Goals
            </Typography>
            <Typography>No savings goals set.</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom color="text.secondary">
              Net Worth Over Time
            </Typography>
            <Typography>No net worth data available.</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Analysis;
