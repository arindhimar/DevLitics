import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function ProfilePage() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [twitterHandle, setTwitterHandle] = useState('');
  const [linkedinProfile, setLinkedinProfile] = useState('');
  const [user, setUser] = useState(null);

  // Fetch user data from the backend
  const fetchProfileData = async () => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);

        const response = await fetch(`http://127.0.0.1:5000/user/${parsedUser}`);
        if (!response.ok) throw new Error('Failed to fetch profile data');
        const data = await response.json();

        // Set state with fetched data
        setEmail(data.email || '');
        setUsername(data.username || '');
        setTwitterHandle(data.twitterHandle || '');
        setLinkedinProfile(data.linkedinProfile || '');
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  // Save updated profile data to the backend
  const handleSaveProfile = async () => {
    if (!user) return;

    try {
      const response = await fetch(`http://127.0.0.1:5000/user/${user}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          username,
          twitterHandle,
          linkedinProfile,
        }),
      });
      const data = await response.json();
      console.log(data);
      if(!data.message=="") {
        console.log('Profile updated successfully');
      }
      else if (data.error=="") {
        console.log('Profile updated successfully');
      } else {
        console.log(data.error);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black text-gray-900 dark:text-white">
      <Header />
      <main className="flex-grow">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto p-4 space-y-6"
        >
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
            Profile
          </h1>
          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Personal Information</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">Manage your account details and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="username" className="text-gray-700 dark:text-gray-300">Username</Label>
                    <Input 
                      id="username" 
                      value={username} 
                      onChange={(e) => setUsername(e.target.value)} 
                      className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="twitterHandle" className="text-gray-700 dark:text-gray-300">Twitter Handle</Label>
                    <Input 
                      id="twitterHandle" 
                      value={twitterHandle} 
                      onChange={(e) => setTwitterHandle(e.target.value)} 
                      className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="linkedinProfile" className="text-gray-700 dark:text-gray-300">LinkedIn Profile</Label>
                    <Input 
                      id="linkedinProfile" 
                      value={linkedinProfile} 
                      onChange={(e) => setLinkedinProfile(e.target.value)} 
                      className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <motion.div className="flex justify-end">
            <Button 
              onClick={handleSaveProfile}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
            >
              Save Profile
            </Button>
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}