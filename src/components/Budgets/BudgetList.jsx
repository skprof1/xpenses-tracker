import React from "react";
import { useExpenses } from "../../context/ExpenseContext";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const BudgetList = () => {
  const { budgets, deleteBudget } = useExpenses();

  if (budgets.length === 0) {
    return <Typography>No budgets set yet.</Typography>;
  }

  return (
    <List>
      {budgets.map(({ id, categoryId, month, amount }) => (
        <React.Fragment key={id}>
          <ListItem
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => deleteBudget(id)}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText
              primary={`${amount.toFixed(2)} USD for month ${month}`}
              secondary={`Category ID: ${categoryId}`}
            />
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );
};

export default BudgetList;
