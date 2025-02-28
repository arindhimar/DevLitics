import { useUser } from "@clerk/clerk-react"
import { Link } from "react-router-dom"
import { Button } from "./ui/button"

export default function Dashboard() {
  const { user } = useUser()

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <h2 className="text-2xl font-semibold mb-4">Welcome, {user?.firstName || "User"}!</h2>
            <p className="mb-4">This is your dashboard. You can add your analytics and features here.</p>
            <Link to="/">
              <Button>Back to Home</Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

