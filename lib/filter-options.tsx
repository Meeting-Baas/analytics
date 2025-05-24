export type Option = {
  label: string
  value: string
  searchParam: string
}

export const allPlatforms: Option[] = [
  { label: "Zoom", value: "zoom.us", searchParam: "zoom" },
  { label: "Google Meet", value: "meet.google.com", searchParam: "meet" },
  { label: "Teams", value: "teams.microsoft.com,teams.live.com", searchParam: "teams" }
]

export const allStatuses: Option[] = [
  { label: "Success", value: "success", searchParam: "success" },
  { label: "Error", value: "error", searchParam: "error" },
  { label: "Pending", value: "pending", searchParam: "pending" },
  { label: "Warning", value: "warning", searchParam: "warning" }
]

export const allUserReportedErrorStatuses: Option[] = [
  { label: "Open", value: JSON.stringify({ status: "open" }), searchParam: "open" },
  { label: "Closed", value: JSON.stringify({ status: "closed" }), searchParam: "closed" },
  {
    label: "In Progress",
    value: JSON.stringify({ status: "in_progress" }),
    searchParam: "in_progress"
  }
]

export const allErrorCategories: Option[] = [
  { label: "System Errors", value: "system_error", searchParam: "system_error" },
  { label: "Authentication", value: "auth_error", searchParam: "auth_error" },
  { label: "Capacity Issues", value: "capacity_error", searchParam: "capacity_error" },
  { label: "Connection Issues", value: "connection_error", searchParam: "connection_error" },
  { label: "Permission Issues", value: "permission_error", searchParam: "permission_error" },
  { label: "Input Validation", value: "input_error", searchParam: "input_error" },
  { label: "Duplicates", value: "duplicate_error", searchParam: "duplicate_error" },
  { label: "Webhook Issues", value: "webhook_error", searchParam: "webhook_error" },
  { label: "API Issues", value: "api_error", searchParam: "api_error" },
  { label: "Unclassified", value: "unknown_error", searchParam: "unknown_error" },
  { label: "Stalled Bots", value: "stalled_error", searchParam: "stalled_error" }
]

export const allErrorPriorities: Option[] = [
  { label: "Critical", value: "critical", searchParam: "critical" },
  { label: "High", value: "high", searchParam: "high" },
  { label: "Medium", value: "medium", searchParam: "medium" },
  { label: "Low", value: "low", searchParam: "low" }
]
