import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { User, Save, Image, Github, Twitter, Linkedin, Mail, Globe, Book, GraduationCap, CheckSquare, Award, Calendar, Clock, ArrowUpRight, Pencil } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Bell, BarChart3, Settings, Activity, CheckCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { AnimatePresence } from 'framer-motion';

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
  label: string;
}

const defaultBanner = "/lone-tree.jpg";

const defaultProfile: UserProfile = {
  name: 'Mark Zuck',
  email: 'markzuck@meta.app',
  bio: 'I have no bio.',
  avatar: '',
  banner: defaultBanner,
  github: 'https://github.com/topics/zuckerberg',
  twitter: 'https://x.com/finkd',
  linkedin: 'https://www.linkedin.com/in/mark-zuckerberg-618bba58/',
  website: 'https://en.wikipedia.org/wiki/Mark_Zuckerberg'
};

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile>(defaultProfile);
  const [activeTab, setActiveTab] = useState("profile");
  const [showSaveToast, setShowSaveToast] = useState(false);

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);

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


  const badgesShows = [
    { badgename: "Streak Master", img: '/Badges/Streakmaster.png' },
    { badgename: "Quiz Champion", img: '/Badges/Quizchampion.png' },
    { badgename: "Fast Learner", img: '/Badges/Fastlearner.png' },
    { badgename: "Code Expert", img: '/Badges/Codeexpert.png' },
  ]

  const handleSaveProfile = () => {
    // Ensure banner has a value
    if (!editedProfile.banner) {
      editedProfile.banner = defaultBanner;
    }

    // Save profile to localStorage
    localStorage.setItem('userProfile', JSON.stringify(editedProfile));
    setProfile(editedProfile);
    setIsEditing(false);

    // Show toast notification instead of alert
    setShowSaveToast(true);
    setTimeout(() => setShowSaveToast(false), 3000);
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
      color: 'hover:text-gray-900 dark:hover:text-gray-100',
      label: 'GitHub Profile'
    },
    {
      name: 'twitter',
      icon: <Twitter size={18} />,
      url: profile.twitter,
      placeholder: 'https://twitter.com/username',
      color: 'hover:text-blue-400',
      label: 'Twitter Profile'
    },
    {
      name: 'linkedin',
      icon: <Linkedin size={18} />,
      url: profile.linkedin,
      placeholder: 'https://linkedin.com/in/username',
      color: 'hover:text-blue-700',
      label: 'LinkedIn Profile'
    },
    {
      name: 'website',
      icon: <Globe size={18} />,
      url: profile.website,
      placeholder: 'https://yourwebsite.com',
      color: 'hover:text-teal-500',
      label: 'Personal Website'
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const cardHoverVariants = {
    hover: {
      y: -5,
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 300
      }
    }
  };

  return (
    <AppLayout>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-5xl mx-auto px-4 pb-8"
      >
        <header className="mb-8 mt-6">
          <motion.h1
            variants={itemVariants}
            className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent"
          >
            My Profile
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-muted-foreground"
          >
            Manage your personal information and preferences
          </motion.p>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <motion.div variants={itemVariants}>
            <TabsList className="mb-4 p-1 bg-muted/50 backdrop-blur-sm">
              <TabsTrigger value="profile" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 transition-all">
                <User size={16} className="mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 transition-all">
                <motion.div whileTap={{ rotate: 30 }} className="inline-block mr-2">
                  <Settings size={16} />
                </motion.div>
                Settings
              </TabsTrigger>
              <TabsTrigger value="activity" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 transition-all">
                <motion.div
                  animate={{ rotate: [0, 2, 0, -2, 0] }}
                  transition={{ repeat: Infinity, duration: 2, repeatDelay: 4 }}
                  className="inline-block mr-2"
                >
                  <Activity size={16} />
                </motion.div>
                Learning Activity
              </TabsTrigger>
            </TabsList>
          </motion.div>

          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                variants={itemVariants}
                className="md:col-span-1"
              >
                <motion.div
                  whileHover="hover"
                  variants={cardHoverVariants}
                >
                  <Card className="overflow-hidden">
                    <motion.div
                      className="h-32 relative group"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <img
                        src={profile.banner || defaultBanner}
                        alt="Profile banner"
                        className="w-full h-full object-cover"
                      />
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"
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
                    </motion.div>

                    <CardHeader className="text-center relative pt-14 pb-4">
                      <div className="flex justify-center -mt-20 mb-3">
                        <div className="relative">
                          {profile.avatar ? (
                            <motion.div
                              className="relative"
                              whileHover={{ scale: 1.05, rotate: 5 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <img
                                src={profile.avatar}
                                alt={profile.name}
                                className="w-24 h-24 rounded-full object-cover border-4 border-background shadow-lg transition-all duration-300"
                              />
                              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                            </motion.div>
                          ) : (
                            <motion.div
                              className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center border-4 border-background shadow-lg overflow-hidden transition-all duration-300"
                              whileHover={{ scale: 1.05, rotate: 5 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <img
                                src="https://imgs.search.brave.com/2kBCsI1bSPEEaJySScfqyW0-wlW9x0Uv6K3kTrF-mlk/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9oaXBz/LmhlYXJzdGFwcHMu/Y29tL2htZy1wcm9k/L2ltYWdlcy9tYXJr/LXp1Y2tlcmJlcmct/Y2VvLW9mLW1ldGEt/dGVzdGlmaWVzLWJl/Zm9yZS10aGUtc2Vu/YXRlLW5ld3MtcGhv/dG8tMTczOTk5ODU0/NS5wanBlZz9jcm9w/PTAuNTUzeHc6MC44/Mjd4aDswLjI4M3h3/LDAmcmVzaXplPTY0/MDoq"
                                alt="Default Profile"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                              />
                            </motion.div>
                          )}
                          {isEditing && (
                            <motion.div
                              whileHover={{ scale: 1.2, rotate: 90 }}
                              transition={{ type: "spring", stiffness: 500 }}
                            >
                              <Button
                                variant="outline"
                                size="sm"
                                className="absolute bottom-0 right-0 h-8 w-8 p-0 rounded-full bg-background shadow-sm hover:bg-primary/10 hover:border-primary/30 transition-colors"
                                onClick={() => document.getElementById('avatar-input')?.focus()}
                              >
                                <Image size={14} />
                              </Button>
                            </motion.div>
                          )}
                        </div>
                      </div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <CardTitle className="text-xl font-bold">{profile.name}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">{profile.email}</p>
                      </motion.div>

                      {/* Status indicator */}
                      <div className="flex items-center justify-center mt-2">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="h-2 w-2 rounded-full bg-green-500"
                        />
                        <span className="text-xs text-muted-foreground ml-1.5">Online</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <motion.p
                        whileHover={{ backgroundColor: "rgba(var(--primary), 0.1)" }}
                        className="text-muted-foreground text-center mb-4 px-4 py-2 bg-muted/40 rounded-lg"
                      >
                        {profile.bio}
                      </motion.p>

                      <div className="flex justify-center gap-4 my-4">
                        {socialLinks.map(link => (
                          link.url && (
                            <motion.a
                              key={link.name}
                              href={link.url}
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                              className="relative group"
                            >
                              <motion.div
                                className={`p-2 rounded-full bg-muted/60 transition-colors ${link.color}`}
                              >
                                {link.icon}
                              </motion.div>
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileHover={{ opacity: 1, y: 0 }}
                                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded whitespace-nowrap"
                              >
                                {link.label}
                              </motion.div>
                            </motion.a>
                          )
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      {!isEditing && (
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full"
                        >
                          <Button
                            variant="outline"
                            onClick={() => setIsEditing(true)}
                            className="w-full group"
                          >
                            <motion.span
                              initial={{ x: 0 }}
                              whileHover={{ x: 5 }}
                              className="inline-flex items-center gap-3"
                            >
                              <Pencil />
                              Edit Profile
                              <ArrowUpRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </motion.span>
                          </Button>
                        </motion.div>
                      )}
                    </CardFooter>
                  </Card>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  whileHover="hover"
                  variants={cardHoverVariants}
                  className="mt-6"
                >
                  <Card>
                    <CardHeader>
                      <motion.div
                        className="flex items-center"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Award size={18} className="mr-2 text-primary" />
                        <CardTitle className="text-base">Learning Stats</CardTitle>
                      </motion.div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="rounded-lg p-2 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex justify-between text-sm">
                          <span>Completed Flashcards</span>
                          <span className="font-medium">87/120</span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden mt-1">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "72%" }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="h-full bg-primary rounded-full"
                          />
                        </div>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="rounded-lg p-2 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex justify-between text-sm">
                          <span>Quiz Success Rate</span>
                          <span className="font-medium">84%</span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden mt-1">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "84%" }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="h-full bg-secondary rounded-full"
                          />
                        </div>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="rounded-lg p-2 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex justify-between text-sm">
                          <span>Daily Habits</span>
                          <span className="font-medium">5/7 days</span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden mt-1">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "71%" }}
                            transition={{ duration: 1, delay: 0.7 }}
                            className="h-full bg-accent rounded-full"
                          />
                        </div>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="md:col-span-2"
              >
                <motion.div
                  whileHover="hover"
                  variants={cardHoverVariants}
                >
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="flex items-center">
                        <User className="h-5 w-5 mr-2 text-primary" />
                        {isEditing ? 'Edit Profile' : 'Profile Information'}
                      </CardTitle>
                      {!isEditing && (
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsEditing(true)}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            Edit
                          </Button>
                        </motion.div>
                      )}
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
                              className="transition-all focus:ring-2 focus:ring-primary/20"
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
                              className="transition-all focus:ring-2 focus:ring-primary/20"
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
                              className="transition-all focus:ring-2 focus:ring-primary/20"
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
                              className="transition-all focus:ring-2 focus:ring-primary/20"
                            />
                            <p className="text-xs text-muted-foreground">Enter a URL for your profile picture</p>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea
                              id="bio"
                              name="bio"
                              value={editedProfile.bio}
                              onChange={handleInputChange}
                              className="min-h-24 transition-all focus:ring-2 focus:ring-primary/20"
                            />
                          </div>

                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="space-y-4 border-t pt-4 mt-4"
                          >
                            <h3 className="font-medium flex items-center">
                              <motion.div
                                animate={{ rotate: [0, 15, 0, -15, 0] }}
                                transition={{ repeat: Infinity, duration: 2, repeatDelay: 5 }}
                                className="inline-block mr-2"
                              >
                                <Globe size={16} className="text-primary" />
                              </motion.div>
                              Social Links
                            </h3>

                            <div className="space-y-3">
                              <motion.div
                                whileHover={{ x: 5 }}
                                className="flex items-center gap-3"
                              >
                                <Github className="h-5 w-5 text-muted-foreground" />
                                <Input
                                  id="github"
                                  name="github"
                                  placeholder="https://github.com/username"
                                  value={editedProfile.github}
                                  onChange={handleInputChange}
                                  className="transition-all focus:ring-2 focus:ring-primary/20"
                                />
                              </motion.div>

                              <motion.div
                                whileHover={{ x: 5 }}
                                className="flex items-center gap-3"
                              >
                                <Twitter className="h-5 w-5 text-muted-foreground" />
                                <Input
                                  id="twitter"
                                  name="twitter"
                                  placeholder="https://twitter.com/username"
                                  value={editedProfile.twitter}
                                  onChange={handleInputChange}
                                  className="transition-all focus:ring-2 focus:ring-primary/20"
                                />
                              </motion.div>

                              <motion.div
                                whileHover={{ x: 5 }}
                                className="flex items-center gap-3"
                              >
                                <Linkedin className="h-5 w-5 text-muted-foreground" />
                                <Input
                                  id="linkedin"
                                  name="linkedin"
                                  placeholder="https://linkedin.com/in/username"
                                  value={editedProfile.linkedin}
                                  onChange={handleInputChange}
                                  className="transition-all focus:ring-2 focus:ring-primary/20"
                                />
                              </motion.div>

                              <motion.div
                                whileHover={{ x: 5 }}
                                className="flex items-center gap-3"
                              >
                                <Globe className="h-5 w-5 text-muted-foreground" />
                                <Input
                                  id="website"
                                  name="website"
                                  placeholder="https://yourwebsite.com"
                                  value={editedProfile.website}
                                  onChange={handleInputChange}
                                  className="transition-all focus:ring-2 focus:ring-primary/20"
                                />
                              </motion.div>
                            </div>
                          </motion.div>

                          <div className="flex justify-end space-x-2 pt-4">
                            <motion.div whileTap={{ scale: 0.95 }}>
                              <Button
                                variant="outline"
                                onClick={() => {
                                  setIsEditing(false);
                                  setEditedProfile(profile);
                                }}
                              >
                                Cancel
                              </Button>
                            </motion.div>
                            <motion.div
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Button
                                onClick={handleSaveProfile}
                                className="bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 transition-opacity flex items-center gap-2"
                              >
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                  className="opacity-0 group-hover:opacity-100"
                                >
                                  <Save className="h-4 w-4" />
                                </motion.div>
                                Save Changes
                              </Button>
                            </motion.div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4"
                          >
                            <motion.div
                              whileHover={{ backgroundColor: "rgba(var(--primary), 0.05)" }}
                              className="p-3 rounded-lg border border-transparent hover:border-primary/10 transition-colors"
                            >
                              <h3 className="font-medium text-muted-foreground text-sm mb-1">Full Name</h3>
                              <p className="font-medium">{profile.name}</p>
                            </motion.div>
                            <motion.div
                              whileHover={{ backgroundColor: "rgba(var(--primary), 0.05)" }}
                              className="p-3 rounded-lg border border-transparent hover:border-primary/10 transition-colors"
                            >
                              <h3 className="font-medium text-muted-foreground text-sm mb-1">Email Address</h3>
                              <p className="font-medium">{profile.email}</p>
                            </motion.div>
                          </motion.div>

                          <motion.div
                            whileHover={{ backgroundColor: "rgba(var(--primary), 0.05)" }}
                            className="p-3 rounded-lg border border-transparent hover:border-primary/10 transition-colors"
                          >
                            <h3 className="font-medium text-muted-foreground text-sm mb-1">Bio</h3>
                            <p>{profile.bio}</p>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="border-t pt-4"
                          >
                            <h3 className="font-medium text-muted-foreground text-sm mb-3 flex items-center">
                              <Globe size={16} className="mr-2 text-primary" />
                              Social Links
                            </h3>
                            <div className="space-y-2">
                              {socialLinks.map(link => link.url && (
                                <motion.a
                                  key={link.name}
                                  href={link.url}
                                  className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50 transition-colors"
                                  whileHover={{ x: 5 }}
                                >
                                  <div className="p-1.5 bg-muted rounded">{link.icon}</div>
                                  <p className="text-sm">
                                    <span className="text-primary font-medium">{link.label}</span>
                                  </p>
                                </motion.a>

                              ))}
                              {!socialLinks.some(link => link.url) && (
                                <p className="text-sm text-muted-foreground italic">No social links added yet</p>
                              )}
                            </div>
                          </motion.div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  whileHover="hover"
                  className="mt-6"
                >
                  <Card>
                    <CardHeader>
                      <motion.div
                        className="flex items-center"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Book size={18} className="mr-2 text-primary" />
                        <CardTitle className="text-base">Recent Learning Activity</CardTitle>
                      </motion.div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="p-2 rounded-lg hover:bg-muted/50 transition-colors flex items-center"
                      >
                        <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center mr-3">
                          <CheckSquare size={16} className="text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Completed React Basics</p>
                          <div className="flex items-center mt-1 text-xs text-muted-foreground">
                            <Calendar size={12} className="mr-1" />
                            <span>Today</span>
                            <Clock size={12} className="ml-3 mr-1" />
                            <span>2:30 PM</span>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="p-2 rounded-lg hover:bg-muted/50 transition-colors flex items-center"
                      >
                        <div className="h-10 w-10 rounded-md bg-secondary/10 flex items-center justify-center mr-3">
                          <GraduationCap size={16} className="text-secondary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Quiz: Advanced TypeScript</p>
                          <div className="flex items-center mt-1 text-xs text-muted-foreground">
                            <Calendar size={12} className="mr-1" />
                            <span>Yesterday</span>
                            <Clock size={12} className="ml-3 mr-1" />
                            <span>4:15 PM</span>
                          </div>
                        </div>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <motion.div
              variants={cardHoverVariants}
              whileHover="hover"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="h-5 w-5 mr-2 text-primary" />
                    Account Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Notification Preferences</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <motion.div
                        whileHover={{ backgroundColor: "rgba(var(--primary), 0.05)" }}
                        className="flex items-center justify-between p-3 rounded-lg border border-transparent hover:border-primary/10 transition-colors"
                      >
                        <Label htmlFor="email-notifications" className="flex items-center space-x-2 cursor-pointer">
                          <Mail size={16} className="text-muted-foreground" />
                          <span>Email Notifications</span>
                        </Label>
                        <Switch id="email-notifications" defaultChecked />
                      </motion.div>

                      <motion.div
                        whileHover={{ backgroundColor: "rgba(var(--primary), 0.05)" }}
                        className="flex items-center justify-between p-3 rounded-lg border border-transparent hover:border-primary/10 transition-colors"
                      >
                        <Label htmlFor="browser-notifications" className="flex items-center space-x-2 cursor-pointer">
                          <Bell size={16} className="text-muted-foreground" />
                          <span>Browser Notifications</span>
                        </Label>
                        <Switch id="browser-notifications" defaultChecked />
                      </motion.div>

                      <motion.div
                        whileHover={{ backgroundColor: "rgba(var(--primary), 0.05)" }}
                        className="flex items-center justify-between p-3 rounded-lg border border-transparent hover:border-primary/10 transition-colors"
                      >
                        <Label htmlFor="weekly-summary" className="flex items-center space-x-2 cursor-pointer">
                          <BarChart3 size={16} className="text-muted-foreground" />
                          <span>Weekly Summary</span>
                        </Label>
                        <Switch id="weekly-summary" defaultChecked />
                      </motion.div>

                      <motion.div
                        whileHover={{ backgroundColor: "rgba(var(--primary), 0.05)" }}
                        className="flex items-center justify-between p-3 rounded-lg border border-transparent hover:border-primary/10 transition-colors"
                      >
                        <Label htmlFor="learning-reminders" className="flex items-center space-x-2 cursor-pointer">
                          <Clock size={16} className="text-muted-foreground" />
                          <span>Learning Reminders</span>
                        </Label>
                        <Switch id="learning-reminders" />
                      </motion.div>
                    </div>
                  </div>

                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <motion.div
              variants={itemVariants}
              whileHover="hover"
              variants={cardHoverVariants}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="h-5 w-5 mr-2 text-primary" />
                    Learning Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium mb-3">Weekly Learning Hours</h3>
                      <div className="h-48 w-full bg-muted/40 rounded-lg flex items-end justify-around px-4">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
                          const heights = [60, 40, 85, 30, 65, 45, 20];
                          return (
                            <motion.div
                              key={day}
                              initial={{ height: 0 }}
                              animate={{ height: `${heights[i]}%` }}
                              transition={{ duration: 0.8, delay: i * 0.1, type: "spring" }}
                              className="w-10 bg-gradient-to-t from-primary to-purple-500 rounded-md relative group cursor-pointer"
                            >
                              <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                whileHover={{ opacity: 1, y: -30 }}
                                className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                              >
                                {heights[i] / 10} hours
                              </motion.div>
                              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium">
                                {day}
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="pt-8">
                      <h3 className="text-sm font-medium mb-4">Learning Focus Areas</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2 relative group cursor-pointer">
                          <div className="flex justify-between text-sm">
                            <span>Frontend Development</span>
                            <span className="font-medium">42%</span>
                          </div>
                          <div className="h-2 rounded-full bg-muted overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: "42%" }}
                              transition={{ duration: 1 }}
                              className="h-full bg-primary rounded-full"
                            />
                          </div>
                          <motion.div
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            className="absolute top-full mt-1 left-0 bg-black text-white text-xs py-1 px-2 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                          >
                            HTML, CSS, JavaScript, React
                          </motion.div>
                        </div>

                        <div className="space-y-2 relative group cursor-pointer">
                          <div className="flex justify-between text-sm">
                            <span>Backend Development</span>
                            <span className="font-medium">28%</span>
                          </div>
                          <div className="h-2 rounded-full bg-muted overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: "28%" }}
                              transition={{ duration: 1, delay: 0.2 }}
                              className="h-full bg-accent rounded-full"
                            />
                          </div>
                          <motion.div
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            className="absolute top-full mt-1 left-0 bg-black text-white text-xs py-1 px-2 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                          >
                            Node.js, Express, APIs, Databases
                          </motion.div>
                        </div>

                        <div className="space-y-2 relative group cursor-pointer">
                          <div className="flex justify-between text-sm">
                            <span>DevOps</span>
                            <span className="font-medium">15%</span>
                          </div>
                          <div className="h-2 rounded-full bg-muted overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: "15%" }}
                              transition={{ duration: 1, delay: 0.4 }}
                              className="h-full bg-secondary rounded-full"
                            />
                          </div>
                          <motion.div
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            className="absolute top-full mt-1 left-0 bg-black text-white text-xs py-1 px-2 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                          >
                            Docker, CI/CD, Cloud Services
                          </motion.div>
                        </div>

                        <div className="space-y-2 relative group cursor-pointer">
                          <div className="flex justify-between text-sm">
                            <span>Design Systems</span>
                            <span className="font-medium">15%</span>
                          </div>
                          <div className="h-2 rounded-full bg-muted overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: "15%" }}
                              transition={{ duration: 1, delay: 0.6 }}
                              className="h-full bg-purple-500 rounded-full"
                            />
                          </div>
                          <motion.div
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            className="absolute top-full mt-1 left-0 bg-black text-white text-xs py-1 px-2 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                          >
                            UI Components, Style Guides, Design Tokens
                          </motion.div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <h3 className="text-sm font-medium mb-3">Recent Achievement Badges</h3>
                      <div className="flex flex-wrap gap-7">
                        {badgesShows.map((badge, i) => (
                          <motion.div
                            key={badge.badgename}
                            whileHover={{ scale: 1.4 }}
                            className="flex flex-col items-center relative group cursor-pointer"
                          >
                            <div className="h-16 w-16 rounded-full flex items-center justify-center shadow-lg overflow-hidden">
                              <img
                                src={badge.img}
                                alt={badge.badgename}
                                className="h-16 w-16 object-contain"
                              />
                            </div>
                            <span className="mt-2 text-xs font-medium text-center">{badge.badgename}</span>
                            <motion.div
                              initial={{ opacity: 0, y: -5 }}
                              whileHover={{ opacity: 1, y: -10 }}
                              className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                            >
                              Earned on {new Date().toLocaleDateString()}
                            </motion.div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>

        {/* Save toast notification */}
        <AnimatePresence>
          {showSaveToast && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-md shadow-lg flex items-center"
            >
              <CheckCircle className="mr-2 h-5 w-5" />
              Profile successfully saved!
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AppLayout>
  );
};

export default ProfilePage;