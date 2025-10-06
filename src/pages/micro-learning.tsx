import { useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import NavBar from '@/components/NavBar';
import ReadinessMeter from '@/components/ReadinessMeter';
import SkillCard from '@/components/SkillCard';
import AIMentorWidget from '@/components/AIMentorWidget';
import seedData from '@/data/seed.json';

const FILTERS = ['All', 'Soft Skills', 'Technical', 'Career Prep'] as const;

export default function MicroLearning() {
  const [lastSyncTime] = useState(new Date());
  const [isOfflineMode] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<(typeof FILTERS)[number]>('All');
  const [readinessScore, setReadinessScore] = useState(78);
  const [completedCourses, setCompletedCourses] = useState(18);
  const [activeCourses, setActiveCourses] = useState(4);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setReadinessScore(Number(localStorage.getItem('studentReadinessScore')) || 78);
    setCompletedCourses(Number(localStorage.getItem('studentCompletedCourses')) || 18);
    setActiveCourses(Number(localStorage.getItem('studentActiveCourses')) || 4);
  }, []);

  const courses = seedData.courses;

  const filteredCourses = useMemo(() => {
    if (selectedFilter === 'All') return courses;
    const key = selectedFilter.toLowerCase().replace(' ', '-');
    return courses.filter((course) => course.category === key);
  }, [courses, selectedFilter]);

  return (
    <>
      <Head>
        <title>Micro-Learning - Prashiskshan</title>
        <meta
          name="description"
          content="AI-powered skill development with guided micro courses"
        />
      </Head>

      <NavBar />

      <main className="min-h-screen pt-20 pb-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="heading-lg mb-4">Micro-Learning Hub</h1>
            <p className="body-md max-w-3xl">
              Build job-ready skills with AI mentor guidance, real-time feedback, and personalised learning paths tailored to your readiness score.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8 flex items-center justify-between glass rounded-xl p-4"
          >
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${isOfflineMode ? 'bg-orange-500' : 'bg-neon-green'} animate-pulse`} />
              <span className="text-sm text-slate-300">
                {isOfflineMode ? 'Offline Mode • Content cached' : 'Online • Synced with mentor insights'}
              </span>
            </div>
            <div className="text-sm text-slate-400">
              Last sync {lastSyncTime.toLocaleTimeString()}
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="glass rounded-2xl p-8 sticky top-24">
                <ReadinessMeter score={readinessScore} />
                <div className="mt-8 pt-8 border-t border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Completed Courses</span>
                    <span className="text-lg font-bold text-white">{completedCourses}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Active Courses</span>
                    <span className="text-lg font-bold text-neon-blue">{activeCourses}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Total Badges</span>
                    <span className="text-lg font-bold text-yellow-400">{completedCourses}</span>
                  </div>
                </div>

                <button className="mt-6 w-full btn-secondary text-sm py-3">
                  Download for offline use
                </button>
              </div>
            </motion.div>

            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="flex items-center space-x-2 mb-8 overflow-x-auto pb-2">
                  {FILTERS.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setSelectedFilter(filter)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                        selectedFilter === filter
                          ? 'bg-neon-blue text-white'
                          : 'bg-white/5 text-slate-400 hover:bg-white/10'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {filteredCourses.map((course, index) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.35 + index * 0.08 }}
                      className="relative"
                    >
                      <div className="absolute -top-4 right-4 z-10 px-3 py-1 rounded-full bg-neon-purple/20 border border-neon-purple/40 text-xs font-semibold text-neon-purple backdrop-blur">
                        AI mentor guided
                      </div>
                      <div className="h-80">
                        <SkillCard {...course} />
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="mt-8 text-center"
                >
                  <button className="btn-secondary px-8 py-3">
                    Load More Courses
                  </button>
                </motion.div>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="glass rounded-2xl p-8"
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-purple to-pink-500 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🎯</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">Recommended Learning Path</h3>
                <p className="text-slate-400 mb-4">
                  Based on your readiness score and recent mentor conversations, focus on the following skills this week:
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Advanced Excel', 'Python Basics', 'Project Management', 'Data Visualization'].map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm font-medium whitespace-nowrap transition-all hover:bg-white/10"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <AIMentorWidget />
    </>
  );
}
