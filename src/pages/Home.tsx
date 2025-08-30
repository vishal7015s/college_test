import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit, Target, Clock, BarChart, BookOpen, Award, User, CheckCircle, Percent, Timer, Twitter, Facebook, Linkedin, Instagram } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Helmet } from "react-helmet";

const Home = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(heroRef.current.children,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
      );
    }

    if (featuresRef.current) {
      gsap.fromTo(featuresRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, delay: 0.3, ease: "back.out(1.7)" }
      );
    }
  }, []);

  const testCategories = [
    {
      icon: BrainCircuit,
      title: "Quantitative Aptitude",
      topics: ["Number Systems", "Algebra", "Geometry", "Data Interpretation"],
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Target,
      title: "Logical Reasoning",
      topics: ["Puzzles", "Syllogisms", "Arrangements", "Deductions"],
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: BookOpen,
      title: "Verbal Ability",
      topics: ["Reading Comprehension", "Grammar", "Vocabulary", "Para Jumbles"],
      color: "bg-green-100 text-green-600"
    },
    {
      icon: Clock,
      title: "Time Management",
      topics: ["Speed Tests", "Sectional Mocks", "Strategy Sessions", "Shortcut Techniques"],
      color: "bg-orange-100 text-orange-600"
    }
  ];

  const stats = [
    { number: "25,000+", label: "Practice Questions", icon: BookOpen },
    { number: "98%", label: "Accuracy Rate", icon: CheckCircle },
    { number: "10,000+", label: "Successful Students", icon: User },
    { number: "500+", label: "Mock Tests", icon: Timer }
  ];

  return (
    <div className="min-h-screen bg-gray-50 antialiased">
      {/* ✅ SEO Meta Tags for SVCE Optimization */}
      <Helmet>
        <title>SVCE - Free Aptitude Tests & Mock Exams for Campus Placement</title>
        <meta 
          name="description" 
          content="SVCE offers free aptitude tests, reasoning quizzes, and mock exams to crack campus placement interviews. Practice with SVCE test series for best results." 
        />
        <meta 
          name="keywords" 
          content="SVCE, aptitude tests, mock exams, campus placement, reasoning tests, free test series, SVCE test series" 
        />
      </Helmet>

      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gray-900">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="SVCE Aptitude Practice"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 "></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-36">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-white">
                Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-200">Aptitude Tests</span> with SVCE
              </h1>

              <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto lg:mx-0 leading-relaxed">
                SVCE helps you boost exam performance with 25,000+ practice questions, detailed solutions, and AI-powered analytics designed for CAT, GMAT, Bank PO and other competitive exams.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className="bg-white text-blue-900 hover:bg-white/90 px-8 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                    asChild
                  >
                    <Link to="/tests">Start SVCE Free Trial</Link>
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="px-8 py-6 text-lg border-2 border-white/30 hover:border-white/50 hover:shadow-lg transition-all duration-300 bg-transparent backdrop-blur-sm text-white"
                    asChild
                  >
                    <Link to="/demo">View SVCE Demo</Link>
                  </Button>
                </motion.div>
              </div>

              <div className="mt-12 flex flex-wrap justify-center lg:justify-start gap-4">
                {[
                  "CAT Aspirants",
                  "Bank PO Exams", 
                  "GMAT Preparation",
                  "Campus Placements"
                ].map((tag, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                    <span className="text-white text-sm font-medium">{tag}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200">
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 tracking-tight">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium text-sm uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Test Categories Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight text-gray-900">
              SVCE Comprehensive <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-500">Test Categories</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Practice across all major aptitude and reasoning areas with SVCE structured test series.
            </p>
          </motion.div>

          <div ref={featuresRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testCategories.map((category, index) => (
              <Card key={index} className="relative group hover:shadow-xl transition-all duration-500 bg-white border border-gray-200 h-full">
                <CardContent className="p-8 h-full flex flex-col">
                  <div className={`w-14 h-14 ${category.color} rounded-xl flex items-center justify-center mb-6`}>
                    <category.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl font-semibold mb-4 text-gray-900">{category.title}</CardTitle>
                  <ul className="space-y-2 mb-6 flex-grow">
                    {category.topics.map((topic, i) => (
                      <li key={i} className="flex items-center text-gray-600">
                        <CheckCircle className="w-4 h-4 mr-2 text-blue-500" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="mt-auto w-full" asChild>
                    <Link to={`/tests/${category.title.toLowerCase().replace(' ', '-')}`}>
                      Practice with SVCE
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight text-gray-900">
              Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-500">SVCE Test Series</span> Stands Out
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              SVCE is designed by experts to give you the competitive edge in aptitude tests.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-blue-100 rounded-lg p-3 mr-6">
                  <BarChart className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">SVCE Detailed Performance Analysis</h3>
                  <p className="text-gray-600">
                    SVCE provides section-wise breakdowns, time management insights, and comparative analysis with toppers.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 bg-blue-100 rounded-lg p-3 mr-6">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">SVCE Real Exam Simulation</h3>
                  <p className="text-gray-600">
                    SVCE offers timed tests with negative marking to perfectly simulate actual exam conditions.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-blue-100 rounded-lg p-3 mr-6">
                  <Percent className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">SVCE Adaptive Learning Path</h3>
                  <p className="text-gray-600">
                    SVCE system identifies your weak areas and recommends personalized practice sets.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 bg-blue-100 rounded-lg p-3 mr-6">
                  <Award className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">SVCE Expert-Curated Content</h3>
                  <p className="text-gray-600">
                    SVCE questions are designed by IIT/IIM alumni with 10+ years of exam preparation experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>      
      <Footer/>
    </div>
  );
};

export default Home;



// import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { BrainCircuit, Target, Clock, BarChart, BookOpen, Award, User, CheckCircle, Percent, Timer, Twitter, Facebook, Linkedin, Instagram } from "lucide-react";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { motion } from "framer-motion";
// import { useEffect, useRef } from "react";
// import { gsap } from "gsap";

// const Home = () => {
//   const heroRef = useRef<HTMLDivElement>(null);
//   const featuresRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (heroRef.current) {
//       gsap.fromTo(heroRef.current.children,
//         { opacity: 0, y: 50 },
//         { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
//       );
//     }

//     if (featuresRef.current) {
//       gsap.fromTo(featuresRef.current.children,
//         { opacity: 0, y: 30 },
//         { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, delay: 0.3, ease: "back.out(1.7)" }
//       );
//     }
//   }, []);

//   const testCategories = [
//     {
//       icon: BrainCircuit,
//       title: "Quantitative Aptitude",
//       topics: ["Number Systems", "Algebra", "Geometry", "Data Interpretation"],
//       color: "bg-blue-100 text-blue-600"
//     },
//     {
//       icon: Target,
//       title: "Logical Reasoning",
//       topics: ["Puzzles", "Syllogisms", "Arrangements", "Deductions"],
//       color: "bg-purple-100 text-purple-600"
//     },
//     {
//       icon: BookOpen,
//       title: "Verbal Ability",
//       topics: ["Reading Comprehension", "Grammar", "Vocabulary", "Para Jumbles"],
//       color: "bg-green-100 text-green-600"
//     },
//     {
//       icon: Clock,
//       title: "Time Management",
//       topics: ["Speed Tests", "Sectional Mocks", "Strategy Sessions", "Shortcut Techniques"],
//       color: "bg-orange-100 text-orange-600"
//     }
//   ];

//   const stats = [
//     { number: "25,000+", label: "Practice Questions", icon: BookOpen },
//     { number: "98%", label: "Accuracy Rate", icon: CheckCircle },
//     { number: "10,000+", label: "Successful Students", icon: User },
//     { number: "500+", label: "Mock Tests", icon: Timer }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 antialiased">
//       <Navbar />

//       {/* Hero Section */}
//       <section className="relative overflow-hidden bg-gray-900">
//         {/* Background Image with Overlay */}
//         <div className="absolute inset-0">
//           <img
//             src="https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
//             alt="Aptitude Practice"
//             className="w-full h-full object-cover opacity-20"
//           />
//           <div className="absolute inset-0 "></div>
//         </div>

//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-36">
//           <div className="flex flex-col lg:flex-row items-center gap-12">
//             <div className="lg:w-1/2 text-center lg:text-left">
//               <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-white">
//                 Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-200">Aptitude Tests</span>
//               </h1>

//               <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto lg:mx-0 leading-relaxed">
//                 Boost your exam performance with 25,000+ practice questions, detailed solutions, and AI-powered analytics designed for CAT, GMAT, Bank PO and other competitive exams.
//               </p>

//               <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
//                 <motion.div
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <Button
//                     size="lg"
//                     className="bg-white text-blue-900 hover:bg-white/90 px-8 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
//                     asChild
//                   >
//                     <Link to="/tests">Start Free Trial</Link>
//                   </Button>
//                 </motion.div>
//                 <motion.div
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <Button
//                     size="lg"
//                     variant="outline"
//                     className="px-8 py-6 text-lg border-2 border-white/30 hover:border-white/50 hover:shadow-lg transition-all duration-300 bg-transparent backdrop-blur-sm text-white"
//                     asChild
//                   >
//                     <Link to="/demo">View Demo</Link>
//                   </Button>
//                 </motion.div>
//               </div>

//               <div className="mt-12 flex flex-wrap justify-center lg:justify-start gap-4">
//                 {[
//                   "CAT Aspirants",
//                   "Bank PO Exams",
//                   "GMAT Preparation",
//                   "Campus Placements"
//                 ].map((tag, index) => (
//                   <div key={index} className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
//                     <span className="text-white text-sm font-medium">{tag}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Right Side - Practice Image */}
//           </div>
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section className="py-16 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//             {stats.map((stat, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: index * 0.1 }}
//                 viewport={{ once: true }}
//                 className="text-center"
//               >
//                 <div className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200">
//                   <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
//                     <stat.icon className="w-6 h-6 text-white" />
//                   </div>
//                   <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 tracking-tight">
//                     {stat.number}
//                   </div>
//                   <div className="text-gray-600 font-medium text-sm uppercase tracking-wider">
//                     {stat.label}
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Test Categories Section */}
//       <section className="py-24 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//             className="text-center mb-20"
//           >
//             <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight text-gray-900">
//               Comprehensive <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-500">Test Categories</span>
//             </h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
//               Practice across all major aptitude and reasoning areas with our structured test series.
//             </p>
//           </motion.div>

//           <div ref={featuresRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {testCategories.map((category, index) => (
//               <Card key={index} className="relative group hover:shadow-xl transition-all duration-500 bg-white border border-gray-200 h-full">
//                 <CardContent className="p-8 h-full flex flex-col">
//                   <div className={`w-14 h-14 ${category.color} rounded-xl flex items-center justify-center mb-6`}>
//                     <category.icon className="w-6 h-6" />
//                   </div>
//                   <CardTitle className="text-xl font-semibold mb-4 text-gray-900">{category.title}</CardTitle>
//                   <ul className="space-y-2 mb-6 flex-grow">
//                     {category.topics.map((topic, i) => (
//                       <li key={i} className="flex items-center text-gray-600">
//                         <CheckCircle className="w-4 h-4 mr-2 text-blue-500" />
//                         {topic}
//                       </li>
//                     ))}
//                   </ul>
//                   <Button variant="outline" className="mt-auto w-full" asChild>
//                     <Link to={`/tests/${category.title.toLowerCase().replace(' ', '-')}`}>
//                       Practice Now
//                     </Link>
//                   </Button>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-24 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//             className="text-center mb-20"
//           >
//             <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight text-gray-900">
//               Why Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-500">Test Series</span> Stands Out
//             </h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
//               Designed by experts to give you the competitive edge in aptitude tests.
//             </p>
//           </motion.div>

//           <div className="grid md:grid-cols-2 gap-12">
//             <div className="space-y-8">
//               <div className="flex items-start">
//                 <div className="flex-shrink-0 bg-blue-100 rounded-lg p-3 mr-6">
//                   <BarChart className="w-6 h-6 text-blue-600" />
//                 </div>
//                 <div>
//                   <h3 className="text-xl font-semibold mb-3 text-gray-900">Detailed Performance Analysis</h3>
//                   <p className="text-gray-600">
//                     Get section-wise breakdowns, time management insights, and comparative analysis with toppers.
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-start">
//                 <div className="flex-shrink-0 bg-blue-100 rounded-lg p-3 mr-6">
//                   <Clock className="w-6 h-6 text-blue-600" />
//                 </div>
//                 <div>
//                   <h3 className="text-xl font-semibold mb-3 text-gray-900">Real Exam Simulation</h3>
//                   <p className="text-gray-600">
//                     Timed tests with negative marking to perfectly simulate actual exam conditions.
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="space-y-8">
//               <div className="flex items-start">
//                 <div className="flex-shrink-0 bg-blue-100 rounded-lg p-3 mr-6">
//                   <Percent className="w-6 h-6 text-blue-600" />
//                 </div>
//                 <div>
//                   <h3 className="text-xl font-semibold mb-3 text-gray-900">Adaptive Learning Path</h3>
//                   <p className="text-gray-600">
//                     Our system identifies your weak areas and recommends personalized practice sets.
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-start">
//                 <div className="flex-shrink-0 bg-blue-100 rounded-lg p-3 mr-6">
//                   <Award className="w-6 h-6 text-blue-600" />
//                 </div>
//                 <div>
//                   <h3 className="text-xl font-semibold mb-3 text-gray-900">Expert-Curated Content</h3>
//                   <p className="text-gray-600">
//                     Questions designed by IIT/IIM alumni with 10+ years of exam preparation experience.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>      
//       <Footer/>
//     </div>
//   );
// };

// export default Home;






// import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Brain, Target, TrendingUp, Users, BookOpen, Award, Eye } from "lucide-react";
// import Navbar from "@/components/Navbar";
// import { useLiveUsers } from "@/hooks/useLiveUsers";
// import { motion } from "framer-motion";
// import { useEffect, useRef } from "react";
// import { gsap } from "gsap";

// const Home = () => {
//   const { liveUsersCount, totalUsersCount } = useLiveUsers();  
//   const heroRef = useRef<HTMLDivElement>(null);
//   const statsRef = useRef<HTMLDivElement>(null);
  
//   useEffect(() => {
//     // GSAP animations  
//     if (heroRef.current) {
//       gsap.fromTo(heroRef.current.children,   
//         { opacity: 0, y: 50 },
//         { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power2.out" }
//       );
//     }
    
//     if (statsRef.current) {
//       gsap.fromTo(statsRef.current.children,  
//         { opacity: 0, scale: 0.8 },
//         { opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, delay: 0.5, ease: "back.out(1.7)" }
//       );
//     }
//   }, []);

//   const features = [
//     {
//       icon: Brain,  
//       title: "Aptitude Tests",
//       description: "Sharpen your logical reasoning and analytical skills with comprehensive aptitude tests."
//     },
//     {
//       icon: Target,  
//       title: "Reasoning Practice",
//       description: "Master verbal and non-verbal reasoning with our structured practice modules."
//     },
//     {
//       icon: BookOpen,  
//       title: "Verbal Ability",
//       description: "Enhance your English language skills with grammar, vocabulary, and comprehension tests."
//     },
//     {
//       icon: TrendingUp,  
//       title: "Progress Tracking",
//       description: "Monitor your improvement with detailed analytics and performance insights."
//     }
//   ];

//   const stats = [
//     { number: "10,000+", label: "Practice Questions", icon: BookOpen },  
//     { number: "500+", label: "Mock Tests", icon: Target },
//     { number: "50+", label: "Topics Covered", icon: Brain },
//     { number: totalUsersCount.toLocaleString(), label: "Registered Users", icon: Users }
//   ];

//   return (
//     <div className="min-h-screen bg-background">  
//       <Navbar />
      
//       {/* Live Users Badge */}
//       <motion.div 
//         initial={{ opacity: 0, x: 100 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.5, delay: 1 }}
//         className="fixed top-20 right-4 z-50"
//       >
//         <div className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
//           <div className="w-2 h-2 bg-success-light rounded-full animate-pulse"></div>
//           <Eye className="w-4 h-4" />
//           <span className="text-sm font-medium">{liveUsersCount} Live Learners</span>
//         </div>
//       </motion.div>
      
//       {/* Hero Section */}
//       <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-brand-primary/5">
//         <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23e0e7ff%22%20fill-opacity=%220.4%22%3E%3Ccircle%20cx=%227%22%20cy=%227%22%20r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
        
//         <div ref={heroRef} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
//           <div className="text-center">
//             <motion.div 
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.8, ease: "backOut" }}
//               className="mb-8"
//             >
//               <img 
//                 src="/lovable-uploads/18bb5e78-f0b2-4cf7-b6c7-e17d62a79fdf.png" 
//                 alt="SVCE QNA Logo" 
//                 className="w-24 h-24 mx-auto mb-4 drop-shadow-lg"
//               />
//             </motion.div>
            
//             <h1 className="text-4xl md:text-6xl font-bold mb-6">
//               <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
//                 SVCE QNA
//               </span>
//               <br />
//               <span className="text-foreground">Excellence in Learning</span>
//             </h1>
            
//             <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
//               Professional test preparation platform for Sri Venkateswara College of Engineering students. 
//               Master aptitude, reasoning, and verbal ability with expert-designed questions.
//             </p>
            
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <Button 
//                   size="lg" 
//                   className="bg-gradient-to-r from-brand-primary to-brand-secondary hover:opacity-90 px-8 py-6 text-lg shadow-xl"
//                   asChild
//                 >
//                   <Link to="/test-series">Start Practicing Now</Link>
//                 </Button>
//               </motion.div>
//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <Button size="lg" variant="outline" className="px-8 py-6 text-lg border-2 hover:shadow-lg" asChild>
//                   <Link to="/about">Learn More</Link>
//                 </Button>
//               </motion.div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section className="py-16 bg-gradient-to-r from-card to-muted/30">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8">
//             {stats.map((stat, index) => (
//               <motion.div   
//                 key={index} 
//                 className="text-center group"
//                 whileHover={{ y: -5 }}
//                 transition={{ type: "spring", stiffness: 300 }}
//               >
//                 <div className="bg-background rounded-xl p-6 shadow-lg group-hover:shadow-xl transition-all duration-300">
//                   <div className="w-12 h-12 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
//                     <stat.icon className="w-6 h-6 text-white" />
//                   </div>
//                   <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent mb-2">
//                     {stat.number}
//                   </div>
//                   <div className="text-muted-foreground font-medium">
//                     {stat.label}
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div 
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//             className="text-center mb-16"
//           >
//             <h2 className="text-3xl md:text-4xl font-bold mb-4">
//               Why Choose <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">SVCE QNA</span>?
//             </h2>
//             <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//               Everything you need to excel in your competitive exams and career preparation at SVCE.
//             </p>
//           </motion.div>
          
//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {features.map((feature, index) => (
//               <motion.div  
//                 key={index}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: index * 0.1 }}
//                 viewport={{ once: true }}
//                 whileHover={{ y: -10, scale: 1.02 }}
//               >
//                 <Card className="relative group hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-background to-muted/20 border-2 hover:border-brand-primary/20">
//                   <CardContent className="p-6">
//                     <motion.div 
//                       className="w-12 h-12 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-lg flex items-center justify-center mb-4"
//                       whileHover={{ rotate: 360, scale: 1.1 }}
//                       transition={{ duration: 0.6 }}
//                     >
//                       <feature.icon className="w-6 h-6 text-white" />
//                     </motion.div>
//                     <h3 className="text-xl font-semibold mb-3 group-hover:text-brand-primary transition-colors duration-300">{feature.title}</h3>
//                     <p className="text-muted-foreground">{feature.description}</p>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary relative overflow-hidden">
//         <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23ffffff%22%20fill-opacity=%220.1%22%3E%3Ccircle%20cx=%227%22%20cy=%227%22%20r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
//         <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.8, ease: "backOut" }}
//             viewport={{ once: true }}
//           >
//             <Award className="w-16 h-16 text-white mx-auto mb-6" />
//           </motion.div>
//           <motion.h2 
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             viewport={{ once: true }}
//             className="text-3xl md:text-4xl font-bold text-white mb-6"
//           >
//             Ready to Start Your Success Journey?
//           </motion.h2>
//           <motion.p 
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.4 }}
//             viewport={{ once: true }}
//             className="text-xl text-white/90 mb-8"
//           >
//             Join thousands of SVCE students who have improved their test scores with our platform.
//           </motion.p>
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.6 }}
//             viewport={{ once: true }}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <Button 
//               size="lg" 
//               className="bg-white text-brand-primary hover:bg-white/90 px-8 py-6 text-lg font-semibold shadow-2xl"
//               asChild
//             >
//               <Link to="/signup">Get Started Today</Link>
//             </Button>
//           </motion.div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gradient-to-r from-muted to-card py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div 
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//             className="flex flex-col md:flex-row justify-between items-center"
//           >
//             <div className="flex items-center space-x-3 mb-4 md:mb-0">
//               <img 
//                 src="/lovable-uploads/18bb5e78-f0b2-4cf7-b6c7-e17d62a79fdf.png" 
//                 alt="SVCE QNA Logo" 
//                 className="w-10 h-10"
//               />
//               <span className="text-xl font-bold bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">SVCE QNA</span>
//             </div>
//             <p className="text-muted-foreground">
//               © 2024 Sri Venkateswara College of Engineering. All rights reserved.
//             </p>
//           </motion.div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Home;
