import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Header from './components/Header';
import AddExpenseModal from './components/AddExpenseModal';
import type { IExpense } from './types/expense';
import ExpenseList from './components/ExpenseList';
import CategoryFilter from './components/CategoryFilter';
import StatsCards from './components/StatsCards';
import ExpenseChart from './components/ExpenseChart';
import TopCategories from './components/TopCategories';

const LOCAL_STORAGE_KEY = 'expense-flow-expenses';

function App() {

  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [expenses, setExpenses] = useState<IExpense[]>(() => {
    const savedExpenses = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!savedExpenses) {
      return [];
    }
    try {
      const parsedExpenses = JSON.parse(savedExpenses) as Array<{
        id?: string;
        title: string;
        category: IExpense['category'];
        amount: number | null;
        date: string | null;
      }>;

      return parsedExpenses.map((expense) => ({
        ...expense,
        date: expense.date ? new Date(expense.date) : null,
      }));
    } catch (error) {
      console.error('Failed to parse saved expenses', error);
      return [];
    }
  });
  const [editedExpense, setEditedExpense] = useState<IExpense | null >(null);
  const [categoryFilter, setCatogoryFilter] = useState("all");
  const [currency, setCurrency] = useState<"USD" | "NGN" | "EUR">("USD");

  const currencyOptions = [
    { code: "USD", label: "USD", locale: "en-US" },
    { code: "NGN", label: "NGN", locale: "en-NG" },
    { code: "EUR", label: "EUR", locale: "de-DE" },
  ] as const;

  const currencySymbol = currency === "USD" ? "$" : currency === "NGN" ? "₦" : "€";

  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify(
        expenses.map((expense) => ({
          ...expense,
          date: expense.date ? expense.date.toISOString() : null,
        }))
      )
    );
  }, [expenses]);

  const filteredExpenses = categoryFilter === "all" ? expenses : 
  expenses.filter((expense) => expense.category === categoryFilter)

  const handleAddExpense = (formData: IExpense) => {
    if (editedExpense) {
      setExpenses((prevExpenses) => 
        prevExpenses.map((expense) =>
          expense.id === editedExpense.id ? { ...expense, ...formData } : expense
        )
      );
    } else {
      const newExpense: IExpense = {
        ...formData,
        id: nanoid(),
      };
      setExpenses((prevExpenses) => [newExpense, ...prevExpenses]);
    }
    setShowAddExpenseModal(false);
    setEditedExpense(null);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
  };


  return (
    <div className='min-h-screen'>
      <Header setShowAddExpenseModal={setShowAddExpenseModal}/>
      <main className='max-w-7xl m-auto px-4 sm:px-6 py-8'>
        <div className='flex flex-wrap items-center justify-between gap-3 mb-6'>
          <div className='text-sm font-medium text-storm-gray'>Currency</div>
          <div className='flex flex-wrap gap-2'>
            {currencyOptions.map((option) => (
              <button
                key={option.code}
                type='button'
                onClick={() => setCurrency(option.code)}
                className={`rounded-full border px-3 py-1 text-sm transition ${
                  currency === option.code
                    ? 'bg-eastern-blue text-white border-eastern-blue'
                    : 'bg-athens-gray text-mirage border-transparent'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <StatsCards 
          expenses={expenses}
          currency={currency}
        />


        <div className='grid grid-cols-1 lg:grid-cols-3 mt-8 m-auto gap-8'>
          <div className='flex flex-col gap-6'>

            {/* ExpenseChart */}
            <ExpenseChart 
              expenses={expenses}
            />

            {/* TopCategory */}
            <TopCategories 
              expenses={expenses}
            />

          </div>
          <div className='p-4 sm:p-6 lg:col-span-2 bg-white rounded-2xl border-mischka/50'>
            {expenses.length ? 
            <>
              <h1 className='text-sm font-semibold uppercase tracking-wider text-storm-gray mb-3'>
                Recent Transactions
              </h1>

              {/* CategoryFilter */}
              
              <CategoryFilter 
                setCategoryFilter={setCatogoryFilter}
                categoryFilter={categoryFilter}
              />

              <ExpenseList 
                expenses={filteredExpenses}
                currency={currency}
                setEditedExpense={setEditedExpense}
                setShowAddExpenseModal={setShowAddExpenseModal}
                handleDeleteExpense={handleDeleteExpense}
              />
            </>
            : 
            <div className='text-center text-storm-gray '>
              <p className='text-lg'>No expenses yet</p>
              <p className='text-sm'>Add your first expense to get started</p>
            </div>}
          </div>
        </div>
      </main>
      {showAddExpenseModal ? (
        <AddExpenseModal 
          showAddExpenseModal={showAddExpenseModal} 
          setShowAddExpenseModal={setShowAddExpenseModal}
          handleAddExpense={handleAddExpense}
          editedExpense={editedExpense}
          setEditedExpense={setEditedExpense}
          currencySymbol={currencySymbol}
        />
      ) : null}
    </div>
  )
}

export default App;
