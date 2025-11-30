import { useEffect, useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import { useExpenses } from "../../context/ExpenseContext";

const BudgetAlert = () => {
  const { expenses, budgets, categories } = useExpenses();
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const alertList = [];
    const month = new Date().toISOString().slice(0, 7);

    const categorySums = {};
    expenses.forEach(({ amount, categoryId, date }) => {
      if (date.startsWith(month))
        categorySums[categoryId] = (categorySums[categoryId] || 0) + amount;
    });

    budgets.forEach(({ categoryId, amount, month: budgetMonth }) => {
      if (budgetMonth === month && categorySums[categoryId] > amount) {
        const cat = categories.find((c) => c.id === categoryId);
        alertList.push(`Budget exceeded for category ${cat ? cat.name : ""}`);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setAlerts(alertList);
  }, [expenses, budgets, categories]);

  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {alerts.map((msg, idx) => (
        <Snackbar
          key={idx}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={handleClose}
            severity="warning"
            sx={{ width: "100%" }}
          >
            {msg}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
};

export default BudgetAlert;
