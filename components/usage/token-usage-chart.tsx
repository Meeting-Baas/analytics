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
  recording: {
    label: "Recording",
    color: "var(--chart-1)"
  },
  transcription: {
    label: "Transcription",
    color: "var(--chart-2)"
  },
  streaming: {
    label: "Streaming",
    color: "var(--chart-3)"
  }
} as const

interface TokenUsageChartProps {
  data: ChartData[]
}

function TokenUsageTooltip(props: RechartsTooltipProps<number, string>) {
  const { active, payload, label } = props

  if (!active || !payload?.length || !label) return null

  const total = payload.reduce((sum, item) => {
    const value = Number(item.value)
    return sum + (Number.isNaN(value) ? 0 : value)
  }, 0)

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      <p className="mb-2 font-medium text-sm">{label}</p>
      <div className="space-y-1">
        {payload.map((item, index) => {
          const key = item.dataKey as keyof typeof chartConfig
          const chartItem = chartConfig[key]
          return (
            <div key={`item-${index}`} className="flex items-center gap-2 text-xs">
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: chartItem?.color || item.color }}
              />
              <span>{chartItem?.label || key}</span>
              <span className="ml-auto font-medium">{formatFloat(Number(item.value))}</span>
            </div>
          )
        })}
        <div className="mt-2 border-t pt-1">
          <div className="flex items-center justify-between font-medium text-xs">
            <span>Total</span>
            <span>{formatFloat(total)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function TokenUsageChart({ data }: TokenUsageChartProps) {
  return (
    <div className="h-[400px]">
      <ChartContainer config={chartConfig} className="h-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="date" tickFormatter={(date) => dayjs(date).format("D MMM")} />
            <YAxis />
            <Tooltip
              content={TokenUsageTooltip}
              cursor={{ stroke: "var(--border)", strokeWidth: 1 }}
              wrapperStyle={{ outline: "none" }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="recording"
              stroke="var(--chart-1)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="transcription"
              stroke="var(--chart-2)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="streaming"
              stroke="var(--chart-3)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
