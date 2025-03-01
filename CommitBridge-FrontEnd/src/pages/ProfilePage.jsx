import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function ProfilePage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [timezone, setTimezone] = useState('');
  const [language, setLanguage] = useState('en');
  const [twitterHandle, setTwitterHandle] = useState('');
  const [linkedinProfile, setLinkedinProfile] = useState('');
  const [postFrequency, setPostFrequency] = useState('daily');
  const [postTime, setPostTime] = useState('09:00');

  const fetchProfileData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000'); 
      if (!response.ok) throw new Error('Failed to fetch profile data');
      const data = await response.json();
      setName(data.name || '');
      setEmail(data.email || '');
      setBio(data.bio || '');
      setTimezone(data.timezone || '');
      setLanguage(data.language || 'en');
      setTwitterHandle(data.twitterHandle || '');
      setLinkedinProfile(data.linkedinProfile || '');
      setPostFrequency(data.postFrequency || 'daily');
      setPostTime(data.postTime || '09:00');
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleSaveProfile = () => {
    console.log('Saving profile:', {
      name,
      email,
      bio,
      timezone,
      language,
      twitterHandle,
      linkedinProfile,
      postFrequency,
      postTime,
    });
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
                    <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">Name</Label>
                    <Input 
                      id="name" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
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
                </div>
                <div>
                  <Label htmlFor="bio" className="text-gray-700 dark:text-gray-300">Bio</Label>
                  <Textarea 
                    id="bio" 
                    value={bio} 
                    onChange={(e) => setBio(e.target.value)} 
                    className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="timezone" className="text-gray-700 dark:text-gray-300">Timezone</Label>
                    <Select value={timezone} onValueChange={setTimezone}>
                      <SelectTrigger id="timezone" className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="utc">UTC</SelectItem>
                        <SelectItem value="est">Eastern Time</SelectItem>
                        <SelectItem value="pst">Pacific Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="language" className="text-gray-700 dark:text-gray-300">Preferred Language</Label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger id="language" className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                      </SelectContent>
                    </Select>
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