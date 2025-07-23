import React, { useState } from "react";
import { AffiliatedUni } from "@/store/generalStore";
import NavMenuContent from "./NavMenuContent";
import { Menu } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "../ui/drawer";

interface NavProps {
  uniName: AffiliatedUni | null;
  setShowLoginModal?: (show: boolean) => void;
  setShowSignupModal: (show: boolean) => void;
}

const NavBar: React.FC<NavProps> = ({
  uniName,
  setShowLoginModal,
  setShowSignupModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <div className="flex items-center justify-between">
        {/* University Branding */}
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            {uniName?.subdomain.toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {uniName?.universityName}
            </h1>
            <p className="text-sm text-gray-600">Institutional Repository</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex">
          <NavMenuContent
            uniName={uniName}
            setShowSignupModal={setShowSignupModal}
          />
        </div>

        {/* Hamburger for Mobile */}
        <button
          className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="w-7 h-7 text-blue-600" />
        </button>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        open={mobileMenuOpen}
        onOpenChange={setMobileMenuOpen}
        direction="top"
      >
        <DrawerContent className="pt-6 bg-white shadow-lg rounded-b-lg">
          <DrawerHeader>
            <DrawerTitle>
              <span className="text-xl font-bold">
                {uniName?.universityName}
              </span>
            </DrawerTitle>
            <DrawerClose asChild>
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
                aria-label="Close menu"
              >
                &times;
              </button>
            </DrawerClose>
          </DrawerHeader>
          <div className="px-4 pb-6">
            <NavMenuContent
              uniName={uniName}
              setShowSignupModal={setShowSignupModal}
            />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default NavBar;
