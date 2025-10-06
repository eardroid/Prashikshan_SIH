import { useState, Fragment } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const loginSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  institutionCode: z.string().optional(),
  role: z.enum(['student', 'faculty', 'industry']),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface RoleLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
}

export default function RoleLoginModal({
  isOpen,
  onClose,
  initialMode = 'login',
}: RoleLoginModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [selectedRole, setSelectedRole] = useState<'student' | 'faculty' | 'industry'>('student');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [userName, setUserName] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      role: selectedRole,
    },
  });

  const password = watch('password', '');

  const getPasswordStrength = (pwd: string) => {
    if (pwd.length === 0) return { strength: 0, label: '' };
    if (pwd.length < 8) return { strength: 25, label: 'Weak' };
    if (pwd.length < 12) return { strength: 50, label: 'Fair' };
    if (pwd.length < 16) return { strength: 75, label: 'Good' };
    return { strength: 100, label: 'Strong' };
  };

  const passwordStrength = getPasswordStrength(password);

  const onSubmit = async (data: LoginFormData) => {
    console.log('Form submitted:', data);
    
    if (mode === 'signup') {
      const name = data.name || 'User';
      setUserName(name);
      
      // Store user data in localStorage
      localStorage.setItem('userName', name);
      localStorage.setItem('userEmail', data.email);
      localStorage.setItem('userRole', selectedRole);
      localStorage.setItem('institutionCode', data.institutionCode || 'N/A');
      
      setIsAnalyzing(true);
      // Simulate analysis
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setIsAnalyzing(false);
      setShowOnboarding(true);
    } else {
      // Mock authentication for login
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Check for default credentials
      if (data.email === 'vijay.sharma@xyz.edu' && data.password === 'Demo@123') {
        localStorage.setItem('userName', 'Vijay Sharma');
        localStorage.setItem('userEmail', 'vijay.sharma@xyz.edu');
        localStorage.setItem('userRole', selectedRole);
        localStorage.setItem('institutionCode', 'XYZ-2024');
      } else {
        // For other logins, use email as name
        localStorage.setItem('userName', data.email.split('@')[0]);
        localStorage.setItem('userEmail', data.email);
        localStorage.setItem('userRole', selectedRole);
        localStorage.setItem('institutionCode', data.institutionCode || 'N/A');
      }
      
      onClose();
      // Redirect to appropriate portal
      window.location.href = `/portals/${selectedRole}`;
    }
  };

  const roles = [
    { id: 'student', label: 'Student', icon: '🎓' },
    { id: 'faculty', label: 'Faculty', icon: '👨‍🏫' },
    { id: 'industry', label: 'Industry', icon: '🏢' },
  ] as const;

  const getOnboardingContent = () => {
    switch (selectedRole) {
      case 'student':
        return {
          title: 'Quick Readiness Quiz',
          questions: [
            'Have you completed your resume?',
            'Are you familiar with professional email etiquette?',
            'Do you have a LinkedIn profile?',
          ],
        };
      case 'faculty':
        return {
          title: 'Get Started',
          action: 'Invite students or import CSV',
        };
      case 'industry':
        return {
          title: 'Post Your First Internship',
          action: 'Quick internship posting form',
        };
      default:
        return {
          title: 'Welcome',
          action: 'Explore the platform',
        };
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 0.9, 0.35, 1] }}
            className="relative w-full max-w-md glass rounded-2xl p-8 shadow-glass"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {isAnalyzing ? (
              /* Analysis Loading Screen */
              <div className="text-center py-8">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="w-20 h-20 mx-auto mb-6 rounded-full border-4 border-neon-blue border-t-transparent"
                />
                <h3 className="text-xl font-bold text-white mb-3">Analyzing Your Profile...</h3>
                <div className="space-y-2 text-sm text-slate-400 max-w-sm mx-auto">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    ✓ Verifying institution credentials
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    ✓ Fetching university data
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                  >
                    ✓ Calculating readiness score
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                    className="text-neon-blue font-semibold"
                  >
                    ⚡ Personalizing your experience
                  </motion.p>
                </div>
              </div>
            ) : showOnboarding ? (
              /* Onboarding Screen */
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Welcome, {userName}!
                </h3>
                <p className="text-slate-400 mb-6">
                  Your account has been created successfully. Let's get you started!
                </p>
                <button
                  onClick={() => {
                    onClose();
                    window.location.href = `/portals/${selectedRole}`;
                  }}
                  className="btn-primary w-full"
                >
                  Continue to Dashboard
                </button>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {mode === 'login' ? 'Welcome Back' : 'Create Account'}
                  </h2>
                  <p className="text-slate-400 text-sm">
                    {mode === 'login' ? 'Sign in to continue' : 'Join the verified internship platform'}
                  </p>
                </div>

                {/* Role Tabs */}
                <div className="grid grid-cols-3 gap-2 mb-6">
                  {roles.map((role) => (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setSelectedRole(role.id)}
                      className={`relative p-3 rounded-lg text-center transition-all duration-200 ${
                        selectedRole === role.id
                          ? 'bg-neon-blue/20 border-2 border-neon-blue text-white'
                          : 'bg-white/5 border-2 border-transparent text-slate-400 hover:bg-white/10'
                      }`}
                    >
                      <div className="text-2xl mb-1">{role.icon}</div>
                      <div className="text-xs font-medium">{role.label}</div>
                    </button>
                  ))}
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <input type="hidden" {...register('role')} value={selectedRole} />

                  {/* Name (only for signup) */}
                  {mode === 'signup' && (
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                        Full Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        {...register('name')}
                        className="input-field"
                        placeholder="Enter your full name"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
                      )}
                    </div>
                  )}

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register('email')}
                      className="input-field"
                      placeholder="you@institution.edu"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Password */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      {...register('password')}
                      className="input-field"
                      placeholder="••••••••"
                    />
                    {mode === 'signup' && password && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-slate-400">Password strength</span>
                          <span className={`font-medium ${
                            passwordStrength.strength >= 75 ? 'text-green-400' :
                            passwordStrength.strength >= 50 ? 'text-yellow-400' :
                            'text-red-400'
                          }`}>
                            {passwordStrength.label}
                          </span>
                        </div>
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${passwordStrength.strength}%` }}
                            transition={{ duration: 0.3 }}
                            className={`h-full rounded-full ${
                              passwordStrength.strength >= 75 ? 'bg-green-500' :
                              passwordStrength.strength >= 50 ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}
                          />
                        </div>
                      </div>
                    )}
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
                    )}
                  </div>

                  {/* Institution Code (optional) */}
                  {(selectedRole === 'student' || selectedRole === 'faculty') && (
                    <div>
                      <label htmlFor="institutionCode" className="block text-sm font-medium text-slate-300 mb-2">
                        Institution Code <span className="text-slate-500">(Optional)</span>
                      </label>
                      <input
                        id="institutionCode"
                        type="text"
                        {...register('institutionCode')}
                        className="input-field"
                        placeholder="IIT-DEL-2025"
                      />
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      mode === 'login' ? 'Sign In' : 'Create Account'
                    )}
                  </button>
                </form>

                {/* SSO Options */}
                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/10" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-slate-950 text-slate-400">Or continue with</span>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      className="btn-secondary text-sm py-2.5"
                      onClick={() => console.log('Google SSO')}
                    >
                      <svg className="w-5 h-5 mr-2 inline" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Google
                    </button>
                    <button
                      type="button"
                      className="btn-secondary text-sm py-2.5"
                      onClick={() => console.log('Microsoft SSO')}
                    >
                      <svg className="w-5 h-5 mr-2 inline" viewBox="0 0 24 24">
                        <path fill="#f25022" d="M1 1h10v10H1z"/>
                        <path fill="#00a4ef" d="M13 1h10v10H13z"/>
                        <path fill="#7fba00" d="M1 13h10v10H1z"/>
                        <path fill="#ffb900" d="M13 13h10v10H13z"/>
                      </svg>
                      Microsoft
                    </button>
                  </div>
                </div>

                {/* Toggle Mode */}
                <div className="mt-6 text-center text-sm">
                  <span className="text-slate-400">
                    {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                  </span>
                  <button
                    type="button"
                    onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                    className="text-neon-blue hover:text-neon-blue/80 font-medium transition-colors"
                  >
                    {mode === 'login' ? 'Sign up' : 'Sign in'}
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
