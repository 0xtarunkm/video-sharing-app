import { prisma } from '@/utils/connectDB';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  if (req.method == 'GET') {
    const video = await prisma.video.findUnique({
      where: {
        id: String(id),
      },
    });

    res.status(200).json(video);
  }
}
