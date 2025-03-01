"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, Code, FileCode, GitCommit, BarChart2, PieChart, Calendar } from "lucide-react"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("week")

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold">Coding Analytics</h1>
              <p className="text-muted-foreground">Track your development activity and progress</p>
            </div>

            <div className="flex items-center gap-4">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Projects</SelectItem>
                  <SelectItem value="project1">E-commerce App</SelectItem>
                  <SelectItem value="project2">Portfolio Website</SelectItem>
                  <SelectItem value="project3">Mobile Game</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs defaultValue="overview" className="mb-8">
            <TabsList className="grid grid-cols-4 md:w-[600px]">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="languages">Languages</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                  icon={<Clock className="h-8 w-8 text-purple-500" />}
                  title="Total Coding Time"
                  value="32h 45m"
                  change="+12% from last week"
                  positive={true}
                />
                <StatCard
                  icon={<Code className="h-8 w-8 text-blue-500" />}
                  title="Languages Used"
                  value="7"
                  change="+2 from last week"
                  positive={true}
                />
                <StatCard
                  icon={<FileCode className="h-8 w-8 text-green-500" />}
                  title="Projects Worked On"
                  value="4"
                  change="Same as last week"
                  positive={null}
                />
                <StatCard
                  icon={<GitCommit className="h-8 w-8 text-amber-500" />}
                  title="Commits Made"
                  value="47"
                  change="-5% from last week"
                  positive={false}
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart2 className="h-5 w-5 text-purple-500" />
                      Daily Coding Hours
                    </CardTitle>
                    <CardDescription>Your coding time distribution over the past week</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <div className="h-full w-full bg-muted rounded-md flex items-center justify-center">
                      <p className="text-muted-foreground">Chart visualization would go here</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="h-5 w-5 text-blue-500" />
                      Language Distribution
                    </CardTitle>
                    <CardDescription>Breakdown of programming languages used</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <div className="h-full w-full bg-muted rounded-md flex items-center justify-center">
                      <p className="text-muted-foreground">Chart visualization would go here</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="languages" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Programming Languages</CardTitle>
                  <CardDescription>Detailed breakdown of your language usage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <LanguageProgressBar language="JavaScript" percentage={45} hours="14h 32m" color="bg-yellow-500" />
                    <LanguageProgressBar language="TypeScript" percentage={30} hours="9h 45m" color="bg-blue-500" />
                    <LanguageProgressBar language="HTML/CSS" percentage={15} hours="4h 52m" color="bg-orange-500" />
                    <LanguageProgressBar language="Python" percentage={7} hours="2h 16m" color="bg-green-500" />
                    <LanguageProgressBar language="Java" percentage={3} hours="0h 58m" color="bg-red-500" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="projects" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ProjectCard
                  name="E-commerce App"
                  languages={["React", "Node.js", "MongoDB"]}
                  timeSpent="12h 45m"
                  lastActive="Today"
                />
                <ProjectCard
                  name="Portfolio Website"
                  languages={["HTML/CSS", "JavaScript"]}
                  timeSpent="8h 20m"
                  lastActive="Yesterday"
                />
                <ProjectCard
                  name="Mobile Game"
                  languages={["Unity", "C#"]}
                  timeSpent="6h 10m"
                  lastActive="3 days ago"
                />
                <ProjectCard
                  name="Data Analysis Tool"
                  languages={["Python", "Pandas"]}
                  timeSpent="5h 30m"
                  lastActive="1 week ago"
                />
              </div>
            </TabsContent>

            <TabsContent value="activity" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-purple-500" />
                    Activity Timeline
                  </CardTitle>
                  <CardDescription>Your recent coding activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <ActivityItem
                      date="Today, 2:30 PM"
                      project="E-commerce App"
                      description="Implemented shopping cart functionality"
                      duration="1h 45m"
                      languages={["React", "JavaScript"]}
                    />
                    <ActivityItem
                      date="Today, 10:15 AM"
                      project="E-commerce App"
                      description="Fixed responsive design issues"
                      duration="2h 20m"
                      languages={["CSS", "HTML"]}
                    />
                    <ActivityItem
                      date="Yesterday, 4:45 PM"
                      project="Portfolio Website"
                      description="Added dark mode toggle"
                      duration="0h 55m"
                      languages={["JavaScript", "CSS"]}
                    />
                    <ActivityItem
                      date="Yesterday, 1:30 PM"
                      project="Mobile Game"
                      description="Implemented player movement controls"
                      duration="3h 10m"
                      languages={["C#", "Unity"]}
                    />
                    <ActivityItem
                      date="3 days ago, 11:00 AM"
                      project="Data Analysis Tool"
                      description="Created data visualization components"
                      duration="2h 45m"
                      languages={["Python", "Pandas"]}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}

function StatCard({ icon, title, value, change, positive }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p
          className={`text-xs ${
            positive === true ? "text-green-500" : positive === false ? "text-red-500" : "text-muted-foreground"
          }`}
        >
          {change}
        </p>
      </CardContent>
    </Card>
  )
}

function LanguageProgressBar({ language, percentage, hours, color }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <span className="font-medium">{language}</span>
        <span className="text-muted-foreground">{hours}</span>
      </div>
      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  )
}

function ProjectCard({ name, languages, timeSpent, lastActive }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>Last active: {lastActive}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div className="flex flex-wrap gap-2">
            {languages.map((lang, index) => (
              <span key={index} className="px-2 py-1 bg-muted rounded-full text-xs font-medium">
                {lang}
              </span>
            ))}
          </div>
          <div className="text-sm font-medium">{timeSpent}</div>
        </div>
        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-purple-500 rounded-full" style={{ width: "65%" }} />
        </div>
      </CardContent>
    </Card>
  )
}

function ActivityItem({ date, project, description, duration, languages }) {
  return (
    <div className="border-l-2 border-muted pl-4 pb-2">
      <div className="text-sm text-muted-foreground">{date}</div>
      <div className="font-medium mt-1">{project}</div>
      <div className="text-sm mt-1">{description}</div>
      <div className="flex justify-between items-center mt-2">
        <div className="flex flex-wrap gap-2">
          {languages.map((lang, index) => (
            <span key={index} className="px-2 py-0.5 bg-muted rounded-full text-xs font-medium">
              {lang}
            </span>
          ))}
        </div>
        <div className="text-sm font-medium">{duration}</div>
      </div>
    </div>
  )
}

