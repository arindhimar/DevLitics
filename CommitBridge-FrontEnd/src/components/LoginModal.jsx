import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Github, Mail } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

export default function LoginModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate();

  const sendUserDataToBackend = async (userData, method) => {
    let endpoint;
    if(isRegistering){
      endpoint = `${import.meta.env.VITE_BASE_URL}/user/register`;
    }
    else{
      endpoint = `${import.meta.env.VITE_BASE_URL}/user/login`;
    }
    // console.log(import.meta.env.VITE_BASE_URL);
    try {
      const response = await axios.post(endpoint, userData);
      console.log('User action successful:', response.data);
      
      localStorage.setItem('user', JSON.stringify(response.data.user_id));
      navigate('/dashboard');
      
      onClose();
      
    } catch (err) {
      setError(`Failed to authenticate using ${method}`);
      console.error(err);
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    await sendUserDataToBackend({ email, password, username }, 'email');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      >
        <motion.div
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md relative"
        >
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            onClick={onClose}
          >
            <X size={20} />
          </button>
          <h2 className="text-2xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
            {isRegistering ? 'Register' : 'Login'}
          </h2>
          <form onSubmit={handleEmailAuth}>
            <div className="mb-4">
              <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            {isRegistering && (
              <div className="mb-4">
                <Label htmlFor="username" className="text-gray-700 dark:text-gray-300">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            )}
            <div className="mb-4">
              <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline mt-1 block">
                Forgot password?
              </Link>
            </div>
            <Button 
              type="submit" 
              className="w-full mb-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
            >
              {isRegistering ? 'Register' : 'Login'} with Email
            </Button>
          </form>
          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">Or continue with</span>
            </div>
          </div>

          {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
          <p className="mt-4 text-center text-sm text-gray-700 dark:text-gray-300">
            {isRegistering ? 'Already have an account?' : "Don't have an account?"}
            <button
              type="button"
              className="ml-1 text-blue-600 hover:underline"
              onClick={() => setIsRegistering(!isRegistering)}
            >
              {isRegistering ? 'Login' : 'Register'}
            </button>
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}