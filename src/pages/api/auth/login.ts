import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password, role } = req.body;

  // Mock authentication
  if (!email || !password || !role) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Simulate successful login
  const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock.token';
  
  res.status(200).json({
    success: true,
    token: mockToken,
    user: {
      email,
      role,
      id: `usr_${Math.random().toString(36).substr(2, 9)}`,
    },
  });
}
