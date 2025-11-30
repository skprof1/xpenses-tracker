import { useState, useEffect } from "react";
import { useExpenses } from "../../context/ExpenseContext";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
} from "@mui/material";

const ExpenseForm = () => {
  const { categories, addExpense } = useExpenses();

  const [formData, setFormData] = useState({
    amount: "",
    categoryId: "",
    date: new Date().toISOString().slice(0, 10), // yyyy-mm-dd
    description: "",
  });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (categories.length > 0 && !formData.categoryId) {
      setFormData((prev) => ({ ...prev, categoryId: categories[0].id }));
    }
  }, [categories]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (parseFloat(formData.amount) <= 0) return;
    await addExpense({
      amount: parseFloat(formData.amount),
      categoryId: formData.categoryId,
      date: formData.date,
      description: formData.description,
    });
    setFormData({
      amount: "",
      categoryId: categories.length ? categories[0].id : "",
      date: new Date().toISOString().substr(0, 10),
      description: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} sx={{ maxWidth: 600, mx: "auto", p: 2 }}>
        <Grid item xs={6}>
          <TextField
            label="Amount"
            type="number"
            name="amount"
            required
            value={formData.amount}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth required>
            <InputLabel>Category</InputLabel>
            <Select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              label="Category"
            >
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Date"
            type="date"
            name="date"
            required
            value={formData.date}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" type="submit" fullWidth>
            Add Expense
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ExpenseForm;
