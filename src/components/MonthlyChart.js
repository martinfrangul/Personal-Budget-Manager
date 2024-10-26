import React from "react";
import { useStore } from "@nanostores/react";
import { transactionsStore } from "../stores/transactionStore";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function MonthlyChart() {
  const dataMap = {};
  const transactions = useStore(transactionsStore);

  transactions.forEach((transaction) => {
    const date = new Date(transaction.date);
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    const monthYear = `${month} ${year}`;

    if (!dataMap[monthYear]) {
      dataMap[monthYear] = { month: monthYear, income: 0, expense: 0 };
    }

    if (transaction.type === "income") {
      dataMap[monthYear].income += transaction.amount;
    } else if (transaction.type === "expense") {
      dataMap[monthYear].expense += transaction.amount;
    }
  });

  const data = Object.values(dataMap).sort((a, b) => {
    const [monthA, yearA] = a.month.split(" ");
    const [monthB, yearB] = b.month.split(" ");
    return (
      new Date(yearA, new Date(`${monthA} 1`).getMonth()) -
      new Date(yearB, new Date(`${monthB} 1`).getMonth())
    );
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="income" stroke="#82ca9d" name="Income" />
        <Line
          type="monotone"
          dataKey="expense"
          stroke="#8884d8"
          name="Expense"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default MonthlyChart;
