import type { NextApiRequest, NextApiResponse } from 'next';
import seedData from '@/data/seed.json';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { category, limit = '10', offset = '0' } = req.query;

  let courses = seedData.courses;

  // Filter by category if provided
  if (category && typeof category === 'string') {
    courses = courses.filter((course) => course.category === category);
  }

  // Apply pagination
  const limitNum = parseInt(limit as string);
  const offsetNum = parseInt(offset as string);
  const paginatedCourses = courses.slice(offsetNum, offsetNum + limitNum);

  res.status(200).json({
    success: true,
    data: paginatedCourses,
    meta: {
      total: courses.length,
      limit: limitNum,
      offset: offsetNum,
    },
  });
}
