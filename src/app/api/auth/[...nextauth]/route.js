import { prisma } from "@/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      type: "credentials",
      id: "credentials",
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
        email: { label: "Email", type: "email" },
      },
      async authorize(credentials) {
        // check to see if email and password is valid
        // console.log("credentials: ", credentials);
        if (!credentials.email || !credentials.password) {
          return null;
        }

        // check to see if user exists
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          return null;
        }

        // check to see if passwords match
        const passwordsMatch = await bcrypt.compare(
          credentials.password,
          user.hashedPassword,
        );

        if (!passwordsMatch) {
          return null;
        }

        // return user object if everything is valid
        return user;
      },
    }),
    GoogleProvider({
      id: "google",
      name: "google",
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    async signIn({ user, account }) {
      // console.log("user: ", user);
      // console.log("account: ", account);
      if (account.provider === "google") {
        const { name, email } = user;
        try {
          const userExists = await prisma.user.findUnique({
            where: {
              email,
            },
          });

          if (!userExists) {
            const newUser = await prisma.user.create({ data: { name, email } });
            return newUser;
          } else {
            return userExists;
          }
        } catch (error) {
          console.log(error);
        }
      }
      return user;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
