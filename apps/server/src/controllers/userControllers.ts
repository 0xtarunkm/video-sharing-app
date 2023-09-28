import { SignupInput } from 'common';
import { Request, Response } from 'express';
import { prisma } from '../config/connectDB';
import bcrypt from 'bcryptjs';
import { UserRequest } from '../middlewares/protectUser';
import { generateToken } from '../utils/generateToken';

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

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    res.status(201).json({ msg: 'Admin created successfully', user });
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const parsedInput = SignupInput.safeParse(req.body);

    if (!parsedInput.success) {
      return res.status(400).json({ msg: parsedInput.error });
    }

    const { email, password } = parsedInput.data;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = generateToken(user.id);

    res.status(200).json({ msg: 'User logged in successfully', token });
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
};

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: (req as UserRequest).userId },
      select: { id: true, name: true, email: true },
    });

    res.status(200).json({ user });
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const parsedInput = SignupInput.safeParse(req.body);

    if (!parsedInput.success) {
      return res.status(400).json({ msg: parsedInput.error });
    }

    const { name, email, password } = parsedInput.data;

    const user = await prisma.user.update({
      where: { id: (req as UserRequest).userId },
      data: { name, email, password },
    });

    res.status(200).json({ msg: 'User updated successfully', user });
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
};
