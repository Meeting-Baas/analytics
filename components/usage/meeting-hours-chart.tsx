import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts"
import type { TooltipProps as RechartsTooltipProps } from "recharts"
import { ChartContainer } from "@/components/ui/chart"
import { formatFloat } from "@/lib/utils"
import type { ChartData } from "@/lib/types"
import dayjs from "dayjs"

const chartConfig = {
  duration: {
    label: "Hours",
    color: "var(--chart-4)"
  }
} as const

interface MeetingHoursChartProps {
  data: ChartData[]
}

function MeetingHoursTooltip(props: RechartsTooltipProps<number, string>) {
  const { active, payload, label } = props

  if (!active || !payload?.length || !label) return null

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      <p className="mb-2 font-medium text-sm">{label}</p>
      <div className="space-y-1">
        {payload.map((item, index) => {
          const key = item.dataKey as keyof typeof chartConfig
          const chartItem = chartConfig[key]
          const value = Number(item.value)
          const formattedValue = Number.isNaN(value) ? "0" : formatFloat(value)
          return (
            <div key={`item-${index}`} className="flex items-center gap-2 text-xs">
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: chartItem?.color || item.color }}
              />
              <span>{chartItem?.label || key}</span>
              <span className="ml-auto font-medium">{formattedValue} hours</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function MeetingHoursChart({ data }: MeetingHoursChartProps) {
  return (
    <div className="h-[400px]">
      <ChartContainer config={chartConfig} className="h-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
            <XAxis dataKey="date" tickFormatter={(date) => dayjs(date).format("D MMM")} />
            <YAxis />
            <Tooltip
              content={MeetingHoursTooltip}
              cursor={{ stroke: "var(--border)", strokeWidth: 1 }}
              wrapperStyle={{ outline: "none" }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="duration"
              stroke="var(--chart-4)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
