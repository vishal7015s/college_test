import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import {
  Brain,
  Calculator,
  Languages,
  TrendingUp,
  Users,
  Clock,
  Globe,
  BookOpen,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

interface Category {
  id: string;
  name: string;
  description: string;
  topics?: number;
  questions?: number;
}

const TestSeries = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Icon Mapping
  const categoryIcons: Record<string, JSX.Element> = {
    Aptitude: <Calculator className="h-10 w-10 text-indigo-600" />,
    Reasoning: <Brain className="h-10 w-10 text-purple-600" />,
    "Verbal Ability": <Languages className="h-10 w-10 text-green-600" />,
    "Logical Thinking": <TrendingUp className="h-10 w-10 text-pink-600" />,
    "General Knowledge": <Globe className="h-10 w-10 text-yellow-600" />,
    "Group Discussion": <Users className="h-10 w-10 text-orange-600" />,
    "Mock Test": <Clock className="h-10 w-10 text-indigo-600" />,
    default: <BookOpen className="h-10 w-10 text-gray-600" />,
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from("categories")
        .select(`
          id,
          name,
          description,
          topics:topics(count),
          questions:topics(questions(count))
        `);

      if (error) throw error;

      const categoriesWithCounts =
        data?.map((category) => ({
          ...category,
          topics: category.topics?.[0]?.count || 0,
          questions:
            category.questions?.reduce(
              (total: number, topic: any) =>
                total + (topic.questions?.[0]?.count || 0),
              0
            ) || 0,
        })) || [];

      setCategories(categoriesWithCounts);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading SVCE categories...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-indigo-50 text-gray-900 antialiased">
      {/* ✅ SEO Meta */}
      <Helmet>
        <title>
          SVCE Test Series - Free Aptitude & Reasoning Tests for Campus Placement
        </title>
        <meta
          name="description"
          content="SVCE offers free aptitude test series, reasoning practice sets, and verbal ability mock tests for campus placement preparation. Start preparing with SVCE today."
        />
        <meta
          name="keywords"
          content="SVCE, SVCE test series, aptitude tests, reasoning practice, free mock tests, campus placement preparation, SVCE aptitude, SVCE reasoning"
        />
        
        {/* ✅ Breadcrumb Schema for Test Series Page */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "SVCE Home",
                  "item": "https://svce.vercel.app"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "SVCE Test Series",
                  "item": "https://svce.vercel.app/test-series"
                }
              ]
            }
          `}
        </script>

        {/* ✅ Course Schema for Test Series */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Course",
              "name": "SVCE Test Series - Campus Placement Preparation",
              "description": "Free aptitude and reasoning test series for campus placement preparation by SVCE",
              "provider": {
                "@type": "Organization",
                "name": "SVCE Test Series",
                "sameAs": "https://svce.vercel.app"
              },
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "INR"
              }
            }
          `}
        </script>
      </Helmet>

      <Navbar />

      {/* ✅ Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16 text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">
            SVCE Free Test Series for Campus Placement
          </h1>
          <p className="text-lg opacity-90 mb-6">
            Practice <strong>SVCE aptitude tests</strong>, <strong>SVCE reasoning practice</strong> and{" "}
            <strong>SVCE verbal ability</strong> with our curated{" "}
            <strong>SVCE mock tests</strong> and boost your chances of cracking
            placement exams.
          </p>
          <a
            href="#categories"
            className="inline-block px-6 py-3 bg-white text-indigo-700 font-semibold rounded-full shadow hover:bg-gray-100 transition"
          >
            Start SVCE Practice
          </a>
        </div>
      </section>

      {/* ✅ Categories */}
      <main
        id="categories"
        className="container mx-auto mb-20 px-6 py-12 max-w-6xl"
      >
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Choose Your SVCE Practice Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 250 }}
            >
              <Link to={`/category/${category.id}`}>
                <Card className="h-full rounded-2xl shadow-md border border-gray-200 bg-gradient-to-br from-white to-gray-50 hover:from-indigo-50 hover:to-purple-50 hover:shadow-2xl transition">
                  <CardContent className="p-6 text-center flex flex-col justify-between h-full">
                    <div>
                      <div className="flex justify-center mb-4">
                        {categoryIcons[category.name] || categoryIcons.default}
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-gray-900">
                        SVCE {category.name}
                      </h3>
                      {/* ✅ Equal height description */}
                      <p className="text-gray-600 mb-6 line-clamp-3 min-h-[72px]">
                        {category.description} - SVCE curated practice tests for better results.
                      </p>
                    </div>
                    <div className="flex justify-center gap-4 text-sm font-medium">
                      <span className="px-3 py-1 bg-gray-100 rounded-full">
                        {category.topics} SVCE Topics
                      </span>
                      <span className="px-3 py-1 bg-gray-100 rounded-full">
                        {category.questions} SVCE Questions
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>

      {/* ✅ SEO Descriptive Section */}
      <section className="bg-white py-12 border-t border-gray-200">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <h2 className="text-2xl font-bold mb-6">
            Why Choose SVCE Test Series?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            SVCE offers <strong>free aptitude test series</strong> and{" "}
            <strong>reasoning practice questions</strong> designed to help
            students excel in{" "}
            <strong>campus placement preparation</strong>. With detailed{" "}
            <strong>SVCE mock tests</strong>, you can build confidence and speed to
            crack company placement exams.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Prepare with real exam-like <strong>SVCE online test series</strong>,
            covering <strong>quantitative aptitude</strong>,{" "}
            <strong>logical reasoning</strong>, and{" "}
            <strong>verbal ability</strong> — all completely free from SVCE.
          </p>
        </div>
      </section>

      {/* ✅ Additional SVCE Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            SVCE Test Series Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Timed SVCE Tests</h3>
              <p className="text-gray-600">Practice with SVCE timed tests that simulate real exam conditions.</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">SVCE Performance Analytics</h3>
              <p className="text-gray-600">Get detailed SVCE analytics on your performance and progress.</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">SVCE Expert Content</h3>
              <p className="text-gray-600">SVCE questions curated by industry experts and experienced educators.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TestSeries;




// import { Link } from "react-router-dom";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Brain,
//   Calculator,
//   Languages,
//   TrendingUp,
//   Users,
//   Clock,
//   Globe,
//   BookOpen,
// } from "lucide-react";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { useEffect, useState } from "react";
// import { supabase } from "@/integrations/supabase/client";
// import { motion } from "framer-motion";
// import { Helmet } from "react-helmet";

// interface Category {
//   id: string;
//   name: string;
//   description: string;
//   topics?: number;
//   questions?: number;
// }

// const TestSeries = () => {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [loading, setLoading] = useState(true);

//   // ✅ Icon Mapping
//   const categoryIcons: Record<string, JSX.Element> = {
//     Aptitude: <Calculator className="h-10 w-10 text-indigo-600" />,
//     Reasoning: <Brain className="h-10 w-10 text-purple-600" />,
//     "Verbal Ability": <Languages className="h-10 w-10 text-green-600" />,
//     "Logical Thinking": <TrendingUp className="h-10 w-10 text-pink-600" />,
//     "General Knowledge": <Globe className="h-10 w-10 text-yellow-600" />,
//     "Group Discussion": <Users className="h-10 w-10 text-orange-600" />,
//     "Mock Test": <Clock className="h-10 w-10 text-indigo-600" />,
//     default: <BookOpen className="h-10 w-10 text-gray-600" />,
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const { data, error } = await supabase
//         .from("categories")
//         .select(`
//           id,
//           name,
//           description,
//           topics:topics(count),
//           questions:topics(questions(count))
//         `);

//       if (error) throw error;

//       const categoriesWithCounts =
//         data?.map((category) => ({
//           ...category,
//           topics: category.topics?.[0]?.count || 0,
//           questions:
//             category.questions?.reduce(
//               (total: number, topic: any) =>
//                 total + (topic.questions?.[0]?.count || 0),
//               0
//             ) || 0,
//         })) || [];

//       setCategories(categoriesWithCounts);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-background">
//         <Navbar />
//         <div className="flex items-center justify-center min-h-[60vh]">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
//             <p className="mt-4 text-muted-foreground">Loading categories...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-indigo-50 text-gray-900 antialiased">
//       {/* ✅ SEO Meta */}
//       <Helmet>
//         <title>
//           Free Aptitude & Reasoning Test Series for Campus Placement | SVCE
//         </title>
//         <meta
//           name="description"
//           content="Boost your campus placement preparation with free aptitude test series, reasoning practice sets, and verbal ability mock tests. Start preparing for your dream job with SVCE."
//         />
//         <meta
//           name="keywords"
//           content="campus placement preparation, aptitude test series, reasoning practice, free mock tests, verbal ability, online tests for students"
//         />
        
//         {/* ✅ Breadcrumb Schema for Test Series Page */}
//         <script type="application/ld+json">
//           {`
//             {
//               "@context": "https://schema.org",
//               "@type": "BreadcrumbList",
//               "itemListElement": [
//                 {
//                   "@type": "ListItem",
//                   "position": 1,
//                   "name": "Home",
//                   "item": "https://svce.vercel.app"
//                 },
//                 {
//                   "@type": "ListItem",
//                   "position": 2,
//                   "name": "Test Series",
//                   "item": "https://svce.vercel.app/test-series"
//                 }
//               ]
//             }
//           `}
//         </script>
//       </Helmet>

//       <Navbar />

//       {/* ✅ Hero Section */}
//       <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16 text-white text-center">
//         <div className="max-w-4xl mx-auto px-6">
//           <h1 className="text-4xl font-bold mb-4">
//             Free Test Series for Campus Placement Preparation
//           </h1>
//           <p className="text-lg opacity-90 mb-6">
//             Practice <strong>aptitude</strong>, <strong>reasoning</strong> and{" "}
//             <strong>verbal ability</strong> with our curated{" "}
//             <strong>mock tests</strong> and boost your chances of cracking
//             placement exams.
//           </p>
//           <a
//             href="#categories"
//             className="inline-block px-6 py-3 bg-white text-indigo-700 font-semibold rounded-full shadow hover:bg-gray-100 transition"
//           >
//             Start Practicing
//           </a>
//         </div>
//       </section>

//       {/* ✅ Categories */}
//       <main
//         id="categories"
//         className="container mx-auto mb-20 px-6 py-12 max-w-6xl"
//       >
//         <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
//           Choose Your Practice Category
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//           {categories.map((category) => (
//             <motion.div
//               key={category.id}
//               whileHover={{ scale: 1.05 }}
//               transition={{ type: "spring", stiffness: 250 }}
//             >
//               <Link to={`/category/${category.id}`}>
//                 <Card className="h-full rounded-2xl shadow-md border border-gray-200 bg-gradient-to-br from-white to-gray-50 hover:from-indigo-50 hover:to-purple-50 hover:shadow-2xl transition">
//                   <CardContent className="p-6 text-center flex flex-col justify-between h-full">
//                     <div>
//                       <div className="flex justify-center mb-4">
//                         {categoryIcons[category.name] || categoryIcons.default}
//                       </div>
//                       <h3 className="text-xl font-semibold mb-2 text-gray-900">
//                         {category.name}
//                       </h3>
//                       {/* ✅ Equal height description */}
//                       <p className="text-gray-600 mb-6 line-clamp-3 min-h-[72px]">
//                         {category.description}
//                       </p>
//                     </div>
//                     <div className="flex justify-center gap-4 text-sm font-medium">
//                       <span className="px-3 py-1 bg-gray-100 rounded-full">
//                         {category.topics} Topics
//                       </span>
//                       <span className="px-3 py-1 bg-gray-100 rounded-full">
//                         {category.questions} Questions
//                       </span>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </Link>
//             </motion.div>
//           ))}
//         </div>
//       </main>

//       {/* ✅ SEO Descriptive Section */}
//       <section className="bg-white py-12 border-t border-gray-200">
//         <div className="container mx-auto px-6 text-center max-w-4xl">
//           <h2 className="text-2xl font-bold mb-6">
//             Why Practice with SVCE Test Series?
//           </h2>
//           <p className="text-gray-700 leading-relaxed mb-4">
//             Our <strong>free aptitude test series</strong> and{" "}
//             <strong>reasoning practice questions</strong> are designed to help
//             students excel in{" "}
//             <strong>campus placement preparation</strong>. With detailed{" "}
//             <strong>mock tests</strong>, you can build confidence and speed to
//             crack company placement exams.
//           </p>
//           <p className="text-gray-700 leading-relaxed">
//             Prepare with real exam-like <strong>online test series</strong>,
//             covering <strong>quantitative aptitude</strong>,{" "}
//             <strong>logical reasoning</strong>, and{" "}
//             <strong>verbal ability</strong> — all for free.
//           </p>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// };

// export default TestSeries;



// import { Link } from "react-router-dom";
// import { Card, CardContent } from "@/components/ui/card";
// import { Brain, Calculator, Languages, TrendingUp, Users, Clock, Sparkles } from "lucide-react";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { useEffect, useState } from "react";
// import { supabase } from "@/integrations/supabase/client";
// import { motion } from "framer-motion";
// import { Helmet } from "react-helmet";  // ✅ for SEO meta tags

// interface Category {
//   id: string;
//   name: string;
//   description: string;
//   topics?: number;
//   questions?: number;
// }

// const TestSeries = () => {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const { data, error } = await supabase
//         .from("categories")
//         .select(`
//           id,
//           name,
//           description,
//           topics:topics(count),
//           questions:topics(questions(count))
//         `);

//       if (error) throw error;

//       const categoriesWithCounts =
//         data?.map((category) => ({
//           ...category,
//           topics: category.topics?.[0]?.count || 0,
//           questions:
//             category.questions?.reduce(
//               (total: number, topic: any) => total + (topic.questions?.[0]?.count || 0),
//               0
//             ) || 0,
//         })) || [];

//       setCategories(categoriesWithCounts);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-background">
//         <Navbar />
//         <div className="flex items-center justify-center min-h-[60vh]">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto"></div>
//             <p className="mt-4 text-muted-foreground">Loading categories...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 text-gray-900 antialiased">
//       {/* ✅ SEO + FAQ Schema */}
//       <Helmet>
//         {/* Basic Meta */}
//         <title>Free Aptitude & Reasoning Test Series for College Students | SVCE</title>
//         <meta
//           name="description"
//           content="Prepare for campus placements with free aptitude, reasoning, and verbal ability test series at SVCE. Practice unlimited questions and clear your first round easily."
//         />
//         <meta
//           name="keywords"
//           content="aptitude test series, reasoning practice, verbal ability, free placement preparation, campus placement tests"
//         />

//         {/* Open Graph */}
//         <meta property="og:title" content="Free Test Series for Campus Placements | SVCE" />
//         <meta
//           property="og:description"
//           content="Boost your campus placement preparation with free aptitude, reasoning, and verbal test series. 100% free for college students."
//         />
//         <meta property="og:type" content="website" />
//         <meta property="og:url" content="https://svce.vercel.app/test-series" />
//         <meta property="og:image" content="https://svce.vercel.app/test-series-preview.png" />

//       </Helmet>

//       <Navbar />

//       {/* ✅ Hero Section */}
//       <header className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-16 text-center">
//         <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
//           Free Online Test Series for Placement Preparation
//         </h1>
//         <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90">
//           Practice aptitude, reasoning, and verbal ability tests designed for
//           college students preparing for campus placements.
//         </p>
//       </header>

//       {/* ✅ Categories */}
//       <main className="container mx-auto px-6 py-12">
//         <h2 className="text-2xl font-bold text-center mb-8">
//           Choose Your Practice Category
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {categories.map((category) => (
//             <motion.div
//               key={category.id}
//               whileHover={{ scale: 1.05 }}
//               transition={{ type: "spring", stiffness: 300 }}
//             >
//               <Link to={`/category/${category.id}`}>
//                 <Card className="shadow-md hover:shadow-xl transition rounded-2xl border border-gray-200">
//                   <CardContent className="p-6 text-center">
//                     <div className="flex justify-center mb-4">
//                       <Brain className="h-10 w-10 text-blue-600" />
//                     </div>
//                     <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
//                     <p className="text-gray-600 mb-3">{category.description}</p>
//                     <div className="flex justify-center gap-4 text-sm text-gray-500">
//                       <span>{category.topics} Topics</span>
//                       <span>{category.questions} Questions</span>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </Link>
//             </motion.div>
//           ))}
//         </div>
//       </main>

//       {/* ✅ How it Works */}
//       <section className="bg-white py-16">
//         <div className="container mx-auto px-6">
//           <h2 className="text-2xl font-bold text-center mb-10">How It Works</h2>
//           <div className="grid md:grid-cols-3 gap-8 text-center">
//             <div>
//               <Users className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
//               <h3 className="text-lg font-semibold mb-2">Sign Up Free</h3>
//               <p className="text-gray-600">
//                 Create your free account to access all test series.
//               </p>
//             </div>
//             <div>
//               <Clock className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
//               <h3 className="text-lg font-semibold mb-2">Attempt Tests</h3>
//               <p className="text-gray-600">
//                 Choose from multiple categories and start practicing anytime.
//               </p>
//             </div>
//             <div>
//               <TrendingUp className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
//               <h3 className="text-lg font-semibold mb-2">Track Progress</h3>
//               <p className="text-gray-600">
//                 Get instant results and track your preparation performance.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// };

// export default TestSeries;
