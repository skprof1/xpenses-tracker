import { useState } from "react";
import { useExpenses } from "../../context/ExpenseContext";
import { TextField, Button, Grid, Box } from "@mui/material";

const CategoryForm = () => {
  const { addCategory } = useExpenses();
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    await addCategory({ name, color: "#0bc77e" }); // Placeholder color; extend with picker if needed
    setName("");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 400, mx: "auto", p: 2 }}
    >
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <TextField
            label="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <Button variant="outlined" type="submit" fullWidth>
            Add Category
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CategoryForm;
