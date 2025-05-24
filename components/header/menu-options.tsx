import {
  AI_CHAT_URL,
  BILLING_URL,
  CREDENTIALS_URL,
  LOGS_URL,
  SETTINGS_URL
} from "@/lib/external-urls"

export type MenuOption = {
  title: string
  href: string
  separator?: boolean
}

export const menuOptions: MenuOption[] = [
  {
    title: "Settings",
    href: SETTINGS_URL
  },
  {
    title: "Chat with BaaS",
    href: AI_CHAT_URL
  },
  {
    title: "Credentials",
    href: CREDENTIALS_URL,
    separator: true
  },
  {
    title: "Logs",
    href: LOGS_URL
  },
  {
    title: "Billing",
    href: BILLING_URL
  }
]
