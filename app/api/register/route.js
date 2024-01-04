import { NextResponse } from 'next/server'
import prisma from '@/lib/prismadb'
import bcrypt from 'bcrypt'

export async function POST(req, res) {
  try {
    const body = await req.json()
    const { name, email, password } = body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });
    return NextResponse.json(user);

  } catch (error) {
    console.error(error)
    return NextResponse.json(400, { error: 'Invalid request' })
  }
}

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    console.error(error)
    return NextResponse.json(400, { error: 'Invalid request' })
  }
}

export default {
  POST,
  GET
}
