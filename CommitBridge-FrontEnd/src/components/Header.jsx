"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Moon, Sun, ChevronDown, BarChart, FileCheck } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

export function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const { theme, setTheme } = useTheme()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/")
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const user = JSON.parse(localStorage.getItem("user") || "{}")

  return (
    <header className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black border-b sticky top-0 z-50 text-gray-900 dark:text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500"
        >
          Dev Litics
        </Link>

        <div className="flex items-center space-x-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
          >
            <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar_url} alt={user.username} />
                  <AvatarFallback>{user.username?.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="hidden md:inline">{user.username}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white dark:bg-gray-800 border dark:border-gray-700">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => navigate("/dashboard")}
                className={location.pathname === "/dashboard" ? "bg-purple-500 text-white" : ""}
              >
                Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled
                onClick={() => navigate("/analytics")}
                className={location.pathname === "/analytics" ? "bg-purple-500 text-white" : ""}
              >
                <BarChart className="mr-2 h-4 w-4" />
                Analytics (Coming Soon)
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled
                onClick={() => navigate("/verify-resume")}
                className={location.pathname === "/verify-resume" ? "bg-purple-500 text-white" : ""}
              >
                <FileCheck className="mr-2 h-4 w-4" />
                Resume Verification (Coming Soon)
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigate("/profile")}
                className={location.pathname === "/profile" ? "bg-purple-500 text-white" : ""}
              >
                Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
