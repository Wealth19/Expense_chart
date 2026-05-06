import { CATEGORY_ICON } from "@/constants";
import type { IExpense } from "@/types/expense";
import { SquarePen, Trash } from "lucide-react";

const ExpenseList = ({
                  expenses, 
                  currency,
                  setEditedExpense, 
                  setShowAddExpenseModal,
                  handleDeleteExpense,
                  }: 
                    { expenses: IExpense[] ;
                    currency: "USD" | "NGN" | "EUR";
                    setEditedExpense: (expense: IExpense) => void;
                    setShowAddExpenseModal: (open: boolean) => void;
                    handleDeleteExpense: (id: string) => void;

                    }) => {

  const currencyLocales: Record<"USD" | "NGN" | "EUR", string> = {
    USD: "en-US",
    NGN: "en-NG",
    EUR: "de-DE",
  };

  const formatter = new Intl.NumberFormat(currencyLocales[currency], {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  });

  const handleEditExpenseClick = (expense: IExpense) => {
    setEditedExpense(expense);
    setShowAddExpenseModal(true);
  };

  const handleDeleteExpenseClick = (id: string) => {
    handleDeleteExpense(id)
  }

  return(
    <div className="flex flex-col gap-3">
      {expenses.map((expense) => (
        <div 
        key={expense.id}
        className="flex flex-col sm:flex-row w-full justify-between items-start sm:items-center rounded-xl border hover:shadow-md p-4 group gap-4 sm:gap-0">
          <div className="flex gap-2 items-center min-w-0">
            <p className="h-10 w-10 rounded-xl bg-athens-gray text-lg flex justify-center items-center">
              {expense.category ? CATEGORY_ICON[expense.category] : null}
            </p>
            <div>
              <h3 className="font-medium truncate">{expense.title}</h3>
              <p className="text-sm text-storm-gray capitalize">{expense.category} . {expense.date?.toLocaleDateString()}</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8 w-full sm:w-auto justify-between">
            <p className="font-semibold text-lg tabular-nums">{expense.amount != null ? formatter.format(expense.amount) : "-"}</p>
            <div className="flex gap-2 opacity-100">
              <button className="cursor-pointer" aria-label="Edit expense" onClick={() => handleEditExpenseClick(expense)}>
                <SquarePen className="h-4 w-4 text-storm-gray"/>
              </button>
              <button className="cursor-pointer" aria-label="Delete expense" onClick={() => handleDeleteExpenseClick(expense.id || "")}>
                <Trash className="text-red-500 h-4 w-4"/>

              </button>
            </div>
          </div>
        </div>
      ))}

    </div>
  );
}

export default ExpenseList;