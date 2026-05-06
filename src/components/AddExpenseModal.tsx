import { Button } from "@/shared/ui/Button";
import { Calendar, } from "@/shared/ui/Calendar";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/shared/ui/Dialog";
import { Input } from "@/shared/ui/Input";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/Popover";
import type { IExpense } from "@/types/expense";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/Select";
import { CATEGORIES } from "@/constants";

interface AddExpenseModalProps {
  showAddExpenseModal: boolean
  setShowAddExpenseModal: (open: boolean) => void;
  handleAddExpense: (formData: IExpense) => void;
  editedExpense: IExpense | null;
  setEditedExpense: (expense: IExpense | null) => void;
  currencySymbol: string;
}
  const AddExpenseModal = ({
  showAddExpenseModal, 
  setShowAddExpenseModal,
  handleAddExpense,
  editedExpense,
  setEditedExpense,
  currencySymbol,
}: AddExpenseModalProps) => {
  const { register, 
          control,
          watch,
          handleSubmit,
          formState: {errors},
        } = useForm<IExpense>({ defaultValues: editedExpense ? editedExpense : {
          category: null,
          title: " ",
          amount: null,
          date: null,
        }});

  const watchedDate = watch("date");
  const dialogTitle = editedExpense ? "Update Expense" : "New Expense";
  const dialogBtnTitle = editedExpense ? "Update Expense" : "Add Expense"

  const onOpenChange = () => {
    setShowAddExpenseModal(false);
    setEditedExpense(null);
  };


  const onSUbmit: SubmitHandler<IExpense> = (data: IExpense) => {
    handleAddExpense(data);
  };

 

  return(
    <Dialog open={showAddExpenseModal} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
            <DialogTitle>
              {dialogTitle}
            </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSUbmit)} >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium leading-none">Title</label>
              <Input placeholder="Coffee, groceries, etc." 
              {...register("title", {required: "Title is required" })}
              />
              
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex flex-col gap-2 w-full">
                <label className="text-sm font-medium leading-none">
                  Amount ({currencySymbol})
                </label>
                <Input placeholder="0.00" type="number"
                  {...register("amount", {
                    required: "Amount is required",
                    valueAsNumber: true,
                  })}
                />
                <div className="text-red-500 text-sm font-medium">
                {errors.amount?.message}
              </div>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label className="text-sm font-medium leading-none">Date</label>
                <Controller 
                  control={control} 
                  name="date" 
                  rules={{ required: "Date is required" }} 
                  render={({ field }) => 
                  <Popover>
                    <PopoverTrigger asChild className="cursor-pointer">
                      <Button 
                        data-empty={!watchedDate}
                        variant="outline"
                        className="data-[empty=true]:text-muted-foreground justify-start text-left font-normal">
                        <CalendarIcon />

                        {watchedDate ? format(watchedDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" >
                      <Calendar 
                      mode="single" 
                      selected={field.value ?? undefined} 
                      onSelect={(date) => field.onChange(date)}/>
                    </PopoverContent>
                  </Popover>}
                />
                <div className="text-red-500 text-sm font-medium">
                  {errors.date?.message}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label className="text-sm font-medium leading-none">
                Category
              </label>
              <Controller 
              control={control} 
              name="category" 
              rules={{ required: "Category is required" }}
              render={({ field }) => (
                <Select value={field.value ?? undefined} onValueChange={field.onChange}>
                  <SelectTrigger className="cursor-pointer w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectGroup>
                      {CATEGORIES.map((category) => (
                        <SelectItem 
                        key={category.value} 
                        value={category.value} 
                        className="cursor-pointer"
                        >
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
              />
              <div className="text-red-500 text-sm font-medium">
                {errors.category?.message}
              </div>
            </div>
          </div>
          <DialogFooter>
            <button type="submit" className="bg-eastern-blue text-white shadow-lg font-medium text-sm px-0 
              rounded-md gap-2 py-3 cursor-pointer w-full mt-6">
                {dialogBtnTitle}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddExpenseModal;