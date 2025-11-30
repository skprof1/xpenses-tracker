import { createTheme } from "@mui/material/styles";

const incomeColors = [
  "#123123",
  "#154731",
  "#165f40",
  "#16784f",
  "#14915f",
  "#10ac6e",
  "#0bc77e",
  "#04e38d",
  "#00ff9d",
];

const expenseColors = [
  "#b50d12",
  "#bf2f1f",
  "#c9452c",
  "#d3583a",
  "#dc6a48",
  "#e57c58",
  "#ee8d68",
  "#f79d79",
  "#ffae8a",
  "#cc474b",
  "#f55b5f",
];

const theme = createTheme({
  palette: {
    primary: { main: incomeColors[6] },
    secondary: { main: expenseColors[2] },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: 800,
          paddingLeft: 20,
          paddingRight: 20,
        },
      },
    },
  },
});

export default theme;
