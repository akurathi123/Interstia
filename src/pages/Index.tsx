import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import LoginModal from "@/components/auth/LoginModal";
import SignupModal from "@/components/auth/SignupModal";
import ForgotPasswordModal from "@/components/auth/ForgotPasswordModal";
import TechDetailsModal from "@/components/TechDetailsModal";

const Index = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    setShowSignup(true);
  };

  const handleTopicClick = (topic: string) => {
    setSelectedTopic(topic);
  };

  const handleSwitchToForgotPassword = () => {
    setShowLogin(false);
    setShowForgotPassword(true);
  };

  const handleBackToLogin = () => {
    setShowForgotPassword(false);
    setShowLogin(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(120,119,198,0.1),transparent)] opacity-50"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,107,53,0.1),transparent)] opacity-50"></div>
      
      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6 lg:p-8">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">∞</span>
          </div>
          <span className="text-2xl font-bold">Interstia</span>
        </div>
        
        <div className="flex space-x-4">
          <Button 
            variant="outline" 
            className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-all duration-300"
            onClick={() => setShowLogin(true)}
          >
            Log in
          </Button>
          <Button 
            className="bg-orange-500 hover:bg-orange-600 text-white transition-all duration-300 transform hover:scale-105"
            onClick={() => setShowSignup(true)}
          >
            Sign up
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
        <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-orange-400 bg-clip-text text-transparent animate-fade-in">
          Join groups based on your interests, share ideas, and connect!
        </h1>
        
        <p className="text-xl lg:text-2xl text-gray-300 mb-12 max-w-3xl animate-fade-in" style={{ animationDelay: "0.2s" }}>
          Start your journey to explore new communities!
        </p>
        
        <Button 
          size="lg" 
          className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 animate-fade-in shadow-2xl shadow-orange-500/25"
          style={{ animationDelay: "0.4s" }}
          onClick={handleGetStarted}
        >
          Get Started
        </Button>
      </div>

      {/* Trending Topics Section */}
      <div className="relative z-10 px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Trending Topics</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {['React', 'AI/ML', 'Web3', 'DevOps', 'Design', 'Startup', 'Gaming', 'Tech News'].map((topic, index) => (
              <div 
                key={topic}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 text-center hover:border-orange-500 transition-all duration-300 transform hover:scale-105 animate-fade-in cursor-pointer"
                style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                onClick={() => handleTopicClick(topic)}
              >
                <span className="text-lg font-semibold">{topic}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      <LoginModal 
        isOpen={showLogin} 
        onClose={() => setShowLogin(false)}
        onSwitchToSignup={() => {
          setShowLogin(false);
          setShowSignup(true);
        }}
        onForgotPassword={handleSwitchToForgotPassword}
      />
      <SignupModal 
        isOpen={showSignup} 
        onClose={() => setShowSignup(false)}
        onSwitchToLogin={() => {
          setShowSignup(false);
          setShowLogin(true);
        }}
      />
      <ForgotPasswordModal
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
        onBackToLogin={handleBackToLogin}
      />
      <TechDetailsModal
        isOpen={!!selectedTopic}
        onClose={() => setSelectedTopic(null)}
        topic={selectedTopic || ""}
      />
    </div>
  );
};

export default Index;
