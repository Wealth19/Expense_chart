import { Wallet, Plus } from "lucide-react";
const Header = ({setShowAddExpenseModal}: {setShowAddExpenseModal: (open: boolean) => void}) => {
  return(
    <div  className="border-b border-athens-gray">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 px-4 sm:px-6 max-w-7xl m-auto gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-eastern-blue flex justify-center items-center rounded-xl py-4">
            <Wallet className="h-4 w-4 text-white"/>
          </div>
          <h1 className="text-base sm:text-lg font-bold tracking-tight">
            ExpenseFlow
          </h1>
        </div>
        <button className="bg-eastern-blue text-white flex items-center justify-center w-full sm:w-auto shadow-lg font-medium text-xs sm:text-sm px-4 sm:px-8 rounded-md gap-2 py-2 sm:py-3 cursor-pointer"
        onClick={() => setShowAddExpenseModal(true)}
        >
          <Plus className="w-4 h-4"/>
          Add Expense
        </button>
      </header>
    </div>
  );
}

export default Header;