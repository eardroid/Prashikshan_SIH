import Head from 'next/head';
import { motion } from 'framer-motion';
import NavBar from '@/components/NavBar';

export default function DevelopersPage() {
  const apiEndpoints = [
    {
      method: 'POST',
      endpoint: '/api/auth/login',
      description: 'Authenticate user and return JWT token',
      params: ['email', 'password', 'role'],
    },
    {
      method: 'GET',
      endpoint: '/api/courses',
      description: 'Fetch available micro-learning courses',
      params: ['category', 'limit', 'offset'],
    },
    {
      method: 'POST',
      endpoint: '/api/sos',
      description: 'Submit SOS incident report',
      params: ['severity', 'description', 'evidence', 'anonymous'],
    },
    {
      method: 'GET',
      endpoint: '/api/analytics',
      description: 'Retrieve analytics data',
      params: ['type', 'role', 'dateRange'],
    },
    {
      method: 'POST',
      endpoint: '/api/verify',
      description: 'Verify certificate or institution',
      params: ['certificateId', 'type'],
    },
  ];

  return (
    <>
      <Head>
        <title>Developers - API Documentation - Prashiskshan</title>
        <meta name="description" content="API documentation for developers" />
      </Head>

      <NavBar />

      <main className="min-h-screen pt-20 pb-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple mb-6">
              <span className="text-4xl">👨‍💻</span>
            </div>
            <h1 className="heading-lg mb-4">Developer Documentation</h1>
            <p className="body-md max-w-3xl mx-auto">
              Build powerful integrations with the Prashiskshan API. Access verified internship data, analytics, and more.
            </p>
          </motion.div>

          {/* Quick Start */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass rounded-2xl p-8 mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Quick Start</h2>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-sm text-slate-400 mb-2">1. Get your API key from the dashboard</p>
                <code className="block p-3 rounded bg-slate-950 text-neon-blue text-sm font-mono">
                  API_KEY=your_api_key_here
                </code>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-sm text-slate-400 mb-2">2. Make your first request</p>
                <code className="block p-3 rounded bg-slate-950 text-neon-blue text-sm font-mono overflow-x-auto">
                  curl -H "Authorization: Bearer YOUR_API_KEY" https://api.prashiskshan.in/v1/courses
                </code>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-sm text-slate-400 mb-2">3. Handle the response</p>
                <code className="block p-3 rounded bg-slate-950 text-slate-300 text-sm font-mono">
                  {`{\n  "status": "success",\n  "data": [...],\n  "meta": { "total": 42 }\n}`}
                </code>
              </div>
            </div>
          </motion.div>

          {/* API Endpoints */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-6">API Endpoints</h2>
            <div className="space-y-4">
              {apiEndpoints.map((endpoint, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                  className="glass rounded-xl p-6 hover:shadow-glass transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                        endpoint.method === 'GET' ? 'bg-green-500/20 text-green-400' :
                        endpoint.method === 'POST' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-orange-500/20 text-orange-400'
                      }`}>
                        {endpoint.method}
                      </span>
                      <code className="text-sm font-mono text-neon-blue">{endpoint.endpoint}</code>
                    </div>
                  </div>
                  <p className="text-sm text-slate-300 mb-4">{endpoint.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs text-slate-400">Parameters:</span>
                    {endpoint.params.map((param) => (
                      <span key={param} className="px-2 py-1 rounded bg-white/5 text-xs font-mono text-slate-300">
                        {param}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* SDKs & Libraries */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass rounded-2xl p-8 mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-6">SDKs & Libraries</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: 'JavaScript/Node.js', icon: '📦', command: 'npm install @prashiskshan/sdk' },
                { name: 'Python', icon: '🐍', command: 'pip install prashiskshan' },
                { name: 'Java', icon: '☕', command: 'maven: com.prashiskshan:sdk' },
              ].map((sdk, index) => (
                <div key={index} className="p-6 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-4xl mb-3">{sdk.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{sdk.name}</h3>
                  <code className="block p-2 rounded bg-slate-950 text-neon-blue text-xs font-mono">
                    {sdk.command}
                  </code>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="glass rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Developer Support</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-neon-blue to-primary-500 flex items-center justify-center mb-4">
                  <span className="text-2xl">📚</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Documentation</h3>
                <p className="text-sm text-slate-400 mb-4">Comprehensive guides and API reference</p>
                <a href="#" className="text-sm text-neon-blue hover:text-neon-blue/80 font-medium">
                  View Docs →
                </a>
              </div>
              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
                  <span className="text-2xl">💬</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Developer Community</h3>
                <p className="text-sm text-slate-400 mb-4">Join our Discord for support and discussions</p>
                <a href="#" className="text-sm text-neon-blue hover:text-neon-blue/80 font-medium">
                  Join Discord →
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
}
