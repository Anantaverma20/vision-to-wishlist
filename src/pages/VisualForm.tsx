import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Mock image data - in real app would be from CMS/API
const categories = [
  {
    id: "fitness",
    name: "Fitness & Wellness", 
    color: "bg-soft-mint",
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1540569876979-df919b7c1d70?w=400&h=300&fit=crop", 
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1506629905607-0e3dd3bb9e0e?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop"
    ]
  },
  {
    id: "travel",
    name: "Travel & Adventure",
    color: "bg-soft-sky", 
    images: [
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1502780402662-acc01917cf4a?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=400&h=300&fit=crop", 
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=300&fit=crop"
    ]
  },
  {
    id: "home",
    name: "Home & Living",
    color: "bg-soft-peach",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1522444195799-478538b28823?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1571508601205-de58ff9b9bce?w=400&h=300&fit=crop"
    ]
  },
  {
    id: "fashion",
    name: "Fashion & Style", 
    color: "bg-soft-lavender",
    images: [
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1566479179817-bea0b1d0c1b6?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1490427712608-588e68359dbd?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=300&fit=crop"
    ]
  }
];

const VisualForm = () => {
  const [currentCategory, setCurrentCategory] = useState(0);
  const [selections, setSelections] = useState<Record<string, string[]>>({});
  const navigate = useNavigate();

  const handleImageSelect = (imageUrl: string) => {
    const categoryId = categories[currentCategory].id;
    const currentSelections = selections[categoryId] || [];
    
    if (currentSelections.includes(imageUrl)) {
      // Remove selection
      setSelections(prev => ({
        ...prev,
        [categoryId]: currentSelections.filter(url => url !== imageUrl)
      }));
    } else if (currentSelections.length < 3) {
      // Add selection (max 3)
      setSelections(prev => ({
        ...prev,
        [categoryId]: [...currentSelections, imageUrl]
      }));
    } else {
      toast.error("You can select up to 3 images per category");
    }
  };

  const currentSelections = selections[categories[currentCategory].id] || [];
  const canProceed = Object.keys(selections).length > 0;

  const handleNext = () => {
    if (currentCategory < categories.length - 1) {
      setCurrentCategory(currentCategory + 1);
    } else {
      // Store selections in localStorage for now
      localStorage.setItem('visionBoardSelections', JSON.stringify(selections));
      navigate("/board");
    }
  };

  const totalSelected = Object.values(selections).reduce((sum, arr) => sum + arr.length, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate("/")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <div className="text-center">
            <h1 className="text-xl font-semibold">Create Your Vision Board</h1>
            <p className="text-sm text-muted-foreground">
              Category {currentCategory + 1} of {categories.length} • {totalSelected} images selected
            </p>
          </div>

          <div className="flex gap-2">
            {canProceed && (
              <Button variant="coral" onClick={() => navigate("/board")}>
                Preview Board ({totalSelected})
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-secondary h-1">
        <div 
          className="h-full bg-gradient-to-r from-primary to-accent-coral transition-all duration-500"
          style={{ width: `${((currentCategory + 1) / categories.length) * 100}%` }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Category Header */}
        <div className="text-center mb-8">
          <Badge variant="secondary" className={`${categories[currentCategory].color} mb-4 px-4 py-2 text-sm font-medium`}>
            {categories[currentCategory].name}
          </Badge>
          <h2 className="text-2xl font-bold mb-2">
            What resonates with your {categories[currentCategory].name.toLowerCase()} vision?
          </h2>
          <p className="text-muted-foreground">
            Select 2-3 images that capture your aspirations (current: {currentSelections.length}/3)
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {categories[currentCategory].images.map((imageUrl, index) => {
            const isSelected = currentSelections.includes(imageUrl);
            return (
              <Card 
                key={index}
                className={`relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 ${
                  isSelected ? 'ring-2 ring-primary shadow-lg' : 'hover:shadow-lg'
                }`}
                onClick={() => handleImageSelect(imageUrl)}
              >
                <img 
                  src={imageUrl} 
                  alt={`${categories[currentCategory].name} option ${index + 1}`}
                  className="w-full aspect-[4/3] object-cover"
                />
                {isSelected && (
                  <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button 
            variant="outline" 
            onClick={() => setCurrentCategory(Math.max(0, currentCategory - 1))}
            disabled={currentCategory === 0}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <div className="flex gap-2">
            {categories.map((_, index) => (
              <div 
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index <= currentCategory ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>

          <Button 
            variant="hero" 
            onClick={handleNext}
            disabled={currentSelections.length === 0}
          >
            {currentCategory === categories.length - 1 ? 'Create Board' : 'Next'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VisualForm;