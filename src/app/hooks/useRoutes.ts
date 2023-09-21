import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { HiArrowLeftOnRectangle } from "react-icons/hi2";
import { signOut } from "next-auth/react";
import { FaUserLarge } from "react-icons/fa6";
import { GiMeal, GiWeightLiftingUp } from "react-icons/gi";
import { HiPlus } from "react-icons/hi";

const useRoutes = () => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        label: "Profile",
        href: "/profile",
        icon: FaUserLarge,
        active: pathname === "/profile",
      },
      {
        label: "Start Workout",
        href: "/workouts",
        icon: HiPlus,
        active: pathname === "/workouts",
      },
      {
        label: "Logout",
        onClick: () => signOut(),
        href: "#",
        icon: HiArrowLeftOnRectangle,
      },
    ],
    [pathname],
  );

  return routes;
};

export default useRoutes;
