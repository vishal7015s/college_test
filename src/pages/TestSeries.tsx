import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Calculator, Languages, TrendingUp, Users, Clock, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";  // ✅ for SEO meta tags

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
              (total: number, topic: any) => total + (topic.questions?.[0]?.count || 0),
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
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading categories...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 antialiased">
      {/* ✅ SEO + FAQ Schema */}
      <Helmet>
        {/* Basic Meta */}
        <title>Free Aptitude & Reasoning Test Series for College Students | SVCE</title>
        <meta
          name="description"
          content="Prepare for campus placements with free aptitude, reasoning, and verbal ability test series at SVCE. Practice unlimited questions and clear your first round easily."
        />
        <meta
          name="keywords"
          content="aptitude test series, reasoning practice, verbal ability, free placement preparation, campus placement tests"
        />

        {/* Open Graph */}
        <meta property="og:title" content="Free Test Series for Campus Placements | SVCE" />
        <meta
          property="og:description"
          content="Boost your campus placement preparation with free aptitude, reasoning, and verbal test series. 100% free for college students."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://svce.vercel.app/test-series" />
        <meta property="og:image" content="https://svce.vercel.app/test-series-preview.png" />

      </Helmet>

      <Navbar />

      {/* ✅ Hero Section */}
      <header className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Free Online Test Series for Placement Preparation
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90">
          Practice aptitude, reasoning, and verbal ability tests designed for
          college students preparing for campus placements.
        </p>
      </header>

      {/* ✅ Categories */}
      <main className="container mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-center mb-8">
          Choose Your Practice Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link to={`/category/${category.id}`}>
                <Card className="shadow-md hover:shadow-xl transition rounded-2xl border border-gray-200">
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center mb-4">
                      <Brain className="h-10 w-10 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                    <p className="text-gray-600 mb-3">{category.description}</p>
                    <div className="flex justify-center gap-4 text-sm text-gray-500">
                      <span>{category.topics} Topics</span>
                      <span>{category.questions} Questions</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>

      {/* ✅ How it Works */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-10">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <Users className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Sign Up Free</h3>
              <p className="text-gray-600">
                Create your free account to access all test series.
              </p>
            </div>
            <div>
              <Clock className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Attempt Tests</h3>
              <p className="text-gray-600">
                Choose from multiple categories and start practicing anytime.
              </p>
            </div>
            <div>
              <TrendingUp className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Track Progress</h3>
              <p className="text-gray-600">
                Get instant results and track your preparation performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TestSeries;
