import Head from 'next/head';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import NavBar from '@/components/NavBar';
import MetricCard from '@/components/MetricCard';
import AIMentorWidget from '@/components/AIMentorWidget';

interface FacultyUser {
  name: string;
  institution: string;
  studentsSupervised: number;
  pendingApprovals: number;
}

export default function FacultyPortal() {
  const [user, setUser] = useState<FacultyUser>({
    name: 'Faculty Member',
    institution: 'Your Institution',
    studentsSupervised: 24,
    pendingApprovals: 4,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const name = localStorage.getItem('userName') || 'Faculty Member';
    const institutionCode = localStorage.getItem('institutionCode');
    const students = Number(localStorage.getItem('facultyStudentsSupervised')) || 24;
    const approvals = Number(localStorage.getItem('facultyPendingApprovals')) || 4;

    setUser({
      name,
      institution: institutionCode ? `Institution Code: ${institutionCode}` : 'Your Institution',
      studentsSupervised: students,
      pendingApprovals: approvals,
    });
  }, []);

  const students = [
    { id: 1, name: 'Priya Sharma', readiness: 78, logs: 24, status: 'active' },
    { id: 2, name: 'Rahul Verma', readiness: 85, logs: 31, status: 'active' },
    { id: 3, name: 'Ananya Singh', readiness: 72, logs: 18, status: 'flagged' },
    { id: 4, name: 'Arjun Patel', readiness: 91, logs: 42, status: 'active' },
    { id: 5, name: 'Sneha Reddy', readiness: 68, logs: 15, status: 'flagged' },
  ];

  const pendingApprovals = [
    { student: 'Priya Sharma', type: 'Work Log', date: '2025-10-03', hours: 4 },
    { student: 'Rahul Verma', type: 'Certificate Request', date: '2025-10-02', hours: null },
    { student: 'Ananya Singh', type: 'Work Log', date: '2025-10-02', hours: 3.5 },
  ];

  return (
    <>
      <Head>
        <title>Faculty Portal - Prashiskshan</title>
        <meta name="description" content="Faculty dashboard for student supervision" />
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
            <p className="body-md text-slate-400">{user.institution}</p>
          </motion.div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <MetricCard
              title="Students Supervised"
              value={user.studentsSupervised}
              icon="👥"
              trend="up"
              change={8}
              color="from-neon-blue to-primary-500"
              delay={0}
            />
            <MetricCard
              title="Pending Approvals"
              value={user.pendingApprovals}
              icon="⏳"
              trend="down"
              change={15}
              color="from-orange-500 to-red-500"
              delay={0.1}
            />
            <MetricCard
              title="Avg Readiness"
              value="79%"
              icon="📊"
              trend="up"
              change={5}
              color="from-green-500 to-emerald-500"
              delay={0.2}
            />
            <MetricCard
              title="SOS Cases"
              value={2}
              icon="🆘"
              trend="neutral"
              color="from-purple-500 to-pink-500"
              delay={0.3}
            />
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Students & Approvals */}
            <div className="lg:col-span-2 space-y-8">
              {/* Pending Approvals */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="glass rounded-2xl p-8"
              >
                <h2 className="text-2xl font-bold text-white mb-6">Pending Approvals</h2>
                <div className="space-y-4">
                  {pendingApprovals.map((approval, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                      className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white mb-1">{approval.student}</p>
                        <p className="text-xs text-slate-400">
                          {approval.type} • {new Date(approval.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          {approval.hours && ` • ${approval.hours}h`}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="px-4 py-2 rounded-lg bg-neon-green/20 border border-neon-green/50 text-neon-green hover:bg-neon-green/30 transition-colors text-sm font-semibold">
                          Approve
                        </button>
                        <button className="px-4 py-2 rounded-lg bg-red-500/20 border border-red-500/50 text-red-400 hover:bg-red-500/30 transition-colors text-sm font-semibold">
                          Reject
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Students Under Supervision */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="glass rounded-2xl p-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Students Under Supervision</h2>
                  <button className="btn-secondary text-sm py-2 px-4">
                    📥 Import CSV
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">Student</th>
                        <th className="text-center py-3 px-4 text-sm font-semibold text-slate-400">Readiness</th>
                        <th className="text-center py-3 px-4 text-sm font-semibold text-slate-400">Work Logs</th>
                        <th className="text-center py-3 px-4 text-sm font-semibold text-slate-400">Status</th>
                        <th className="text-right py-3 px-4 text-sm font-semibold text-slate-400">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((student, index) => (
                        <motion.tr
                          key={student.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
                          className="border-b border-white/5 hover:bg-white/5 transition-colors"
                        >
                          <td className="py-4 px-4">
                            <p className="text-sm font-medium text-white">{student.name}</p>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <span className={`text-sm font-bold ${
                              student.readiness >= 80 ? 'text-neon-green' :
                              student.readiness >= 60 ? 'text-neon-blue' :
                              'text-orange-400'
                            }`}>
                              {student.readiness}%
                            </span>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <span className="text-sm text-slate-300">{student.logs}</span>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              student.status === 'active' ? 'bg-neon-green/20 text-neon-green' :
                              'bg-orange-500/20 text-orange-400'
                            }`}>
                              {student.status}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-right">
                            <button className="text-sm text-neon-blue hover:text-neon-blue/80 font-medium">
                              View →
                            </button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Bulk Actions */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-400">Select students for bulk actions</p>
                    <button className="btn-primary text-sm py-2 px-6">
                      Award Credits
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Quick Actions & SOS */}
            <div className="space-y-8">
              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="glass rounded-2xl p-6"
              >
                <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-left">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">➕</span>
                      <span className="text-sm font-medium text-white">Invite Students</span>
                    </div>
                  </button>
                  <button className="w-full p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-left">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">📊</span>
                      <span className="text-sm font-medium text-white">View Analytics</span>
                    </div>
                  </button>
                  <button className="w-full p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-left">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">📄</span>
                      <span className="text-sm font-medium text-white">Generate Report</span>
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

              {/* SOS Inbox */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="glass rounded-2xl p-6 border-2 border-orange-500/30"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center">
                    <span className="text-xl">🆘</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">SOS Inbox</h3>
                    <p className="text-xs text-slate-400">2 cases require attention</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/30">
                    <p className="text-sm font-medium text-white mb-1">Ananya Singh</p>
                    <p className="text-xs text-slate-400 mb-2">Payment delay issue</p>
                    <button className="text-xs text-orange-400 hover:text-orange-300 font-medium">
                      View Case →
                    </button>
                  </div>
                  <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30">
                    <p className="text-sm font-medium text-white mb-1">Rahul Verma</p>
                    <p className="text-xs text-slate-400 mb-2">General inquiry</p>
                    <button className="text-xs text-green-400 hover:text-green-300 font-medium">
                      View Case →
                    </button>
                  </div>
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
