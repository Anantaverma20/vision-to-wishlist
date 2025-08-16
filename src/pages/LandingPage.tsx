import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowRight, Sparkles, Heart, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import heroImage from "@/assets/hero-vision-board.jpg";

const LandingPage = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Welcome to VisionBoard+! Let's create your board.");
      navigate("/visual-form");
    }
  };

  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "AI-Powered Curation",
      description: "Smart image selection that understands your style preferences"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Personalized Boards", 
      description: "Create beautiful vision boards that reflect your unique aspirations"
    },
    {
      icon: <ShoppingBag className="w-6 h-6" />,
      title: "Shoppable Recommendations",
      description: "Discover products that bring your vision to life"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent-coral/20" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="animate-float">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text leading-tight">
              Vision to Reality
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Create personalized vision boards and discover products that make your dreams shoppable
            </p>
          </div>
          
          <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto mb-12">
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email to start"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
                required
              />
              <Button type="submit" variant="hero" size="lg">
                Start Your Board <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </form>

          <Button 
            variant="ghost" 
            onClick={() => navigate("/visual-form")}
            className="text-muted-foreground hover:text-foreground"
          >
            Skip and explore →
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            How VisionBoard+ Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-8 text-center hover:shadow-lg transition-all duration-300 group">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-soft-lavender to-soft-sky">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Dreams?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands creating vision boards that turn aspirations into actionable shopping lists
          </p>
          <Button variant="hero" size="lg" onClick={() => navigate("/visual-form")}>
            Create Your Vision Board <Sparkles className="w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;