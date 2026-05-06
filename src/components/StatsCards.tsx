import type { IExpense } from "@/types/expense";
import { ArrowRight, DollarSign, Receipt, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const StatsCards = ({ expenses, currency }: { expenses: IExpense[]; currency: "USD" | "NGN" | "EUR" }) => {
  const currencyLocales: Record<"USD" | "NGN" | "EUR", string> = {
    USD: "en-US",
    NGN: "en-NG",
    EUR: "de-DE",
  };

  const currencyLocale = currencyLocales[currency];

  const formatMoney = (value: number) =>
    new Intl.NumberFormat(currencyLocale, {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
    }).format(value);

  const totalSpent = expenses.reduce(
    (acc, curr) => acc + (curr.amount || 0),
    0,
  );

  const getThisMonthTotal = () => {
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();

    return expenses.filter((expense) => {
      const date = new Date(expense.date || "");
      return date.getMonth() === month && date.getFullYear() === year;
    }).reduce((acc, curr) => acc + (curr.amount || 0), 0);
  };

  const avgTransaction = expenses.length > 0 ? totalSpent / expenses.length : 0;

  const stats = [
    {
      label: "TOTAL SPENT",
      icon: DollarSign,
      value: totalSpent,
      sub: "All time",
      accent: true,
      currencyValue: true,
    },
    {
      label: "THIS MONTH",
      icon: TrendingUp,
      value: getThisMonthTotal(),
      sub: "Current period",
      accent: false,
      currencyValue: true,
    },
    {
      label: "TRANSACTION",
      icon: Receipt,
      value: expenses.length,
      sub: "Transaction",
      accent: false,
      currencyValue: false,
    },
    {
      label: "AVG / TRANSACTION",
      icon: ArrowRight,
      value: avgTransaction,
      sub: "Per entry",
      accent: false,
      currencyValue: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map(({ label, icon: Icon, value, sub, accent, currencyValue }, index) => {
        const displayValue = currencyValue
          ? formatMoney(value as number)
          : (value as number).toLocaleString("en-US");

        return (
          <div
            key={index}
            className={cn("bg-white rounded-2xl p-4 sm:p-5", accent &&
              "bg-eastern-blue border border-eastern-blue shadow-lg")}
          >
            <div className="flex items-center justify-between mb-3">
              <span
                className={cn("uppercase text-xs font-medium tracking-wider text-white/70",
                  !accent && "text-storm-gray",
                )}
              >
                {label}
              </span>
              <div
                className={cn("h-8 w-8 rounded-lg items-center flex bg-white/15 justify-center",
                  !accent && "bg-athens-gray",
                )}
              >
                <Icon className={cn("h-4 w-4 text-white/80",
                  !accent && "text-storm-gray",
                )}
                />
              </div>
            </div>
            <h1
              className={cn("text-2xl font-bold font-mono text-white tabular-nums",
                !accent && "text-mirage"
              )}
            >
              {displayValue}
            </h1>
            <span className={cn("mt-1 text-xs text-white/50",
              !accent && "text-storm-gray"
            )}>{sub}</span>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;
