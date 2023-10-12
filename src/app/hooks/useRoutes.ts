import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { HiArrowLeftOnRectangle } from "react-icons/hi2";
import { signOut } from "next-auth/react";
import { FaUserLarge } from "react-icons/fa6";
import { GiMeal, GiWeightLiftingUp, GiStrongMan } from "react-icons/gi";

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
        label: "Workouts",
        href: "/workouts",
        icon: GiWeightLiftingUp,
        active: pathname === "/workouts",
      },
      {
        label: "Exercises",
        href: "/exercises",
        icon: GiStrongMan,
        active: pathname == "/exercises",
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
