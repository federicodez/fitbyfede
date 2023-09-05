import { prisma } from "@/db";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        const { email, name } = user;
        try {
          const userExists = await prisma.user.findUnique({
            where: {
              email,
            },
          });

          if (!userExists) {
            const newUser = await prisma.user.create({ data: { name, email } });

            // console.log({ newUser });
            return newUser;
          } else {
            // console.log({ userExists });
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
