import type { ChartData, DailyTokenConsumption } from "@/lib/types"
import dayjs from "dayjs"

/**
 * Calculate the total number of recording tokens consumed
 * @param tokenConsumption - The daily token consumption data
 * @returns The total number of recording tokens consumed
 */
export const getTotalRecordingTokens = (tokenConsumption: DailyTokenConsumption[]) =>
  tokenConsumption.reduce((sum, day) => sum + day.consumption_by_service.recording_tokens, 0)

/**
 * Calculate the total number of transcription tokens consumed
 * @param tokenConsumption - The daily token consumption data
 * @returns The total number of transcription tokens consumed
 */
export const getTotalTranscriptionTokens = (tokenConsumption: DailyTokenConsumption[]) =>
  tokenConsumption.reduce((sum, day) => sum + day.consumption_by_service.transcription_tokens, 0)

/**
 * Calculate the total number of streaming tokens consumed
 * @param tokenConsumption - The daily token consumption data
 * @returns The total number of streaming tokens consumed
 */
export const getTotalStreamingTokens = (tokenConsumption: DailyTokenConsumption[]) =>
  tokenConsumption.reduce(
    (sum, day) =>
      sum +
      (day.consumption_by_service.streaming_input_tokens +
        day.consumption_by_service.streaming_output_tokens),
    0
  )

/**
 * Calculate the total number of tokens consumed
 * @param tokenConsumption - The daily token consumption data
 * @returns The total number of tokens consumed
 */
export const getTotalTokensConsumed = (tokenConsumption: DailyTokenConsumption[]) =>
  getTotalRecordingTokens(tokenConsumption) +
  getTotalTranscriptionTokens(tokenConsumption) +
  getTotalStreamingTokens(tokenConsumption)

/**
 * Format consumption data for charts
 * @param tokenConsumption - The daily token consumption data
 * @returns The formatted consumption data
 */
export function getChartData(
  tokenConsumption: DailyTokenConsumption[],
  startDate: Date,
  endDate: Date
): ChartData[] {
  // Generate array of all dates in range
  const allDates: Date[] = []
  const currentDate = new Date(startDate)

  while (currentDate <= endDate) {
    allDates.push(new Date(currentDate))
    currentDate.setDate(currentDate.getDate() + 1)
  }

  // Map each date to chart data, filling in gaps with zeros
  return allDates.map((date) => {
    const existingData = tokenConsumption.find(
      (d) => dayjs(d.date).format("YYYY-MM-DD") === dayjs(date).format("YYYY-MM-DD")
    )

    if (!existingData) {
      return {
        date: dayjs(date).format("MMM D"),
        recording: 0,
        transcription: 0,
        streaming: 0,
        duration: 0,
        transcription_hour: 0,
        streaming_input_hour: 0,
        streaming_output_hour: 0
      }
    }

    const { consumption_by_service } = existingData

    return {
      date: dayjs(date).format("MMM D"),
      recording: consumption_by_service.recording_tokens,
      transcription:
        consumption_by_service.transcription_tokens +
        consumption_by_service.transcription_byok_tokens,
      streaming:
        consumption_by_service.streaming_input_tokens +
        consumption_by_service.streaming_output_tokens,
      duration: Math.round((consumption_by_service.duration / 3600) * 100) / 100, // Convert to hours with 2 decimals
      transcription_hour:
        Math.round((consumption_by_service.transcription_hour / 3600) * 100) / 100,
      streaming_input_hour:
        Math.round((consumption_by_service.streaming_input_hour / 3600) * 100) / 100,
      streaming_output_hour:
        Math.round((consumption_by_service.streaming_output_hour / 3600) * 100) / 100
    }
  })
}
