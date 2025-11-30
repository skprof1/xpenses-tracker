import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import { useExpenses } from "../../context/ExpenseContext";

Chart.register(ArcElement);

const ExpensePieChart = () => {
  const { expenses, categories } = useExpenses();

  const categoryMap = categories.reduce((acc, cat) => {
    acc[cat.id] = cat;
    return acc;
  }, {});

  const sums = {};
  expenses.forEach(({ amount, categoryId }) => {
    sums[categoryId] = (sums[categoryId] || 0) + amount;
  });

  const data = {
    labels: Object.keys(sums).map((id) => categoryMap[id]?.name || ""),
    datasets: [
      {
        data: Object.values(sums),
        backgroundColor: Object.keys(sums).map(
          (id) => categoryMap[id]?.color || "#ccc"
        ),
      },
    ],
  };

  return <Doughnut data={data} />;
};

export default ExpensePieChart;
