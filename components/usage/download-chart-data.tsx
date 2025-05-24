import { CSVLink } from "react-csv"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import dayjs from "dayjs"
import type { ChartData } from "@/lib/types"

interface DownloadChartDataProps {
  data: ChartData[]
  startDate: Date
  endDate: Date
}

export function DownloadChartData({ data, startDate, endDate }: DownloadChartDataProps) {
  const csvData = data.map((day) => ({
    Date: dayjs(day.date).format("YYYY-MM-DD"),
    "Total Tokens": day.recording + day.transcription + day.streaming,
    "Recording Tokens": day.recording,
    "Transcription Tokens": day.transcription,
    "Streaming Tokens": day.streaming,
    "Duration (hours)": day.duration,
    "Transcription Hours": day.transcription_hour,
    "Streaming Input Hours": day.streaming_input_hour,
    "Streaming Output Hours": day.streaming_output_hour
  }))

  const filename = `consumption_${dayjs(startDate).format("YYYY-MM-DD")}_to_${dayjs(endDate).format("YYYY-MM-DD")}`

  return (
    <CSVLink data={csvData} filename={filename}>
      <Button variant="outline" size="icon" aria-label="Download CSV">
        <Download />
      </Button>
    </CSVLink>
  )
}
