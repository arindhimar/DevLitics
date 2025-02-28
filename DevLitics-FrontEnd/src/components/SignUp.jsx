import { SignUp as ClerkSignUp } from "@clerk/clerk-react"

export default function SignUp() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <ClerkSignUp />
    </div>
  )
}

