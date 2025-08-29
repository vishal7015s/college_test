import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { HelmetProvider, Helmet } from "react-helmet-async";  // ✅ Add Helmet
import Home from "./pages/Home";
import TestSeries from "./pages/TestSeries";
import Category from "./pages/Category";
import Topic from "./pages/Topic";
import Test from "./pages/Test";
import TestResult from "./pages/TestResult";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/AdminDashboard";
import FacultyDashboard from "./pages/FacultyDashboard";
import Progress from "./pages/Progress";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HelmetProvider>
          {/* ✅ Global SEO + Logo Schema */}
          <Helmet>
            <script type="application/ld+json">
              {JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "SVCE Test Series",
                "url": "https://svce.vercel.app",
                "logo": "https://svce.vercel.app/logo.png", // 👉 make sure logo.png is in /public
              })}
            </script>
          </Helmet>

          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/test-series" element={<TestSeries />} />
              <Route path="/category/:categoryId" element={<Category />} />
              <Route path="/topic/:categoryId/:topicId" element={<Topic />} />
              <Route path="/test/:topicId/:difficulty" element={<Test />} />
              <Route
                path="/test-result/:topicId/:difficulty"
                element={<TestResult />}
              />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/faculty" element={<FacultyDashboard />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </HelmetProvider>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
