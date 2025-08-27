import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  LogOut,
  TrendingUp,
  User,
  ChevronDown,
  Home,
  BookOpen,
  Info,
  Settings,
  Users,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const { user, signOut } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      fetchUserRole();
    } else {
      setUserRole(null);
    }
  }, [user]);

  const fetchUserRole = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from("profiles")
      .select("role")
      .eq("user_id", user.id)
      .single();
    if (!error && data) {
      setUserRole(data.role);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    setIsMenuOpen(false);
  };

  // Menu items with icons
  const menuItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Test Series", path: "/test-series", icon: BookOpen },
    { name: "About", path: "/about", icon: Info },
  ];

  return (
    <nav className="bg-gray-200 border-b sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3">
            <img
              src="/lovable-uploads/18bb5e78-f0b2-4cf7-b6c7-e17d62a79fdf.png"
              alt="SVCE Logo"
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain mix-blend-multiply"
            />
            <div className="leading-tight">
              <span className="text-base sm:text-lg font-bold text-blue-500">
                SVCE Test Series
              </span>
              <p className="text-[10px] sm:text-[11px] text-gray-500">
                Powered by SWAMI VIVEKANAND GROUP
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-1 font-medium transition ${
                  location.pathname === item.path
                    ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            ))}

            {user && (
              <Link
                to="/progress"
                className={`flex items-center gap-1 font-medium transition ${
                  location.pathname === "/progress"
                    ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                Progress
              </Link>
            )}

            {/* Role based links */}
            {userRole === "admin" && (
              <Link
                to="/admin"
                className={`flex items-center gap-1 font-medium transition ${
                  location.pathname === "/admin"
                    ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                <Settings className="w-4 h-4" />
                Admin
              </Link>
            )}
            {(userRole === "faculty" || userRole === "admin") && (
              <Link
                to="/faculty"
                className={`flex items-center gap-1 font-medium transition ${
                  location.pathname === "/faculty"
                    ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                <Users className="w-4 h-4" />
                Faculty
              </Link>
            )}
          </div>

          {/* Right side user/login */}
          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 px-3 py-1.5 rounded-full border bg-gray-50 hover:bg-gray-100 transition shadow-sm">
                    <User className="w-5 h-5 text-blue-700" />
                    <span className="text-sm font-medium text-gray-700">
                      {user.email}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-40 rounded-lg shadow-md border bg-white"
                >
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="text-red-600 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full px-4"
                  asChild
                >
                  <Link to="/login">Login</Link>
                </Button>
                <Button
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4"
                  asChild
                >
                  <Link to="/signup">Signup</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t shadow-sm px-6 py-4 space-y-4 text-center">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsMenuOpen(false)}
              className={`block flex justify-center items-center gap-2 font-medium transition ${
                location.pathname === item.path
                  ? "text-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          ))}

          {user && (
            <Link
              to="/progress"
              onClick={() => setIsMenuOpen(false)}
              className={`block flex justify-center items-center gap-2 font-medium transition ${
                location.pathname === "/progress"
                  ? "text-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              Progress
            </Link>
          )}

          {/* Role based links for mobile */}
          {userRole === "admin" && (
            <Link
              to="/admin"
              onClick={() => setIsMenuOpen(false)}
              className="block flex justify-center items-center gap-2 font-medium text-gray-700 hover:text-blue-600"
            >
              <Settings className="w-4 h-4" />
              Admin Panel
            </Link>
          )}
          {(userRole === "faculty" || userRole === "admin") && (
            <Link
              to="/faculty"
              onClick={() => setIsMenuOpen(false)}
              className="block flex justify-center items-center gap-2 font-medium text-gray-700 hover:text-blue-600"
            >
              <Users className="w-4 h-4" />
              Faculty Panel
            </Link>
          )}

          <div className="pt-3 border-t">
            {user ? (
              <button
                onClick={handleSignOut}
                className="flex justify-center items-center gap-2 text-red-600 font-medium hover:text-red-700 w-full"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            ) : (
              <div className="flex flex-col gap-3">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white w-full"
                  asChild
                >
                  <Link to="/signup">Signup</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;