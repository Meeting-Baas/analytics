import { AdditionalFilters } from "@/components/filters/additional-filters"
import { DateRangeFilter } from "@/components/filters/date-range-filter"
import type { FilterState } from "@/lib/types"
import { Loader2 } from "lucide-react"
import type { DateRangeType } from "react-tailwindcss-datepicker"
import { LimitSelector } from "./limit-selector"

interface FiltersProps {
  filters: FilterState
  setFilters: (filters: FilterState) => void
  dateRange: DateRangeType | null
  setDateRange: (dateRange: DateRangeType | null) => void
  limit: number
  setLimit: (limit: number) => void
  isRefetching: boolean
}

export default function Filters({
  filters,
  setFilters,
  dateRange,
  setDateRange,
  limit,
  setLimit,
  isRefetching
}: FiltersProps) {
  return (
    <div className="my-4 flex flex-col justify-between gap-4 md:flex-row">
      <div className="flex w-full items-center gap-2 md:w-1/2">
        <DateRangeFilter value={dateRange} onChange={setDateRange} />
        {isRefetching && (
          <Loader2 className="size-4 animate-spin text-primary" aria-label="Refreshing logs" />
        )}
      </div>
      <div className="flex w-full items-center gap-2 md:w-1/3 lg:w-1/4 xl:w-1/5">
        <LimitSelector value={limit} onChange={setLimit} />
        <AdditionalFilters filters={filters} setFilters={setFilters} />
      </div>
    </div>
  )
}
