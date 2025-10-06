import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import RoleLoginModal from '@/components/RoleLoginModal';

export default function LoginPage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleClose = () => {
    setIsModalOpen(false);
    router.push('/');
  };

  return (
    <>
      <Head>
        <title>Login - Prashiskshan</title>
        <meta name="description" content="Sign in to your Prashiskshan account" />
      </Head>

      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <RoleLoginModal isOpen={isModalOpen} onClose={handleClose} initialMode="login" />
      </div>
    </>
  );
}
