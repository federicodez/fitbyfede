import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { FaUserLarge } from "react-icons/fa6";
import { GiWeightLiftingUp, GiStrongMan } from "react-icons/gi";

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
    ],
    [pathname],
  );

  return routes;
};

export default useRoutes;
