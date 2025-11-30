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
import EditIcon from "@mui/icons-material/Edit";
import { formatDate } from "../../utils/formatDate";

const ExpenseList = () => {
  const { expenses, deleteExpense } = useExpenses();

  if (expenses.length === 0) {
    return <Typography>No expenses added yet.</Typography>;
  }

  return (
    <List>
      {expenses.map(({ id, amount, categoryId, date, description }) => (
        <React.Fragment key={id}>
          <ListItem
            secondaryAction={
              <>
                <IconButton edge="end" aria-label="edit">
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => deleteExpense(id)}
                >
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <ListItemText
              primary={`${amount.toFixed(2)} USD - ${
                description || "No description"
              }`}
              secondary={`${formatDate(date)} - Category ID: ${categoryId}`}
            />
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );
};

export default ExpenseList;
