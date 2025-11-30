import { Container, Typography, Box, Grid, Button } from "@mui/material";
import ExpenseForm from "../Expenses/ExpenseForm";
import ExpenseList from "../Expenses/ExpenseList";
import CategoryForm from "../Categories/CategoryForm";
import CategoryList from "../Categories/CategoryList";
import BudgetForm from "../Budgets/BudgetForm";
import BudgetList from "../Budgets/BudgetList";
import ExpensePieChart from "../Charts/ExpensePieChart";
import BudgetAlert from "../Notifications/BudgetAlert";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../api/firebaseConfig";

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <BudgetAlert />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography variant="h5">Welcome, {user?.email}</Typography>
        <Button variant="outlined" onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            {" "}
            Add Expense{" "}
          </Typography>
          <ExpenseForm />
          <Typography variant="h6" gutterBottom mt={4}>
            {" "}
            Expenses{" "}
          </Typography>
          <ExpenseList />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            {" "}
            Categories{" "}
          </Typography>
          <CategoryForm />
          <CategoryList />
          <Typography variant="h6" gutterBottom mt={4}>
            {" "}
            Budgets{" "}
          </Typography>
          <BudgetForm />
          <BudgetList />
          <Typography variant="h6" gutterBottom mt={4}>
            {" "}
            Expense Chart{" "}
          </Typography>
          <ExpensePieChart />
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardPage;
