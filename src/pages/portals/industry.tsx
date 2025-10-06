import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import NavBar from '@/components/NavBar';
import MetricCard from '@/components/MetricCard';
import AIMentorWidget from '@/components/AIMentorWidget';

interface IndustryUser {
  name: string;
  company: string;
  activePostings: number;
  applicantsReceived: number;
}

export default function IndustryPortal() {
  const [user, setUser] = useState<IndustryUser>({
    name: 'Industry Partner',
    company: 'Your Company',
    activePostings: 5,
    applicantsReceived: 132,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const name = localStorage.getItem('userName') || 'Industry Partner';
    const company = localStorage.getItem('institutionCode')
      ? `Company Code: ${localStorage.getItem('institutionCode')}`
      : 'Your Company';
    const postings = Number(localStorage.getItem('industryActivePostings')) || 5;
    const applicants = Number(localStorage.getItem('industryApplicantsReceived')) || 132;

    setUser({
      name,
      company,
      activePostings: postings,
      applicantsReceived: applicants,
    });
  }, []);
  const [showPostingForm, setShowPostingForm] = useState(false);
  const [internshipType, setInternshipType] = useState<'in-person' | 'virtual'>('in-person');
  const [showVirtualDesigner, setShowVirtualDesigner] = useState(false);

  const applicants = [
    { id: 1, name: 'Priya Sharma', readiness: 78, skills: ['React', 'Node.js'], applied: '2025-10-01' },
    { id: 2, name: 'Rahul Verma', readiness: 85, skills: ['React', 'TypeScript'], applied: '2025-10-02' },
    { id: 3, name: 'Arjun Patel', readiness: 91, skills: ['React', 'Node.js', 'MongoDB'], applied: '2025-10-03' },
  ];

  return (
    <>
      <Head>
        <title>Industry Portal - Prashiskshan</title>
        <meta name="description" content="Industry dashboard for internship management" />
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
            <h1 className="heading-lg mb-2">Welcome, {user.name}</h1>
            <p className="body-md text-slate-400">{user.company}</p>
          </motion.div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <MetricCard
              title="Active Postings"
              value={user.activePostings}
              icon="📋"
              trend="up"
              change={12}
              color="from-neon-blue to-primary-500"
              delay={0}
            />
            <MetricCard
              title="Applicants Received"
              value={user.applicantsReceived}
              icon="👥"
              trend="up"
              change={23}
              color="from-purple-500 to-pink-500"
              delay={0.1}
            />
            <MetricCard
              title="Hires Completed"
              value={18}
              icon="✅"
              trend="up"
              change={15}
              color="from-green-500 to-emerald-500"
              delay={0.2}
            />
            <MetricCard
              title="Avg Readiness"
              value="82%"
              icon="📊"
              trend="up"
              change={7}
              color="from-yellow-500 to-orange-500"
              delay={0.3}
            />
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Postings & Applicants */}
            <div className="lg:col-span-2 space-y-8">
              {/* Post New Internship */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="glass rounded-2xl p-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Post New Internship</h2>
                  <button
                    onClick={() => setShowPostingForm(!showPostingForm)}
                    className="btn-primary text-sm py-2 px-6"
                  >
                    {showPostingForm ? 'Cancel' : '+ New Posting'}
                  </button>
                </div>

                {showPostingForm && (
                  <motion.form
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4"
                  >
                    {/* Internship Type Selector */}
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-3">Internship Type</label>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={() => setInternshipType('in-person')}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            internshipType === 'in-person'
                              ? 'border-neon-blue bg-neon-blue/20 text-white'
                              : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10'
                          }`}
                        >
                          <span className="text-2xl mb-2 block">🏢</span>
                          <span className="font-semibold">In-Person</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setInternshipType('virtual');
                            setShowVirtualDesigner(true);
                          }}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            internshipType === 'virtual'
                              ? 'border-purple-500 bg-purple-500/20 text-white'
                              : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10'
                          }`}
                        >
                          <span className="text-2xl mb-2 block">💻</span>
                          <span className="font-semibold">Virtual</span>
                        </button>
                      </div>
                    </div>

                    {/* Virtual Internship Designer Link */}
                    {internshipType === 'virtual' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/30"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-semibold text-white mb-1">🎨 Design Your Virtual Internship</p>
                            <p className="text-xs text-slate-400">Create custom tasks, milestones, and deliverables</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setShowVirtualDesigner(!showVirtualDesigner)}
                            className="px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-white text-sm font-semibold transition-colors"
                          >
                            {showVirtualDesigner ? 'Hide Designer' : 'Click Here'}
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* Virtual Internship Designer */}
                    <AnimatePresence>
                      {showVirtualDesigner && internshipType === 'virtual' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="p-6 rounded-xl bg-purple-500/5 border border-purple-500/20 space-y-4"
                        >
                          <h3 className="text-lg font-bold text-white mb-4">Virtual Internship Designer</h3>
                          
                          <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Weekly Tasks</label>
                            <textarea rows={3} className="input-field" placeholder="Week 1: Orientation and tool setup\nWeek 2: First project assignment..." />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Deliverables</label>
                            <input type="text" className="input-field" placeholder="e.g. 3 projects, 1 final presentation" />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Communication Tools</label>
                            <input type="text" className="input-field" placeholder="e.g. Slack, Zoom, Google Meet" />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Evaluation Criteria</label>
                            <textarea rows={2} className="input-field" placeholder="Code quality, timeliness, communication..." />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Job Title</label>
                      <input type="text" className="input-field" placeholder="e.g. Software Development Intern" />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Duration</label>
                        <input type="text" className="input-field" placeholder="e.g. 6 months" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Stipend (₹/month)</label>
                        <input type="number" className="input-field" placeholder="25000" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Location</label>
                      <input type="text" className="input-field" placeholder={internshipType === 'virtual' ? 'Remote' : 'e.g. Bangalore'} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Required Skills</label>
                      <input type="text" className="input-field" placeholder="e.g. React, Node.js, MongoDB" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                      <textarea rows={4} className="input-field" placeholder="Job description..." />
                    </div>
                    <button type="submit" className="btn-primary w-full py-3">
                      Post {internshipType === 'virtual' ? 'Virtual' : 'In-Person'} Internship
                    </button>
                  </motion.form>
                )}
              </motion.div>

              {/* Filtered Applicants */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="glass rounded-2xl p-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Recent Applicants</h2>
                  <div className="flex items-center space-x-3">
                    <select className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-sm">
                      <option>All Postings</option>
                      <option>Full Stack Developer</option>
                      <option>Data Science Intern</option>
                    </select>
                    <select className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-sm">
                      <option>Min Readiness: 70%</option>
                      <option>Min Readiness: 80%</option>
                      <option>Min Readiness: 90%</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  {applicants.map((applicant, index) => (
                    <motion.div
                      key={applicant.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
                      className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <p className="text-sm font-medium text-white">{applicant.name}</p>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            applicant.readiness >= 85 ? 'bg-neon-green/20 text-neon-green' :
                            applicant.readiness >= 70 ? 'bg-neon-blue/20 text-neon-blue' :
                            'bg-orange-500/20 text-orange-400'
                          }`}>
                            {applicant.readiness}% Ready
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 mb-2">
                          {applicant.skills.map((skill) => (
                            <span key={skill} className="px-2 py-1 rounded bg-white/5 text-xs text-slate-300">
                              {skill}
                            </span>
                          ))}
                        </div>
                        <p className="text-xs text-slate-400">
                          Applied: {new Date(applicant.applied).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="px-4 py-2 rounded-lg bg-neon-blue/20 border border-neon-blue/50 text-neon-blue hover:bg-neon-blue/30 transition-colors text-sm font-semibold">
                          View Profile
                        </button>
                        <button className="px-4 py-2 rounded-lg bg-neon-green/20 border border-neon-green/50 text-neon-green hover:bg-neon-green/30 transition-colors text-sm font-semibold">
                          Shortlist
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column - Escrow & Quick Actions */}
            <div className="space-y-8">
              {/* Escrow Wallet */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="glass rounded-2xl p-6"
              >
                <h3 className="text-lg font-bold text-white mb-4">Escrow Wallet</h3>
                <div className="mb-6">
                  <p className="text-sm text-slate-400 mb-2">Available Balance</p>
                  <p className="text-3xl font-bold text-gradient">₹4,50,000</p>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Locked in Escrow</span>
                    <span className="text-white font-medium">₹2,00,000</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Pending Disbursement</span>
                    <span className="text-white font-medium">₹75,000</span>
                  </div>
                </div>
                <button className="w-full btn-primary py-3 text-sm">
                  💰 Add Funds
                </button>
              </motion.div>

              {/* Milestones */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="glass rounded-2xl p-6"
              >
                <h3 className="text-lg font-bold text-white mb-4">Active Milestones</h3>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-white">Month 1 Completion</p>
                      <span className="px-2 py-1 rounded-full bg-neon-green/20 text-neon-green text-xs font-semibold">
                        Completed
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">₹25,000 disbursed</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-white">Month 2 Completion</p>
                      <span className="px-2 py-1 rounded-full bg-neon-blue/20 text-neon-blue text-xs font-semibold">
                        In Progress
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">₹25,000 pending</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-white">Final Evaluation</p>
                      <span className="px-2 py-1 rounded-full bg-slate-500/20 text-slate-400 text-xs font-semibold">
                        Upcoming
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">₹25,000 locked</p>
                  </div>
                </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="glass rounded-2xl p-6"
              >
                <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-left">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">📊</span>
                      <span className="text-sm font-medium text-white">View Analytics</span>
                    </div>
                  </button>
                  <button className="w-full p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-left">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">📄</span>
                      <span className="text-sm font-medium text-white">Download Reports</span>
                    </div>
                  </button>
                  <button className="w-full p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-left">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">⚙️</span>
                      <span className="text-sm font-medium text-white">Settings</span>
                    </div>
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      {/* AI Mentor Widget */}
      <AIMentorWidget />
    </>
  );
}
