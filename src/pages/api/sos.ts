import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { severity, description, evidence, geoTag, anonymous } = req.body;

    if (!severity || !description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Generate case ID
    const caseId = `PRS-SOS-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`;

    // Determine SLA based on severity
    const slaMap = {
      RED: 'Immediate — phone call + SMS to emergency contacts',
      ORANGE: '24h response to triage',
      GREEN: '72h response',
    };

    res.status(201).json({
      success: true,
      caseId,
      severity,
      sla: slaMap[severity as keyof typeof slaMap],
      status: 'submitted',
      createdAt: new Date().toISOString(),
    });
  } else if (req.method === 'GET') {
    // Return mock SOS cases
    const cases = [
      {
        id: 'PRS-SOS-2025-0847',
        severity: 'ORANGE',
        description: 'Payment delay issue',
        status: 'under_review',
        createdAt: '2025-10-01T10:30:00Z',
      },
      {
        id: 'PRS-SOS-2025-0848',
        severity: 'RED',
        description: 'Harassment at workplace',
        status: 'escalated',
        createdAt: '2025-10-02T14:15:00Z',
      },
    ];

    res.status(200).json({
      success: true,
      data: cases,
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
