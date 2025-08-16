import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Download, Share2, ShoppingBag, Move } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const VisionBoard = () => {
  const [selections, setSelections] = useState<Record<string, string[]>>({});
  const [boardImages, setBoardImages] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('visionBoardSelections');
    if (saved) {
      const parsed = JSON.parse(saved);
      setSelections(parsed);
      // Flatten all selected images
      const allImages = Object.values(parsed).flat() as string[];
      setBoardImages(allImages);
    } else {
      navigate('/visual-form');
    }
  }, [navigate]);

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
    // Store board data for recommendations
    localStorage.setItem('currentBoard', JSON.stringify({
      images: boardImages,
      selections: selections,
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

  if (boardImages.length === 0) {
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
            <h1 className="text-xl font-semibold">Your Vision Board</h1>
            <p className="text-sm text-muted-foreground">
              {boardImages.length} images • Created just now
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
            <h2 className="text-2xl font-bold text-center mb-6 gradient-text">
              Your Personal Vision Board
            </h2>
            
            {/* Masonry-style grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {boardImages.map((image, index) => (
                <div 
                  key={index}
                  className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-move"
                >
                  <img 
                    src={image} 
                    alt={`Vision ${index + 1}`}
                    className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Move className="absolute top-2 right-2 w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
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
          <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h3 className="text-2xl font-bold mb-2">Ready to Make It Real?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Discover personalized product recommendations that align with your vision board aesthetic and goals.
          </p>
          <Button variant="hero" size="lg" onClick={handleShopNow}>
            Shop Your Vision <ShoppingBag className="w-5 h-5 ml-2" />
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default VisionBoard;