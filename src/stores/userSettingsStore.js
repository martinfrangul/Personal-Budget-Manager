import { atom } from 'nanostores';

// Cargar la configuración desde el almacenamiento local
const savedSettings = JSON.parse(localStorage.getItem('userSettings')) || {
  totalBudgetLimit: 1000,
  categoryLimits: {},
  alertsEnabled: true,
  budgetExceeded: false,
};

export const userSettingsStore = atom(savedSettings);

if (process.env.NODE_ENV === 'development') {
  window.userSettingsStore = userSettingsStore;
}

const saveSettingsToLocalStorage = (settings) => {
  localStorage.setItem('userSettings', JSON.stringify(settings));
};

export const updateTotalBudgetLimit = (newLimit) => {
  const updatedSettings = { ...userSettingsStore.get(), totalBudgetLimit: newLimit };
  userSettingsStore.set(updatedSettings);
  saveSettingsToLocalStorage(updatedSettings); 
};

export const updateCategoryLimits = (newLimits) => {
  const updatedSettings = { ...userSettingsStore.get(), categoryLimits: newLimits };
  userSettingsStore.set(updatedSettings);
  saveSettingsToLocalStorage(updatedSettings); 
};

export const toggleAlertsEnabled = () => {
  const currentState = userSettingsStore.get();
  const updatedSettings = { ...currentState, alertsEnabled: !currentState.alertsEnabled };
  userSettingsStore.set(updatedSettings);
  saveSettingsToLocalStorage(updatedSettings); 
};

export const updateBudgetExceeded = (exceeded) => {
  const updatedSettings = { ...userSettingsStore.get(), budgetExceeded: exceeded };
  userSettingsStore.set(updatedSettings);
  saveSettingsToLocalStorage(updatedSettings); 
};
