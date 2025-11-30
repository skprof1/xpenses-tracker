import { useExpenses } from "../../context/ExpenseContext";
import { List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const CategoryList = () => {
  const { categories, deleteCategory } = useExpenses();

  return (
    <List sx={{ maxWidth: 400, mx: "auto" }}>
      {categories.map((cat) => (
        <ListItem
          key={cat.id}
          secondaryAction={
            <IconButton edge="end" onClick={() => deleteCategory(cat.id)}>
              <DeleteIcon />
            </IconButton>
          }
        >
          <ListItemText primary={cat.name} />
        </ListItem>
      ))}
    </List>
  );
};

export default CategoryList;
