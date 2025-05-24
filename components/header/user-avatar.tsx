"use client"

import { Loader2, UserIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { Fragment, useState } from "react"
import { toast } from "sonner"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/header/theme-toggle"
import { menuOptions } from "@/components/header/menu-options"
import type { User } from "@/lib/auth/types"
import { signOut } from "@/lib/auth/sign-out"
import { genericError } from "@/lib/errors"
import { useSession } from "@/hooks/use-session"

export const UserAvatar = ({ user }: { user: User }) => {
  const [loading, setLoading] = useState(false)
  const session = useSession()

  const onSignOut = async () => {
    setLoading(true)
    const signedOut = await signOut()
    if (!signedOut) {
      toast.error(genericError)
      setLoading(false)
      return
    }
    window.location.reload()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          className="h-7 w-7 rounded-full border-0 bg-transparent p-0"
          aria-label="User menu"
        >
          {loading ? (
            <Loader2 className="size-4.5 animate-spin stroke-primary" aria-label="Loading" />
          ) : (
            <Avatar className="border" aria-label="user menu">
              <AvatarImage src={user.image ?? undefined} />
              <AvatarFallback className="bg-primary">
                <UserIcon className="size-4.5" />
              </AvatarFallback>
            </Avatar>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuLabel className="text-muted-foreground first-letter:uppercase">
          {session?.user.email ?? ""}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="hover:!bg-popover inline-flex w-full justify-between py-1 md:hidden"
          onSelect={(e: Event) => {
            e.preventDefault()
          }}
        >
          <p>Theme</p>
          <ThemeToggle />
        </DropdownMenuItem>
        <DropdownMenuSeparator className="md:hidden" />
        {menuOptions.map((menuOption) => (
          <Fragment key={menuOption.title}>
            {menuOption.separator && <DropdownMenuSeparator />}
            <DropdownMenuItem asChild>
              <Link
                rel="noopener noreferrer"
                href={menuOption.href}
                target="_blank"
                className="cursor-pointer"
              >
                {menuOption.title}
              </Link>
            </DropdownMenuItem>
          </Fragment>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <button type="button" className="w-full cursor-pointer" onClick={onSignOut}>
            Sign out
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
