import { prisma } from '@/utils/connectDB';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == 'GET') {
    const videos = await prisma.video.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        admin: true,
      },
    });
    res.status(200).json(videos);
  }
}
