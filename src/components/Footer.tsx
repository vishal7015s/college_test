// import { Link } from "react-router-dom";
// import { BookOpen, Users, Info, LogIn, UserPlus, Settings } from "lucide-react";

// const Footer = () => {
//   return (
//     <footer className="bg-gray-50 border-t border-gray-200 mt-20">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//           {/* College Info */}
//           <div className="col-span-1 md:col-span-2">
//             <div className="flex items-center space-x-3 mb-4">
//               <img 
//                 src="/lovable-uploads/18bb5e78-f0b2-4cf7-b6c7-e17d62a79fdf.png" 
//                 alt="SVCE Logo" 
//                 className="w-10 h-10"
//               />
//               <div>
//                 <h3 className="text-lg font-bold text-gray-900">SVCE Test Portal</h3>
//                 <p className="text-sm text-gray-600">Swami Vivekanand College of Engineering, Indore</p>
//               </div>
//             </div>
//             <p className="text-gray-600 mb-4">
//               Comprehensive test preparation platform for students to enhance their skills and excel in competitive examinations.
//             </p>
//             <div className="text-sm text-gray-500">
//               <p>© 2024 Swami Vivekanand College of Engineering. All rights reserved.</p>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h4 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h4>
//             <ul className="space-y-2">
//               <li>
//                 <Link to="/" className="text-gray-600 hover:text-primary transition-colors flex items-center">
//                   <BookOpen className="w-4 h-4 mr-2" />
//                   Home
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/test-series" className="text-gray-600 hover:text-primary transition-colors flex items-center">
//                   <Users className="w-4 h-4 mr-2" />
//                   Test Series
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/about" className="text-gray-600 hover:text-primary transition-colors flex items-center">
//                   <Info className="w-4 h-4 mr-2" />
//                   About
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* User Actions */}
//           <div>
//             <h4 className="text-lg font-semibold text-gray-900 mb-4">Account</h4>
//             <ul className="space-y-2">
//               <li>
//                 <Link to="/login" className="text-gray-600 hover:text-primary transition-colors flex items-center">
//                   <LogIn className="w-4 h-4 mr-2" />
//                   Login
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/signup" className="text-gray-600 hover:text-primary transition-colors flex items-center">
//                   <UserPlus className="w-4 h-4 mr-2" />
//                   Sign Up
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/admin" className="text-gray-600 hover:text-primary transition-colors flex items-center">
//                   <Settings className="w-4 h-4 mr-2" />
//                   Admin
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


import { Link } from "react-router-dom";
import { BookOpen, Users, Info, LogIn, UserPlus, Settings } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* College Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/lovable-uploads/18bb5e78-f0b2-4cf7-b6c7-e17d62a79fdf.png" 
                alt="SVCE Logo" 
                className="w-10 h-10"
              />
              <div>
                <h3 className="text-lg font-bold text-gray-900">SVCE Test Portal</h3>
                <p className="text-sm text-gray-600">Swami Vivekanand College of Engineering, Indore</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Comprehensive test preparation platform for students to enhance their skills and excel in competitive examinations.
            </p>
            <div className="text-sm text-gray-500">
              <p>© 2024 Swami Vivekanand College of Engineering. All rights reserved.</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary transition-colors flex items-center">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/test-series" className="text-gray-600 hover:text-primary transition-colors flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  Test Series
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-primary transition-colors flex items-center">
                  <Info className="w-4 h-4 mr-2" />
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* User Actions */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Account</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/login" className="text-gray-600 hover:text-primary transition-colors flex items-center">
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-gray-600 hover:text-primary transition-colors flex items-center">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-gray-600 hover:text-primary transition-colors flex items-center">
                  <Settings className="w-4 h-4 mr-2" />
                  Admin
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;