import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn, formatDate, formatFloat, formatPlanType, getProgressBarColors } from "@/lib/utils"
import { motion } from "motion/react"
import type { SubscriptionPlanType } from "@/lib/types"
import { Badge } from "../ui/badge"
import { BILLING_URL } from "@/lib/external-urls"
import Link from "next/link"

interface AvailableTokensCardProps {
  availableTokens: number
  totalTokensPurchased: number | undefined
  lastPurchaseDate?: string
  planType: SubscriptionPlanType
}

const defaultTotalTokens = Number(process.env.NEXT_PUBLIC_DEFAULT_TOTAL_TOKENS || 8)
const animationEase = [0.65, 0, 0.35, 1]

export function AvailableTokensCard({
  availableTokens,
  totalTokensPurchased,
  lastPurchaseDate,
  planType
}: AvailableTokensCardProps) {
  const calculatedTotal = (totalTokensPurchased || 0) + defaultTotalTokens

  // Calculate the percentage of tokens used
  const tokensUsed = Math.max(0, calculatedTotal - availableTokens)
  const percentage = (tokensUsed / Math.max(calculatedTotal, 1)) * 100

  const colors = getProgressBarColors(availableTokens)

  return (
    <Card className="bg-muted dark:bg-[linear-gradient(238deg,#161616,hsla(0,0%,9%,0))] dark:bg-baas-black">
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-2">
          Available Tokens
          <Badge variant="default" className="hover:bg-primary/15" asChild>
            <Link href={BILLING_URL} target="_blank" rel="noopener noreferrer">
              Upgrade Plan
            </Link>
          </Badge>
        </CardTitle>
        <CardDescription>
          {formatPlanType(planType)}
          {lastPurchaseDate && (
            <p className="text-xs">Last purchase: {formatDate(lastPurchaseDate)}</p>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-2 flex items-end gap-2">
          <motion.div
            initial={{ opacity: 0.7 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1,
              ease: animationEase
            }}
            className={cn("font-bold text-3xl", colors.text)}
          >
            {formatFloat(availableTokens)}
          </motion.div>
          <div className="pb-0.5 text-muted-foreground">tokens remaining</div>
        </div>
        <div className={`h-2 w-full overflow-hidden rounded-full ${colors.bg}`}>
          <motion.div
            className={`h-full rounded-full ${colors.main}`}
            initial={{ scaleX: 0, opacity: 0, transformOrigin: "left" }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{
              duration: 1,
              ease: animationEase
            }}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="mt-2 text-muted-foreground text-sm">
          {formatFloat(tokensUsed)} of {formatFloat(calculatedTotal)} tokens used
        </p>
        {availableTokens < 8 && (
          <motion.p
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              ease: animationEase
            }}
            className={cn("mt-2 text-sm", colors.text)}
          >
            Running low on tokens?{" "}
            <Link
              href={BILLING_URL}
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get more
            </Link>
          </motion.p>
        )}
      </CardContent>
    </Card>
  )
}
