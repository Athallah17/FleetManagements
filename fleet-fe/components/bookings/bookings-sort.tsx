import { Column } from "@tanstack/react-table"
import { FiChevronUp, FiChevronDown } from "react-icons/fi"

type Props<TData> = {
  column: Column<TData, unknown>
  title: string
}

export function SortableHeader<TData>({ column, title }: Props<TData>) {
  return (
    <button
      onClick={() => column.toggleSorting()}
      className="flex items-center gap-1 font-medium"
    >
      {title}
      {column.getIsSorted() === "asc" && (
        <FiChevronUp className="h-4 w-4" />
      )}
      {column.getIsSorted() === "desc" && (
        <FiChevronDown className="h-4 w-4" />
      )}
    </button>
  )
}
