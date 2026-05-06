import { useState, useEffect } from 'react';
import Header from './components/Header';
import AddExpenseModal from './components/AddExpenseModal';
import type { IExpense } from './types/expense';
import ExpenseList from './components/ExpenseList';
import CategoryFilter from './components/CategoryFilter';
import StatsCards from './components/StatsCards';
import ExpenseChart from './components/ExpenseChart';
import TopCategories from './components/TopCategories';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, Timestamp } from "firebase/firestore";
import { db } from "./firebase";

function App() {

  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [expenses, setExpenses] = useState<IExpense[]>([]);
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
    const unsubscribe = onSnapshot(collection(db, "expenses"), (snapshot) => {
      const expensesData = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          date: data.date?.toDate() || new Date(),
        } as IExpense;
      });
      setExpenses(expensesData);
    });
    return unsubscribe;
  }, []);

  const filteredExpenses = categoryFilter === "all" ? expenses : 
  expenses.filter((expense) => expense.category === categoryFilter)

  const handleAddExpense = async (formData: IExpense) => {
    const dataToSave = {
      ...formData,
      date: formData.date ? Timestamp.fromDate(formData.date) : Timestamp.now(),
    };
    if(editedExpense) {
      await updateDoc(doc(db, "expenses", editedExpense.id!), dataToSave);
    } else {
      await addDoc(collection(db, "expenses"), dataToSave);
    }
    setShowAddExpenseModal(false);
    setEditedExpense(null);
  };

  const handleDeleteExpense = async (id: string) => {
    await deleteDoc(doc(db, "expenses", id));
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
