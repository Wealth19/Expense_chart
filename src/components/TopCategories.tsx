import type { ICategory, IExpense } from "@/types/expense";

const TopCategories = ({ expenses }: { expenses: IExpense[] }) => {

  const getCategoryTotals = () => {
    const map: Partial<Record<ICategory, number>> = {};
    expenses.forEach((expense) => {
      if(expense.category) {
        map[expense.category] = 
        (map[expense.category] || 0) + (expense.amount || 0);
      }
    });
    return Object.entries(map).map(([Category, total]) => (
      {
      Category,
      total,
    })).sort((a, b) => b.total - a.total);
  };

  const categoryTotals = getCategoryTotals();
  const totalSpent = expenses.reduce(
    (acc, curr) => acc + (curr.amount || 0), 
    0,
  );

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-storm-gray mb-4">Top Categories</h2>
      <div className="flex gap-2 flex-col">
        {categoryTotals.slice(0, 5).map((ct: { Category: string; total: number }) => {
          const percentage = totalSpent > 0 ? (ct.total/totalSpent) * 100 : 0;
          return (
            <div className="flex gap-2 flex-col">
              <div className="flex justify-between text-sm">
                <span className="text-mirage capitalize">
                  {ct.Category}
                </span>
                <span className="font-mono text-storm-gray">
                  {percentage.toFixed(0)}%
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full">
                <div 
                  className="h-full rounded-full bg-eastern-blue "  
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
    
  )
}

export default TopCategories;
