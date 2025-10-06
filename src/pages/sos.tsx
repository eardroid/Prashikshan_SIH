import Head from 'next/head';
import { motion } from 'framer-motion';
import NavBar from '@/components/NavBar';
import SOSForm from '@/components/SOSForm';
import AIMentorWidget from '@/components/AIMentorWidget';

export default function SOSPage() {
  return (
    <>
      <Head>
        <title>SOS - Report an Incident - Prashiskshan</title>
        <meta name="description" content="Immediate incident response and support system" />
      </Head>

      <NavBar />

      <main className="min-h-screen pt-20 pb-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-orange-500 mb-6">
              <span className="text-4xl">🆘</span>
            </div>
            <h1 className="heading-lg mb-4">Report an Incident — Immediate Response Options</h1>
            <p className="body-md max-w-3xl mx-auto">
              Your safety and well-being are our top priority. Submit an incident report and our team will respond according to the severity level.
            </p>
          </motion.div>

          {/* Emergency Contact Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12 glass rounded-2xl p-6 border-2 border-red-500/30 bg-red-500/5"
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-xl bg-red-500 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">📞</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-2">Emergency Helpline Available 24/7</h3>
                <p className="text-slate-300 mb-3">
                  If you're in immediate danger, please call our emergency helpline or local authorities.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href="tel:1800-XXX-XXXX" className="px-6 py-2.5 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition-colors">
                    📞 Call: 1800-XXX-XXXX
                  </a>
                  <a href="tel:100" className="px-6 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors">
                    🚨 Police: 100
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* SOS Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass rounded-2xl p-8 md:p-12"
          >
            <SOSForm />
          </motion.div>

          {/* Information Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 grid md:grid-cols-3 gap-6"
          >
            <div className="glass rounded-xl p-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mb-4">
                <span className="text-2xl">🚨</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Severe (RED)</h3>
              <p className="text-sm text-slate-400 mb-3">
                Immediate danger, harassment, or safety concerns
              </p>
              <p className="text-xs text-slate-500">
                Response: Immediate phone call + SMS to emergency contacts
              </p>
            </div>

            <div className="glass rounded-xl p-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-4">
                <span className="text-2xl">⚠️</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Serious (ORANGE)</h3>
              <p className="text-sm text-slate-400 mb-3">
                Payment issues, contract violations, workplace concerns
              </p>
              <p className="text-xs text-slate-500">
                Response: 24-hour triage and investigation
              </p>
            </div>

            <div className="glass rounded-xl p-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-4">
                <span className="text-2xl">ℹ️</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Informational (GREEN)</h3>
              <p className="text-sm text-slate-400 mb-3">
                Questions, clarifications, general guidance
              </p>
              <p className="text-xs text-slate-500">
                Response: 72-hour support team response
              </p>
            </div>
          </motion.div>

          {/* Privacy Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <p className="text-sm text-slate-400 max-w-2xl mx-auto">
              All reports are handled with strict confidentiality. Your information is encrypted and only accessible to authorized response personnel. 
              We comply with all data protection regulations and incident response protocols.
            </p>
          </motion.div>
        </div>
      </main>

      {/* AI Mentor Widget */}
      <AIMentorWidget />
    </>
  );
}
