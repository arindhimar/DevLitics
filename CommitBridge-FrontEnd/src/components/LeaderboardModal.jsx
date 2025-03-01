"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  X,
  Search,
  ChevronLeft,
  ChevronRight,
  Clock,
  Code,
  Trophy,
  Medal,
  Award,
  Github,
  ExternalLink,
  Linkedin,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Fallback mock data in case no data is passed
const mockUsers = [
  {
    id: 1,
    name: "Sarah Johnson",
    username: "sarahj",
    avatar: "/placeholder.svg?height=40&width=40",
    rank: 1,
    totalHours: 156,
    languages: [
      { name: "JavaScript", hours: 78, color: "bg-yellow-500" },
      { name: "TypeScript", hours: 45, color: "bg-blue-500" },
      { name: "Python", hours: 33, color: "bg-green-500" },
    ],
    streak: 24,
    projects: 8,
    commits: 342,
    bio: "Full-stack developer specializing in React and Node.js. Currently building AI-powered web applications.",
    github: "sarahj",
    linkedin: "sarahjohnson",
  },
  // ... other mock users
]

export default function LeaderboardModal({ isOpen, onClose, leaderboardData = [], initialSelectedUser = null }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedUser, setSelectedUser] = useState(null)
  const [timeRange, setTimeRange] = useState("week")
  const [sortBy, setSortBy] = useState("hours")
  const [showList, setShowList] = useState(true)

  // Use provided leaderboard data or fallback to mock data if empty
  const users = leaderboardData.length > 0 ? leaderboardData : mockUsers

  // Set the initial selected user when the modal opens
  useEffect(() => {
    if (initialSelectedUser) {
      setSelectedUser(initialSelectedUser)
      console.log(initialSelectedUser)
      setShowList(false)
    } else {
      setShowList(true)
    }
  }, [initialSelectedUser])

  const itemsPerPage = 5
  const totalPages = Math.ceil(users.length / itemsPerPage)

  // Filter users based on search query
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.languages.some((lang) => lang.name.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  // Sort users based on selected criteria
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortBy === "hours") return b.totalHours - a.totalHours
    if (sortBy === "streak") return b.streak - a.streak
    if (sortBy === "commits") return b.commits - a.commits
    return 0
  })

  // Get current page items
  const currentUsers = sortedUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleUserClick = (user) => {
    setSelectedUser(user)
    setShowList(false)
  }

  const handleCloseUserDetail = () => {
    setSelectedUser(null)
    setShowList(true)
  }

  const handleBackToList = () => {
    setSelectedUser(null)
    setShowList(true)
  }

  const getRankIcon = (rank) => {
    if (rank === 1) return <Trophy className="h-5 w-5 text-yellow-500" />
    if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />
    if (rank === 3) return <Medal className="h-5 w-5 text-amber-600" />
    return <span className="text-sm font-medium text-muted-foreground">{rank}</span>
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
          >
            {showList ? (
              // List View
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold flex items-center gap-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
                    <Trophy className="h-6 w-6 text-yellow-500" />
                    Developer Leaderboard
                  </h2>
                  <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search by name, username, or language..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Select value={timeRange} onValueChange={setTimeRange}>
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

                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hours">Coding Hours</SelectItem>
                        <SelectItem value="streak">Streak Days</SelectItem>
                        <SelectItem value="commits">Commits</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Tabs defaultValue="all" className="mb-4">
                  <TabsList>
                    <TabsTrigger value="all">All Developers</TabsTrigger>
                    <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                    <TabsTrigger value="python">Python</TabsTrigger>
                    <TabsTrigger value="java">Java</TabsTrigger>
                  </TabsList>
                </Tabs>

                <div className="flex-1 overflow-y-auto mb-4">
                  <div className="space-y-3">
                    {currentUsers.map((user) => (
                      <motion.div
                        key={user.id}
                        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 cursor-pointer hover:border-primary transition-colors"
                        whileHover={{ scale: 1.01 }}
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
                      </motion.div>
                    ))}

                    {currentUsers.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        No developers found matching your search criteria.
                      </div>
                    )}
                  </div>
                </div>

                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>

                    <span className="text-sm">
                      Page {currentPage} of {totalPages}
                    </span>

                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </>
            ) : (
              // User Detail View
              selectedUser && (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <Button variant="ghost" className="flex items-center gap-1" onClick={handleBackToList}>
                      <ChevronLeft className="h-4 w-4" />
                      Back to Leaderboard
                    </Button>
                    <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto">
                    <div className="mb-6">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
                          <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h2 className="text-2xl font-bold flex items-center gap-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
                            {selectedUser.name}
                            <Badge className="ml-2">
                              {getRankIcon(selectedUser.rank)} Rank #{selectedUser.rank}
                            </Badge>
                          </h2>
                          <p className="text-muted-foreground">@{selectedUser.username}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="md:col-span-2">
                        <h3 className="text-lg font-medium mb-2">About</h3>
                        <p className="text-muted-foreground mb-6">{selectedUser.bio}</p>

                        <h3 className="text-lg font-medium mb-2">Coding Activity</h3>
                        <div className="grid grid-cols-3 gap-4 mb-6">
                          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
                            <Clock className="h-5 w-5 mx-auto mb-1 text-purple-500" />
                            <div className="text-2xl font-bold">{selectedUser.totalHours}h</div>
                            <div className="text-xs text-muted-foreground">Total Hours</div>
                          </div>
                          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
                            <Award className="h-5 w-5 mx-auto mb-1 text-amber-500" />
                            <div className="text-2xl font-bold">{selectedUser.streak}</div>
                            <div className="text-xs text-muted-foreground">Day Streak</div>
                          </div>
                          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
                            <Code className="h-5 w-5 mx-auto mb-1 text-blue-500" />
                            <div className="text-2xl font-bold">{selectedUser.commits}</div>
                            <div className="text-xs text-muted-foreground">Commits</div>
                          </div>
                        </div>

                        <h3 className="text-lg font-medium mb-2">Languages</h3>
                        <div className="space-y-3 mb-6">
                          {selectedUser.languages.map((lang, index) => (
                            <div key={index} className="space-y-1">
                              <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                  <div className={`w-3 h-3 rounded-full ${lang.color}`}></div>
                                  <span>{lang.name}</span>
                                </div>
                                <span className="text-sm text-muted-foreground">{lang.hours} hours</span>
                              </div>
                              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                <div
                                  className={`h-full ${lang.color} rounded-full`}
                                  style={{ width: `${(lang.hours / selectedUser.totalHours) * 100}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-2">Stats</h3>
                        <div className="space-y-4 mb-6">
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Projects</span>
                            <span className="font-medium">{selectedUser.projects}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Avg. Daily Hours</span>
                            <span className="font-medium">{(selectedUser.totalHours / 30).toFixed(1)}h</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Commits/Week</span>
                            <span className="font-medium">{Math.round(selectedUser.commits / 12)}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Most Active</span>
                            <span className="font-medium">{selectedUser.languages[0].name}</span>
                          </div>
                        </div>

                        <h3 className="text-lg font-medium mb-2">Links</h3>
                        <div className="space-y-2">
                          <Button variant="outline" className="w-full justify-start" asChild>
                            <a
                              href={`https://github.com/${selectedUser.github}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Github className="mr-2 h-4 w-4" />
                              GitHub Profile
                              <ExternalLink className="ml-auto h-4 w-4" />
                            </a>
                          </Button>
                          <Button variant="outline" className="w-full justify-start" asChild>
                            <a
                              href={`https://linkedin.com/in/${selectedUser.linkedin}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Linkedin className="mr-2 h-4 w-4" />
                              LinkedIn Profile
                              <ExternalLink className="ml-auto h-4 w-4" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}