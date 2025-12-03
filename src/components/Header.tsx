import { Play, Code2, Loader2, LogIn, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

interface HeaderProps {
  onRun: () => void;
  isRunning: boolean;
}

const Header = ({ onRun, isRunning }: HeaderProps) => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const handleAuthClick = async () => {
    if (currentUser) {
      // User is logged in, perform logout
      try {
        await logout();
        toast({
          title: "Logged out",
          description: "You have been logged out successfully",
        });
        navigate("/login");
      } catch (error: any) {
        toast({
          title: "Logout failed",
          description: error.message,
          variant: "destructive",
        });
      }
    } else {
      // User is not logged in, navigate to login
      navigate("/login");
    }
  };

  return (
    <header className="bg-header border-b border-border px-4 py-3 md:px-6">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10 glow-primary-sm">
            <Code2 className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">Online C Compiler</h1>
            <p className="text-xs text-muted-foreground hidden sm:block">
              Write, compile, and run C code
            </p>
          </div>
        </div>  

        {/* Right Section: Auth Button + Run Button + Theme Toggle */}
        <div className="flex items-center gap-3">
          {/* User Info (if logged in) */}
          {currentUser && (
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20">
              <User className="w-4 h-4 text-primary" />
              <span className="text-sm text-foreground truncate max-w-[150px]">
                {currentUser.email}
              </span>
            </div>
          )}

          {/* Auth Button (Login/Logout) */}
          <Button
            onClick={handleAuthClick}
            variant="outline"
            className="gap-2 px-4 border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all"
          >
            {currentUser ? (
              <>
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span className="hidden sm:inline">Login</span>
              </>
            )}
          </Button>

          {/* Run Button */}
          <Button
            onClick={onRun}
            disabled={isRunning}
            className="glow-primary hover:glow-primary gap-2 px-5"
          >
            {isRunning ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="hidden sm:inline">Running</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span className="hidden sm:inline">Run</span>
              </>
            )}
          </Button>

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;