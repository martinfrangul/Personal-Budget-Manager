import { atom } from 'nanostores';

export const userSettingsStore = atom({
  totalBudgetLimit: 1000,
  categoryLimits: {},
  alertsEnabled: true,
  budgetExceeded: false,
});


if (process.env.NODE_ENV === 'development') {
    window.userSettingsStore = userSettingsStore;
}

export const updateTotalBudgetLimit = (newLimit) => {
  userSettingsStore.set({ ...userSettingsStore.get(), totalBudgetLimit: newLimit });
};

export const updateCategoryLimits = (newLimits) => {
  userSettingsStore.set({ ...userSettingsStore.get(), categoryLimits: newLimits });
};

export const toggleAlertsEnabled = () => {
  const currentState = userSettingsStore.get();
  userSettingsStore.set({ ...currentState, alertsEnabled: !currentState.alertsEnabled });
};

export const updateBudgetExceeded = (exceeded) => {
  userSettingsStore.set({ ...userSettingsStore.get(), budgetExceeded: exceeded });
};
