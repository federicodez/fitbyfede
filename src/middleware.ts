import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/",
  },
});

export const config = {
  matcher: [
    "/workouts/:path*",
    "/create-workout/:path*",
    "/edit-workout/:path*",
    "/exercise/:path*",
    "/profile/:path*",
    "/search-workout/:path*",
  ],
};
