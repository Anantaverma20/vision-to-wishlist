import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star, ExternalLink, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock product data - would come from affiliate APIs
const mockProducts = [
  {
    id: 1,
    title: "Wireless Fitness Tracker",
    price: "$129.99",
    originalPrice: "$159.99",
    rating: 4.5,
    reviews: 2847,
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=400&fit=crop",
    merchant: "Amazon",
    category: "fitness",
    tags: ["health", "technology", "minimalist"]
  },
  {
    id: 2,
    title: "Sustainable Yoga Mat",
    price: "$48.00",
    originalPrice: "$65.00", 
    rating: 4.8,
    reviews: 1203,
    image: "https://images.unsplash.com/photo-1506629905607-0e3dd3bb9e0e?w=400&h=400&fit=crop",
    merchant: "REI",
    category: "fitness",
    tags: ["eco-friendly", "wellness", "minimalist"]
  },
  {
    id: 3,
    title: "Minimalist Travel Backpack",
    price: "$89.99",
    rating: 4.6,
    reviews: 892,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    merchant: "Peak Design",
    category: "travel",
    tags: ["minimalist", "travel", "durable"]
  },
  {
    id: 4,
    title: "Ceramic Plant Pot Set",
    price: "$34.99",
    rating: 4.4,
    reviews: 567,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop",
    merchant: "West Elm",
    category: "home",
    tags: ["home-decor", "plants", "ceramic", "modern"]
  },
  {
    id: 5,
    title: "Organic Cotton Oversized Sweater",
    price: "$78.00",
    originalPrice: "$95.00",
    rating: 4.7,
    reviews: 1456,
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop",
    merchant: "Everlane",
    category: "fashion",
    tags: ["sustainable", "cozy", "minimalist"]
  },
  {
    id: 6,
    title: "Smart Water Bottle",
    price: "$59.99",
    rating: 4.3,
    reviews: 743,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
    merchant: "Hydro Flask",
    category: "fitness",
    tags: ["hydration", "smart", "sustainable"]
  },
  {
    id: 7,
    title: "Aromatherapy Diffuser",
    price: "$42.50",
    rating: 4.6,
    reviews: 2103,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop",
    merchant: "Vitruvi",
    category: "home",
    tags: ["wellness", "aromatherapy", "home-decor"]
  },
  {
    id: 8,
    title: "Leather Crossbody Bag",
    price: "$125.00",
    rating: 4.5,
    reviews: 634,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    merchant: "Madewell",
    category: "fashion", 
    tags: ["leather", "minimalist", "versatile"]
  }
];

const ShopPage = () => {
  const [boardData, setBoardData] = useState<any>(null);
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('currentBoard');
    if (saved) {
      setBoardData(JSON.parse(saved));
    }
  }, []);

  const categories = [
    { id: "all", name: "All Products", count: mockProducts.length },
    { id: "fitness", name: "Fitness", count: mockProducts.filter(p => p.category === "fitness").length },
    { id: "travel", name: "Travel", count: mockProducts.filter(p => p.category === "travel").length },
    { id: "home", name: "Home", count: mockProducts.filter(p => p.category === "home").length },
    { id: "fashion", name: "Fashion", count: mockProducts.filter(p => p.category === "fashion").length }
  ];

  const handleCategoryFilter = (categoryId: string) => {
    setSelectedCategory(categoryId);
    if (categoryId === "all") {
      setFilteredProducts(mockProducts);
    } else {
      setFilteredProducts(mockProducts.filter(p => p.category === categoryId));
    }
  };

  const handleProductClick = (product: any) => {
    // In real app, would track click for affiliate attribution
    console.log("Product clicked:", product);
    window.open(`https://example.com/product/${product.id}?utm_source=visionboard&utm_campaign=affiliate`, '_blank');
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate("/board")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Board
          </Button>
          
          <div className="text-center">
            <h1 className="text-xl font-semibold">Shop Your Vision</h1>
            <p className="text-sm text-muted-foreground">
              Personalized recommendations based on your board
            </p>
          </div>

          <Badge variant="secondary" className="bg-accent-coral/10 text-accent-coral">
            {filteredProducts.length} Products
          </Badge>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Vision Summary */}
        {boardData && (
          <Card className="p-6 mb-8 bg-gradient-to-r from-soft-lavender/30 to-soft-sky/30">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex -space-x-2">
                {boardData.images.slice(0, 4).map((img: string, idx: number) => (
                  <img 
                    key={idx}
                    src={img} 
                    alt=""
                    className="w-12 h-12 rounded-full border-2 border-white object-cover"
                  />
                ))}
                {boardData.images.length > 4 && (
                  <div className="w-12 h-12 rounded-full border-2 border-white bg-muted flex items-center justify-center text-sm font-medium">
                    +{boardData.images.length - 4}
                  </div>
                )}
              </div>
              <div>
                <h2 className="font-semibold">Your Vision Board Style</h2>
                <p className="text-sm text-muted-foreground">
                  Based on your {boardData.images.length} selected images
                </p>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Badge variant="secondary" className="bg-soft-mint">Minimalist</Badge>
              <Badge variant="secondary" className="bg-soft-peach">Wellness-focused</Badge>
              <Badge variant="secondary" className="bg-soft-lavender">Modern</Badge>
              <Badge variant="secondary" className="bg-soft-sky">Sustainable</Badge>
            </div>
          </Card>
        )}

        {/* Category Filters */}
        <div className="flex gap-2 mb-8 overflow-x-auto">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategoryFilter(category.id)}
              className="flex-shrink-0"
            >
              <Filter className="w-4 h-4 mr-2" />
              {category.name} ({category.count})
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card 
              key={product.id} 
              className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
              onClick={() => handleProductClick(product)}
            >
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.originalPrice && (
                  <Badge className="absolute top-2 left-2 bg-accent-coral text-white">
                    Save {Math.round(((parseFloat(product.originalPrice.replace('$', '')) - parseFloat(product.price.replace('$', ''))) / parseFloat(product.originalPrice.replace('$', ''))) * 100)}%
                  </Badge>
                )}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 bg-white/90 hover:bg-white">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline">{product.merchant}</Badge>
                  <div className="flex items-center gap-1">
                    {renderStars(product.rating)}
                    <span className="text-xs text-muted-foreground ml-1">({product.reviews})</span>
                  </div>
                </div>
                
                <h3 className="font-medium mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {product.title}
                </h3>
                
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-bold text-primary">{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">{product.originalPrice}</span>
                  )}
                </div>
                
                <div className="flex gap-1 flex-wrap">
                  {product.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Affiliate Disclosure */}
        <div className="mt-12 p-4 bg-muted/50 rounded-lg text-center">
          <p className="text-sm text-muted-foreground">
            <strong>Affiliate Disclosure:</strong> VisionBoard+ may earn a commission when you purchase products through our links. 
            This helps support our platform at no extra cost to you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;