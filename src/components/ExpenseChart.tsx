import type { IExpense } from "@/types/expense";
import { TrendingUp } from "lucide-react";
import HighCharts from "highcharts";
import { HighchartsReact } from "highcharts-react-official"


const ExpenseChart = ({ expenses }: { expenses: IExpense[] }) => {

  const totalAmountByCategory = expenses.reduce<Record<string, number>> (
    (acc, curr) => {
      const category = curr.category || "";
      acc[category] = (curr.amount || 0) + (acc[category] || 0);

      return acc;
    },
    {},
  )

  const pieChart = Object.entries(totalAmountByCategory).map(([category, amount]) => ({
    name: category,
    y: amount,
  }),
);

  const options: HighCharts.Options = {
    title: {
      text: "",
    },
    credits: {
      enabled: false,
    },
    tooltip: {
      pointFormat: "<b>{point.y}</b>",
    },
    series: [
      {type: "pie", data: pieChart}
    ],
  }
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 ">
      <div className="flex items-center gap-2 mb-5">
        <TrendingUp 
          className="h-4 w-4 text-storm-gray"
        />
        <h2 className="text-storm-gray text-sm font-semibold">
          SPENDING BREAKDOWN
        </h2>
      </div>
      {pieChart.length ? ( <HighchartsReact highcharts= {HighCharts} options = {options}/> ) :
        (
          <div className="flex h-50 text-storm-gray items-center justify-center text-sm">No data yet</div>
        )
      }
    </div>
  );
}

export default ExpenseChart;