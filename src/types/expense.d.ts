type ICategory = 
| "food"
| "transport"
| "education"
| "shopping"
| "entertainment"
| "bills"
| "health"
| "other";

type IExpense = {
  title: string;
  category: ICategory | null;
  amount: number | null;
  date: Date | null;
  id?: string
}

export { IExpense, ICategory }