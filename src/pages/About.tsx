import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Users, Award, BookOpen, GraduationCap, BrainCircuit } from "lucide-react";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* ✅ SEO Meta Tags */}
      <Helmet>
        <title>About SVCE Test Series - Free Aptitude Tests for Campus Placement</title>
        <meta 
          name="description" 
          content="Learn about SVCE Test Series - providing free aptitude tests, reasoning practice, and mock exams for campus placement preparation. Join thousands of successful students." 
        />
        <meta 
          name="keywords" 
          content="SVCE, about SVCE, SVCE test series, free aptitude tests, campus placement preparation, SVCE about us" 
        />
      </Helmet>

      <Navbar />
      
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-6 text-gray-900">About SVCE Test Series</h1>
          <p className="text-xl text-muted-foreground mb-12">
            SVCE - Your comprehensive platform for <strong>free campus placement preparation</strong> and skill development.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="border border-gray-200 shadow-sm">
              <CardContent className="p-8 text-center">
                <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4 text-gray-900">SVCE Mission</h3>
                <p className="text-muted-foreground">
                  To provide <strong>free, high-quality test preparation resources</strong> through SVCE that help students excel in campus placements and competitive exams.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border border-gray-200 shadow-sm">
              <CardContent className="p-8 text-center">
                <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4 text-gray-900">SVCE Vision</h3>
                <p className="text-muted-foreground">
                  To become India's leading <strong>free test preparation platform</strong> through SVCE, empowering students with knowledge and confidence.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Why Choose SVCE?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2 text-gray-900">SVCE Expert Content</h3>
                <p className="text-muted-foreground">Questions designed by SVCE subject matter experts</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <Users className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2 text-gray-900">SVCE Community</h3>
                <p className="text-muted-foreground">Join thousands of successful SVCE students</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <Target className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2 text-gray-900">SVCE Results</h3>
                <p className="text-muted-foreground">Proven track record of SVCE student success</p>
              </div>
            </div>
          </div>

          {/* ✅ SVCE Story Section */}
          <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm mb-16">
            <div className="text-center">
              <GraduationCap className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4 text-gray-900">The SVCE Story</h2>
              <p className="text-muted-foreground mb-4">
                SVCE Test Series was founded with a simple mission: to make <strong>quality test preparation accessible to every student</strong>.
                We believe that financial constraints should never be a barrier to success in campus placements.
              </p>
              <p className="text-muted-foreground">
                Today, SVCE serves <strong>thousands of students nationwide</strong> with completely free aptitude tests, 
                reasoning practice, and mock exams designed by industry experts.
              </p>
            </div>
          </div>

          {/* ✅ SVCE Impact Stats */}
          <div className="bg-blue-50 p-8 rounded-lg border border-blue-200">
            <div className="text-center">
              <BrainCircuit className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-6 text-gray-900">SVCE Impact</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <div className="text-2xl font-bold text-blue-600 mb-2">25,000+</div>
                  <div className="text-sm text-gray-600">Practice Questions</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600 mb-2">10,000+</div>
                  <div className="text-sm text-gray-600">SVCE Students</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600 mb-2">500+</div>
                  <div className="text-sm text-gray-600">Mock Tests</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600 mb-2">100%</div>
                  <div className="text-sm text-gray-600">Free Access</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;


// import Navbar from "@/components/Navbar";
// import { Card, CardContent } from "@/components/ui/card";
// import { Target, Users, Award, BookOpen } from "lucide-react";
// import Footer from "@/components/Footer";

// const About = () => {
//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />
      
//       <section className="py-20">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h1 className="text-4xl font-bold mb-6">About TestPrep Hub</h1>
//           <p className="text-xl text-muted-foreground mb-12">
//             Your comprehensive platform for college test preparation and skill development.
//           </p>
          
//           <div className="grid md:grid-cols-2 gap-8 mb-16">
//             <Card>
//               <CardContent className="p-8 text-center">
//                 <Target className="w-12 h-12 text-brand-primary mx-auto mb-4" />
//                 <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
//                 <p className="text-muted-foreground">
//                   To provide accessible, high-quality test preparation resources that help students excel in their academic and professional journeys.
//                 </p>
//               </CardContent>
//             </Card>
            
//             <Card>
//               <CardContent className="p-8 text-center">
//                 <Award className="w-12 h-12 text-brand-primary mx-auto mb-4" />
//                 <h3 className="text-xl font-semibold mb-4">Our Vision</h3>
//                 <p className="text-muted-foreground">
//                   To become the leading platform for test preparation, empowering students with knowledge and confidence.
//                 </p>
//               </CardContent>
//             </Card>
//           </div>
          
//           <div className="text-center">
//             <h2 className="text-3xl font-bold mb-8">Why Choose Us?</h2>
//             <div className="grid md:grid-cols-3 gap-8">
//               <div>
//                 <BookOpen className="w-8 h-8 text-brand-primary mx-auto mb-4" />
//                 <h3 className="font-semibold mb-2">Expert Content</h3>
//                 <p className="text-muted-foreground">Questions designed by subject matter experts</p>
//               </div>
//               <div>
//                 <Users className="w-8 h-8 text-brand-primary mx-auto mb-4" />
//                 <h3 className="font-semibold mb-2">Community</h3>
//                 <p className="text-muted-foreground">Join thousands of successful students</p>
//               </div>
//               <div>
//                 <Target className="w-8 h-8 text-brand-primary mx-auto mb-4" />
//                 <h3 className="font-semibold mb-2">Results</h3>
//                 <p className="text-muted-foreground">Proven track record of student success</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// };

// export default About;