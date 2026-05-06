import { CATEGORIES, CATEGORY_ICON } from "@/constants";
import type { ICategory } from "@/types/expense";
import clsx from "clsx";


const CategoryFilter = ({ categoryFilter, setCategoryFilter }: {
  categoryFilter: string,
  setCategoryFilter: (category: string) => void;
}) => {

  const options = [{ label: "All", value: "all"}, ...CATEGORIES]

  return (
  <div className="flex flex-wrap gap-2 mb-5">
    {options.map(({ value, label  }) => (
      <button 
        key={value} 
        onClick={() => setCategoryFilter(value)}
        className={clsx(`text-storm-gray font-medium text-sm px-3.5 rounded-full py-1.5
       bg-athens-gray flex items-center cursor-pointer`,
        value === categoryFilter && "bg-eastern-blue text-white")
          }
        
      > 
        <span>{CATEGORY_ICON[value as ICategory]}</span>
        {label}
      </button>
    ))}
  </div>
  );
}

export default CategoryFilter;