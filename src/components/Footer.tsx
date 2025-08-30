import React from "react";
import { Link } from "react-router-dom";
import {
  BrainCircuit,
  Twitter,
  Facebook,
  Linkedin,
  Instagram,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top Section */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
          {/* Brand Info */}
          <div className="col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg flex items-center justify-center mr-3">
                <BrainCircuit className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">SVCE Test Series</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Prepare smarter with <strong className="text-white">SVCE Test Series</strong> – 
              India's most trusted platform for <strong className="text-white">free aptitude tests</strong>, 
              reasoning practice, and mock exams for campus placements and competitive exams.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href="https://twitter.com/vishal_7015s"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-blue-500 rounded-full flex items-center justify-center transition-colors"
              >
                <Twitter className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://www.linkedin.com/in/vishalshivhare7015s/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-pink-600 rounded-full flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Test Series */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              SVCE Test Series
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/category/8583ca70-3226-4488-8d61-c52772e28c8d"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Quantitative Aptitude
                </Link>
              </li>
              <li>
                <Link
                  to="/category/ab5756d0-14ef-4d87-a87a-71d67d483f73"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Logical Reasoning
                </Link>
              </li>
              <li>
                <Link
                  to="/category/e75ec7c2-b571-49ed-a8b5-949bbde1c701"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Verbal Ability
                </Link>
              </li>
              <li>
                <Link
                  to="/test-series"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  SVCE Mock Tests
                </Link>
              </li>
            </ul>
          </div>

          {/* Exam Categories */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              SVCE Exam Prep
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/campus-placement-tests"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Campus Placements
                </Link>
              </li>
              <li>
                <Link
                  to="/banking-exams"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Banking Exams
                </Link>
              </li>
              <li>
                <Link
                  to="/cat-exam"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  CAT Exam
                </Link>
              </li>
              <li>
                <Link
                  to="/ssc-exams"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  SSC Exams
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              SVCE Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about-svce"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About SVCE
                </Link>
              </li>
              <li>
                <Link
                  to="/contact-svce"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact SVCE
                </Link>
              </li>
              <li>
                <Link
                  to="/svce-blog"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  SVCE Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Careers at SVCE
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 mb-6 md:mb-0">
            <Link
              to="/privacy-policy"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-of-service"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
          </div>
          <p className="text-sm text-gray-500 text-center md:text-left">
            © {new Date().getFullYear()} <strong>SVCE Test Series</strong>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;




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