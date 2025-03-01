"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
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
    Sun,
    Moon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Link } from "react-router-dom"
import { useTheme } from "@/components/theme-provider"
import { Footer } from "@/components/Footer"



export default function LeaderboardPage() {
    const { theme, setTheme } = useTheme()
    const [searchQuery, setSearchQuery] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedUser, setSelectedUser] = useState(null)
    const [timeRange, setTimeRange] = useState("week")
    const [sortBy, setSortBy] = useState("hours")
    const [mockUsers, setMockUsers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        console.log("Base URL:", import.meta.env.VITE_BASE_URL);

        const fetchUsers = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/language_time/`);
                const text = await response.text();  
                console.log("Raw response:", text);

                const data = JSON.parse(text);  
                setMockUsers(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    const filteredUsers = mockUsers.filter(
        (user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.username.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    const sortedUsers = [...filteredUsers].sort((a, b) => {
        if (sortBy === "hours") {
            return b.totalHours - a.totalHours
        } else if (sortBy === "streak") {
            return b.streak - a.streak
        } else {
            return b.commits - a.commits
        }
    })

    const itemsPerPage = 10
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentUsers = sortedUsers.slice(startIndex, endIndex)
    const totalPages = Math.ceil(sortedUsers.length / itemsPerPage)

    const handleUserClick = (user) => {
        setSelectedUser(user)
    }

    const handleCloseUserDetail = () => {
        setSelectedUser(null)
    }

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    const getRankIcon = (rank) => {
        if (rank === 1) {
            return <Trophy className="h-4 w-4 text-yellow-500" />
        } else if (rank === 2) {
            return <Medal className="h-4 w-4 text-gray-400" />
        } else if (rank === 3) {
            return <Award className="h-4 w-4 text-gray-400" />
        } else {
            return <span className="text-gray-400">{rank}</span>
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black text-gray-900 dark:text-white">
            {/* Landing Page Style Header */}
            <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
                <Link
                    to="/"
                    className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500"
                >
                    Dev Litics
                </Link>
                <div className="flex items-center space-x-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        aria-label="Toggle theme"
                        className="rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
                    >
                        <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    </Button>
                </div>
            </nav>

            <main className="container mx-auto px-4 py-8">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500 flex items-center gap-2">
                            <Trophy className="h-8 w-8 text-yellow-500" />
                            Developer Leaderboard
                        </h2>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                                placeholder="Search by name, username, or language..."
                                className="pl-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="flex gap-2">
                            <Select value={timeRange} onValueChange={setTimeRange}>
                                <SelectTrigger className="w-[130px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
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
                                <SelectTrigger className="w-[130px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
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

                    <Tabs defaultValue="all" className="mb-6">
                        <TabsList className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                            <TabsTrigger value="all">All Developers</TabsTrigger>
                            <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                            <TabsTrigger value="python">Python</TabsTrigger>
                            <TabsTrigger value="java">Java</TabsTrigger>
                        </TabsList>
                    </Tabs>

                    <div className="space-y-4 mb-6">
                        {currentUsers.map((user) => (
                            <motion.div
                                key={user.id}
                                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 cursor-pointer hover:border-purple-500 dark:hover:border-purple-400 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl"
                                whileHover={{ scale: 1.02 }}
                                onClick={() => handleUserClick(user)}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center justify-center w-8 h-8">{getRankIcon(user.rank)}</div>

                                    <Avatar className="h-12 w-12 border-2 border-purple-100 dark:border-purple-900">
                                        <AvatarImage src={user.avatar} alt={user.name} />
                                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                    </Avatar>

                                    <div className="flex-1">
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                            <div>
                                                <h3 className="font-bold text-lg">{user.name}</h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">@{user.username}</p>
                                            </div>
                                            <div className="flex items-center gap-2 mt-2 sm:mt-0">
                                                <Badge
                                                    variant="outline"
                                                    className="flex items-center gap-1 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-700"
                                                >
                                                    <Clock className="h-3 w-3" />
                                                    {user.totalHours}h
                                                </Badge>
                                                <Badge
                                                    variant="outline"
                                                    className="flex items-center gap-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700"
                                                >
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
                                                        <span className="text-sm text-gray-600 dark:text-gray-300">
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
                            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                                No developers found matching your search criteria.
                            </div>
                        )}
                    </div>

                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                                className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>

                            <span className="text-sm text-gray-600 dark:text-gray-300">
                                Page {currentPage} of {totalPages}
                            </span>

                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                                disabled={currentPage === totalPages}
                                className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    )}
                </motion.div>
            </main>

            <Footer />

            {/* User Detail Dialog with updated styling */}
            <Dialog open={!!selectedUser} onOpenChange={handleCloseUserDetail}>
                {selectedUser && (
                    <DialogContent className="max-w-3xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        <DialogHeader>
                            <DialogTitle className="text-2xl flex items-center gap-3">
                                <Avatar className="h-10 w-10 border-2 border-purple-100 dark:border-purple-900">
                                    <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
                                    <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
                                    {selectedUser.name}
                                </span>
                                <Badge className="ml-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0">
                                    {getRankIcon(selectedUser.rank)} Rank #{selectedUser.rank}
                                </Badge>
                            </DialogTitle>
                            <DialogDescription className="text-gray-500 dark:text-gray-400">
                                @{selectedUser.username}
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                            <div className="md:col-span-2">
                                <h3 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500 mb-2">
                                    About
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-6">{selectedUser.bio}</p>

                                <h3 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500 mb-2">
                                    Coding Activity
                                </h3>
                                <div className="grid grid-cols-3 gap-4 mb-6">
                                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
                                        <Clock className="h-5 w-5 mx-auto mb-1 text-purple-500" />
                                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{selectedUser.totalHours}h</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">Total Hours</div>
                                    </div>
                                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
                                        <Award className="h-5 w-5 mx-auto mb-1 text-amber-500" />
                                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{selectedUser.streak}</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">Day Streak</div>
                                    </div>
                                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
                                        <Code className="h-5 w-5 mx-auto mb-1 text-blue-500" />
                                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{selectedUser.commits}</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">Commits</div>
                                    </div>
                                </div>

                                <h3 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500 mb-2">
                                    Languages
                                </h3>
                                <div className="space-y-3 mb-6">
                                    {selectedUser.languages.map((lang, index) => (
                                        <div key={index} className="space-y-1">
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-3 h-3 rounded-full ${lang.color}`}></div>
                                                    <span className="text-gray-900 dark:text-white">{lang.name}</span>
                                                </div>
                                                <span className="text-sm text-gray-500 dark:text-gray-400">{lang.hours} hours</span>
                                            </div>
                                            <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
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
                                <h3 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500 mb-2">
                                    Stats
                                </h3>
                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-500 dark:text-gray-400">Projects</span>
                                        <span className="font-medium text-gray-900 dark:text-white">{selectedUser.projects}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-500 dark:text-gray-400">Avg. Daily Hours</span>
                                        <span className="font-medium text-gray-900 dark:text-white">
                                            {(selectedUser.totalHours / 30).toFixed(1)}h
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-500 dark:text-gray-400">Commits/Week</span>
                                        <span className="font-medium text-gray-900 dark:text-white">
                                            {Math.round(selectedUser.commits / 12)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-500 dark:text-gray-400">Most Active</span>
                                        <span className="font-medium text-gray-900 dark:text-white">{selectedUser.languages[0].name}</span>
                                    </div>
                                </div>

                                <h3 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500 mb-2">
                                    Links
                                </h3>
                                <div className="space-y-2">
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                                        asChild
                                    >
                                        <a href={`https://github.com/${selectedUser.github}`} target="_blank" rel="noopener noreferrer">
                                            <Github className="mr-2 h-4 w-4" />
                                            GitHub Profile
                                            <ExternalLink className="ml-auto h-4 w-4" />
                                        </a>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                                        asChild
                                    >
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
                    </DialogContent>
                )}
            </Dialog>
        </div>
    )
}

