// API utility functions for client-side data fetching

export async function fetchCourses(category?: string) {
  const params = new URLSearchParams();
  if (category) params.append('category', category);

  const response = await fetch(`/api/courses?${params}`);
  if (!response.ok) throw new Error('Failed to fetch courses');
  return response.json();
}

export async function submitSOS(data: {
  severity: 'RED' | 'ORANGE' | 'GREEN';
  description: string;
  evidence?: File[];
  geoTag?: boolean;
  anonymous?: boolean;
}) {
  const response = await fetch('/api/sos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error('Failed to submit SOS');
  return response.json();
}

export async function fetchAnalytics(type: 'website' | 'stakeholder', role?: string) {
  const params = new URLSearchParams({ type });
  if (role) params.append('role', role);

  const response = await fetch(`/api/analytics?${params}`);
  if (!response.ok) throw new Error('Failed to fetch analytics');
  return response.json();
}

export async function verifyCertificate(certificateId: string) {
  const response = await fetch('/api/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ certificateId, type: 'certificate' }),
  });

  if (!response.ok) throw new Error('Failed to verify certificate');
  return response.json();
}

export async function login(email: string, password: string, role: string) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, role }),
  });

  if (!response.ok) throw new Error('Login failed');
  return response.json();
}
