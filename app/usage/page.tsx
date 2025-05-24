import Usage from "@/components/usage"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Usage | Meeting BaaS",
  description:
    "Track your meeting bot usage and token consumption across Zoom, Google Meet, and Microsoft Teams",
  keywords: [
    "meeting bot usage",
    "bot usage",
    "usage tracking",
    "Meeting BaaS",
    "Zoom",
    "Google Meet",
    "Microsoft Teams"
  ]
}

export default async function UsagePage({
  searchParams
}: {
  searchParams: Promise<{ payment?: string }>
}) {
  const { payment } = await searchParams
  return (
    <div className="m-4 md:mx-16 md:my-8">
      <Usage paymentStatus={payment} />
    </div>
  )
}
