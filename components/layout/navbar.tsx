"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { NotificationCenter } from "@/components/home/notification-center"

export function Navbar() {
  const { user, logout } = useAuth()

  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold text-primary">
              FarmLease Kenya
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link href="/listings" className="text-foreground hover:text-primary">
                Browse Listings
              </Link>
              <Link href="/about" className="text-foreground hover:text-primary">
                About
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <NotificationCenter />

            {user ? (
              <>
                {(user.role === "owner" || user.role === "admin") && (
                  <Button asChild variant="outline">
                    <Link href="/post-listing">➕ Post Listing</Link>
                  </Button>
                )}

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2">
                      <span>👤</span>
                      <span className="hidden sm:inline">{user.name}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {user.role === "admin" && (
                      <DropdownMenuItem asChild>
                        <Link href="/admin">⚙️ Admin Dashboard</Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={logout}>↪️ Sign Out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex space-x-2">
                <Button asChild variant="ghost">
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Get Started</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
