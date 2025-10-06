import Head from 'next/head';
import { motion } from 'framer-motion';
import Link from 'next/link';
import NavBar from '@/components/NavBar';
import MetricCard from '@/components/MetricCard';
import AIMentorWidget from '@/components/AIMentorWidget';
import seedData from '@/data/seed.json';

export default function WebsiteAnalytics() {
  const analytics = seedData.analytics.website;

  const conversionFunnel = [
    { stage: 'Visitors', value: analytics.visitors, percentage: 100 },
    { stage: 'Signups', value: analytics.signups.student + analytics.signups.faculty + analytics.signups.industry + analytics.signups.government, percentage: 8 },
    { stage: 'Course Starts', value: analytics.courseStarts, percentage: 4.6 },
    { stage: 'Applications', value: analytics.applications, percentage: 2.7 },
  ];

  return (
    <>
      <Head>
        <title>Website Analytics - Prashiskshan</title>
        <meta name="description" content="Platform metrics and performance analytics" />
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
                <h1 className="heading-lg mb-2">Website Analytics</h1>
                <p className="body-md text-slate-400">Platform metrics and user engagement</p>
              </div>
              <div className="flex items-center space-x-3">
                <Link href="/analytics/stakeholder" className="btn-secondary text-sm py-2 px-6">
                  Stakeholder Analytics →
                </Link>
                <button className="btn-primary text-sm py-2 px-6">
                  📊 Export CSV
                </button>
              </div>
            </div>
          </motion.div>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <MetricCard
              title="Total Visitors"
              value={analytics.visitors.toLocaleString()}
              icon="👥"
              trend="up"
              change={15}
              color="from-neon-blue to-primary-500"
              delay={0}
            />
            <MetricCard
              title="Conversion Rate"
              value={`${analytics.conversionRate}%`}
              icon="📈"
              trend="up"
              change={8}
              color="from-green-500 to-emerald-500"
              delay={0.1}
            />
            <MetricCard
              title="Avg Session"
              value={analytics.avgSessionDuration}
              icon="⏱️"
              trend="up"
              change={12}
              color="from-purple-500 to-pink-500"
              delay={0.2}
            />
            <MetricCard
              title="Bounce Rate"
              value={`${analytics.bounceRate}%`}
              icon="↩️"
              trend="down"
              change={5}
              color="from-orange-500 to-red-500"
              delay={0.3}
            />
          </div>

          {/* Signups by Role */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass rounded-2xl p-8 mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Signups by Role</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { role: 'Student', value: analytics.signups.student, color: 'from-blue-500 to-cyan-500', icon: '🎓' },
                { role: 'Faculty', value: analytics.signups.faculty, color: 'from-purple-500 to-pink-500', icon: '👨‍🏫' },
                { role: 'Industry', value: analytics.signups.industry, color: 'from-green-500 to-emerald-500', icon: '🏢' },
                { role: 'Government', value: analytics.signups.government, color: 'from-yellow-500 to-orange-500', icon: '🏛️' },
              ].map((item, index) => (
                <motion.div
                  key={item.role}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="card-3d text-center"
                >
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-3xl`}>
                    {item.icon}
                  </div>
                  <p className="text-3xl font-bold text-white mb-2">{item.value.toLocaleString()}</p>
                  <p className="text-sm text-slate-400">{item.role}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Conversion Funnel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="glass rounded-2xl p-8 mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Conversion Funnel</h2>
            <div className="space-y-4">
              {conversionFunnel.map((stage, index) => (
                <motion.div
                  key={stage.stage}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white">{stage.stage}</span>
                    <div className="text-right">
                      <span className="text-lg font-bold text-white mr-3">{stage.value.toLocaleString()}</span>
                      <span className="text-sm text-slate-400">{stage.percentage}%</span>
                    </div>
                  </div>
                  <div className="h-12 bg-white/5 rounded-lg overflow-hidden relative">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${stage.percentage}%` }}
                      transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                      className="h-full bg-gradient-to-r from-neon-blue to-primary-500 flex items-center justify-end pr-4"
                    >
                      <span className="text-sm font-semibold text-white">{stage.percentage}%</span>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Page Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="glass rounded-2xl p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Page Performance</h2>
              <button className="text-sm text-neon-blue hover:text-neon-blue/80 font-medium">
                View Details →
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">Page</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-slate-400">Views</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-slate-400">Avg Time</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-slate-400">Bounce Rate</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-slate-400">Conversions</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { page: 'Landing Page', views: 125847, time: '3m 24s', bounce: '32.5%', conversions: 6.8 },
                    { page: 'Micro-Learning', views: 45234, time: '8m 12s', bounce: '18.3%', conversions: 12.4 },
                    { page: 'Student Portal', views: 38921, time: '12m 45s', bounce: '15.2%', conversions: 8.9 },
                    { page: 'SOS Page', views: 8234, time: '5m 33s', bounce: '28.7%', conversions: 45.2 },
                  ].map((row, index) => (
                    <motion.tr
                      key={row.page}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.9 + index * 0.05 }}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <p className="text-sm font-medium text-white">{row.page}</p>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="text-sm text-slate-300">{row.views.toLocaleString()}</span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="text-sm text-slate-300">{row.time}</span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="text-sm text-slate-300">{row.bounce}</span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="text-sm font-bold text-neon-green">{row.conversions}%</span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </main>

      {/* AI Mentor Widget */}
      <AIMentorWidget />
    </>
  );
}
