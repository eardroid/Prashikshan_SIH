import type { NextApiRequest, NextApiResponse } from 'next';
import seedData from '@/data/seed.json';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { type, role } = req.query;

  if (type === 'website') {
    res.status(200).json({
      success: true,
      data: seedData.analytics.website,
    });
  } else if (type === 'stakeholder' && role) {
    const roleData = seedData.analytics.stakeholder[role as keyof typeof seedData.analytics.stakeholder];
    
    if (!roleData) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    res.status(200).json({
      success: true,
      data: roleData,
    });
  } else {
    res.status(400).json({ error: 'Invalid parameters' });
  }
}
