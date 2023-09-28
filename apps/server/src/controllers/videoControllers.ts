import { Request, Response } from 'express';
import { prisma } from '../config/connectDB';

export const getVideo = async (req: Request, res: Response) => {
  try {
    const video = await prisma.video.findUnique({
      where: { id: req.params.id },
    });

    if (!video) {
      return res.status(404).json({ msg: 'Video not found' });
    }

    res.status(200).json({ video });
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
};

export const getAllVideos = async (req: Request, res: Response) => {
  try {
    const videos = await prisma.video.findMany({
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json({ videos });
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
};

export const likeVideo = async (req: Request, res: Response) => {
  try {
    const video = await prisma.video.findUnique({
      where: { id: req.params.id },
    });

    if (!video) {
      return res.status(404).json({ msg: 'Video not found' });
    }

    const like = await prisma.like.findFirst({
      where: {
        videoId: req.params.id,
        userId: (req as any).userId,
      },
    });

    if (like) {
      await prisma.like.delete({ where: { id: like.id } });
    } else {
      await prisma.like.create({
        data: {
          video: { connect: { id: req.params.id } },
          user: { connect: { id: (req as any).userId } },
        },
      });
    }

    res.status(200).json({ msg: 'Video liked successfully' });
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
};

export const getVideoLikes = async (req: Request, res: Response) => {
  try {
    const video = await prisma.video.findUnique({
      where: { id: req.params.id },
    });

    if (!video) {
      return res.status(404).json({ msg: 'Video not found' });
    }

    const likes = await prisma.like.findMany({
      where: { videoId: req.params.id },
      select: { user: { select: { id: true, name: true } } },
    });

    res.status(200).json({ likes });
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
};

export const commentVideo = async (req: Request, res: Response) => {
  try {
    const video = await prisma.video.findUnique({
      where: { id: req.params.id },
    });

    if (!video) {
      return res.status(404).json({ msg: 'Video not found' });
    }

    const comment = await prisma.comment.create({
      data: {
        text: req.body.text,
        video: { connect: { id: req.params.id } },
        user: { connect: { id: (req as any).userId } },
      },
    });

    res.status(201).json({ msg: 'Comment created successfully', comment });
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
};

export const getAllComments = async (req: Request, res: Response) => {
  try {
    const video = await prisma.video.findUnique({
      where: { id: req.params.id },
    });

    if (!video) {
      return res.status(404).json({ msg: 'Video not found' });
    }

    const comments = await prisma.comment.findMany({
      where: { videoId: req.params.id },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        text: true,
        createdAt: true,
        user: { select: { id: true, name: true } },
      },
    });

    res.status(200).json({ comments });
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const comment = await prisma.comment.findUnique({
      where: { id: req.params.id },
    });

    if (!comment) {
      return res.status(404).json({ msg: 'Comment not found' });
    }

    await prisma.comment.delete({ where: { id: req.params.id } });

    res.status(200).json({ msg: 'Comment deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
};
