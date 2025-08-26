import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, BookOpen, LogOut, Settings, Users, TrendingUp } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const { user, signOut } = useAuth();

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
      .from('profiles')
      .select('role')
      .eq('user_id', user.id)
      .single();

    if (error) {
      console.error('Error fetching user role:', error);
      return;
    }

    setUserRole(data.role);
  };

  const handleSignOut = async () => {
    await signOut();
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-card/95 backdrop-blur-md border-b border-border sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            {/* Desktop: Show college banner image */}
            <div className="hidden sm:block">
              <img 
                src="/lovable-uploads/eb9d0dd3-c038-40f6-afdb-8bc380c2fe67.png" 
                alt="Swami Vivekanand Group of Institutions" 
                className="h-12 object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            {/* Mobile: Show text */}
            <div className="sm:hidden flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20">
                <img 
                  src="/lovable-uploads/18bb5e78-f0b2-4cf7-b6c7-e17d62a79fdf.png" 
                  alt="SVCE Logo" 
                  className="w-8 h-8"
                />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                SVCE Test Series
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link 
              to="/" 
              className="relative px-4 py-2 text-foreground hover:text-brand-primary transition-all duration-300 font-medium group"
            >
              <span className="relative z-10">Home</span>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link 
              to="/test-series" 
              className="relative px-4 py-2 text-foreground hover:text-brand-primary transition-all duration-300 font-medium group"
            >
              <span className="relative z-10">Test Series</span>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            {user && (
              <Link 
                to="/progress" 
                className="relative px-4 py-2 text-foreground hover:text-brand-primary transition-all duration-300 font-medium group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Progress
                </span>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            )}
            <Link 
              to="/about" 
              className="relative px-4 py-2 text-foreground hover:text-brand-primary transition-all duration-300 font-medium group"
            >
              <span className="relative z-10">About</span>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <>
                {userRole === 'admin' && (
                  <Button variant="outline" size="sm" className="border-brand-primary/20 hover:border-brand-primary hover:bg-brand-primary/10" asChild>
                    <Link to="/admin" className="flex items-center space-x-2">
                      <Settings className="w-4 h-4" />
                      <span>Admin</span>
                    </Link>
                  </Button>
                )}
                {(userRole === 'faculty' || userRole === 'admin') && (
                  <Button variant="outline" size="sm" className="border-brand-primary/20 hover:border-brand-primary hover:bg-brand-primary/10" asChild>
                    <Link to="/faculty" className="flex items-center space-x-2">
                      <Users className="w-4 h-4" />
                      <span>Faculty</span>
                    </Link>
                  </Button>
                )}
                <span className="text-sm text-muted-foreground font-medium">
                  Welcome, {user.email?.split('@')[0]}
                </span>
                <Button 
                  variant="outline" 
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 border-destructive/20 hover:border-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" className="border-brand-primary/20 hover:border-brand-primary hover:bg-brand-primary/10" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button className="bg-gradient-to-r from-brand-primary to-brand-secondary hover:shadow-lg hover:shadow-brand-primary/25 btn-glow" asChild>
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative z-50 w-12 h-12 rounded-xl bg-accent/50 hover:bg-accent border border-border"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-lg">
            <div className="flex flex-col h-full pt-20 px-6 pb-6">
              <div className="space-y-4 flex-1">
                <Link
                  to="/"
                  className="mobile-menu-item"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/test-series"
                  className="mobile-menu-item"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Test Series
                </Link>
                {user && (
                  <Link
                    to="/progress"
                    className="mobile-menu-item flex items-center gap-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <TrendingUp className="w-4 h-4" />
                    Progress
                  </Link>
                )}
                <Link
                  to="/about"
                  className="mobile-menu-item"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                
                {/* Divider */}
                <div className="h-px bg-border my-6"></div>
                
                <div className="space-y-4">
                  {user ? (
                    <>
                      {userRole === 'admin' && (
                        <Button variant="outline" size="lg" className="w-full h-14 text-lg border-brand-primary/20 hover:border-brand-primary hover:bg-brand-primary/10" asChild>
                          <Link to="/admin" className="flex items-center justify-center space-x-3" onClick={() => setIsMenuOpen(false)}>
                            <Settings className="w-5 h-5" />
                            <span>Admin Panel</span>
                          </Link>
                        </Button>
                      )}
                      {(userRole === 'faculty' || userRole === 'admin') && (
                        <Button variant="outline" size="lg" className="w-full h-14 text-lg border-brand-primary/20 hover:border-brand-primary hover:bg-brand-primary/10" asChild>
                          <Link to="/faculty" className="flex items-center justify-center space-x-3" onClick={() => setIsMenuOpen(false)}>
                            <Users className="w-5 h-5" />
                            <span>Faculty Panel</span>
                          </Link>
                        </Button>
                      )}
                      <div className="text-center py-4">
                        <span className="text-lg text-muted-foreground font-medium">
                          Welcome, {user.email?.split('@')[0]}
                        </span>
                      </div>
                      <Button 
                        variant="outline" 
                        size="lg" 
                        className="w-full h-14 text-lg flex items-center justify-center space-x-3 border-destructive/20 hover:border-destructive hover:bg-destructive/10 hover:text-destructive"
                        onClick={handleSignOut}
                      >
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" size="lg" className="w-full h-14 text-lg border-brand-primary/20 hover:border-brand-primary hover:bg-brand-primary/10" asChild>
                        <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
                      </Button>
                      <Button size="lg" className="w-full h-14 text-lg bg-gradient-to-r from-brand-primary to-brand-secondary btn-glow" asChild>
                        <Link to="/signup" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;



// import { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { 
//   Menu, X, BookOpen, LogOut, Settings, Users, 
//   Home, Bookmark, Info, ChevronDown, User 
// } from "lucide-react";
// import { useAuth } from "@/hooks/useAuth";
// import { supabase } from "@/integrations/supabase/client";
// import { motion, AnimatePresence } from "framer-motion";

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [userRole, setUserRole] = useState<string | null>(null);
//   const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
//   const { user, signOut } = useAuth();
//   const location = useLocation();

//   useEffect(() => {
//     if (user) {
//       fetchUserRole();
//     } else {
//       setUserRole(null);
//     }
//   }, [user]);

//   const fetchUserRole = async () => {
//     if (!user) return;
    
//     const { data, error } = await supabase
//       .from('profiles')
//       .select('role')
//       .eq('user_id', user.id)
//       .single();

//     if (error) {
//       console.error('Error fetching user role:', error);
//       return;
//     }

//     setUserRole(data.role);
//   };

//   const handleSignOut = async () => {
//     await signOut();
//     setIsMenuOpen(false);
//     setIsUserDropdownOpen(false);
//   };

//   const navLinks = [
//     { path: "/", label: "Home", icon: Home },
//     { path: "/test-series", label: "Test Series", icon: BookOpen },
//     { path: "/about", label: "About", icon: Info }
//   ];

//   const isActive = (path: string) => location.pathname === path;

//   return (
//     <nav className="bg-background/95 backdrop-blur-md border-b border-border/40 sticky top-0 z-50 shadow-sm">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <Link to="/" className="flex items-center group">
//             <div className="hidden sm:flex items-center gap-2">
//               <motion.div 
//                 whileHover={{ scale: 1.05 }}
//                 className="p-1.5 rounded-lg"
//               >
//                 <img 
//                   src="/lovable-uploads/18bb5e78-f0b2-4cf7-b6c7-e17d62a79fdf.png" 
//                   alt="SVCE Logo" 
//                   className="w-12 h-12"
//                 />
//               </motion.div>
//               <div className="flex flex-col">
//                 <span className="text-lg font-bold bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent leading-tight">
//                   SVCE Test Series
//                 </span>
//                 <span className="text-xs text-muted-foreground font-medium">
//                   Powered by SWAMI VIVEKANAND GROUP
//                 </span>
//               </div>
//             </div>
//             <div className="sm:hidden flex items-center space-x-2">
//               <div className="p-1.5 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20">
//                 <img 
//                   src="/lovable-uploads/18bb5e78-f0b2-4cf7-b6c7-e17d62a79fdf.png" 
//                   alt="SVCE Logo" 
//                   className="w-6 h-6"
//                 />
//               </div>
//               <span className="text-base font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
//                 SVCE
//               </span>
//             </div>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden lg:flex items-center space-x-1">
//             {navLinks.map((link) => (
//               <Link 
//                 key={link.path}
//                 to={link.path}
//                 className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
//                   isActive(link.path) 
//                     ? "text-primary" 
//                     : "text-foreground/80 hover:text-primary"
//                 }`}
//               >
//                 <span className="relative z-10 flex items-center gap-2">
//                   <link.icon className="w-4 h-4" />
//                   {link.label}
//                 </span>
//                 {isActive(link.path) && (
//                   <motion.div 
//                     layoutId="navActiveIndicator"
//                     className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
//                     transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
//                   />
//                 )}
//               </Link>
//             ))}
//           </div>

//           {/* Desktop Auth Buttons */}
//           <div className="hidden lg:flex items-center gap-3">
//             {user ? (
//               <div className="relative">
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   className="gap-2 pl-3 pr-2 rounded-full hover:bg-accent"
//                   onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
//                 >
//                   <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
//                     <User className="w-4 h-4" />
//                   </div>
//                   <span className="font-medium text-foreground/90">
//                     {user.email?.split('@')[0]}
//                   </span>
//                   <ChevronDown className={`w-4 h-4 transition-transform ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
//                 </Button>

//                 <AnimatePresence>
//                   {isUserDropdownOpen && (
//                     <motion.div
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: 10 }}
//                       transition={{ duration: 0.2 }}
//                       className="absolute right-0 mt-2 w-56 origin-top-right rounded-lg bg-background shadow-lg border border-border/50 overflow-hidden"
//                     >
//                       <div className="p-2">
//                         <div className="px-3 py-2 text-sm text-foreground/80">
//                           Signed in as <span className="font-medium">{user.email}</span>
//                         </div>
//                         {(userRole === 'admin' || userRole === 'faculty') && (
//                           <div className="border-t border-border/40 pt-1">
//                             {userRole === 'admin' && (
//                               <Link
//                                 to="/admin"
//                                 onClick={() => setIsUserDropdownOpen(false)}
//                                 className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md ${
//                                   isActive('/admin')
//                                     ? "bg-primary/10 text-primary"
//                                     : "hover:bg-accent/50"
//                                 }`}
//                               >
//                                 <Settings className="w-4 h-4" />
//                                 Admin Panel
//                               </Link>
//                             )}
//                             {(userRole === 'faculty' || userRole === 'admin') && (
//                               <Link
//                                 to="/faculty"
//                                 onClick={() => setIsUserDropdownOpen(false)}
//                                 className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md ${
//                                   isActive('/faculty')
//                                     ? "bg-primary/10 text-primary"
//                                     : "hover:bg-accent/50"
//                                 }`}
//                               >
//                                 <Users className="w-4 h-4" />
//                                 Faculty Panel
//                               </Link>
//                             )}
//                           </div>
//                         )}
//                         <div className="border-t border-border/40 pt-1">
//                           <button
//                             onClick={handleSignOut}
//                             className="flex w-full items-center gap-2 px-3 py-2 text-sm rounded-md text-destructive hover:bg-destructive/10"
//                           >
//                             <LogOut className="w-4 h-4" />
//                             Sign out
//                           </button>
//                         </div>
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             ) : (
//               <>
//                 <Button 
//                   variant="ghost" 
//                   size="sm" 
//                   className="text-foreground/80 hover:text-primary hover:bg-primary/5 bg-gray-600 text-white"
//                   asChild
//                 >
//                   <Link to="/login">Login</Link>
//                 </Button>
//                 <Button 
//                   size="sm" 
//                   className="bg-gradient-to-r from-primary to-primary hover:shadow-primary/20 hover:shadow-md transition-all"
//                   asChild
//                 >
//                   <Link to="/signup">Get Started</Link>
//                 </Button>
//               </>
//             )}
//           </div>

//           {/* Mobile menu button */}
//           <div className="lg:hidden">
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="relative z-50 w-10 h-10 rounded-lg hover:bg-accent"
//             >
//               {isMenuOpen ? (
//                 <X className="w-5 h-5" />
//               ) : (
//                 <Menu className="w-5 h-5" />
//               )}
//             </Button>
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         <AnimatePresence>
//           {isMenuOpen && (
//             <motion.div
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.2 }}
//               className="lg:hidden fixed inset-0 z-40 bg-red-600 backdrop-blur-lg "
//               style={{ marginTop: '4rem' }} // Added to ensure menu appears below navbar
//             >
//               <div className="flex flex-col h-[calc(100vh-4rem)] px-4 pb-6 overflow-y-auto bg-gray-600">
//                 <div className="space-y-1 flex-1">
//                   {navLinks.map((link) => (
//                     <Link
//                       key={link.path}
//                       to={link.path}
//                       onClick={() => setIsMenuOpen(false)}
//                       className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium ${
//                         isActive(link.path)
//                           ? "bg-primary/10 text-primary"
//                           : "text-foreground/80 hover:bg-accent/50"
//                       }`}
//                     >
//                       <link.icon className="w-5 h-5" />
//                       {link.label}
//                     </Link>
//                   ))}
                  
//                   <div className="h-px bg-border/40 my-2"></div>
                  
//                   {user ? (
//                     <>
//                       <div className="px-4 py-3 flex items-center gap-3">
//                         <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
//                           <User className="w-5 h-5" />
//                         </div>
//                         <div className="flex-1">
//                           <div className="font-medium">{user.email?.split('@')[0]}</div>
//                           <div className="text-xs text-muted-foreground">{user.email}</div>
//                         </div>
//                       </div>

//                       {(userRole === 'admin' || userRole === 'faculty') && (
//                         <div className="space-y-1 pl-4">
//                           {userRole === 'admin' && (
//                             <Link
//                               to="/admin"
//                               onClick={() => setIsMenuOpen(false)}
//                               className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium ${
//                                 isActive('/admin')
//                                   ? "bg-primary/10 text-primary"
//                                   : "text-foreground/80 hover:bg-accent/50"
//                               }`}
//                             >
//                               <Settings className="w-5 h-5" />
//                               Admin Panel
//                             </Link>
//                           )}
//                           {(userRole === 'faculty' || userRole === 'admin') && (
//                             <Link
//                               to="/faculty"
//                               onClick={() => setIsMenuOpen(false)}
//                               className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium ${
//                                 isActive('/faculty')
//                                   ? "bg-primary/10 text-primary"
//                                   : "text-foreground/80 hover:bg-accent/50"
//                               }`}
//                             >
//                               <Users className="w-5 h-5" />
//                               Faculty Panel
//                             </Link>
//                           )}
//                         </div>
//                       )}

//                       <button
//                         onClick={handleSignOut}
//                         className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-destructive hover:bg-destructive/10 mt-2"
//                       >
//                         <LogOut className="w-5 h-5" />
//                         Sign out
//                       </button>
//                     </>
//                   ) : (
//                     <div className="space-y-3 pt-2">
//                       <Button 
//                         variant="outline" 
//                         className="w-full gap-2"
//                         asChild
//                       >
//                         <Link to="/login" onClick={() => setIsMenuOpen(false)}>
//                           Login
//                         </Link>
//                       </Button>
//                       <Button 
//                         className="w-full gap-2 bg-gradient-to-r from-primary to-primary hover:shadow-md"
//                         asChild
//                       >
//                         <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
//                           Create Account
//                         </Link>
//                       </Button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;