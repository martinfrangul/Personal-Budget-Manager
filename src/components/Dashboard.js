import React, { Profiler, useState, useEffect } from "react";
import { useStore } from "@nanostores/react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import ExportButton from "./ExportButton";
import DownloadProfilerData from "./DownloadProfilerData";
import { onRenderCallback } from "../utils/onRenderCallback";
import { transactionsStore } from "../stores/transactionStore";

// Lazy load components for performance optimization
const AnalysisGraph = React.lazy(() => import("./AnalysisGraph"));
const BalanceOverTime = React.lazy(() => import("./BalanceOverTime"));
const Statistics = React.lazy(() => import("./Statistics"));
const Recommendations = React.lazy(() => import("./Recommendations"));
const RecentTransactions = React.lazy(() => import("./RecentTransactions"));

function Dashboard() {
  const transactions = useStore(transactionsStore);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (transactions.length > 0) {
      setIsLoading(false);
    }
  }, [transactions]);

  const totalIncome = transactions.reduce(
    (sum, transaction) =>
      transaction.type === "income" ? sum + transaction.amount : sum,
    0
  );

  const totalExpense = transactions.reduce(
    (sum, transaction) =>
      transaction.type === "expense" ? sum + transaction.amount : sum,
    0
  );

  const balance = totalIncome - totalExpense;

  return (
    <Profiler id="Dashboard" onRender={onRenderCallback}>
      <Box sx={{ p: { xs: 2, md: 4 } }}>
        <Typography variant="h3" gutterBottom>
          Dashboard
        </Typography>

        <Box
          sx={{
            mb: 2,
            gap: 2,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <ExportButton
            data={transactions}
            headers={["date", "amount", "description"]}
            label="Export Transactions"
            sx={{
              typography: { xs: "body2", sm: "body1" }, 
              padding: { xs: "6px 12px", sm: "8px 16px" }, 
              fontSize: { xs: "0.75rem", sm: "1rem" }, 
            }}
          />
          <DownloadProfilerData
            sx={{
              typography: { xs: "body2", sm: "body1" },
              padding: { xs: "6px 12px", sm: "8px 16px" },
              fontSize: { xs: "0.75rem", sm: "1rem" },
            }}
          />
        </Box>

        {/* Totals Section */}
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                Total Income
              </Typography>
              <Typography variant="h5" data-testid="total-income">
                {totalIncome.toFixed(2)} €
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                Total Expenses
              </Typography>
              <Typography variant="h5" data-testid="total-expenses">
                {totalExpense.toFixed(2)} €
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                Balance
              </Typography>
              <Typography variant="h5" data-testid="balance">
                {balance.toFixed(2)} €
              </Typography>
            </Paper>
              {balance < 0 && (
                <Typography
                  sx={{
                    padding: 1,
                    boxShadow: 3,
                    borderRadius: 2,
                    marginTop: 1,
                  }}
                  variant="body1"
                  color="error"
                >
                  Warning: Your balance is negative
                </Typography>
              )}
          </Grid>
        </Grid>

        <Box sx={{ mt: 2 }}>
          <Statistics />
          <Recommendations />
        </Box>
        <Grid
          container
          spacing={2}
          sx={{ mt: 2, display: "flex", alignItems: "center" }}
        >
          <Grid item xs={12} md={6}>
            {isLoading ? <div>Loading Graph...</div> : <AnalysisGraph />}
          </Grid>
          <Grid item xs={12} md={6}>
            {isLoading ? <div>Loading Graph...</div> : <BalanceOverTime />}
          </Grid>
        </Grid>

        <Box sx={{ mt: 2 }}>
          {isLoading ? <div>Loading Transactions...</div> : <RecentTransactions />}
        </Box>
      </Box>
    </Profiler>
  );
}

export default Dashboard;
