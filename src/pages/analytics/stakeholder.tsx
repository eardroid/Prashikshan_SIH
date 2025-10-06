import Head from 'next/head';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import NavBar from '@/components/NavBar';
import MetricCard from '@/components/MetricCard';
import AIMentorWidget from '@/components/AIMentorWidget';
import seedData from '@/data/seed.json';

export default function StakeholderAnalytics() {
  const [selectedRole, setSelectedRole] = useState<'colleges' | 'industry' | 'government'>('colleges');
  const analytics = seedData.analytics.stakeholder;

  const collegeData = analytics.colleges;
  const industryData = analytics.industry;
  const governmentData = analytics.government;

  return (
    <>
      <Head>
        <title>Stakeholder Analytics - Prashiskshan</title>
        <meta name="description" content="Role-filtered analytics dashboards" />
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
            <div className="flex items-center justify-between">
              <div>
                <h1 className="heading-lg mb-2">Stakeholder Analytics</h1>
                <p className="body-md text-slate-400">Role-filtered insights and metrics</p>
              </div>
              <div className="flex items-center space-x-3">
                <Link href="/analytics/website" className="btn-secondary text-sm py-2 px-6">
                  ← Website Analytics
                </Link>
                <button className="btn-primary text-sm py-2 px-6">
                  📅 Schedule Report
                </button>
              </div>
            </div>
          </motion.div>

          {/* Role Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12"
          >
            <div className="glass rounded-2xl p-2 inline-flex space-x-2">
              {[
                { id: 'colleges', label: 'Colleges', icon: '🎓' },
                { id: 'industry', label: 'Industry', icon: '🏢' },
                { id: 'government', label: 'Government', icon: '🏛️' },
              ].map((role) => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id as any)}
                  className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all ${
                    selectedRole === role.id
                      ? 'bg-gradient-to-r from-neon-blue to-primary-500 text-white shadow-neon'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="mr-2">{role.icon}</span>
                  {role.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* College Analytics */}
          {selectedRole === 'colleges' && (
            <motion.div
              key="colleges"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid md:grid-cols-4 gap-6 mb-12">
                <MetricCard
                  title="Total Institutions"
                  value={collegeData.totalInstitutions}
                  icon="🏫"
                  trend="up"
                  change={12}
                  color="from-neon-blue to-primary-500"
                  delay={0}
                />
                <MetricCard
                  title="Active Students"
                  value={collegeData.activeStudents.toLocaleString()}
                  icon="👨‍🎓"
                  trend="up"
                  change={18}
                  color="from-purple-500 to-pink-500"
                  delay={0.1}
                />
                <MetricCard
                  title="Completion Rate"
                  value={`${collegeData.completionRate}%`}
                  icon="✅"
                  trend="up"
                  change={5}
                  color="from-green-500 to-emerald-500"
                  delay={0.2}
                />
                <MetricCard
                  title="Avg Readiness"
                  value={`${collegeData.avgReadiness}%`}
                  icon="📊"
                  trend="up"
                  change={8}
                  color="from-yellow-500 to-orange-500"
                  delay={0.3}
                />
              </div>

              <div className="grid lg:grid-cols-2 gap-8 mb-12">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="glass rounded-2xl p-8"
                >
                  <h2 className="text-2xl font-bold text-white mb-6">Financial Overview</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                      <span className="text-slate-300">Stipends Disbursed</span>
                      <span className="text-xl font-bold text-neon-green">
                        ₹{(collegeData.stipendsDisbursed / 100000).toFixed(1)}L
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                      <span className="text-slate-300">Avg per Student</span>
                      <span className="text-xl font-bold text-white">
                        ₹{Math.floor(collegeData.stipendsDisbursed / collegeData.activeStudents).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="glass rounded-2xl p-8"
                >
                  <h2 className="text-2xl font-bold text-white mb-6">Support Metrics</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                      <span className="text-slate-300">SOS Cases</span>
                      <span className="text-xl font-bold text-orange-400">{collegeData.sosCount}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                      <span className="text-slate-300">Resolution Rate</span>
                      <span className="text-xl font-bold text-neon-green">94.2%</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Industry Analytics */}
          {selectedRole === 'industry' && (
            <motion.div
              key="industry"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid md:grid-cols-4 gap-6 mb-12">
                <MetricCard
                  title="Total Companies"
                  value={industryData.totalCompanies}
                  icon="🏢"
                  trend="up"
                  change={15}
                  color="from-neon-blue to-primary-500"
                  delay={0}
                />
                <MetricCard
                  title="Active Postings"
                  value={industryData.activePostings.toLocaleString()}
                  icon="📋"
                  trend="up"
                  change={22}
                  color="from-purple-500 to-pink-500"
                  delay={0.1}
                />
                <MetricCard
                  title="Applications"
                  value={industryData.applicationsReceived.toLocaleString()}
                  icon="📨"
                  trend="up"
                  change={28}
                  color="from-green-500 to-emerald-500"
                  delay={0.2}
                />
                <MetricCard
                  title="Hires Completed"
                  value={industryData.hiresCompleted.toLocaleString()}
                  icon="✅"
                  trend="up"
                  change={18}
                  color="from-yellow-500 to-orange-500"
                  delay={0.3}
                />
              </div>

              <div className="grid lg:grid-cols-2 gap-8 mb-12">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="glass rounded-2xl p-8"
                >
                  <h2 className="text-2xl font-bold text-white mb-6">Hiring Metrics</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                      <span className="text-slate-300">Avg Time to Hire</span>
                      <span className="text-xl font-bold text-white">{industryData.avgTimeToHire}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                      <span className="text-slate-300">Conversion Rate</span>
                      <span className="text-xl font-bold text-neon-green">
                        {((industryData.hiresCompleted / industryData.applicationsReceived) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="glass rounded-2xl p-8"
                >
                  <h2 className="text-2xl font-bold text-white mb-6">Payment Accuracy</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                      <span className="text-slate-300">Stipend Accuracy</span>
                      <span className="text-xl font-bold text-neon-green">{industryData.stipendAccuracy}%</span>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                      <span className="text-slate-300">On-time Payments</span>
                      <span className="text-xl font-bold text-neon-green">96.8%</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Government Analytics */}
          {selectedRole === 'government' && (
            <motion.div
              key="government"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid md:grid-cols-4 gap-6 mb-12">
                <MetricCard
                  title="States Covered"
                  value={governmentData.statesCovered}
                  icon="🗺️"
                  trend="up"
                  change={8}
                  color="from-neon-blue to-primary-500"
                  delay={0}
                />
                <MetricCard
                  title="Districts Covered"
                  value={governmentData.districtsCovered}
                  icon="📍"
                  trend="up"
                  change={12}
                  color="from-purple-500 to-pink-500"
                  delay={0.1}
                />
                <MetricCard
                  title="Rural Reach"
                  value={`${governmentData.ruralReach}%`}
                  icon="🌾"
                  trend="up"
                  change={15}
                  color="from-green-500 to-emerald-500"
                  delay={0.2}
                />
                <MetricCard
                  title="Total Beneficiaries"
                  value={governmentData.totalBeneficiaries.toLocaleString()}
                  icon="👥"
                  trend="up"
                  change={22}
                  color="from-yellow-500 to-orange-500"
                  delay={0.3}
                />
              </div>

              <div className="grid lg:grid-cols-2 gap-8 mb-12">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="glass rounded-2xl p-8"
                >
                  <h2 className="text-2xl font-bold text-white mb-6">Virtual Internships</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                      <span className="text-slate-300">Total Virtual Internships</span>
                      <span className="text-xl font-bold text-white">{governmentData.virtualInternships.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                      <span className="text-slate-300">Rural Participation</span>
                      <span className="text-xl font-bold text-neon-green">
                        {Math.floor(governmentData.virtualInternships * (governmentData.ruralReach / 100)).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="glass rounded-2xl p-8"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white">Adoption Map</h2>
                    <span className="text-xs text-slate-500 uppercase tracking-wide">Source: Survey of India</span>
                  </div>
                  <div className="aspect-video rounded-lg overflow-hidden border border-white/10">
                    <img
                      src="/images/maps/india-official-heatmap.png"
                      alt="Official India Heatmap showing adoption intensity"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Export Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="glass rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Export & Scheduling</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <button className="p-6 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-left group">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-neon-blue to-primary-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Export CSV</h3>
                <p className="text-sm text-slate-400">Download current data as CSV</p>
              </button>

              <button className="p-6 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-left group">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">📄</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Generate PDF</h3>
                <p className="text-sm text-slate-400">Create detailed PDF report</p>
              </button>

              <button className="p-6 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-left group">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">📅</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Schedule Report</h3>
                <p className="text-sm text-slate-400">Set up automated reports</p>
              </button>
            </div>
          </motion.div>
        </div>
      </main>

      {/* AI Mentor Widget */}
      <AIMentorWidget />
    </>
  );
}
