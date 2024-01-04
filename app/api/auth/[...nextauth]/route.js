import bcrypt from "bcrypt"
import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/lib/prismadb"

// Define authOptions object
export const authOptions = {
  // Set PrismaAdapter as the adapter
  adapter: PrismaAdapter(prisma),
  // Set providers array with a single CredentialsProvider object
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        // Define email field with label and type
        email: { label: 'email', type: 'text' },
        // Define password field with label and type
        password: { label: 'password', type: 'password' }
      },
      // Define authorize function
      async authorize(credentials) {
        // Check if credentials are valid
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        // Find unique user with matching email in Prisma
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });

        // Check if user or hashedPassword is missing
        if (!user || !user?.hashedPassword) {
          throw new Error('Invalid credentials');
        }

        // Compare password with hashedPassword using bcrypt
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        // Check if password is correct
        if (!isCorrectPassword) {
          throw new Error('Invalid credentials');
        }

        // Return the authenticated user
        return user;
      }
    })
  ],
  // Set session strategy to 'jwt'
  session: {
    strategy: 'jwt',
  },
  // Set jwt secret from environment variable
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  // Set secret from environment variable
  secret: process.env.NEXTAUTH_SECRET,
};
  
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST}