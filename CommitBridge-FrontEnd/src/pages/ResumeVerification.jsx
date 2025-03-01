"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FileCheck, Upload, Check, X, AlertTriangle, Clock } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function ResumeVerification() {
  const [resumeFile, setResumeFile] = useState(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationComplete, setVerificationComplete] = useState(false)
  const [verificationProgress, setVerificationProgress] = useState(0)

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setResumeFile(e.target.files[0])
    }
  }

  const startVerification = () => {
    setIsVerifying(true)

    // Simulate verification progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 5
      setVerificationProgress(progress)

      if (progress >= 100) {
        clearInterval(interval)
        setVerificationComplete(true)
        setIsVerifying(false)
      }
    }, 300)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Resume Verification</h1>
            <p className="text-muted-foreground">Verify your skills and experience with your actual coding data</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileCheck className="h-5 w-5 text-purple-500" />
                    Resume Verification
                  </CardTitle>
                  <CardDescription>
                    Upload your resume to verify your skills and experience against your actual coding data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {!resumeFile && !isVerifying && !verificationComplete && (
                    <div className="border-2 border-dashed border-muted rounded-lg p-10 text-center">
                      <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">Upload Your Resume</h3>
                      <p className="text-muted-foreground mb-4">
                        Drag and drop your resume file here, or click to browse
                      </p>
                      <Input
                        id="resume-upload"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                      <Button asChild>
                        <label htmlFor="resume-upload">Browse Files</label>
                      </Button>
                    </div>
                  )}

                  {resumeFile && !isVerifying && !verificationComplete && (
                    <div>
                      <div className="flex items-center justify-between p-4 border rounded-lg mb-6">
                        <div className="flex items-center gap-3">
                          <FileCheck className="h-8 w-8 text-purple-500" />
                          <div>
                            <p className="font-medium">{resumeFile.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => setResumeFile(null)}>
                          <X className="h-5 w-5" />
                        </Button>
                      </div>

                      <div className="space-y-4 mb-6">
                        <div>
                          <Label htmlFor="job-title">Job Title You're Applying For</Label>
                          <Input id="job-title" placeholder="e.g. Frontend Developer" />
                        </div>
                        <div>
                          <Label htmlFor="key-skills">Key Skills to Verify (comma separated)</Label>
                          <Input id="key-skills" placeholder="e.g. React, JavaScript, TypeScript" />
                        </div>
                        <div>
                          <Label htmlFor="additional-notes">Additional Notes</Label>
                          <Textarea
                            id="additional-notes"
                            placeholder="Any specific experience or projects you want to highlight"
                            rows={3}
                          />
                        </div>
                      </div>

                      <Button onClick={startVerification} className="w-full">
                        Start Verification
                      </Button>
                    </div>
                  )}

                  {isVerifying && (
                    <div className="text-center py-8">
                      <Clock className="h-12 w-12 text-purple-500 mx-auto mb-4 animate-pulse" />
                      <h3 className="text-lg font-medium mb-2">Verifying Your Resume</h3>
                      <p className="text-muted-foreground mb-6">
                        We're analyzing your resume against your coding activity data
                      </p>
                      <Progress value={verificationProgress} className="mb-2" />
                      <p className="text-sm text-muted-foreground">{verificationProgress}% complete</p>
                    </div>
                  )}

                  {verificationComplete && (
                    <div className="space-y-6">
                      <div className="rounded-lg border p-4">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                            <Check className="h-6 w-6 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <h3 className="font-medium">JavaScript Experience</h3>
                            <p className="text-sm text-muted-foreground">Verified 2+ years of experience</p>
                          </div>
                        </div>
                        <Progress value={95} className="h-2 mb-1" />
                        <div className="flex justify-between text-xs">
                          <span>Claimed: 3 years</span>
                          <span className="text-green-600 dark:text-green-400">Verified: 2.8 years</span>
                        </div>
                      </div>

                      <div className="rounded-lg border p-4">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                            <Check className="h-6 w-6 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <h3 className="font-medium">React.js Experience</h3>
                            <p className="text-sm text-muted-foreground">Verified 1+ years of experience</p>
                          </div>
                        </div>
                        <Progress value={85} className="h-2 mb-1" />
                        <div className="flex justify-between text-xs">
                          <span>Claimed: 2 years</span>
                          <span className="text-green-600 dark:text-green-400">Verified: 1.7 years</span>
                        </div>
                      </div>

                      <div className="rounded-lg border p-4">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="bg-yellow-100 dark:bg-yellow-900 p-2 rounded-full">
                            <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                          </div>
                          <div>
                            <h3 className="font-medium">TypeScript Experience</h3>
                            <p className="text-sm text-muted-foreground">Partially verified experience</p>
                          </div>
                        </div>
                        <Progress value={45} className="h-2 mb-1" />
                        <div className="flex justify-between text-xs">
                          <span>Claimed: 2 years</span>
                          <span className="text-yellow-600 dark:text-yellow-400">Verified: 0.9 years</span>
                        </div>
                      </div>

                      <div className="rounded-lg border p-4">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="bg-red-100 dark:bg-red-900 p-2 rounded-full">
                            <X className="h-6 w-6 text-red-600 dark:text-red-400" />
                          </div>
                          <div>
                            <h3 className="font-medium">Python Experience</h3>
                            <p className="text-sm text-muted-foreground">Insufficient data to verify</p>
                          </div>
                        </div>
                        <Progress value={10} className="h-2 mb-1" />
                        <div className="flex justify-between text-xs">
                          <span>Claimed: 1 year</span>
                          <span className="text-red-600 dark:text-red-400">Verified: 0.2 years</span>
                        </div>
                      </div>

                      <Button className="w-full">Generate Verification Certificate</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Verification Benefits</CardTitle>
                  <CardDescription>Why verify your resume with Dev Litics?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-3">
                    <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full h-fit">
                      <Check className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-medium">Stand Out to Employers</h3>
                      <p className="text-sm text-muted-foreground">
                        Verified skills give you an edge over other candidates
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full h-fit">
                      <Check className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-medium">Build Trust</h3>
                      <p className="text-sm text-muted-foreground">
                        Employers trust verified credentials over self-reported skills
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full h-fit">
                      <Check className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-medium">Faster Hiring Process</h3>
                      <p className="text-sm text-muted-foreground">Skip technical assessments with verified skills</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full h-fit">
                      <Check className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-medium">Identify Skill Gaps</h3>
                      <p className="text-sm text-muted-foreground">Discover areas where you need more practice</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-muted-foreground">
                    Verification certificates can be shared directly with employers or added to your LinkedIn profile.
                  </p>
                </CardFooter>
              </Card>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}

