import { SignIn as ClerkSignIn } from "@clerk/clerk-react"

export default function SignIn() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <ClerkSignIn />
    </div>
  )
}

