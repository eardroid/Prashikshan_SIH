import { useState, useEffect, Suspense } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';
import NavBar from '@/components/NavBar';
import RoleLoginModal from '@/components/RoleLoginModal';
import { useLowDataMode } from '@/context/LowDataModeContext';

// Dynamically import 3D component to avoid SSR issues
const HeroGlobe = dynamic(() => import('@/components/HeroGlobe'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 blur-3xl" />,
});

export default function Home() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, 200], [1, 1.03]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const { isLowDataMode } = useLowDataMode();

  useEffect(() => {
    // Add scroll reveal observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.scroll-reveal').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: '🔐',
      title: 'Verified & Secure',
      description: 'Blockchain-backed certificates with immutable verification',
    },
    {
      icon: '📊',
      title: 'Real-time Analytics',
      description: 'Track progress, readiness scores, and outcomes',
    },
    {
      icon: '🎓',
      title: 'Micro-Learning',
      description: 'AI-powered skill development and readiness training',
    },
    {
      icon: '🤝',
      title: 'Multi-Stakeholder',
      description: 'Seamless collaboration between students, faculty, and industry',
    },
    {
      icon: '💰',
      title: 'Escrow Protection',
      description: 'Milestone-based payments with automatic disbursement',
    },
    {
      icon: '🆘',
      title: 'SOS Support',
      description: 'Immediate incident response and triage system',
    },
  ];

  const stats = [
    { value: '8,542', label: 'Active Students' },
    { value: '247', label: 'Partner Institutions' },
    { value: '523', label: 'Industry Partners' },
    { value: '94.7%', label: 'Satisfaction Rate' },
  ];

  return (
    <>
      <Head>
        <title>Prashiskshan - Verified Internships. Trusted Outcomes.</title>
        <meta name="description" content="Secure, auditable internships for colleges, industry and institutions." />
      </Head>

      <NavBar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax */}
        <motion.div
          data-low-visual="hide"
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/80 to-slate-950" />
        </motion.div>

        {/* 3D Globe Overlay */}
        {!isLowDataMode && (
          <Suspense fallback={null}>
            <HeroGlobe />
          </Suspense>
        )}

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 0.9, 0.35, 1] }}
          >
            <h1 className="heading-display mb-6">
              Verified Internships.
              <br />
              <span className="text-gradient">Trusted Outcomes.</span>
            </h1>
            <p className="body-lg max-w-3xl mx-auto mb-12">
              Secure, auditable internships for colleges, industry and institutions.
              <br />
              Built on trust, powered by technology.
            </p>

            {/* CTAs for Each Stakeholder */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 max-w-3xl mx-auto">
              {[{ label: 'Student', icon: '🎓' }, { label: 'Faculty', icon: '👨‍🏫' }, { label: 'Industry', icon: '🏢' }].map(
                ({ label, icon }) => (
                  <button
                    key={label}
                    onClick={() => setIsLoginModalOpen(true)}
                    className={`w-full px-6 py-4 rounded-xl font-semibold text-base transition-all duration-150
                      ${isLowDataMode ? 'bg-slate-900 border border-slate-700 text-slate-200' : 'bg-gradient-to-r from-slate-800 to-slate-700 text-white hover:shadow-neon-hover hover:scale-[1.03] active:scale-[0.98]'}`}
                  >
                    <span className="text-2xl mb-2 block">{icon}</span>
                    <span className="block">Get Started</span>
                    <span className="text-xs opacity-80">{label}</span>
                  </button>
                )
              )}
            </div>

            {/* Info text */}
            <p className="text-sm text-slate-400">
              Choose your role to create an account and access your personalized portal
            </p>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-slate-400"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="product" className="py-32 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="heading-lg mb-4">Built for Trust & Transparency</h2>
            <p className="body-md max-w-2xl mx-auto">
              A comprehensive platform designed for verified, auditable internship experiences
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-3d"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portals Preview */}
      <section id="portals" className="py-32 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="heading-lg mb-4">Role-Based Portals</h2>
            <p className="body-md max-w-2xl mx-auto">
              Tailored experiences for every stakeholder
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { role: 'Student', icon: '🎓', href: '/portals/student', color: 'from-blue-500 to-cyan-500' },
              { role: 'Faculty', icon: '👨‍🏫', href: '/portals/faculty', color: 'from-purple-500 to-pink-500' },
              { role: 'Industry', icon: '🏢', href: '/portals/industry', color: 'from-green-500 to-emerald-500' },
            ].map((portal, index) => (
              <Link key={index} href={portal.href}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card-3d group cursor-pointer"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${portal.color} flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {portal.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{portal.role} Portal</h3>
                  <p className="text-slate-400 mb-4">Explore the {portal.role.toLowerCase()} dashboard</p>
                  <div className="flex items-center text-neon-blue group-hover:translate-x-2 transition-transform duration-300">
                    <span className="text-sm font-semibold">View Portal</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-32 bg-slate-950">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-12"
          >
            <h2 className="heading-md mb-4">Ready to Get Started?</h2>
            <p className="body-md mb-8">
              Join thousands of students, institutions, and companies building verified internship experiences
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="px-6 py-4 rounded-xl font-semibold text-base
                         bg-gradient-to-r from-blue-500 to-cyan-500
                         hover:shadow-neon-hover hover:scale-[1.03]
                         active:scale-[0.98]
                         transition-all duration-150"
              >
                <span className="text-2xl mb-2 block">🎓</span>
                <span className="block">Get Started</span>
                <span className="text-xs opacity-80">Student</span>
              </button>

              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="px-6 py-4 rounded-xl font-semibold text-base
                         bg-gradient-to-r from-purple-500 to-pink-500
                         hover:shadow-neon-hover hover:scale-[1.03]
                         active:scale-[0.98]
                         transition-all duration-150"
              >
                <span className="text-2xl mb-2 block">👨‍🏫</span>
                <span className="block">Get Started</span>
                <span className="text-xs opacity-80">Faculty</span>
              </button>

              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="px-6 py-4 rounded-xl font-semibold text-base
                         bg-gradient-to-r from-green-500 to-emerald-500
                         hover:shadow-neon-hover hover:scale-[1.03]
                         active:scale-[0.98]
                         transition-all duration-150"
              >
                <span className="text-2xl mb-2 block">🏢</span>
                <span className="block">Get Started</span>
                <span className="text-xs opacity-80">Industry</span>
              </button>
            </div>
            <p className="text-sm text-slate-400 mt-6">
              For support or inquiries: <a href="mailto:contact@prashiskshan.in" className="text-neon-blue hover:text-neon-blue/80 underline">contact@prashiskshan.in</a>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-950 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Prashiskshan</h3>
              <p className="text-sm text-slate-400">Verified internships for trusted outcomes.</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/micro-learning" className="hover:text-white transition-colors">Micro-Learning</Link></li>
                <li><Link href="/portals/student" className="hover:text-white transition-colors">Portals</Link></li>
                <li><Link href="/analytics/website" className="hover:text-white transition-colors">Analytics</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/sos" className="hover:text-white transition-colors">SOS</Link></li>
                <li><a href="mailto:help@prashiskshan.in" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="mailto:support@prashiskshan.in" className="hover:text-white transition-colors">Contact Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 text-center text-sm text-slate-400">
            <p>&copy; 2025 Prashiskshan. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      <RoleLoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  );
}
