"use client"

import { useState, useEffect } from "react"
import { Trophy, Search, ArrowUpDown, Clock, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LeaderboardModal from "../components/LeaderboardModal"

export default function LeaderboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [leaderboardData, setLeaderboardData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        setIsLoading(true)
        const baseUrl = "http://127.0.0.1:5000"
        console.log("Base URL:", baseUrl)

        const response = await fetch(`${baseUrl}/language_time/`)
        const data = await response.json()
        console.log("Raw response:", data)

        // Transform the data into the format expected by the component
        const transformedData = transformApiData(data)
        setLeaderboardData(transformedData)
      } catch (err) {
        console.error("Error fetching leaderboard data:", err)
        setError("Failed to load leaderboard data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchLeaderboardData()
  }, [])

  // Transform the API data into the format expected by the component
  const transformApiData = (apiData) => {
    // If the API returns an object with numeric keys like {"1": [...]}
    if (apiData && typeof apiData === "object" && !Array.isArray(apiData)) {
      const transformedData = []

      // Iterate through each key in the object
      Object.keys(apiData).forEach((key, index) => {
        const userData = apiData[key]

        if (Array.isArray(userData)) {
          // Create a user object from the array data
          const languages = userData.map((langObj) => {
            const langName = Object.keys(langObj)[0]
            const hours = Number.parseInt(langObj[langName]) / 3600 // Convert seconds to hours

            // Assign colors based on language
            let color = "bg-gray-500"
            if (langName === "Python") color = "bg-green-500"
            if (langName === "Js") color = "bg-yellow-500"
            if (langName === "plaintext") color = "bg-blue-300"

            return {
              name: langName,
              hours: Math.round(hours),
              color,
            }
          })

          // Calculate total hours
          const totalHours = languages.reduce((sum, lang) => sum + lang.hours, 0)

          transformedData.push({
            id: Number.parseInt(key),
            name: `User ${key}`,
            username: `user${key}`,
            avatar: "/placeholder.svg?height=40&width=40",
            rank: index + 1,
            totalHours,
            languages,
            streak: Math.floor(Math.random() * 30) + 1, // Random streak for demo
            projects: Math.floor(Math.random() * 10) + 1, // Random projects for demo
            commits: Math.floor(Math.random() * 300) + 50, // Random commits for demo
            bio: "Developer using CodeTrack to monitor coding activity.",
            github: `user${key}`,
            linkedin: `user${key}`,
          })
        }
      })

      return transformedData
    }

    // If the API already returns an array, return it as is
    return Array.isArray(apiData) ? apiData : []
  }

  const handleUserClick = (user) => {
    setSelectedUser(user)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedUser(null)
  }

  const getRankIcon = (rank) => {
    if (rank === 1) return <Trophy className="h-5 w-5 text-yellow-500" />
    if (rank === 2) return <Trophy className="h-5 w-5 text-gray-400" />
    if (rank === 3) return <Trophy className="h-5 w-5 text-amber-600" />
    return <span className="text-sm font-medium text-muted-foreground">{rank}</span>
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Trophy className="h-8 w-8 text-yellow-500" />
            Developer Leaderboard
          </h1>
          <p className="text-muted-foreground mt-1">See who's coding the most and leading the pack</p>
        </div>

        <Button onClick={() => setIsModalOpen(true)} className="shrink-0">
          View Full Leaderboard
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-20">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-4 text-muted-foreground">Loading leaderboard data...</p>
        </div>
      ) : error ? (
        <div className="text-center py-20">
          <p className="text-red-500">{error}</p>
          <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      ) : (
        <div className="bg-card border rounded-lg p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Search developers..." className="pl-10" />
            </div>

            <div className="flex gap-2">
              <Select defaultValue="week">
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="flex items-center gap-1">
                <ArrowUpDown className="h-4 w-4" />
                Sort
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all" className="mb-6">
            <TabsList>
              <TabsTrigger value="all">All Languages</TabsTrigger>
              <TabsTrigger value="javascript">JavaScript</TabsTrigger>
              <TabsTrigger value="python">Python</TabsTrigger>
              <TabsTrigger value="other">Other</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="space-y-3">
            {leaderboardData.length > 0 ? (
              leaderboardData.slice(0, 5).map((user) => (
                <div
                  key={user.id}
                  className="bg-card border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors"
                  onClick={() => handleUserClick(user)}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 h-8">{getRankIcon(user.rank)}</div>

                    <Avatar className="h-12 w-12 border-2 border-muted">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h3 className="font-medium">{user.name}</h3>
                          <p className="text-sm text-muted-foreground">@{user.username}</p>
                        </div>
                        <div className="flex items-center gap-2 mt-2 sm:mt-0">
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {user.totalHours}h
                          </Badge>
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Award className="h-3 w-3" />
                            {user.streak} days
                          </Badge>
                        </div>
                      </div>

                      <div className="mt-3">
                        <div className="flex flex-wrap gap-2">
                          {user.languages.map((lang, index) => (
                            <div key={index} className="flex items-center gap-1.5">
                              <div className={`w-2 h-2 rounded-full ${lang.color}`}></div>
                              <span className="text-xs">
                                {lang.name} ({lang.hours}h)
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">No leaderboard data available</div>
            )}
          </div>

          {leaderboardData.length > 5 && (
            <div className="mt-4 text-center">
              <Button variant="outline" onClick={() => setIsModalOpen(true)}>
                View All Developers
              </Button>
            </div>
          )}
        </div>
      )}

      <LeaderboardModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        leaderboardData={leaderboardData}
        initialSelectedUser={selectedUser}
      />
    </div>
  )
}

