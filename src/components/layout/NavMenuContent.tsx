import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";
import Link from "next/link";
import { Button } from "../ui/button";

import { AffiliatedUni } from "@/store/generalStore";
import { useUserStore } from "@/store/userStore";
// import router from "next/router";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface NavMenuContentProps {
  uniName: AffiliatedUni | null;
  setShowSignupModal: (show: boolean) => void;
}

const supabase = createClient();

const NavMenuContent = ({
  uniName,
  setShowSignupModal,
}: NavMenuContentProps) => {
  const router = useRouter();
  const onSignOut = async () => {
    await supabase.auth.signOut();
    useUserStore.getState().clearUser();
    router.push(`/demo/${uniName?.subdomain}/login`);
  };

  const { isAuthenticated, role, tenantId } = useUserStore();
//   console.log(isAuthenticated, role, tenantId);
  const currentTenantId = uniName?.tenantId;

  return (
    <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
      <NavigationMenu className="text-4xl md:text-6xl">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              href={`/demo/${uniName?.subdomain}/`}
              className="px-4 py-2"
            >
              Home
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              href={`/demo/${uniName?.subdomain}/search`}
              className="px-4 py-2"
            >
              Browse
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              href={`/demo/${uniName?.subdomain}/collaboration`}
              className="px-4 py-2"
            >
              Collaborate
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              href={`/demo/${uniName?.subdomain}/newsletter`}
              className="px-4 py-2"
            >
              Newsletter
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Auth Buttons */}
      <div className="flex items-center space-x-3">
        {isAuthenticated && tenantId === currentTenantId ? (
          <>
            {role === "admin" ? (
              <Link
                href={`/demo/${uniName?.subdomain}/admin`}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
              >
                Admin Dashboard
              </Link>
            ) : (
              <Link
                href={`/demo/${uniName?.subdomain}/profile`}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Profile
              </Link>
            )}
            <button
              onClick={onSignOut}
              className="text-red-600 hover:text-red-800 font-medium"
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link href={`/demo/${uniName?.subdomain.toLowerCase()}/login`}>
              <button className="text-blue-600 hover:text-blue-800 font-medium">
                Log In
              </button>
            </Link>
            <button
              onClick={() => setShowSignupModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default NavMenuContent;
