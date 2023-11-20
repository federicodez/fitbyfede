import { getCurrentUser } from "@/actions/users";

import DesktopSidebar from "./DesktopSidebar";
import MobileFooter from "./MobileFooter";

async function Navbar({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser();

  return (
    <div className="h-full">
      <DesktopSidebar currentUser={currentUser!} />
      <MobileFooter />
      <main className="lg:pl-20 h-full">{children}</main>
    </div>
  );
}

export default Navbar;
