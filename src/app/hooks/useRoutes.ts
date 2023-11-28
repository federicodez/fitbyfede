import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { FaUserLarge } from "react-icons/fa6";
import { GiMeal, GiWeightLiftingUp, GiStrongMan } from "react-icons/gi";
import { FaCrown } from "react-icons/fa";

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
        label: "Upgrade",
        href: "/upgrade",
        icon: FaCrown,
        active: pathname === "/upgrade",
      },
    ],
    [pathname],
  );

  return routes;
};

export default useRoutes;
