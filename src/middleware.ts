import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/",
  },
});

export const config = {
  matcher: [
    "/workouts",
    "/create-workout",
    "/edit-workout",
    "/profile",
    "/search-workout",
  ],
};
