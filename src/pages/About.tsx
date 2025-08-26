import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Users, Award, BookOpen } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-6">About TestPrep Hub</h1>
          <p className="text-xl text-muted-foreground mb-12">
            Your comprehensive platform for college test preparation and skill development.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card>
              <CardContent className="p-8 text-center">
                <Target className="w-12 h-12 text-brand-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
                <p className="text-muted-foreground">
                  To provide accessible, high-quality test preparation resources that help students excel in their academic and professional journeys.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-8 text-center">
                <Award className="w-12 h-12 text-brand-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4">Our Vision</h3>
                <p className="text-muted-foreground">
                  To become the leading platform for test preparation, empowering students with knowledge and confidence.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-8">Why Choose Us?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <BookOpen className="w-8 h-8 text-brand-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Expert Content</h3>
                <p className="text-muted-foreground">Questions designed by subject matter experts</p>
              </div>
              <div>
                <Users className="w-8 h-8 text-brand-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Community</h3>
                <p className="text-muted-foreground">Join thousands of successful students</p>
              </div>
              <div>
                <Target className="w-8 h-8 text-brand-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Results</h3>
                <p className="text-muted-foreground">Proven track record of student success</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;