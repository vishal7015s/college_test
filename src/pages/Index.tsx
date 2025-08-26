import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { 
  BookOpen, 
  Clock, 
  Trophy, 
  Users, 
  CheckCircle, 
  Zap, 
  Target, 
  Award,
  ChevronRight,
  Sparkles
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { useLiveUsers } from "@/hooks/useLiveUsers";

const Index = () => {
  const { liveUsersCount } = useLiveUsers();
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.children,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
      );
    }

    if (statsRef.current) {
      gsap.fromTo(
        statsRef.current.children,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: "back.out(1.7)", delay: 0.5 }
      );
    }
  }, []);

  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Comprehensive Question Bank",
      description: "Access thousands of practice questions across all subjects with detailed solutions and explanations.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Timed Practice Sessions",
      description: "Simulate real exam conditions with time-bound tests to improve your speed and accuracy.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Performance Analytics",
      description: "Track your progress with detailed analytics and identify areas for improvement.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Subject-wise Practice",
      description: "Focus on specific subjects and topics to strengthen your weak areas.",
      color: "from-green-500 to-emerald-500"
    }
  ];

  const stats = [
    { 
      number: "10,000+", 
      label: "Practice Questions",
      icon: <BookOpen className="w-6 h-6" />,
      color: "text-blue-400"
    },
    { 
      number: "500+", 
      label: "Mock Tests",
      icon: <Clock className="w-6 h-6" />,
      color: "text-purple-400"
    },
    { 
      number: "50+", 
      label: "Topics Covered",
      icon: <Target className="w-6 h-6" />,
      color: "text-green-400"
    },
    { 
      number: liveUsersCount?.toString() || "1000+", 
      label: "Active Students",
      icon: <Users className="w-6 h-6" />,
      color: "text-orange-400"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Live Users Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-24 right-6 z-40"
      >
        <div className="bg-card/90 backdrop-blur-md border border-border rounded-full px-4 py-2 shadow-lg">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-foreground">
              {liveUsersCount} students online
            </span>
          </div>
        </div>
      </motion.div>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 via-background to-brand-secondary/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div ref={heroRef} className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-brand-primary/20 to-brand-secondary/20 border border-brand-primary/20 mb-8"
            >
              <Sparkles className="w-4 h-4 mr-2 text-brand-primary" />
              <span className="text-sm font-medium text-foreground">
                Welcome to SVCE Test Portal
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-clip-text text-transparent leading-tight">
              Master Your <br />
              <span className="relative">
                Engineering
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full"></div>
              </span>
              <br />
              Journey
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Comprehensive test preparation platform designed specifically for 
              <span className="font-semibold text-foreground"> Swami Vivekanand College of Engineering </span>
              students in Indore
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                size="lg" 
                variant="glow"
                className="group"
                asChild
              >
                <Link to="/test-series" className="flex items-center">
                  Start Practicing Now
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-card/50 to-accent/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center bg-card/80 backdrop-blur-sm border-border/50 hover:bg-card transition-all duration-300 hover:shadow-lg hover:shadow-brand-primary/10">
                <CardContent className="pt-6">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 mb-4 ${stat.color}`}>
                    {stat.icon}
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
              Why Choose SVCE Test Portal?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Designed with cutting-edge technology to provide the best learning experience for engineering students
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group h-full bg-card/80 backdrop-blur-sm border-border/50 hover:bg-card transition-all duration-500 hover:shadow-xl hover:shadow-brand-primary/10 hover:scale-[1.02]">
                  <CardHeader>
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      {feature.icon}
                    </div>
                    <CardTitle className="text-2xl font-bold text-foreground group-hover:text-brand-primary transition-colors">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base text-muted-foreground leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-brand-primary/10 via-background to-brand-secondary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-card/80 backdrop-blur-md rounded-3xl p-12 border border-border/50 shadow-xl">
            <Award className="w-16 h-16 mx-auto mb-6 text-brand-primary" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
              Ready to Excel?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of SVCE students who are already improving their performance with our advanced test preparation platform.
            </p>
            <Button size="lg" variant="glow" className="group" asChild>
              <Link to="/signup" className="flex items-center">
                Get Started Today
                <Zap className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="text-2xl font-bold bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                SVCE Test Portal
              </div>
            </div>
            <p className="text-muted-foreground mb-4">
              Swami Vivekanand College of Engineering, Indore
            </p>
            <p className="text-sm text-muted-foreground">
              © 2024 SVCE Test Portal. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;