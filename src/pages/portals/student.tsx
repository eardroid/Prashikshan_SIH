import { useEffect, useState } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import NavBar from '@/components/NavBar';
import ReadinessMeter from '@/components/ReadinessMeter';
import MetricCard from '@/components/MetricCard';
import QRHologram from '@/components/QRHologram';
import AIMentorWidget from '@/components/AIMentorWidget';
import seedData from '@/data/seed.json';

export default function StudentPortal() {
  const internships = seedData.internships;
  const [selectedTab, setSelectedTab] = useState<'in-person' | 'virtual'>('in-person');
  const [showNotification, setShowNotification] = useState(false);
  const [appliedInternship, setAppliedInternship] = useState<string | null>(null);
  const [userName, setUserName] = useState('Student');
  const [userEmail, setUserEmail] = useState('student@example.com');
  const [institutionCode, setInstitutionCode] = useState('N/A');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setUserName(localStorage.getItem('userName') || 'Student');
    setUserEmail(localStorage.getItem('userEmail') || 'student@example.com');
    setInstitutionCode(localStorage.getItem('institutionCode') || 'N/A');
  }, []);

  const handleApply = (internshipId: string, title: string) => {
    setAppliedInternship(title);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 5000);
  };

  const filteredInternships = internships.filter(int => int.type === selectedTab);

  const recentLogs = [
    { date: '2025-10-03', task: 'Completed React component development', hours: 4 },
    { date: '2025-10-02', task: 'Code review and bug fixes', hours: 3.5 },
    { date: '2025-10-01', task: 'Team standup and sprint planning', hours: 2 },
    { date: '2025-09-30', task: 'API integration testing', hours: 5 },
    { date: '2025-09-29', task: 'Documentation updates', hours: 3 },
  ];

  return (
    <>
      <Head>
        <title>Student Portal - Prashiskshan</title>
        <meta name="description" content="Student dashboard for internship management" />
      </Head>

      <NavBar />

      <main className="min-h-screen pt-20 pb-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="heading-lg mb-2">Welcome back, {userName}</h1>
            <p className="body-md text-slate-400">{userEmail} • Institution Code: {institutionCode}</p>
          </motion.div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <MetricCard
              title="Readiness Score"
              value={78}
              icon="🎯"
              trend="up"
              change={5}
              color="from-neon-blue to-primary-500"
              delay={0}
            />
            <MetricCard
              title="Completed Courses"
              value={12}
              icon="📚"
              trend="up"
              change={12}
              color="from-purple-500 to-pink-500"
              delay={0.1}
            />
            <MetricCard
              title="Active Internships"
              value={1}
              icon="💼"
              trend="neutral"
              color="from-green-500 to-emerald-500"
              delay={0.2}
            />
            <MetricCard
              title="Wallet Balance"
              value="₹45,000"
              icon="💰"
              trend="up"
              change={8}
              color="from-yellow-500 to-orange-500"
              delay={0.3}
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Left Column - Readiness & Active Internship */}
            <div className="lg:col-span-2 space-y-8">
              {/* Active Internship */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="glass rounded-2xl p-8"
              >
                <h2 className="text-2xl font-bold text-white mb-6">Active Internship</h2>
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-neon-blue to-primary-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl">🏢</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">Software Development Intern</h3>
                    <p className="text-slate-400 mb-2">TechCorp Solutions • Bangalore</p>
                    <div className="flex items-center space-x-4 text-sm text-slate-400">
                      <span>Started: June 2025</span>
                      <span>•</span>
                      <span>Duration: 6 months</span>
                      <span>•</span>
                      <span>Stipend: ₹25,000/mo</span>
                    </div>
                  </div>
                </div>

                {/* Progress */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-300">Internship Progress</span>
                    <span className="text-sm font-bold text-neon-blue">67%</span>
                  </div>
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '67%' }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-neon-blue to-primary-500"
                    />
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-3">
                  <button className="btn-primary py-3">
                    📝 Submit Work Log
                  </button>
                  <button className="btn-secondary py-3">
                    💬 Message Mentor
                  </button>
                </div>
              </motion.div>

              {/* Recent Work Logs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="glass rounded-2xl p-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Last 7 Work Logs</h2>
                  <Link href="#" className="text-sm text-neon-blue hover:text-neon-blue/80 font-medium">
                    View All →
                  </Link>
                </div>

                <div className="space-y-4">
                  {recentLogs.map((log, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
                      className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white mb-1">{log.task}</p>
                        <p className="text-xs text-slate-400">{new Date(log.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-neon-blue">{log.hours}h</p>
                        <p className="text-xs text-slate-400">logged</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column - Readiness & Actions */}
            <div className="space-y-8">
              {/* Readiness Meter */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="glass rounded-2xl p-8"
              >
                <ReadinessMeter score={78} size="md" />
                <Link href="/micro-learning" className="mt-6 block w-full btn-primary text-center py-3">
                  Improve Score
                </Link>
              </motion.div>

              {/* Quick Links */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="glass rounded-2xl p-6"
              >
                <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Link href="/micro-learning" className="block p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">📚</span>
                      <span className="text-sm font-medium text-white">Continue Learning</span>
                    </div>
                  </Link>
                  <Link href="#" className="block p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">🔍</span>
                      <span className="text-sm font-medium text-white">Browse Internships</span>
                    </div>
                  </Link>
                  <Link href="/sos" className="block p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">🆘</span>
                      <span className="text-sm font-medium text-white">Report Issue</span>
                    </div>
                  </Link>
                  <Link href="#" className="block p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">⚙️</span>
                      <span className="text-sm font-medium text-white">Settings</span>
                    </div>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Generated Certificates */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="glass rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Generated Certificates</h2>
            <QRHologram
              certificateData={{
                id: 'CERT-2025-001',
                studentName: userName,
                internshipTitle: 'Software Development Intern',
                company: 'TechCorp Solutions',
                duration: '6 months',
                workLogsCount: 124,
                verificationHash: '0x9f4a8c7e2d1b5f3a8c9e4d7b2a5f8c1e3d6b9a4c7e2f5a8b1d4c7e9f2a5b8c1d',
                issuedAt: '2025-09-15',
              }}
            />
          </motion.div>

          {/* Available Internships */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-12"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Available Internships</h2>
              
              {/* Tab Switcher */}
              <div className="glass rounded-xl p-1 inline-flex">
                <button
                  onClick={() => setSelectedTab('in-person')}
                  className={`px-6 py-2 rounded-lg font-semibold text-sm transition-all ${
                    selectedTab === 'in-person'
                      ? 'bg-gradient-to-r from-neon-blue to-primary-500 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  🏢 In-Person
                </button>
                <button
                  onClick={() => setSelectedTab('virtual')}
                  className={`px-6 py-2 rounded-lg font-semibold text-sm transition-all ${
                    selectedTab === 'virtual'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  💻 Virtual
                </button>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {filteredInternships.map((internship, index) => (
                <motion.div
                  key={internship.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  className="glass rounded-xl p-6 hover:shadow-glass transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">{internship.title}</h3>
                      <p className="text-sm text-slate-400">{internship.company}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-neon-green/20 text-neon-green text-xs font-semibold">
                      {internship.status}
                    </span>
                  </div>
                  <div className="space-y-2 mb-4 text-sm text-slate-400">
                    <div className="flex items-center space-x-2">
                      <span>{internship.type === 'virtual' ? '💻' : '🏢'}</span>
                      <span className="font-semibold text-white">{internship.type === 'virtual' ? 'Virtual' : 'In-Person'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span>📍</span>
                      <span>{internship.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span>⏱️</span>
                      <span>{internship.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span>💰</span>
                      <span>₹{internship.stipend.toLocaleString()}/month</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {internship.skills.map((skill) => (
                      <span key={skill} className="px-2 py-1 rounded bg-white/5 text-xs text-slate-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">{internship.applicants} applicants</span>
                    <button 
                      onClick={() => handleApply(internship.id, internship.title)}
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-neon-blue to-primary-500 hover:shadow-neon-hover transition-all text-sm font-semibold"
                    >
                      Apply Now
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      {/* Success Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="fixed top-24 right-6 z-50 glass rounded-xl p-6 max-w-md shadow-neon"
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-green to-green-500 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-1">🎉 Congratulations!</h3>
                <p className="text-sm text-slate-300 mb-2">
                  You've been selected for <strong>{appliedInternship}</strong>!
                </p>
                <p className="text-xs text-slate-400">
                  Check your email for next steps and onboarding details.
                </p>
              </div>
              <button
                onClick={() => setShowNotification(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Mentor Widget */}
      <AIMentorWidget />
    </>
  );
}
