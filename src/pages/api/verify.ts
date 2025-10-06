import type { NextApiRequest, NextApiResponse } from 'next';
import seedData from '@/data/seed.json';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { certificateId, type } = req.body;

  if (!certificateId || !type) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Mock verification
  if (type === 'certificate') {
    const certificate = seedData.certificates.find((cert) => cert.id === certificateId);

    if (!certificate) {
      return res.status(404).json({
        success: false,
        verified: false,
        error: 'Certificate not found',
      });
    }

    res.status(200).json({
      success: true,
      verified: true,
      certificate: {
        ...certificate,
        verifiedAt: new Date().toISOString(),
      },
    });
  } else if (type === 'institution') {
    // Mock institution verification (IDfy/GSTIN)
    res.status(200).json({
      success: true,
      verified: true,
      institution: {
        name: 'IIT Delhi',
        gstin: '07AAACI1681G1Z5',
        verified: true,
        verifiedAt: new Date().toISOString(),
      },
    });
  } else {
    res.status(400).json({ error: 'Invalid verification type' });
  }
}
