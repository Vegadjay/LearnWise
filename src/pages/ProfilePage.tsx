import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Save, Image, Github, Twitter, Linkedin, Mail, Globe, Book, GraduationCap, CheckSquare } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface UserProfile {
  name: string;
  email: string;
  bio: string;
  avatar: string;
  banner: string;
  github: string;
  twitter: string;
  linkedin: string;
  website: string;
}

interface SocialLink {
  name: string;
  icon: React.ReactNode;
  url: string;
  placeholder: string;
  color: string;
}

const defaultBanner = "https://plus.unsplash.com/premium_photo-1673697239981-389164b7b87f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bmF0dXJlfGVufDB8fDB8fHww";

const defaultProfile: UserProfile = {
  name: 'Student User',
  email: 'student@learnwise.app',
  bio: 'I love learning new things!',
  avatar: '',
  banner: defaultBanner,
  github: '',
  twitter: '',
  linkedin: '',
  website: ''
};

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile>(defaultProfile);
  const [activeTab, setActiveTab] = useState("profile");

  // Load profile from localStorage on component mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);
        // Make sure the profile has a banner property, using default if not
        if (!parsedProfile.banner) {
          parsedProfile.banner = defaultBanner;
        }
        setProfile(parsedProfile);
        setEditedProfile(parsedProfile);
      } catch (error) {
        console.error('Failed to parse stored profile:', error);
        // If parsing fails, reset to default
        setProfile(defaultProfile);
        setEditedProfile(defaultProfile);
      }
    }
  }, []);

  const handleSaveProfile = () => {
    // Ensure banner has a value
    if (!editedProfile.banner) {
      editedProfile.banner = defaultBanner;
    }

    // Save profile to localStorage
    localStorage.setItem('userProfile', JSON.stringify(editedProfile));
    setProfile(editedProfile);
    setIsEditing(false);

    // Show success message
    alert('Profile updated successfully!');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const socialLinks: SocialLink[] = [
    {
      name: 'github',
      icon: <Github size={18} />,
      url: profile.github,
      placeholder: 'https://github.com/username',
      color: 'hover:text-gray-900 dark:hover:text-gray-100'
    },
    {
      name: 'twitter',
      icon: <Twitter size={18} />,
      url: profile.twitter,
      placeholder: 'https://twitter.com/username',
      color: 'hover:text-blue-400'
    },
    {
      name: 'linkedin',
      icon: <Linkedin size={18} />,
      url: profile.linkedin,
      placeholder: 'https://linkedin.com/in/username',
      color: 'hover:text-blue-700'
    },
    {
      name: 'website',
      icon: <Globe size={18} />,
      url: profile.website,
      placeholder: 'https://yourwebsite.com',
      color: 'hover:text-teal-500'
    }
  ];

  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto"
      >
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Profile</h1>
          <p className="text-muted-foreground">Manage your personal information and preferences</p>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="mb-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="activity">Learning Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="md:col-span-1"
              >
                <Card className="overflow-hidden">
                  <div className="h-32 relative">
                    <img
                      src={profile.banner || defaultBanner}
                      alt="Profile banner"
                      className="w-full h-full object-cover"
                    />
                    {isEditing && (
                      <div className="absolute bottom-2 right-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          className="bg-white/80 backdrop-blur-sm hover:bg-white"
                          onClick={() => document.getElementById('banner-input')?.focus()}
                        >
                          <Image size={14} className="mr-1" />
                          Change Banner
                        </Button>
                      </div>
                    )}
                  </div>

                  <CardHeader className="text-center relative">
                    <div className="flex justify-center -mt-16 mb-2">
                      <div className="relative">
                        {profile.avatar ? (
                          <img
                            src={profile.avatar}
                            alt={profile.name}
                            className="w-24 h-24 rounded-full object-cover border-4 border-background shadow-md"
                          />
                        ) : (
                          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center border-4 border-background shadow-md">
                            <User className="h-12 w-12 text-primary/40" />
                          </div>
                        )}
                        {isEditing && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="absolute bottom-0 right-0 h-8 w-8 p-0 rounded-full bg-background"
                            onClick={() => document.getElementById('avatar-input')?.focus()}
                          >
                            <Image size={14} />
                          </Button>
                        )}
                      </div>
                    </div>
                    <CardTitle className="text-xl font-bold">{profile.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{profile.email}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-center mb-4 px-4 py-2 bg-muted/40 rounded-lg">{profile.bio}</p>

                    <div className="flex justify-center gap-4 my-4">
                      {socialLinks.map(link => (
                        link.url && (
                          <motion.a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`p-2 rounded-full bg-muted/60 transition-colors ${link.color}`}
                            whileHover={{ scale: 1.1, backgroundColor: 'rgba(var(--primary), 0.1)' }}
                            whileTap={{ scale: 0.9 }}
                          >
                            {link.icon}
                          </motion.a>
                        )
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    {!isEditing && (
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(true)}
                        className="w-full"
                      >
                        Edit Profile
                      </Button>
                    )}
                  </CardFooter>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-base">Learning Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>Completed Flashcards</span>
                      <span className="font-medium">87/120</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-primary rounded-full w-[72%]"></div>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span>Quiz Success Rate</span>
                      <span className="font-medium">84%</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-secondary rounded-full w-[84%]"></div>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span>Daily Habits</span>
                      <span className="font-medium">5/7 days</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-accent rounded-full w-[71%]"></div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="md:col-span-2"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>{isEditing ? 'Edit Profile' : 'Profile Information'}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isEditing ? (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            name="name"
                            value={editedProfile.name}
                            onChange={handleInputChange}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={editedProfile.email}
                            onChange={handleInputChange}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="banner">Banner Image URL</Label>
                          <Input
                            id="banner-input"
                            name="banner"
                            placeholder="https://example.com/banner.jpg"
                            value={editedProfile.banner}
                            onChange={handleInputChange}
                          />
                          <p className="text-xs text-muted-foreground">Enter a URL for your profile banner (default will be used if empty)</p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="avatar">Profile Picture URL</Label>
                          <Input
                            id="avatar-input"
                            name="avatar"
                            placeholder="https://example.com/avatar.jpg"
                            value={editedProfile.avatar}
                            onChange={handleInputChange}
                          />
                          <p className="text-xs text-muted-foreground">Enter a URL for your profile picture</p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="bio">Bio</Label>
                          <Input
                            id="bio"
                            name="bio"
                            value={editedProfile.bio}
                            onChange={handleInputChange}
                          />
                        </div>

                        <div className="space-y-4 border-t pt-4 mt-4">
                          <h3 className="font-medium">Social Links</h3>

                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <Github className="h-5 w-5 text-muted-foreground" />
                              <Input
                                id="github"
                                name="github"
                                placeholder="https://github.com/username"
                                value={editedProfile.github}
                                onChange={handleInputChange}
                              />
                            </div>

                            <div className="flex items-center gap-3">
                              <Twitter className="h-5 w-5 text-muted-foreground" />
                              <Input
                                id="twitter"
                                name="twitter"
                                placeholder="https://twitter.com/username"
                                value={editedProfile.twitter}
                                onChange={handleInputChange}
                              />
                            </div>

                            <div className="flex items-center gap-3">
                              <Linkedin className="h-5 w-5 text-muted-foreground" />
                              <Input
                                id="linkedin"
                                name="linkedin"
                                placeholder="https://linkedin.com/in/username"
                                value={editedProfile.linkedin}
                                onChange={handleInputChange}
                              />
                            </div>

                            <div className="flex items-center gap-3">
                              <Globe className="h-5 w-5 text-muted-foreground" />
                              <Input
                                id="website"
                                name="website"
                                placeholder="https://yourwebsite.com"
                                value={editedProfile.website}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end space-x-2 pt-4">
                          <Button variant="outline" onClick={() => {
                            setIsEditing(false);
                            setEditedProfile(profile);
                          }}>
                            Cancel
                          </Button>
                          <Button onClick={handleSaveProfile} className="flex items-center gap-2">
                            <Save className="h-4 w-4" />
                            Save Changes
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h3 className="font-medium text-muted-foreground text-sm mb-1">Full Name</h3>
                            <p className="font-medium">{profile.name}</p>
                          </div>
                          <div>
                            <h3 className="font-medium text-muted-foreground text-sm mb-1">Email Address</h3>
                            <p className="font-medium">{profile.email}</p>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-medium text-muted-foreground text-sm mb-1">Bio</h3>
                          <p>{profile.bio}</p>
                        </div>

                        <div className="border-t pt-4">
                          <h3 className="font-medium text-muted-foreground text-sm mb-3">Social Links</h3>
                          <div className="space-y-2">
                            {socialLinks.map(link => link.url && (
                              <div key={link.name} className="flex items-center gap-2">
                                <div className="p-1.5 bg-muted rounded">{link.icon}</div>
                                <a
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm text-primary hover:underline"
                                >
                                  {link.url}
                                </a>
                              </div>
                            ))}
                            {!socialLinks.some(link => link.url) && (
                              <p className="text-sm text-muted-foreground italic">No social links added yet</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Learning Preferences</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <h3 className="font-medium">Preferred Subjects</h3>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-2.5 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">Programming</span>
                          <span className="px-2.5 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-medium">Mathematics</span>
                          <span className="px-2.5 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium">Science</span>
                          <span className="px-2.5 py-1 bg-muted rounded-full text-xs font-medium">+ Add more</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-medium">Study Goals</h3>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-2.5 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">1h daily practice</span>
                          <span className="px-2.5 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-medium">Master JavaScript</span>
                          <span className="px-2.5 py-1 bg-muted rounded-full text-xs font-medium">+ Add more</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Notification Preferences</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div>
                        <p className="font-medium">Daily Reminders</p>
                        <p className="text-sm text-muted-foreground">Get reminded about your daily learning goals</p>
                      </div>
                      <div className="h-4 w-8 bg-primary rounded-full relative">
                        <div className="h-4 w-4 bg-white rounded-full absolute right-0 shadow-md"></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div>
                        <p className="font-medium">Weekly Progress</p>
                        <p className="text-sm text-muted-foreground">Weekly summary of your learning progress</p>
                      </div>
                      <div className="h-4 w-8 bg-primary rounded-full relative">
                        <div className="h-4 w-4 bg-white rounded-full absolute right-0 shadow-md"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4 space-y-2">
                  <h3 className="font-medium">Privacy Settings</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div>
                        <p className="font-medium">Public Profile</p>
                        <p className="text-sm text-muted-foreground">Make your profile visible to other users</p>
                      </div>
                      <div className="h-4 w-8 bg-muted rounded-full relative">
                        <div className="h-4 w-4 bg-white rounded-full absolute left-0 shadow-md"></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div>
                        <p className="font-medium">Share Learning Activity</p>
                        <p className="text-sm text-muted-foreground">Allow others to see your learning progress</p>
                      </div>
                      <div className="h-4 w-8 bg-muted rounded-full relative">
                        <div className="h-4 w-4 bg-white rounded-full absolute left-0 shadow-md"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Recent Learning Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded-md flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-md">
                      <Book className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Completed JavaScript Basics</h4>
                      <p className="text-sm text-muted-foreground">Finished 12 flashcards with 92% accuracy</p>
                      <p className="text-xs text-muted-foreground mt-1">Today at 10:45 AM</p>
                    </div>
                  </div>

                  <div className="p-3 border rounded-md flex items-start gap-3">
                    <div className="bg-secondary/10 p-2 rounded-md">
                      <GraduationCap className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Completed Science Quiz</h4>
                      <p className="text-sm text-muted-foreground">Scored 8/10 on the chemistry quiz</p>
                      <p className="text-xs text-muted-foreground mt-1">Yesterday at 3:20 PM</p>
                    </div>
                  </div>

                  <div className="p-3 border rounded-md flex items-start gap-3">
                    <div className="bg-accent/10 p-2 rounded-md">
                      <CheckSquare className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-medium">4-day Study Streak</h4>
                      <p className="text-sm text-muted-foreground">You've studied for 4 days in a row!</p>
                      <p className="text-xs text-muted-foreground mt-1">2 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </AppLayout>
  );
};

export default ProfilePage;