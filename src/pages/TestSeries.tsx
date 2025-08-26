import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Calculator, Languages, TrendingUp, Users, Clock, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";

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

  const iconMap: { [key: string]: any } = {
    "aptitude": Calculator,
    "reasoning": Brain,
    "verbal": Languages,
    "coding": TrendingUp,
    "default": Brain
  };

  const colorMap: { [key: string]: { gradient: string; shadow: string; glow: string } } = {
    "aptitude": { 
      gradient: "from-blue-500 via-blue-600 to-indigo-600", 
      shadow: "shadow-blue-500/25", 
      glow: "hover:shadow-blue-500/40" 
    },
    "reasoning": { 
      gradient: "from-purple-500 via-purple-600 to-pink-600", 
      shadow: "shadow-purple-500/25", 
      glow: "hover:shadow-purple-500/40" 
    }, 
    "verbal": { 
      gradient: "from-green-500 via-emerald-600 to-teal-600", 
      shadow: "shadow-green-500/25", 
      glow: "hover:shadow-green-500/40" 
    },
    "coding": { 
      gradient: "from-red-500 via-rose-600 to-orange-600", 
      shadow: "shadow-red-500/25", 
      glow: "hover:shadow-red-500/40" 
    },
    "default": { 
      gradient: "from-gray-500 via-slate-600 to-zinc-600", 
      shadow: "shadow-gray-500/25", 
      glow: "hover:shadow-gray-500/40" 
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select(`
          id,
          name,
          description,
          topics:topics(count),
          questions:topics(questions(count))
        `);

      if (error) throw error;

      const categoriesWithCounts = data?.map(category => ({
        ...category,
        topics: category.topics?.[0]?.count || 0,
        questions: category.questions?.reduce((total: number, topic: any) => 
          total + (topic.questions?.[0]?.count || 0), 0) || 0
      })) || [];

      setCategories(categoriesWithCounts);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const getIconForCategory = (name: string) => {
    const key = name.toLowerCase();
    return iconMap[key] || iconMap.default;
  };

  const getColorForCategory = (name: string) => {
    const key = name.toLowerCase();
    return colorMap[key] || colorMap.default;
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-purple-600 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              Premium Test Categories
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Test Series Categories
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Choose your area of focus and start practicing with comprehensive test series 
              designed to help you excel in competitive exams.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Magic Bento Grid for Categories */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {categories.map((category, index) => {
              const IconComponent = getIconForCategory(category.name);
              const colorConfig = getColorForCategory(category.name);
              
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="group"
                >
                  <Link to={`/category/${category.id}`}>
                    <Card className={`
                      relative overflow-hidden border-0 bg-white 
                      hover:shadow-2xl ${colorConfig.shadow} ${colorConfig.glow}
                      transition-all duration-500 group-hover:scale-[1.02]
                      before:absolute before:inset-0 before:bg-gradient-to-br before:from-transparent before:via-white/5 before:to-transparent before:opacity-0 before:group-hover:opacity-100 before:transition-opacity before:duration-500
                    `}>
                      <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                        <div className={`w-full h-full bg-gradient-to-br ${colorConfig.gradient} rounded-full blur-2xl`}></div>
                      </div>
                      
                      <CardContent className="relative p-8 h-full">
                        {/* Magic sparkles effect */}
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Sparkles className="w-5 h-5 text-gray-400 animate-pulse" />
                        </div>
                        
                        <div className="flex items-start space-x-6">
                          <motion.div 
                            className={`
                              relative w-20 h-20 bg-gradient-to-br ${colorConfig.gradient} 
                              rounded-2xl flex items-center justify-center shadow-lg ${colorConfig.shadow}
                              group-hover:shadow-xl group-hover:scale-110 
                              transition-all duration-300
                            `}
                            whileHover={{ rotate: 5 }}
                          >
                            <IconComponent className="w-10 h-10 text-white" />
                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
                          </motion.div>
                          
                          <div className="flex-1 min-h-[120px] flex flex-col justify-between">
                            <div>
                              <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 group-hover:bg-clip-text transition-all duration-300">
                                {category.name}
                              </h3>
                              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                                {category.description}
                              </p>
                            </div>
                            
                            {/* Stats Grid with improved spacing */}
                            <div className="grid grid-cols-3 gap-6">
                              <div className="text-center">
                                <div className="flex items-center justify-center mb-2">
                                  <div className={`p-2 rounded-lg bg-gradient-to-br ${colorConfig.gradient} bg-opacity-10`}>
                                    <Users className="w-4 h-4 text-gray-700" />
                                  </div>
                                </div>
                                <div className="font-bold text-gray-900 text-lg">{category.topics}</div>
                                <div className="text-xs text-gray-500 font-medium">Topics</div>
                              </div>
                              
                              <div className="text-center">
                                <div className="flex items-center justify-center mb-2">
                                  <div className={`p-2 rounded-lg bg-gradient-to-br ${colorConfig.gradient} bg-opacity-10`}>
                                    <Brain className="w-4 h-4 text-gray-700" />
                                  </div>
                                </div>
                                <div className="font-bold text-gray-900 text-lg">{category.questions}</div>
                                <div className="text-xs text-gray-500 font-medium">Questions</div>
                              </div>
                              
                              <div className="text-center">
                                <div className="flex items-center justify-center mb-2">
                                  <div className={`p-2 rounded-lg bg-gradient-to-br ${colorConfig.gradient} bg-opacity-10`}>
                                    <Clock className="w-4 h-4 text-gray-700" />
                                  </div>
                                </div>
                                <div className="font-bold text-gray-900 text-sm">All Levels</div>
                                <div className="text-xs text-gray-500 font-medium">Difficulty</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Call to action with gradient */}
                        <div className="mt-8 flex items-center justify-between">
                          <div className={`
                            flex items-center text-transparent bg-gradient-to-r ${colorConfig.gradient} bg-clip-text 
                            font-semibold group-hover:translate-x-2 transition-transform duration-300
                          `}>
                            Start Practicing 
                            <svg className="w-5 h-5 ml-2 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </div>
                          
                          {/* Progress indicator */}
                          <div className="w-2 h-2 rounded-full bg-gray-300 group-hover:bg-primary transition-colors duration-300"></div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced How it Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple steps to ace your preparation</p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { 
                step: 1, 
                title: "Choose Category", 
                description: "Select your test category based on your preparation needs",
                color: "from-blue-500 to-blue-600"
              },
              { 
                step: 2, 
                title: "Pick Topics", 
                description: "Choose specific topics you want to practice and improve",
                color: "from-purple-500 to-purple-600"
              },
              { 
                step: 3, 
                title: "Take Tests", 
                description: "Practice with timed tests and track your progress",
                color: "from-green-500 to-green-600"
              }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="text-center group"
              >
                <div className={`
                  w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl 
                  flex items-center justify-center text-white font-bold text-xl 
                  mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300
                `}>
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TestSeries;