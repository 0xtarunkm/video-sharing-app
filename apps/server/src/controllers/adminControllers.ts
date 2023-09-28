import { Request, Response } from 'express';
import { LoginInput, SignupInput, VideoInput } from 'common';
import { prisma } from '../config/connectDB';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/generateToken';
import { AdminRequest } from '../middlewares/protectAdmin';

export const register = async (req: Request, res: Response) => {
  try {
    const parsedInput = SignupInput.safeParse(req.body);

    if (!parsedInput.success) {
      return res.status(400).json({ msg: parsedInput.error });
    }

    const { name, email, password } = parsedInput.data;

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = await prisma.admin.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ msg: 'Admin created successfully', admin });
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const parsedInput = LoginInput.safeParse(req.body);

    if (!parsedInput.success) {
      return res.status(400).json({ msg: parsedInput.error });
    }

    const { email, password } = parsedInput.data;

    const admin = await prisma.admin.findUnique({ where: { email } });

    if (!admin) {
      return res.status(404).json({ msg: 'Admin not found' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = generateToken(admin.id);

    res.status(200).json({ msg: 'Admin logged in successfully', token });
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
};

export const getAdminProfile = async (req: Request, res: Response) => {
  try {
    const admin = await prisma.admin.findUnique({
      where: { id: (req as AdminRequest).adminId },
      select: { id: true, name: true, email: true },
    });

    res.status(200).json({ admin });
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateAdminProfile = async (req: Request, res: Response) => {
  try {
    const parsedInput = SignupInput.safeParse(req.body);

    if (!parsedInput.success) {
      return res.status(400).json({ msg: parsedInput.error });
    }

    const { name, email, password } = parsedInput.data;

    const admin = await prisma.admin.update({
      where: { id: (req as AdminRequest).adminId },
      data: { name, email, password },
    });

    res.status(200).json({ msg: 'Admin updated successfully', admin });
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
};

export const addVideo = async (req: Request, res: Response) => {
  try {
    const parsedInput = VideoInput.safeParse(req.body);

    if (!parsedInput.success) {
      return res.status(400).json({ msg: parsedInput.error });
    }

    const { title, description, videoUrl, thumbnailUrl } = parsedInput.data;

    const video = await prisma.video.create({
      data: {
        title,
        description,
        url: videoUrl,
        thumbnail: thumbnailUrl,
        admin: { connect: { id: (req as AdminRequest).adminId } },
      },
    });

    res.status(201).json({ msg: 'Video created successfully', video });
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
};

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

export const updateVideo = async (req: Request, res: Response) => {
  try {
    const parsedInput = VideoInput.safeParse(req.body);

    if (!parsedInput.success) {
      return res.status(400).json({ msg: parsedInput.error });
    }

    const { title, description, videoUrl, thumbnailUrl } = parsedInput.data;

    const video = await prisma.video.update({
      where: { id: req.params.id },
      data: { title, description, url: videoUrl, thumbnail: thumbnailUrl },
    });

    res.status(200).json({ msg: 'Video updated successfully', video });
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteVideo = async (req: Request, res: Response) => {
  try {
    const video = await prisma.video.delete({ where: { id: req.params.id } });

    res.status(200).json({ msg: 'Video deleted successfully', video });
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
};

export const getVideos = async (req: Request, res: Response) => {
  try {
    const videos = await prisma.video.findMany({
      orderBy: { createdAt: 'desc' },
      include: { admin: { select: { id: true, name: true } } },
    });

    res.status(200).json({ videos });
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
};
