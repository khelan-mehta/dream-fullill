import { useState } from "react";
import { Button } from "@/components/ui/button";
import AuthModal from "./AuthModal";
import { useAuth } from "@/context/AuthContext";
import { signOut } from "@/firebase/auth";
import { toast } from "sonner";

const Header = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const { currentUser } = useAuth();
  console.log(currentUser);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Failed to log out");
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <a href="/" className="flex items-center gap-2">
            <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-r from-wishes-purple to-wishes-purple-light">
              <div className="absolute inset-1 rounded-full bg-white flex items-center justify-center text-wishes-purple font-bold">
                W
              </div>
            </div>
            <span className="font-semibold text-2xl tracking-tight">
              Wishes
            </span>
          </a>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a
            href="#how-it-works"
            className="text-wishes-gray hover:text-wishes-dark transition-colors"
          >
            How It Works
          </a>
          <a
            href="#browse"
            className="text-wishes-gray hover:text-wishes-dark transition-colors"
          >
            Browse Wishes
          </a>
          <a
            href="#stories"
            className="text-wishes-gray hover:text-wishes-dark transition-colors"
          >
            Success Stories
          </a>
        </nav>
        <div className="flex items-center gap-4">
          {currentUser ? (
            <>
              <div className="hidden md:block text-sm">
                Hello,{" "}
                <span className="font-semibold">
                  {currentUser.displayName || "User"}
                </span>
              </div>
              <Button
                variant="ghost"
                className="hidden md:flex"
                onClick={handleSignOut}
              >
                Log out
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                className="hidden md:flex"
                onClick={() => {
                  setAuthMode("login");
                  setIsAuthModalOpen(true);
                }}
              >
                Log in
              </Button>
              <Button
                className="button-gradient text-white"
                onClick={() => {
                  setAuthMode("signup");
                  setIsAuthModalOpen(true);
                }}
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />
    </header>
  );
};

export default Header;
