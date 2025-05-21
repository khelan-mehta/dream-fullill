import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WishCard from "@/components/WishCard";
import WishForm from "@/components/WishForm";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getWishes, WishData } from "@/firebase/firestore";
import { toast } from "sonner";

// How it works steps
const howItWorks = [
  {
    title: "Post Your Wish",
    description: "Share your wish with our community. Be specific about what you need and why it matters.",
    icon: "📝"
  },
  {
    title: "Connect with Givers",
    description: "Generous individuals browse wishes and choose ones that resonate with them.",
    icon: "🤝"
  },
  {
    title: "Wishes Come True",
    description: "Once your wish is fulfilled, share your story and inspire others.",
    icon: "✨"
  },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [wishes, setWishes] = useState<WishData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Extract unique categories from wishes
  const categories = Array.from(new Set(wishes.map(wish => wish.category)));
  
  useEffect(() => {
    const fetchWishes = async () => {
      setIsLoading(true);
      try {
        const filters = {
          onlyFulfilled: activeTab === "fulfilled",
          onlyOpen: activeTab === "open",
          category: categoryFilter,
          searchQuery
        };
        
        const fetchedWishes = await getWishes(filters);
        setWishes(fetchedWishes);
      } catch (error: any) {
        toast.error(`Failed to load wishes: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchWishes();
  }, [activeTab, categoryFilter]);
  
  // Client-side filtering for search (since we already have the data)
  const filteredWishes = wishes.filter(wish => {
    if (searchQuery && !wish.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main>
        <Hero />
        
        {/* How It Works Section */}
        <section id="how-it-works" className="py-16 bg-gradient-to-b from-white to-wishes-purple/5">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-2">How It Works</h2>
              <p className="text-wishes-gray max-w-2xl mx-auto">
                Our platform connects people who have wishes with those who want to make a difference.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {howItWorks.map((step, index) => (
                <div key={index} className="bg-white rounded-xl p-6 card-shadow">
                  <div className="w-16 h-16 rounded-full bg-wishes-purple/10 text-wishes-purple flex items-center justify-center text-3xl mb-4 mx-auto">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-2">{step.title}</h3>
                  <p className="text-wishes-gray text-center">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Browse Wishes Section */}
        <section id="browse" className="py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">Browse Wishes</h2>
                <p className="text-wishes-gray">
                  Explore wishes from people around the world and make a difference.
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <Button asChild className="button-gradient text-white">
                  <a href="#make-a-wish">Make Your Own Wish</a>
                </Button>
              </div>
            </div>
            
            {/* Filters */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div>
                <Input
                  placeholder="Search wishes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
              <TabsList className="grid w-full max-w-md grid-cols-3 mx-auto">
                <TabsTrigger value="all">All Wishes</TabsTrigger>
                <TabsTrigger value="open">Open</TabsTrigger>
                <TabsTrigger value="fulfilled">Fulfilled</TabsTrigger>
              </TabsList>
            </Tabs>
            
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-wishes-purple"></div>
              </div>
            ) : filteredWishes.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredWishes.map((wish) => (
                  <WishCard key={wish.id} {...wish} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-2xl font-semibold mb-2">No wishes found</p>
                <p className="text-wishes-gray mb-6">Try adjusting your filters or search query.</p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery("");
                    setCategoryFilter("");
                    setActiveTab("all");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>
        
        {/* Success Stories */}
        <section id="stories" className="py-16 bg-wishes-purple/5">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-2">Success Stories</h2>
              <p className="text-wishes-gray max-w-2xl mx-auto">
                Real stories of wishes that came true and the lives that were changed.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl overflow-hidden card-shadow">
                <div className="h-48 bg-gradient-to-r from-wishes-purple to-wishes-purple-light"></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    "A laptop that changed my career"
                  </h3>
                  <p className="text-wishes-gray mb-4">
                    "Someone gifted me a laptop when I was struggling to learn programming. Today, I'm a software engineer at a top tech company. That one gift changed the trajectory of my life."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-wishes-purple flex items-center justify-center text-white">
                      J
                    </div>
                    <div>
                      <div className="font-medium">James Cooper</div>
                      <div className="text-wishes-gray text-sm">Software Engineer</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl overflow-hidden card-shadow">
                <div className="h-48 bg-gradient-to-r from-wishes-peach to-wishes-purple-light/50"></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    "The surgery that saved my daughter"
                  </h3>
                  <p className="text-wishes-gray mb-4">
                    "When my daughter needed a specialized surgery not covered by insurance, I thought all hope was lost. The community here came together and raised the funds in just 3 days."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-wishes-purple flex items-center justify-center text-white">
                      M
                    </div>
                    <div>
                      <div className="font-medium">Maria Gonzalez</div>
                      <div className="text-wishes-gray text-sm">Mother & Teacher</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Button asChild variant="outline" className="border-wishes-purple text-wishes-purple hover:bg-wishes-purple/10">
                <a href="#">Read More Stories</a>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Make a Wish Section */}
        <section id="make-a-wish" className="py-16">
          <div className="container px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Share Your Wish</h2>
                <p className="text-wishes-gray mb-6">
                  Everyone deserves to have their wishes heard. Share yours today and let our community of givers help make it come true.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-wishes-purple/10 text-wishes-purple flex items-center justify-center font-bold">1</div>
                    <p>Be specific about what you need and why it matters.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-wishes-purple/10 text-wishes-purple flex items-center justify-center font-bold">2</div>
                    <p>Add details that help others understand your situation.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-wishes-purple/10 text-wishes-purple flex items-center justify-center font-bold">3</div>
                    <p>Be patient - the right person will find your wish.</p>
                  </div>
                </div>
              </div>
              <WishForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
