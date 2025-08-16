import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Download, Share2, ShoppingBag, Move, Sparkles, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const VisionBoard = () => {
  const [selections, setSelections] = useState<Record<string, string[]>>({});
  const [boardImages, setBoardImages] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedBoard, setGeneratedBoard] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('visionBoardSelections');
    if (saved) {
      const parsed = JSON.parse(saved);
      setSelections(parsed);
      // Flatten all selected images
      const allImages = Object.values(parsed).flat() as string[];
      setBoardImages(allImages);
      
      // Auto-generate AI vision board
      generateAIVisionBoard(parsed);
    } else {
      navigate('/visual-form');
    }
  }, [navigate]);

  const getStyleTags = (selections: Record<string, string[]>) => {
    const tags = [];
    
    // Analyze user preferences to generate style tags
    if (selections.fitness?.length > 0) {
      tags.push("wellness", "active lifestyle", "healthy living", "motivation");
    }
    if (selections.travel?.length > 0) {
      tags.push("adventure", "wanderlust", "exploration", "freedom");
    }
    if (selections.home?.length > 0) {
      tags.push("minimalist", "cozy", "interior design", "peaceful");
    }
    if (selections.fashion?.length > 0) {
      tags.push("style", "elegance", "trendy", "aesthetic");
    }
    
    return tags;
  };

  const generateAIVisionBoard = async (userSelections: Record<string, string[]>) => {
    setIsGenerating(true);
    try {
      const styleTags = getStyleTags(userSelections);
      const prompts = [
        // Core lifestyle images
        `A beautiful ${styleTags.join(", ")} lifestyle scene, high quality, inspiring`,
        `Elegant ${styleTags.join(", ")} aesthetic mood board style, clean composition`,
        `Aspirational ${styleTags.join(", ")} vision, dreamy atmosphere, soft lighting`,
        
        // Category-specific images
        ...(userSelections.fitness ? [
          "Serene yoga studio with natural light, minimalist zen aesthetic",
          "Fresh healthy colorful smoothie bowls and fruits, clean eating lifestyle",
          "Modern gym equipment in bright spacious room, motivational fitness"
        ] : []),
        
        ...(userSelections.travel ? [
          "Stunning mountain landscape with clear blue sky, adventure travel",
          "Cozy café in European cobblestone street, wanderlust vibes",
          "Pristine beach with crystal clear water, tropical paradise"
        ] : []),
        
        ...(userSelections.home ? [
          "Scandinavian minimalist living room with plants, cozy hygge",
          "Organized beautiful kitchen with natural materials, home inspiration",
          "Peaceful bedroom with soft textures and natural light"
        ] : []),
        
        ...(userSelections.fashion ? [
          "Elegant fashion flat lay with accessories, style inspiration",
          "Chic wardrobe with organized clothes, fashion aesthetic",
          "Beautiful jewelry and accessories display, luxury style"
        ] : []),
        
        // Universal inspiration images
        "Inspirational quote in beautiful typography, motivation",
        "Golden hour nature scene with warm light, peaceful vibes",
        "Artistic workspace with creative tools, productivity inspiration",
        "Beautiful flowers in soft natural light, beauty and growth",
        "Cozy reading nook with books and warm lighting, self-care",
        "Luxury spa setup with candles and peaceful ambiance",
        "Modern workspace with plants and natural elements",
        "Sunset over calm water, tranquility and reflection"
      ];

      // Simulate AI generation delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo, we'll use curated Unsplash images that match the aesthetic
      const generatedImages = [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=600&fit=crop",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=500&fit=crop",
        "https://images.unsplash.com/photo-1540569876979-df919b7c1d70?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=600&fit=crop",
        "https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=500&fit=crop",
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=600&fit=crop",
        "https://images.unsplash.com/photo-1502780402662-acc01917cf4a?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=400&h=500&fit=crop",
        "https://images.unsplash.com/photo-1566479179817-bea0b1d0c1b6?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=600&fit=crop",
        "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1506629905607-0e3dd3bb9e0e?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=600&fit=crop",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=400&h=500&fit=crop",
        "https://images.unsplash.com/photo-1490427712608-588e68359dbd?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=400&h=600&fit=crop",
        "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=400&h=500&fit=crop",
        "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=600&fit=crop",
        "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=500&h=400&fit=crop"
      ];
      
      setGeneratedBoard(generatedImages);
      toast.success("AI Vision Board generated successfully!");
    } catch (error) {
      console.error("Error generating vision board:", error);
      toast.error("Failed to generate AI vision board");
    } finally {
      setIsGenerating(false);
    }
  };

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

  const categoryNames: Record<string, string> = {
    fitness: "Fitness & Wellness",
    travel: "Travel & Adventure", 
    home: "Home & Living",
    fashion: "Fashion & Style"
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
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating AI Vision Board
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-primary" />
                  Your AI Vision Board
                </>
              )}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isGenerating ? "Creating personalized vision..." : `${displayImages.length} curated images • AI generated`}
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
              AI-curated based on your preferences • Drag to reorder
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
              /* Overlapping collage-style vision board */
              <div className="relative w-full h-[800px] md:h-[900px] lg:h-[1000px] overflow-hidden">
                {displayImages.slice(0, 20).map((image, index) => {
                  // Predefined positions for overlapping collage effect
                  const positions = [
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
                      <div className="relative w-full h-full overflow-hidden rounded-lg shadow-lg group-hover:shadow-2xl transition-all duration-300 bg-white p-2">
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
                
                {/* Central year overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-6xl md:text-8xl lg:text-9xl font-bold text-white/90 drop-shadow-2xl z-30">
                    2025
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Categories Summary */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Your Vision Categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(selections).map(([categoryId, images]) => (
              <Card key={categoryId} className="p-4 text-center">
                <h4 className="font-medium mb-2">{categoryNames[categoryId]}</h4>
                <p className="text-2xl font-bold text-primary">{images.length}</p>
                <p className="text-xs text-muted-foreground">images selected</p>
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