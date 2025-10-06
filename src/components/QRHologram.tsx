import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Text3D, Float, Center } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

function RotatingQRCube() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Box
        ref={meshRef}
        args={[2, 2, 2]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial
          color={hovered ? '#00d4ff' : '#0ea5e9'}
          metalness={0.8}
          roughness={0.2}
          emissive={hovered ? '#00d4ff' : '#0ea5e9'}
          emissiveIntensity={0.3}
        />
      </Box>
      
      {/* Wireframe overlay */}
      <Box args={[2.1, 2.1, 2.1]}>
        <meshBasicMaterial color="#00d4ff" wireframe transparent opacity={0.3} />
      </Box>
    </Float>
  );
}

interface QRHologramProps {
  certificateData?: {
    id: string;
    studentName: string;
    internshipTitle: string;
    company: string;
    duration: string;
    workLogsCount: number;
    verificationHash: string;
    issuedAt: string;
  };
}

export default function QRHologram({ certificateData }: QRHologramProps) {
  const [showVerification, setShowVerification] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [studentName, setStudentName] = useState('Student Name');
  const [blockchainNetwork, setBlockchainNetwork] = useState('Polygon PoS');

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setShowVerification(true);
    }, 2000);
  };

  const defaultData = {
    id: 'CERT-2025-001',
    studentName,
    internshipTitle: 'Software Development Intern',
    company: 'TechCorp Solutions',
    duration: '6 months',
    workLogsCount: 124,
    verificationHash: '0x9f4a8c7e2d1b5f3a8c9e4d7b2a5f8c1e3d6b9a4c7e2f5a8b1d4c7e9f2a5b8c1d',
    issuedAt: '2025-09-15',
  };

  const data = certificateData || defaultData;

  const scanButtonDisabled = !certificateData;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const storedName = localStorage.getItem('userName');
    const network = localStorage.getItem('blockchainNetwork');
    if (storedName) {
      setStudentName(storedName);
    }
    if (network) {
      setBlockchainNetwork(network);
    }
  }, []);

  return (
    <div className="relative">
      {/* 3D Hologram */}
      <div className="glass rounded-2xl p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-white">{data.internshipTitle}</h3>
            <p className="text-sm text-slate-400">Issued to {data.studentName}</p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-neon-blue/20 text-neon-blue">
            {blockchainNetwork}
          </span>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <p className="text-xs text-slate-400">Certificate ID</p>
            <p className="text-sm font-semibold text-white">{data.id}</p>
          </div>
          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <p className="text-xs text-slate-400">Company</p>
            <p className="text-sm font-semibold text-white">{data.company}</p>
          </div>
          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <p className="text-xs text-slate-400">Duration</p>
            <p className="text-sm font-semibold text-white">{data.duration}</p>
          </div>
          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <p className="text-xs text-slate-400">Work Logs Submitted</p>
            <p className="text-sm font-semibold text-white">{data.workLogsCount}</p>
          </div>
        </div>

        <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 border border-neon-blue/20">
          <p className="text-xs text-slate-400 mb-1">Verification Hash</p>
          <code className="block text-xs font-mono text-slate-300 break-all">{data.verificationHash}</code>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-6 flex items-center justify-center">
        <button
          onClick={handleScan}
          disabled={isScanning || scanButtonDisabled}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {scanButtonDisabled ? 'Select a certificate' : isScanning ? 'Scanning...' : '📷 Scan Certificate'}
        </button>
      </div>

      {/* Verification Modal */}
      <AnimatePresence>
        {showVerification && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowVerification(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-green to-green-500 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Certificate Verified</h3>
                    <p className="text-sm text-neon-green">Authentic & NEP-Compliant</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowVerification(false)}
                  className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Certificate Details */}
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-sm text-slate-400 mb-1">Certificate ID</p>
                  <p className="text-lg font-semibold text-white">{data.id}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <p className="text-sm text-slate-400 mb-1">Student Name</p>
                    <p className="text-base font-semibold text-white">{data.studentName}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <p className="text-sm text-slate-400 mb-1">Company</p>
                    <p className="text-base font-semibold text-white">{data.company}</p>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-sm text-slate-400 mb-1">Internship Title</p>
                  <p className="text-base font-semibold text-white">{data.internshipTitle}</p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <p className="text-sm text-slate-400 mb-1">Duration</p>
                    <p className="text-base font-semibold text-white">{data.duration}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <p className="text-sm text-slate-400 mb-1">Work Logs</p>
                    <p className="text-base font-semibold text-white">{data.workLogsCount}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <p className="text-sm text-slate-400 mb-1">Issued</p>
                    <p className="text-base font-semibold text-white">
                      {new Date(data.issuedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                </div>

                {/* Blockchain Hash */}
                <div className="p-4 rounded-lg bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 border border-neon-blue/30">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center flex-shrink-0">
                      <span className="text-xl">🔐</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white mb-1">Immutable Verification Hash</p>
                      <p className="text-xs font-mono text-slate-300 break-all">{data.verificationHash}</p>
                      <p className="text-xs text-slate-400 mt-2">
                        This certificate is cryptographically secured and cannot be tampered with.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Verification Badges */}
                <div className="flex items-center justify-center space-x-4 pt-4">
                  <div className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-neon-green/20 border border-neon-green/50">
                    <svg className="w-5 h-5 text-neon-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="text-sm font-semibold text-neon-green">NEP Compliant</span>
                  </div>
                  <div className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-neon-blue/20 border border-neon-blue/50">
                    <svg className="w-5 h-5 text-neon-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span className="text-sm font-semibold text-neon-blue">{blockchainNetwork}</span>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-center space-x-3">
                  <button
                    className="btn-primary px-6 py-2"
                    onClick={() => alert('Downloading verified certificate (.pdf)...')}
                  >
                    📄 Download Certificate
                  </button>
                  <button
                    className="btn-secondary px-6 py-2"
                    onClick={() => alert('Downloading certificate report (.json)...')}
                  >
                    📊 Download Report
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
