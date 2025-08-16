import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Download, Share2, ShoppingBag, Move, Sparkles, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const VisionBoard = () => {
  const [selections, setSelections] = useState<Record<string, any[]>>({});
  const [boardImages, setBoardImages] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedBoard, setGeneratedBoard] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [userFeedback, setUserFeedback] = useState<'liked' | 'disliked' | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('visionBoardSelections');
    if (saved) {
      const parsed = JSON.parse(saved);
      setSelections(parsed);
      // Use user-selected images from the form  
      const allImages = Object.values(parsed).flat().map((option: any) => option.image);
      setBoardImages(allImages);
      setGeneratedBoard(allImages); // Use user selections as the board
    } else {
      navigate('/visual-form');
    }
  }, [navigate]);

  const getStyleTags = (selections: Record<string, any[]>) => {
    const tags = [];
    
    // Analyze user preferences to generate style tags
    if (selections.want?.length > 0) {
      const wantTags = selections.want.flatMap((option: any) => option.tags);
      tags.push(...wantTags);
    }
    if (selections.eat?.length > 0) {
      const eatTags = selections.eat.flatMap((option: any) => option.tags);
      tags.push(...eatTags);
    }
    if (selections.drink?.length > 0) {
      const drinkTags = selections.drink.flatMap((option: any) => option.tags);
      tags.push(...drinkTags);
    }
    if (selections.go?.length > 0) {
      const goTags = selections.go.flatMap((option: any) => option.tags);
      tags.push(...goTags);
    }
    if (selections.color?.length > 0) {
      const colorTags = selections.color.flatMap((option: any) => option.tags);
      tags.push(...colorTags);
    }
    if (selections.activity?.length > 0) {
      const activityTags = selections.activity.flatMap((option: any) => option.tags);
      tags.push(...activityTags);
    }
    if (selections.animal?.length > 0) {
      const animalTags = selections.animal.flatMap((option: any) => option.tags);
      tags.push(...animalTags);
    }
    if (selections.season?.length > 0) {
      const seasonTags = selections.season.flatMap((option: any) => option.tags);
      tags.push(...seasonTags);
    }
    if (selections.aesthetic?.length > 0) {
      const aestheticTags = selections.aesthetic.flatMap((option: any) => option.tags);
      tags.push(...aestheticTags);
    }
    
    return [...new Set(tags)]; // Remove duplicates
  };

  // Remove the AI generation function since we're using user selections directly

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Vision Board - VisionBoard+',
        text: 'Check out my personalized vision board!',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Board link copied to clipboard!");
    }
  };

  const handleExport = () => {
    toast.success("Board exported! (Demo mode - would generate PDF/image)");
  };

  const handleShopNow = () => {
    // Store board data for recommendations including AI generated images
    localStorage.setItem('currentBoard', JSON.stringify({
      images: generatedBoard.length > 0 ? generatedBoard : boardImages,
      originalSelections: boardImages,
      selections: selections,
      styleTags: getStyleTags(selections),
      created: Date.now()
    }));
    navigate('/shop');
  };

  const handleFeedback = (liked: boolean) => {
    setUserFeedback(liked ? 'liked' : 'disliked');
    setShowFeedback(false);
    
    if (liked) {
      toast.success("Great! We're glad you love your vision board! 😊");
    } else {
      toast.success("Thanks for the feedback! We'll improve our AI generation. 🙏");
      // In a real app, you might regenerate or ask for more specific feedback
    }
    
    // Store feedback for analytics
    localStorage.setItem('boardFeedback', JSON.stringify({
      liked,
      timestamp: Date.now(),
      boardId: Date.now() // In real app would be actual board ID
    }));
  };

  const categoryNames: Record<string, string> = {
    want: "What I Want",
    eat: "Food Cravings", 
    drink: "Favorite Drinks",
    go: "Places to Go",
    color: "Favorite Colors",
    activity: "Activities I Love",
    animal: "Favorite Animals",
    season: "Favorite Season",
    aesthetic: "My Aesthetic"
  };

  if (boardImages.length === 0 && !isGenerating) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">No vision board found</h2>
          <p className="text-muted-foreground mb-6">Create your vision board first</p>
          <Button onClick={() => navigate('/visual-form')}>
            Start Creating
          </Button>
        </div>
      </div>
    );
  }

  const displayImages = generatedBoard.length > 0 ? generatedBoard : boardImages;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate("/visual-form")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Edit Board
          </Button>
          
          <div className="text-center">
            <h1 className="text-xl font-semibold flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Your Vision Board
            </h1>
            <p className="text-sm text-muted-foreground">
              {displayImages.length} personalized images • Based on your choices
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="soft" size="sm" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Vision Board Display */}
        <div className="mb-8">
          <Card className="p-8 bg-gradient-to-br from-soft-lavender/30 to-soft-sky/30">
            <h2 className="text-2xl font-bold text-center mb-2 gradient-text">
              Your Personal Vision Board
            </h2>
            <p className="text-center text-muted-foreground mb-6">
              Based on your personal preferences • Drag to reorder
            </p>
            
            {isGenerating ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Creating Your Vision Board</h3>
                  <p className="text-muted-foreground">AI is analyzing your preferences...</p>
                </div>
              </div>
            ) : (
              /* Mobile-optimized collage-style vision board */
              <div className="relative w-full h-[500px] sm:h-[600px] md:h-[800px] lg:h-[1000px] overflow-hidden">
                {displayImages.slice(0, 12).map((image, index) => {
                  // Mobile-optimized positions for overlapping collage effect
                  const mobilePositions = [
                    { top: '5%', left: '5%', width: '120px', height: '150px', rotation: '-2deg', zIndex: 10 },
                    { top: '10%', right: '10%', width: '100px', height: '130px', rotation: '3deg', zIndex: 15 },
                    { top: '25%', left: '15%', width: '140px', height: '110px', rotation: '1deg', zIndex: 8 },
                    { top: '20%', right: '5%', width: '110px', height: '140px', rotation: '-1deg', zIndex: 12 },
                    { top: '40%', left: '8%', width: '120px', height: '160px', rotation: '2deg', zIndex: 16 },
                    { top: '35%', right: '15%', width: '130px', height: '100px', rotation: '-3deg', zIndex: 14 },
                    { top: '55%', left: '20%', width: '110px', height: '140px', rotation: '1deg', zIndex: 11 },
                    { top: '50%', right: '8%', width: '125px', height: '120px', rotation: '-2deg', zIndex: 18 },
                    { top: '70%', left: '5%', width: '140px', height: '110px', rotation: '2deg', zIndex: 13 },
                    { top: '65%', right: '20%', width: '115px', height: '145px', rotation: '-1deg', zIndex: 17 },
                    { top: '80%', left: '25%', width: '120px', height: '130px', rotation: '3deg', zIndex: 9 },
                    { top: '75%', right: '5%', width: '130px', height: '120px', rotation: '-2deg', zIndex: 19 }
                  ];

                  const desktopPositions = [
                    { top: '5%', left: '10%', width: '200px', height: '250px', rotation: '-3deg', zIndex: 10 },
                    { top: '8%', left: '35%', width: '180px', height: '220px', rotation: '2deg', zIndex: 15 },
                    { top: '2%', right: '15%', width: '160px', height: '200px', rotation: '-1deg', zIndex: 12 },
                    { top: '25%', left: '5%', width: '220px', height: '160px', rotation: '1deg', zIndex: 8 },
                    { top: '22%', left: '45%', width: '190px', height: '240px', rotation: '-2deg', zIndex: 20 },
                    { top: '15%', right: '8%', width: '170px', height: '210px', rotation: '3deg', zIndex: 14 },
                    { top: '45%', left: '15%', width: '160px', height: '200px', rotation: '-4deg', zIndex: 16 },
                    { top: '40%', left: '60%', width: '200px', height: '150px', rotation: '1deg', zIndex: 11 },
                    { top: '35%', right: '12%', width: '180px', height: '230px', rotation: '-1deg', zIndex: 18 },
                    { top: '65%', left: '8%', width: '190px', height: '170px', rotation: '2deg', zIndex: 13 },
                    { top: '60%', left: '40%', width: '170px', height: '220px', rotation: '-3deg', zIndex: 17 },
                    { top: '55%', right: '20%', width: '200px', height: '160px', rotation: '1deg', zIndex: 9 },
                    { top: '78%', left: '12%', width: '160px', height: '200px', rotation: '-1deg', zIndex: 19 },
                    { top: '75%', left: '50%', width: '180px', height: '180px', rotation: '3deg', zIndex: 15 },
                    { top: '70%', right: '8%', width: '170px', height: '210px', rotation: '-2deg', zIndex: 12 },
                    { top: '10%', left: '60%', width: '150px', height: '190px', rotation: '2deg', zIndex: 7 },
                    { top: '30%', left: '25%', width: '140px', height: '170px', rotation: '-1deg', zIndex: 6 },
                    { top: '50%', left: '75%', width: '160px', height: '200px', rotation: '4deg', zIndex: 14 },
                    { top: '85%', left: '30%', width: '190px', height: '140px', rotation: '-2deg', zIndex: 10 },
                    { top: '88%', right: '25%', width: '170px', height: '160px', rotation: '1deg', zIndex: 8 }
                  ];
                  
                  const positions = window.innerWidth < 768 ? mobilePositions : desktopPositions;
                  const position = positions[index] || positions[index % positions.length];
                  
                  return (
                    <div 
                      key={index}
                      className="group absolute cursor-move transition-all duration-300 hover:scale-105 hover:z-50"
                      style={{
                        top: position.top,
                        left: position.left,
                        right: position.right,
                        width: position.width,
                        height: position.height,
                        transform: `rotate(${position.rotation})`,
                        zIndex: position.zIndex
                      }}
                    >
                      <div className="relative w-full h-full overflow-hidden rounded-lg shadow-lg group-hover:shadow-2xl transition-all duration-300 bg-white p-1 sm:p-2">
                        <img 
                          src={image} 
                          alt={`Vision ${index + 1}`}
                          className="w-full h-full object-cover rounded-md transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md" />
                        <Move className="absolute top-1 right-1 w-3 h-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
                        <div className="absolute bottom-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Sparkles className="w-3 h-3 text-white drop-shadow-lg" />
                        </div>
                      </div>
                    </div>
                  );
                })}
                
                {/* Central year overlay - mobile responsive */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold text-white/90 drop-shadow-2xl z-30">
                    2025
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Feedback Section - Below Vision Board */}
        {!isGenerating && !userFeedback && (
          <Card className="p-6 mb-8 bg-gradient-to-r from-soft-lavender/20 to-soft-sky/20">
            <div className="text-center">
              <div className="mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-1">How do you like your vision board?</h3>
                <p className="text-muted-foreground text-sm">Your feedback helps us improve your experience</p>
              </div>
              
              <div className="flex gap-3 justify-center items-center">
                <Button
                  onClick={() => handleFeedback(true)}
                  className="h-12 px-6"
                  variant="outline"
                >
                  <span className="mr-2 text-xl">👍</span>
                  Love it!
                </Button>
                <Button
                  onClick={() => handleFeedback(false)}
                  className="h-12 px-6"
                  variant="outline"
                >
                  <span className="mr-2 text-xl">👎</span>
                  Not quite
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Categories Summary */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Your Vision Categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.entries(selections).map(([categoryId, options]) => (
              <Card key={categoryId} className="p-4 text-center">
                <h4 className="font-medium mb-2 text-sm">{categoryNames[categoryId]}</h4>
                <p className="text-2xl font-bold text-primary">{options.length}</p>
                <p className="text-xs text-muted-foreground">selections</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Shop CTA */}
        <Card className="p-8 text-center bg-gradient-to-r from-primary/10 to-accent-coral/10 border-primary/20">
          <div className="flex items-center justify-center gap-2 mb-4">
            <ShoppingBag className="w-12 h-12 text-primary" />
            <Sparkles className="w-8 h-8 text-accent-coral" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Ready to Make It Real?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Discover AI-curated product recommendations that perfectly match your vision board aesthetic and personal style.
          </p>
          <Button variant="hero" size="lg" onClick={handleShopNow} disabled={isGenerating}>
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                Shop Your Vision <ShoppingBag className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default VisionBoard;