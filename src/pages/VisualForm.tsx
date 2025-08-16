import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import colorPink from "@/assets/color-pink.jpg";
import colorBlack from "@/assets/color-black.jpg";
import colorGreen from "@/assets/color-green.jpg";
import activityReading from "@/assets/activity-reading.jpg";
import activityDancing from "@/assets/activity-dancing.jpg";
import activityGaming from "@/assets/activity-gaming.jpg";
import animalDog from "@/assets/animal-dog.jpg";
import animalCat from "@/assets/animal-cat.jpg";
import animalPanda from "@/assets/animal-panda.jpg";
import seasonSpring from "@/assets/season-spring.jpg";
import seasonSummer from "@/assets/season-summer.jpg";
import seasonAutumn from "@/assets/season-autumn.jpg";

// Questions and image options for the visual form
const questions = [
  {
    id: "want",
    title: "What do you want right now?",
    emoji: "✨",
    color: "bg-soft-mint",
    options: [
      { label: "New shoes", image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=300&fit=crop", tags: ["fashion", "footwear", "style"] },
      { label: "Cozy hoodie", image: "https://images.unsplash.com/photo-1556821840-3a9c6dcdb61b?w=400&h=300&fit=crop", tags: ["clothing", "comfort", "casual"] },
      { label: "A notebook", image: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?w=400&h=300&fit=crop", tags: ["stationery", "planning", "creative"] },
      { label: "Tech gadget", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop", tags: ["technology", "gadgets", "modern"] },
      { label: "Jewelry", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop", tags: ["accessories", "jewelry", "elegant"] },
      { label: "Skincare", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop", tags: ["beauty", "skincare", "wellness"] }
    ]
  },
  {
    id: "eat", 
    title: "What do you want to eat now?",
    emoji: "🍜",
    color: "bg-soft-peach",
    options: [
      { label: "Ramen", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop", tags: ["food", "comfort", "asian"] },
      { label: "Pancakes", image: "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=400&h=300&fit=crop", tags: ["breakfast", "sweet", "comfort"] },
      { label: "Something sweet", image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop", tags: ["dessert", "sweet", "indulgent"] },
      { label: "Healthy salad", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop", tags: ["healthy", "fresh", "vegetables"] },
      { label: "Pizza", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop", tags: ["comfort", "social", "indulgent"] },
      { label: "Sushi", image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop", tags: ["healthy", "asian", "fresh"] }
    ]
  },
  {
    id: "drink",
    title: "What do you want to drink now?",
    emoji: "🧋",
    color: "bg-soft-lavender", 
    options: [
      { label: "Bubble tea", image: "https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=400&h=300&fit=crop", tags: ["sweet", "trendy", "social"] },
      { label: "Iced coffee", image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop", tags: ["coffee", "energy", "cold"] },
      { label: "Matcha latte", image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400&h=300&fit=crop", tags: ["healthy", "trendy", "calming"] },
      { label: "Smoothie", image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400&h=300&fit=crop", tags: ["healthy", "fresh", "vitamins"] },
      { label: "Tea", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop", tags: ["calming", "traditional", "warm"] },
      { label: "Energy drink", image: "https://images.unsplash.com/photo-1553282195-a4dd3d960735?w=400&h=300&fit=crop", tags: ["energy", "active", "boost"] }
    ]
  },
  {
    id: "go",
    title: "Where do you want to go now?",
    emoji: "🌅",
    color: "bg-soft-sky",
    options: [
      { label: "The beach", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop", tags: ["nature", "relaxing", "vacation"] },
      { label: "A quiet café", image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop", tags: ["cozy", "peaceful", "social"] },
      { label: "A cool event", image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=300&fit=crop", tags: ["exciting", "social", "entertainment"] },
      { label: "The mountains", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop", tags: ["nature", "adventure", "peaceful"] },
      { label: "Art museum", image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=400&h=300&fit=crop", tags: ["culture", "inspiration", "art"] },
      { label: "Shopping mall", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop", tags: ["shopping", "social", "variety"] }
    ]
  },
  {
    id: "color",
    title: "What's your favorite color?",
    emoji: "🎨",
    color: "bg-soft-mint",
    options: [
      { label: "Pink", image: colorPink, tags: ["soft", "feminine", "playful"] },
      { label: "Black", image: colorBlack, tags: ["elegant", "minimalist", "classic"] },
      { label: "Green", image: colorGreen, tags: ["natural", "calming", "fresh"] },
      { label: "Blue", image: "https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=300&fit=crop", tags: ["calming", "trustworthy", "peaceful"] },
      { label: "Purple", image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop", tags: ["creative", "mystical", "luxurious"] },
      { label: "Yellow", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop", tags: ["bright", "happy", "energetic"] }
    ]
  },
  {
    id: "activity",
    title: "What do you love to do?",
    emoji: "💫",
    color: "bg-soft-peach",
    options: [
      { label: "Reading", image: activityReading, tags: ["intellectual", "quiet", "learning"] },
      { label: "Dancing", image: activityDancing, tags: ["active", "expressive", "joyful"] },
      { label: "Playing games", image: activityGaming, tags: ["fun", "competitive", "strategic"] },
      { label: "Traveling", image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop", tags: ["adventure", "cultural", "exploration"] },
      { label: "Cooking", image: "https://images.unsplash.com/photo-1556909114-4f6e9d313e36?w=400&h=300&fit=crop", tags: ["creative", "nurturing", "skills"] },
      { label: "Sports", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop", tags: ["active", "competitive", "health"] }
    ]
  },
  {
    id: "animal",
    title: "What's your favorite animal?",
    emoji: "🐾",
    color: "bg-soft-lavender",
    options: [
      { label: "Dog", image: animalDog, tags: ["loyal", "friendly", "energetic"] },
      { label: "Cat", image: animalCat, tags: ["independent", "graceful", "calm"] },
      { label: "Panda", image: animalPanda, tags: ["gentle", "peaceful", "adorable"] },
      { label: "Dolphin", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop", tags: ["intelligent", "playful", "social"] },
      { label: "Butterfly", image: "https://images.unsplash.com/photo-1558443957-60cd63c9ec9d?w=400&h=300&fit=crop", tags: ["transformation", "delicate", "beautiful"] },
      { label: "Wolf", image: "https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=400&h=300&fit=crop", tags: ["wild", "strong", "independent"] }
    ]
  },
  {
    id: "season",
    title: "What's your favorite season?",
    emoji: "🌸",
    color: "bg-soft-sky",
    options: [
      { label: "Spring", image: seasonSpring, tags: ["renewal", "fresh", "blooming"] },
      { label: "Summer", image: seasonSummer, tags: ["warm", "vacation", "energy"] },
      { label: "Autumn", image: seasonAutumn, tags: ["cozy", "nostalgic", "transformation"] },
      { label: "Winter", image: "https://images.unsplash.com/photo-1516715094483-75da06558971?w=400&h=300&fit=crop", tags: ["peaceful", "minimalist", "reflection"] }
    ]
  },
  {
    id: "aesthetic",
    title: "Do you have a favorite character or aesthetic?",
    emoji: "✨",
    color: "bg-soft-mint",
    options: [
      { label: "Ghibli", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop", tags: ["whimsical", "nature", "dreamy"] },
      { label: "Sanrio", image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop", tags: ["cute", "kawaii", "colorful"] },
      { label: "K-pop", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop", tags: ["trendy", "colorful", "modern"] },
      { label: "Vintage", image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=300&fit=crop", tags: ["nostalgic", "classic", "timeless"] },
      { label: "Minimalist", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop", tags: ["clean", "simple", "modern"] },
      { label: "Dark academia", image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop", tags: ["intellectual", "classic", "scholarly"] }
    ]
  }
];

const VisualForm = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selections, setSelections] = useState<Record<string, any[]>>({});
  const navigate = useNavigate();

  const handleOptionSelect = (option: any) => {
    const questionId = questions[currentQuestion].id;
    const currentSelections = selections[questionId] || [];
    
    if (currentSelections.some(sel => sel.label === option.label)) {
      // Remove selection
      setSelections(prev => ({
        ...prev,
        [questionId]: currentSelections.filter(sel => sel.label !== option.label)
      }));
    } else if (currentSelections.length < 2) {
      // Add selection (max 2 per question)
      setSelections(prev => ({
        ...prev,
        [questionId]: [...currentSelections, option]
      }));
    } else {
      toast.error("You can select up to 2 options per question");
    }
  };

  const currentSelections = selections[questions[currentQuestion].id] || [];
  const canProceed = Object.keys(selections).length > 0;

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
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
              Question {currentQuestion + 1} of {questions.length} • {totalSelected} selections made
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
          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Question Header */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-4">{questions[currentQuestion].emoji}</div>
          <Badge variant="secondary" className={`${questions[currentQuestion].color} mb-4 px-4 py-2 text-sm font-medium`}>
            💛 Your Favorites
          </Badge>
          <h2 className="text-2xl font-bold mb-2">
            {questions[currentQuestion].title}
          </h2>
          <p className="text-muted-foreground">
            Choose up to 2 options that speak to you (current: {currentSelections.length}/2)
          </p>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {questions[currentQuestion].options.map((option, index) => {
            const isSelected = currentSelections.some(sel => sel.label === option.label);
            return (
              <Card 
                key={index}
                className={`relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 ${
                  isSelected ? 'ring-2 ring-primary shadow-lg' : 'hover:shadow-lg'
                }`}
                onClick={() => handleOptionSelect(option)}
              >
                <img 
                  src={option.image} 
                  alt={option.label}
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                  <p className="text-white font-medium text-sm">{option.label}</p>
                </div>
                {isSelected && (
                  <div className="absolute top-2 right-2">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
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
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <div className="flex gap-2">
            {questions.map((_, index) => (
              <div 
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index <= currentQuestion ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>

          <Button 
            variant="hero" 
            onClick={handleNext}
            disabled={currentSelections.length === 0}
          >
            {currentQuestion === questions.length - 1 ? 'Create Board' : 'Next'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VisualForm;