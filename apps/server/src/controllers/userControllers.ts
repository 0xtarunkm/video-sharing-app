import { SignupInput } from 'common';
import { Request, Response } from 'express';
import { prisma } from '../config/connectDB';

export const register = async (req: Request, res: Response) => {
  try {
    const parsedInput = SignupInput.safeParse(req.body);

    if (!parsedInput.success) {
      return res.status(400).json({ msg: parsedInput.error });
    }

    const { name, email, password } = parsedInput.data;

    const admin = await prisma.admin.create({
      data: { name, email, password },
    });
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
};

export const login = async (req: Request, res: Response) => {};

export const logout = async (req: Request, res: Response) => {};

export const getUser = async (req: Request, res: Response) => {};

export const getUsers = async (req: Request, res: Response) => {};
