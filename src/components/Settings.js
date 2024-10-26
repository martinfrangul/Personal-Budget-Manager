import React, { useState } from "react";
import { useStore } from "@nanostores/react";
import {
  userSettingsStore,
  updateTotalBudgetLimit,
  updateCategoryLimits,
  toggleAlertsEnabled,
  updateBudgetExceeded,
} from "../stores/userSettingsStore";
import {
  budgetAlertStore,
  updateBudgetAlert,
  resetBudgetAlert,
} from "../stores/budgetAlertStore";
import {
  Box,
  Typography,
  Switch,
  FormControlLabel,
  TextField,
  Button,
  Grid,
  Paper,
  Alert,
} from "@mui/material";
import { expenseCategories } from "../constants/categories";

function Settings() {
  const userSettings = useStore(userSettingsStore);
  const budgetAlert = useStore(budgetAlertStore);

  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [categoryLimits, setCategoryLimits] = useState(
    userSettings.categoryLimits ||
      expenseCategories.reduce((acc, category) => {
        acc[category] = 0;
        return acc;
      }, {})
  );

  const handleSave = () => {
    const totalCategoryLimits = Object.values(categoryLimits).reduce(
      (total, limit) => total + limit,
      0
    );

    if (totalCategoryLimits > userSettings.totalBudgetLimit) {
      setError("Total category limits exceed the total budget limit.");
      updateBudgetExceeded(true);
      updateBudgetAlert("You have exceeded your budget limit.");
    } else {
      setError("");
      updateTotalBudgetLimit(userSettings.totalBudgetLimit);
      updateCategoryLimits(categoryLimits);
      setSuccessMessage("Settings saved successfully!");
      updateBudgetExceeded(false);
      resetBudgetAlert(); 
    }
  };

  const handleTotalBudgetLimitChange = (e) => {
    updateTotalBudgetLimit(parseFloat(e.target.value) || 0);
  };

  const handleCategoryLimitChange = (category) => (e) => {
    setCategoryLimits({
      ...categoryLimits,
      [category]: parseFloat(e.target.value) || 0,
    });
  };

  return (
    <Box sx={{ mt: 4, p: { xs: 2, md: 4 }, bgcolor: "background.default" }}>
      <Typography variant="h4" gutterBottom color="primary">
        Settings
      </Typography>

      <FormControlLabel
        control={
          <Switch
            color="primary"
            checked={userSettings.alertsEnabled}
            onChange={toggleAlertsEnabled}
          />
        }
        label="Enable Alerts"
      />

      <Paper sx={{ padding: 2, mt: 2, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h6" color="text.secondary">
          Total Budget Limit (€)
        </Typography>
        <TextField
          type="number"
          name="totalBudgetLimit"
          fullWidth
          margin="normal"
          inputProps={{ min: 0, step: "0.01" }}
          sx={{ mt: 1 }}
          value={userSettings.totalBudgetLimit}
          onChange={handleTotalBudgetLimitChange}
        />
      </Paper>

      <Paper sx={{ padding: 2, mt: 2, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h6" color="text.secondary">
          Category Budget Limits (€)
        </Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {expenseCategories.map((category) => (
            <Grid item xs={12} sm={6} md={4} key={category}>
              <TextField
                label={category}
                type="number"
                fullWidth
                margin="normal"
                inputProps={{ min: 0, step: "0.01" }}
                value={categoryLimits[category]}
                onChange={handleCategoryLimitChange(category)}
              />
            </Grid>
          ))}
        </Grid>
      </Paper>

      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ boxShadow: 2 }}
          onClick={handleSave}
        >
          Save Settings
        </Button>
      </Box>

      {userSettings.budgetExceeded && (
        <Alert severity="warning" sx={{ mt: 2 }}>
          You have exceeded your budget limit of {userSettings.totalBudgetLimit} €
        </Alert>
      )}

      {successMessage && (
        <Alert severity="success" sx={{ mt: 2 }}>
          {successMessage}
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {budgetAlert.isVisible && (
        <Alert severity="warning" sx={{ mt: 2 }}>
          {budgetAlert.message}
        </Alert>
      )}
    </Box>
  );
}

export default Settings;
