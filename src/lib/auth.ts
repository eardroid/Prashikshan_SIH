// Authentication utilities and SSO placeholders

export interface User {
  id: string;
  email: string;
  role: 'student' | 'faculty' | 'industry' | 'government';
  name?: string;
}

// Mock SSO providers
export const SSOProviders = {
  google: {
    name: 'Google',
    clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || 'mock-google-client-id',
    authorize: () => {
      console.log('Google SSO: Redirecting to Google OAuth...');
      // In production, this would redirect to Google OAuth
      return Promise.resolve({ success: true });
    },
  },
  microsoft: {
    name: 'Microsoft',
    clientId: process.env.NEXT_PUBLIC_MICROSOFT_CLIENT_ID || 'mock-microsoft-client-id',
    authorize: () => {
      console.log('Microsoft SSO: Redirecting to Microsoft OAuth...');
      // In production, this would redirect to Microsoft OAuth
      return Promise.resolve({ success: true });
    },
  },
};

// Token management
export function setAuthToken(token: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', token);
  }
}

export function getAuthToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token');
  }
  return null;
}

export function removeAuthToken() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token');
  }
}

// Mock user session
export function getCurrentUser(): User | null {
  const token = getAuthToken();
  if (!token) return null;

  // In production, decode JWT and return user data
  return {
    id: 'usr_001',
    email: 'user@example.com',
    role: 'student',
    name: 'Mock User',
  };
}

export function logout() {
  removeAuthToken();
  if (typeof window !== 'undefined') {
    window.location.href = '/';
  }
}
