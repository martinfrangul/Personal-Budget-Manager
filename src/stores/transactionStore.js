import { atom } from 'nanostores';

const initialTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
export const transactionsStore = atom(initialTransactions);

export const loadingStore = atom(false);
export const errorStore = atom(null);

const updateLocalStorage = (transactions) => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
};

export const setTransactions = (transactions) => {
    loadingStore.set(true);
    errorStore.set(null);

    try {
        transactionsStore.set(transactions);
        updateLocalStorage(transactions);
    } catch (error) {
        errorStore.set("Failed to update transactions");
    } finally {
        loadingStore.set(false);
    }
};

export const addTransaction = (transaction) => {
    const currentTransactions = transactionsStore.get();
    const updatedTransactions = [...currentTransactions, transaction];
    setTransactions(updatedTransactions); 
};

export const deleteTransaction = (id) => {
    const currentTransactions = transactionsStore.get();
    const updatedTransactions = currentTransactions.filter(transaction => transaction.id !== id);
    setTransactions(updatedTransactions); 
};
