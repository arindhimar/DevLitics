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
    // TODO: Implement logout functionality
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/")
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const user = JSON.parse(localStorage.getItem("user") || "{}")

  return (
    <header className="bg-background border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary">
              Dev Litics
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/dashboard"
              className={`text-sm font-medium ${location.pathname === "/dashboard" ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
            >
              Dashboard
            </Link>
            <Link
              to="/analytics"
              className={`text-sm font-medium ${location.pathname === "/analytics" ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
            >
              Analytics
            </Link>
            <Link
              to="/verify-resume"
              className={`text-sm font-medium ${location.pathname === "/verify-resume" ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
            >
              Resume Verification
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
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
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => navigate("/dashboard")}
                  className={location.pathname === "/dashboard" ? "bg-accent" : ""}
                >
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => navigate("/analytics")}
                  className={location.pathname === "/analytics" ? "bg-accent" : ""}
                >
                  <BarChart className="mr-2 h-4 w-4" />
                  Analytics
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => navigate("/verify-resume")}
                  className={location.pathname === "/verify-resume" ? "bg-accent" : ""}
                >
                  <FileCheck className="mr-2 h-4 w-4" />
                  Resume Verification
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => navigate("/profile")}
                  className={location.pathname === "/profile" ? "bg-accent" : ""}
                >
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}

